import { configIA } from '../config/ia'

export const TIPOS_IA = Object.freeze({
  MELHORAR_VAGA: 'melhorar-vaga',
  MELHORAR_PERFIL_EMPRESA: 'melhorar-perfil-empresa',
  DOSSIE_CANDIDATO: 'dossie-candidato',
  FEEDBACK_CANDIDATO: 'feedback-candidato',
  RETORNO_ALUNO: 'retorno-aluno',
  PROJETO_PRATICO: 'projeto-pratico',
  RADAR_PRONTIDAO: 'radar-prontidao',
  MENTOR_ALUNO: 'mentor-aluno',
  MENTOR_EMPRESA: 'mentor-empresa',
})

export const PROMPT_BASE_IA = `Você apoia a plataforma Trilum Conecta apenas na redação e explicação de informações já calculadas pelo sistema.
Use somente os dados fornecidos no contexto.
Não invente experiências, projetos, certificados, cursos, vagas, tecnologias, salários, benefícios, links ou localidades.
Não altere pontuações, classificações, recomendações ou status.
Não salve, publique, aprove, rejeite ou execute ações em nome do usuário.
Não prometa contratação ou resultados.
Responda em português brasileiro e sem mencionar IA, Ollama, API, endpoint ou modelo.`

export const CONFIGURACOES_TIPO_IA = Object.freeze({
  [TIPOS_IA.MELHORAR_VAGA]: { formato: 'json', maxCaracteres: 6000 },
  [TIPOS_IA.MELHORAR_PERFIL_EMPRESA]: { formato: 'json', maxCaracteres: 7000 },
  [TIPOS_IA.DOSSIE_CANDIDATO]: { formato: 'json', maxCaracteres: 1800 },
  [TIPOS_IA.FEEDBACK_CANDIDATO]: { formato: 'json', maxCaracteres: 1200 },
  [TIPOS_IA.RETORNO_ALUNO]: { formato: 'texto', maxCaracteres: 900 },
  [TIPOS_IA.PROJETO_PRATICO]: { formato: 'json', maxCaracteres: 3000 },
  [TIPOS_IA.RADAR_PRONTIDAO]: { formato: 'texto', maxCaracteres: 900 },
  [TIPOS_IA.MENTOR_ALUNO]: { formato: 'texto', maxCaracteres: 900 },
  [TIPOS_IA.MENTOR_EMPRESA]: { formato: 'texto', maxCaracteres: 900 },
})

const TERMOS_TECNICOS_PROIBIDOS = /(?:ollama|modelo de linguagem|como (?:uma? )?ia|intelig[eê]ncia artificial|chave de api|endpoint|modelo gemma|llm)/i
const PROMESSAS_PROIBIDAS = /(?:contrata[cç][aã]o garantida|vaga garantida|ser[aá] contratado|aprova[cç][aã]o garantida)/i
const LINGUAGEM_OFENSIVA = /(?:candidato ruim|n[aã]o serve|incapaz|incompetente)/i
const AVISO_FALLBACK = 'Não foi possível gerar uma resposta personalizada agora. Usamos uma sugestão segura.'

function endpointEhLocal(endpoint) {
  try {
    return ['localhost', '127.0.0.1', '[::1]'].includes(new URL(endpoint).hostname)
  } catch {
    return false
  }
}

function resolverFallback(fallback, contexto, tipo) {
  return typeof fallback === 'function' ? fallback(contexto, tipo) : fallback
}

function avisoDesenvolvimento(motivo) {
  if (import.meta.env.DEV && configIA.habilitada) {
    console.warn(`Recurso de texto local indisponível; usando fallback seguro. Motivo: ${motivo}`)
  }
}

export function iaEstaHabilitada() {
  return Boolean(configIA.habilitada && configIA.provedor === 'ollama' && endpointEhLocal(configIA.endpoint))
}

export function normalizarRespostaIA(valor = '') {
  return String(valor || '')
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()
}

export function extrairJSONSeguro(valor) {
  if (valor && typeof valor === 'object') return valor
  const limpo = normalizarRespostaIA(valor)
  const inicio = limpo.indexOf('{')
  const fim = limpo.lastIndexOf('}')
  if (inicio < 0 || fim <= inicio) return null
  try {
    const resultado = JSON.parse(limpo.slice(inicio, fim + 1))
    return resultado && typeof resultado === 'object' && !Array.isArray(resultado) ? resultado : null
  } catch {
    return null
  }
}

export function validarTextoIA(texto, {
  maxCaracteres = 1200,
  minCaracteres = 1,
  permitirTermosTecnicos = false,
  proibidos = [],
  naoPodePrometerContratacao = true,
  naoPodeSerOfensivo = true,
  validar,
} = {}) {
  const valor = normalizarRespostaIA(texto)
  if (valor.length < minCaracteres || valor.length > maxCaracteres) return false
  if (!permitirTermosTecnicos && TERMOS_TECNICOS_PROIBIDOS.test(valor)) return false
  if (naoPodePrometerContratacao && PROMESSAS_PROIBIDAS.test(valor)) return false
  if (naoPodeSerOfensivo && LINGUAGEM_OFENSIVA.test(valor)) return false
  if (proibidos.some((termo) => valor.toLowerCase().includes(String(termo).toLowerCase()))) return false
  return typeof validar === 'function' ? Boolean(validar(valor)) : true
}

export function validarJSONIA(valor, { camposObrigatorios = [], maxCaracteres = 8000, validar } = {}) {
  const json = extrairJSONSeguro(valor)
  if (!json || camposObrigatorios.some((campo) => json[campo] === undefined || json[campo] === null)) return false
  if (!validarTextoIA(JSON.stringify(json), { maxCaracteres })) return false
  return typeof validar === 'function' ? Boolean(validar(json)) : true
}

export async function chamarIAComTimeout({
  system = PROMPT_BASE_IA,
  prompt = '',
  timeoutMs = configIA.timeoutMs,
  formato,
  opcoes = {},
} = {}) {
  if (!iaEstaHabilitada() || !prompt) return ''

  const controller = new AbortController()
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const resposta = await fetch(configIA.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: configIA.modelo,
        stream: false,
        messages: [
          { role: 'system', content: `${PROMPT_BASE_IA}\n\n${system}` },
          { role: 'user', content: prompt },
        ],
        options: opcoes,
        ...(formato ? { format: formato } : {}),
      }),
    })

    if (!resposta.ok) return ''
    const dados = await resposta.json()
    return normalizarRespostaIA(dados?.message?.content)
  } catch (erro) {
    avisoDesenvolvimento(erro?.name === 'AbortError' ? 'tempo limite excedido' : 'serviço local não respondeu')
    return ''
  } finally {
    globalThis.clearTimeout(timeout)
  }
}

export async function iaEstaDisponivel() {
  if (!iaEstaHabilitada()) return false
  const controller = new AbortController()
  const timeout = globalThis.setTimeout(() => controller.abort(), Math.min(configIA.timeoutMs, 2500))

  try {
    const endpointStatus = configIA.endpoint.replace(/\/api\/chat\/?$/, '/api/tags')
    const resposta = await fetch(endpointStatus, { signal: controller.signal })
    return resposta.ok
  } catch {
    return false
  } finally {
    globalThis.clearTimeout(timeout)
  }
}

export function gerarFallbackSeguro(tipo, contexto = {}) {
  const mensagens = {
    [TIPOS_IA.MELHORAR_VAGA]: 'Revise os textos sugeridos e confirme se representam a realidade da vaga antes de publicar.',
    [TIPOS_IA.MELHORAR_PERFIL_EMPRESA]: 'Revise o perfil e mantenha apenas informações reais sobre a empresa.',
    [TIPOS_IA.DOSSIE_CANDIDATO]: 'Use os dados do perfil e da vaga apenas como apoio à análise humana.',
    [TIPOS_IA.FEEDBACK_CANDIDATO]: 'Agradecemos sua candidatura. Continue mantendo seu perfil, currículo e projetos atualizados.',
    [TIPOS_IA.RETORNO_ALUNO]: 'Use este retorno como orientação para fortalecer seu perfil e suas próximas candidaturas.',
    [TIPOS_IA.PROJETO_PRATICO]: 'Escolha um projeto coerente com sua trilha atual e registre evidências do que praticou.',
    [TIPOS_IA.RADAR_PRONTIDAO]: 'Complete os pontos indicados pelo sistema antes de priorizar novas candidaturas.',
    [TIPOS_IA.MENTOR_EMPRESA]: 'Revise os dados atuais e avance pelo próximo ajuste indicado pela plataforma.',
    [TIPOS_IA.MENTOR_ALUNO]: 'Siga o próximo passo indicado pelas regras da plataforma e avance conforme concluir as etapas.',
  }
  return mensagens[tipo] || contexto.fallback || 'Revise as informações atuais e avance pelo próximo passo indicado pela plataforma.'
}

export async function executarIAComSeguranca({
  tipo,
  contexto = {},
  system = '',
  prompt,
  criarPrompt,
  fallback,
  formato,
  camposObrigatorios = [],
  maxCaracteres,
  minCaracteres = 1,
  validarResposta,
  transformarResposta,
  opcoes = {},
  timeoutMs,
} = {}) {
  const conteudoFallback = resolverFallback(fallback, contexto, tipo) ?? gerarFallbackSeguro(tipo, contexto)
  const configuracaoTipo = CONFIGURACOES_TIPO_IA[tipo] || {}
  const formatoFinal = formato === false
    ? undefined
    : (formato || (configuracaoTipo.formato === 'json' ? 'json' : undefined))
  const respostaEhJson = formatoFinal === 'json' || Boolean(formatoFinal && typeof formatoFinal === 'object')
  const limiteFinal = maxCaracteres || configuracaoTipo.maxCaracteres || 1200
  if (!iaEstaHabilitada()) return { sucesso: true, origem: 'fallback', conteudo: conteudoFallback, aviso: '' }

  const promptFinal = typeof criarPrompt === 'function' ? criarPrompt(contexto) : prompt
  const respostaBruta = await chamarIAComTimeout({ system, prompt: promptFinal, timeoutMs, formato: formatoFinal, opcoes })
  if (!respostaBruta) return { sucesso: true, origem: 'fallback', conteudo: conteudoFallback, aviso: AVISO_FALLBACK }

  const resposta = respostaEhJson ? extrairJSONSeguro(respostaBruta) : normalizarRespostaIA(respostaBruta)
  const valida = respostaEhJson
    ? validarJSONIA(resposta, { camposObrigatorios, maxCaracteres: limiteFinal, validar: validarResposta })
    : validarTextoIA(resposta, { maxCaracteres: limiteFinal, minCaracteres, validar: validarResposta })

  if (!valida) {
    avisoDesenvolvimento('resposta fora das regras de segurança')
    return { sucesso: true, origem: 'fallback', conteudo: conteudoFallback, aviso: AVISO_FALLBACK }
  }

  try {
    const conteudo = typeof transformarResposta === 'function' ? transformarResposta(resposta) : resposta
    return { sucesso: true, origem: 'ia', conteudo, aviso: '' }
  } catch {
    avisoDesenvolvimento('falha ao preparar resposta')
    return { sucesso: true, origem: 'fallback', conteudo: conteudoFallback, aviso: AVISO_FALLBACK }
  }
}

export async function executarConteudoIAComFallback(opcoes) {
  const resultado = await executarIAComSeguranca(opcoes)
  return resultado.conteudo
}
