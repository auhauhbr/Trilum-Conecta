import { configIA } from '../config/ia'
import { cursos as catalogoCursos } from '../dados/cursos'
import { trilhas as catalogoTrilhas } from '../dados/trilhas'
import { vagas as catalogoVagas } from '../dados/vagas'

const SYSTEM_PROMPT = `Você é o Mentor Inteligente da plataforma Trilum Conecta.
Sua função é explicar recomendações de cursos, trilhas, vagas e currículo para alunos de tecnologia.
Você deve ser claro, direto, humano e útil.
Não invente cursos, trilhas, vagas, certificados ou tecnologias que não aparecem no contexto.
Não reescreva, traduza ou altere nomes de cursos, trilhas ou vagas.
Evite colocar nomes de itens entre aspas.
Não prometa contratação.
Não diga que o aluno está pronto se houver lacunas importantes.
Não invente experiência, projetos ou tecnologias.
Não descreva o aluno como especialista, sênior ou pleno sem evidência explícita no contexto.
Explique o próximo passo com base no nível do aluno.
Se o aluno for iniciante, priorize base antes de tecnologias avançadas.
Se houver inconsistência no perfil, explique com cuidado.
Responda em português brasileiro.
Use no máximo 4 frases.
Não use markdown pesado.
Não cite que você é uma IA.
Não mencione Ollama, API ou modelo.`

const limitesPorCenario = {
  geral: 600,
  trilha: 600,
  curso: 600,
  vaga: 600,
  curriculo: 900,
  perfil: 700,
  empresa: 700,
}
const CACHE_VERSION = 'v5'

function primeiroNome(nome = '') {
  return String(nome).trim().split(' ')[0] || 'aluno'
}

function lista(valor, limite = 10) {
  return Array.isArray(valor) ? valor.filter(Boolean).slice(0, limite) : []
}

function texto(valor, limite = 240) {
  return String(valor || '').trim().slice(0, limite)
}

function itemRecomendado(item = {}, tipo) {
  const base = {
    titulo: texto(item.titulo, 120),
    motivo: texto(item.motivo, 280),
    nivel: texto(item.nivel, 60),
    pontuacao: Number.isFinite(item.pontuacao) ? item.pontuacao : undefined,
  }

  if (tipo === 'vaga') {
    return {
      ...base,
      match: Number.isFinite(item.match) ? item.match : undefined,
      tags: lista(item.tags, 8).map((tag) => texto(tag, 50)),
      requisitos: lista(item.requisitos, 6).map((requisito) => texto(requisito, 120)),
    }
  }

  return base
}

function camposPreenchidosCurriculo(curriculo = {}) {
  const campos = ['titulo', 'objetivo', 'resumo', 'linkedin', 'github', 'portfolio', 'projetos', 'experiencias', 'formacoes', 'idiomas', 'competencias']
  return campos.filter((campo) => {
    const valor = curriculo[campo]
    return Array.isArray(valor) ? valor.length > 0 : Boolean(String(valor || '').trim())
  })
}

export function montarContextoMentorAluno({
  usuarioAtual = {},
  respostasWizard = {},
  trilhasRecomendadas = [],
  cursosRecomendados = [],
  vagasRecomendadas = [],
  curriculo = {},
  tecnologiasEstudadas = [],
} = {}) {
  const preenchidos = camposPreenchidosCurriculo(curriculo)
  const camposCurriculo = ['titulo', 'objetivo', 'resumo', 'linkedin', 'github', 'portfolio', 'projetos', 'experiencias', 'formacoes', 'idiomas', 'competencias']

  return {
    usuarioId: texto(usuarioAtual.id, 80) || 'sem-usuario',
    nome: primeiroNome(usuarioAtual.nome),
    areaDesejada: texto(respostasWizard.areaDesejada, 60),
    focoCarreira: texto(respostasWizard.focoCarreira, 80),
    nivelInformatica: texto(respostasWizard.informatica, 60),
    nivelProgramacao: texto(respostasWizard.programacao, 60),
    nivelTecnologia: texto(respostasWizard.nivelTecnologia, 60),
    linguagemConhecida: texto(respostasWizard.linguagem, 60),
    tecnologiaInteresse: texto(respostasWizard.tecnologiaInteresse, 60),
    objetivo: texto(respostasWizard.objetivo, 80),
    tempoSemanal: texto(respostasWizard.tempoSemanal, 60),
    ingles: texto(respostasWizard.ingles, 60),
    softSkills: texto(respostasWizard.softSkills, 60),
    cursosConcluidos: lista(usuarioAtual.cursosConcluidos, 12).map((item) => texto(item?.titulo || item, 120)),
    tecnologiasPerfil: lista(usuarioAtual.tecnologias, 12).map((item) => texto(item, 60)),
    tecnologiasEstudadas: lista(tecnologiasEstudadas, 12).map((item) => texto(item?.rotulo || item?.tecnologia || item, 60)),
    trilhas: lista(trilhasRecomendadas, 3).map((item) => itemRecomendado(item, 'trilha')),
    cursos: lista(cursosRecomendados, 5).map((item) => itemRecomendado(item, 'curso')),
    vagas: lista(vagasRecomendadas, 3).map((item) => itemRecomendado(item, 'vaga')),
    curriculo: {
      objetivo: texto(curriculo.objetivo || curriculo.tipo, 240),
      camposPreenchidos: preenchidos,
      camposFaltando: camposCurriculo.filter((campo) => !preenchidos.includes(campo)),
      tecnologias: lista(curriculo.tecnologias, 12).map((item) => texto(item, 80)),
      projetos: lista(curriculo.projetos, 6).map((item) => texto(item, 140)),
      certificados: lista(curriculo.certificados, 8).map((item) => texto(item?.titulo || item, 120)),
    },
  }
}

function endpointEhLocal(endpoint) {
  try {
    const url = new URL(endpoint)
    return ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
  } catch {
    return false
  }
}

function stringifyOrdenado(valor) {
  if (Array.isArray(valor)) return `[${valor.map(stringifyOrdenado).join(',')}]`
  if (valor && typeof valor === 'object') {
    return `{${Object.keys(valor).sort().map((chave) => `${JSON.stringify(chave)}:${stringifyOrdenado(valor[chave])}`).join(',')}}`
  }
  return JSON.stringify(valor)
}

function hashContexto(valor) {
  const entrada = stringifyOrdenado(valor)
  let hash = 2166136261
  for (let indice = 0; indice < entrada.length; indice += 1) {
    hash ^= entrada.charCodeAt(indice)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(36)
}

function chaveCache(cenario, contexto) {
  return `trilum:mentor-ia:${CACHE_VERSION}:${contexto.usuarioId || 'sem-usuario'}:${cenario}:${hashContexto(contexto)}`
}

function lerCache(chave) {
  try {
    return localStorage.getItem(chave) || ''
  } catch {
    return ''
  }
}

function salvarCache(chave, valor) {
  try {
    localStorage.setItem(chave, valor)
  } catch {
    // O mentor continua funcionando sem cache.
  }
}

function normalizarResposta(valor = '') {
  return String(valor)
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[*#`_]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function titulosPermitidos(contexto = {}) {
  return [...lista(contexto.trilhas), ...lista(contexto.cursos), ...lista(contexto.vagas)]
    .map((item) => item.titulo)
    .filter(Boolean)
}

function respostaCitaItemForaDoContexto(resposta, contexto) {
  const permitidos = new Set(titulosPermitidos(contexto).map((titulo) => titulo.toLowerCase()))
  const catalogo = [...catalogoCursos, ...catalogoTrilhas, ...catalogoVagas]
    .map((item) => item.titulo)
    .filter(Boolean)

  return catalogo.some((titulo) => {
    const tituloNormalizado = titulo.toLowerCase()
    return resposta.toLowerCase().includes(tituloNormalizado) && !permitidos.has(tituloNormalizado)
  })
}

function respostaNomeiaItemInventado(resposta, contexto) {
  const permitidos = new Set(titulosPermitidos(contexto).map((titulo) => titulo.toLowerCase()))
  const padroes = [
    /(?:curso|trilha|vaga)\s+["“]([^"”]{4,120})["”]/gi,
    /(?:curso|trilha|vaga)\s+(?:chamad[oa]|intitulad[oa]|como)\s+["“]?([^".!?”]{4,120})/gi,
  ]
  const mencoes = padroes.flatMap((padrao) => [...resposta.matchAll(padrao)].map((mencao) => mencao[1].trim().toLowerCase()))

  return mencoes.some((candidato) => !permitidos.has(candidato))
}

function respostaPulaBaseDoIniciante(resposta, contexto) {
  const iniciante = ['iniciante', 'basico'].includes(contexto.nivelInformatica)
    || !contexto.nivelProgramacao
    || contexto.nivelProgramacao === 'nenhum'
  const tecnologia = String(contexto.tecnologiaInteresse || '').trim().toLowerCase()

  if (!iniciante || !tecnologia || tecnologia === 'nenhuma') return false

  const tecnologiaEscapada = tecnologia.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const sugereProjetoDireto = new RegExp(`(?:projeto|aplica[cç][aã]o).{0,160}${tecnologiaEscapada}`, 'i')
  const sugereComecarDireto = new RegExp(`come[cç](?:ar|e).{0,80}${tecnologiaEscapada}`, 'i')

  return sugereProjetoDireto.test(resposta) || sugereComecarDireto.test(resposta)
}

function respostaTemConteudoDoCenario(resposta, cenario) {
  const termosPorCenario = {
    geral: ['recomenda', 'próximo passo', 'proximo passo', 'base', 'estudo', 'trilha', 'curso'],
    trilha: ['trilha', 'base', 'fundamento', 'prepara', 'próximo passo', 'proximo passo'],
    curso: ['curso', 'base', 'fundamento', 'prática', 'pratica', 'próximo passo', 'proximo passo'],
    vaga: ['vaga', 'requisito', 'compatibilidade', 'perfil', 'estudo', 'lacuna'],
    curriculo: ['currículo', 'curriculo', 'github', 'linkedin', 'projeto', 'resumo', 'objetivo', 'tecnologia'],
    perfil: ['perfil', 'projeto', 'tecnologia', 'objetivo'],
    empresa: ['vaga', 'descrição', 'descricao', 'tag', 'candidato', 'empresa'],
  }
  const respostaNormalizada = resposta.toLowerCase()
  return (termosPorCenario[cenario] || termosPorCenario.geral).some((termo) => respostaNormalizada.includes(termo))
}

function respostaValida(resposta, contexto, limite, cenario) {
  if (!resposta || resposta.length > limite) return false
  if ((resposta.match(/[.!?](?:\s|$)/g) || []).length > 4) return false
  if (/como posso te ajudar|em que posso ajudar/i.test(resposta)) return false
  if (/erro ao gerar|error:|n[aã]o consegui responder|indispon[ií]vel|ollama|chave de api|endpoint|modelo de linguagem/i.test(resposta)) return false
  if (cenario === 'perfil' && /\b(?:especialista|s[eê]nior|pleno)\b/i.test(resposta)) return false
  if (/contrata[cç][aã]o garantida|vaga garantida|ser[aá] contratado/i.test(resposta)) return false
  if (respostaCitaItemForaDoContexto(resposta, contexto)) return false
  if (respostaNomeiaItemInventado(resposta, contexto)) return false
  if (respostaPulaBaseDoIniciante(resposta, contexto)) return false
  if (!respostaTemConteudoDoCenario(resposta, cenario)) return false
  return true
}

function fallbackBase(contexto) {
  const iniciante = ['iniciante', 'basico'].includes(contexto.nivelInformatica) || !contexto.nivelProgramacao || contexto.nivelProgramacao === 'nenhum'
  if (iniciante) {
    return 'Como você está começando, as recomendações priorizam base, lógica, Git e primeiros projetos antes de tecnologias mais avançadas.'
  }
  return 'Com base no seu perfil, a Trilum priorizou conteúdos compatíveis com seu nível, objetivo e tecnologias escolhidas. Avance conforme concluir as etapas.'
}

export function gerarTextoFallback(contexto = {}, cenario = 'geral') {
  if (cenario === 'trilha') {
    const trilha = contexto.trilhas?.[0]
    return trilha?.motivo || `${trilha?.titulo || 'Esta trilha'} foi priorizada porque combina com seu perfil e com o próximo passo definido pelas regras da plataforma.`
  }

  if (cenario === 'curso') {
    const curso = contexto.cursos?.[0]
    return curso?.motivo || `${curso?.titulo || 'Este curso'} foi sugerido como um próximo passo compatível com seu nível e objetivo.`
  }

  if (cenario === 'vaga') {
    const vaga = contexto.vagas?.[0]
    const tags = vaga?.tags?.slice(0, 3).join(', ')
    return `Esta vaga foi sugerida porque suas informações combinam com parte do perfil buscado${tags ? `, incluindo ${tags}` : ''}. Use os requisitos como referência para seus próximos estudos.`
  }

  if (cenario === 'curriculo') {
    const faltando = contexto.curriculo?.camposFaltando || []
    const prioridades = ['github', 'linkedin', 'projetos'].filter((campo) => faltando.includes(campo))
    if (prioridades.length) {
      return `Seu currículo já tem uma base, mas vale completar ${prioridades.join(', ')}. Isso ajuda recrutadores a entender seu objetivo e enxergar prática além dos cursos.`
    }
    return 'Seu currículo tem uma base consistente. Revise o objetivo, destaque projetos relevantes e mantenha tecnologias alinhadas à vaga desejada.'
  }

  if (cenario === 'perfil') {
    const faltando = contexto.curriculo?.camposFaltando || []
    const prioridades = ['github', 'linkedin', 'projetos', 'resumo'].filter((campo) => faltando.includes(campo))
    if (prioridades.length) {
      return `Seu perfil funciona como sua vitrine profissional. Complete ${prioridades.join(', ')} e mantenha título, tecnologias e projetos alinhados ao seu objetivo atual.`
    }
    return 'Seu perfil já possui uma boa base. Revise se título, resumo, tecnologias e projetos contam uma história profissional coerente.'
  }

  return fallbackBase(contexto)
}

function promptDoCenario(cenario, contexto) {
  const instrucoes = {
    geral: 'Explique brevemente por que as recomendações foram priorizadas e indique o próximo passo.',
    trilha: 'Explique por que a primeira trilha apareceu, usando o motivo calculado pelo sistema.',
    curso: 'Explique por que o primeiro curso é um bom próximo passo, usando o motivo calculado pelo sistema.',
    vaga: 'Explique a compatibilidade da primeira vaga, reconheça lacunas e não prometa contratação.',
    curriculo: 'Dê dicas objetivas para melhorar o currículo com base apenas nos campos preenchidos e faltando.',
    perfil: 'Dê uma orientação curta para fortalecer o perfil público.',
    empresa: 'Dê uma orientação curta para melhorar a clareza da vaga ou do perfil da empresa.',
  }

  const contextoSeguro = { ...contexto }
  delete contextoSeguro.usuarioId

  return `${instrucoes[cenario] || instrucoes.geral}
Use somente os itens e dados presentes no contexto abaixo.
Contexto:
${JSON.stringify(contextoSeguro)}`
}

async function chamarOllama({ prompt }) {
  if (!configIA.habilitada || configIA.provedor !== 'ollama' || !endpointEhLocal(configIA.endpoint)) return ''

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), configIA.timeoutMs)

  try {
    const resposta = await fetch(configIA.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: configIA.modelo,
        stream: false,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        options: {
          temperature: 0.2,
          num_predict: 180,
        },
      }),
    })

    if (!resposta.ok) return ''
    const dados = await resposta.json()
    return normalizarResposta(dados?.message?.content)
  } catch (erro) {
    if (import.meta.env.DEV && configIA.habilitada) {
      console.warn('Mentor local indisponível; usando dica padrão.', erro)
    }
    return ''
  } finally {
    window.clearTimeout(timeout)
  }
}

export async function iaDisponivel() {
  if (!configIA.habilitada || !endpointEhLocal(configIA.endpoint)) return false
  const endpointStatus = configIA.endpoint.replace(/\/api\/chat\/?$/, '/api/tags')
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), Math.min(configIA.timeoutMs, 2500))

  try {
    const resposta = await fetch(endpointStatus, { signal: controller.signal })
    return resposta.ok
  } catch {
    return false
  } finally {
    window.clearTimeout(timeout)
  }
}

async function gerarComMentor(cenario, contexto = {}, { atualizar = false } = {}) {
  const fallback = gerarTextoFallback(contexto, cenario)
  if (!configIA.habilitada) return fallback

  const chave = chaveCache(cenario, contexto)
  if (!atualizar) {
    const cache = lerCache(chave)
    if (cache) return cache
  }

  const resposta = await chamarOllama({ prompt: promptDoCenario(cenario, contexto) })
  const limite = limitesPorCenario[cenario] || 600
  if (!respostaValida(resposta, contexto, limite, cenario)) return fallback

  salvarCache(chave, resposta)
  return resposta
}

export function gerarExplicacaoRecomendacoes(contexto, opcoes) {
  return gerarComMentor('geral', contexto, opcoes)
}

export function gerarExplicacaoTrilha(contexto, opcoes) {
  return gerarComMentor('trilha', contexto, opcoes)
}

export function gerarExplicacaoCurso(contexto, opcoes) {
  return gerarComMentor('curso', contexto, opcoes)
}

export function gerarExplicacaoVaga(contexto, opcoes) {
  return gerarComMentor('vaga', contexto, opcoes)
}

export function gerarDicasCurriculo(contexto, opcoes) {
  return gerarComMentor('curriculo', contexto, opcoes)
}

export function gerarDicasPerfil(contexto, opcoes) {
  return gerarComMentor('perfil', contexto, opcoes)
}

export function gerarDicasEmpresa(contexto, opcoes) {
  return gerarComMentor('empresa', contexto, opcoes)
}
