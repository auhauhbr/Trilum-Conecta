import { listaEmpresa, normalizarTextoEmpresa } from './empresaInteligencia'

const TERMOS_SENSIVEIS = /idade|genero|g[eê]nero|ra[cç]a|religiao|religi[aã]o|deficiencia|defici[eê]ncia|estado civil|gravidez|orienta[cç][aã]o sexual/
const TERMOS_OFENSIVOS = /candidato ruim|nao serve|n[aã]o serve|incapaz|incompetente|reprovado por ser/
const PROMESSA_CONTRATACAO = /contrata[cç][aã]o garantida|voc[eê] est[aá] contratado|vaga garantida|ser[aá] contratado/

function texto(valor = '', limite = 1200) {
  return String(valor || '').trim().slice(0, limite)
}

function itens(valor, limite = 20) {
  return listaEmpresa(valor).slice(0, limite)
}

function unicos(valores = [], limite = 10) {
  return [...new Set(valores.filter(Boolean))].slice(0, limite)
}

function possui(valor) {
  return Boolean(texto(valor))
}

function textoCandidato(candidato = {}) {
  return normalizarTextoEmpresa([
    candidato.cargo,
    candidato.bio,
    candidato.localizacao,
    candidato.respostasWizard?.areaDesejada,
    candidato.respostasWizard?.focoCarreira,
    candidato.respostasWizard?.linguagem,
    candidato.respostasWizard?.tecnologiaInteresse,
    ...itens(candidato.tecnologias),
    ...itens(candidato.cursos),
    ...itens(candidato.cursosConcluidos),
    ...itens(candidato.certificados),
    candidato.perfilProfissional?.tecnologiasComNivel,
    candidato.perfilProfissional?.projetos,
    candidato.perfilProfissional?.experiencias,
    candidato.curriculo?.titulo,
    candidato.curriculo?.objetivo,
    candidato.curriculo?.resumo,
    candidato.curriculo?.tecnologias,
    candidato.curriculo?.projetos,
    candidato.curriculo?.experiencias,
  ].join(' '))
}

function tecnologiasVaga(vaga = {}) {
  return unicos([
    ...itens(vaga.tags),
    ...itens(vaga.tecnologias),
  ], 14)
}

function evidenciaPerfil(candidato = {}) {
  const evidencias = []
  const cursos = unicos([...itens(candidato.cursos), ...itens(candidato.cursosConcluidos)])
  const certificados = itens(candidato.certificados)
  const projetos = candidato.perfilProfissional?.projetos || candidato.curriculo?.projetos
  const experiencias = candidato.perfilProfissional?.experiencias || candidato.curriculo?.experiencias
  const github = candidato.perfilProfissional?.github || candidato.curriculo?.github
  const linkedin = candidato.perfilProfissional?.linkedin || candidato.curriculo?.linkedin

  if (cursos.length) evidencias.push(`${cursos.length} curso${cursos.length === 1 ? '' : 's'} ou trilha${cursos.length === 1 ? '' : 's'} no perfil`)
  if (certificados.length) evidencias.push(`${certificados.length} certificado${certificados.length === 1 ? '' : 's'} registrado${certificados.length === 1 ? '' : 's'}`)
  if (possui(projetos)) evidencias.push('Projetos descritos no perfil')
  if (possui(experiencias)) evidencias.push('Experiências descritas no perfil')
  if (possui(github)) evidencias.push('GitHub informado')
  if (possui(linkedin)) evidencias.push('LinkedIn informado')
  if (possui(candidato.curriculo?.objetivo) && possui(candidato.curriculo?.resumo)) evidencias.push('Currículo com objetivo e resumo')
  return evidencias
}

function dadosSuficientes(candidato = {}, evidencias = []) {
  const sinais = [
    itens(candidato.tecnologias).length,
    itens(candidato.cursos).length,
    itens(candidato.cursosConcluidos).length,
    itens(candidato.certificados).length,
    possui(candidato.bio),
    possui(candidato.curriculo?.resumo),
    possui(candidato.perfilProfissional?.projetos || candidato.curriculo?.projetos),
    evidencias.length,
  ].filter(Boolean)
  return sinais.length >= 3
}

function nivelDoScore(score, suficiente) {
  if (!suficiente) return 'Dados insuficientes'
  if (score >= 75) return 'Alta compatibilidade'
  if (score >= 50) return 'Média compatibilidade'
  if (score >= 30) return 'Baixa compatibilidade'
  return 'Fora do foco'
}

export function analisarCompatibilidadeCandidatoVaga({ candidato = {}, vaga = {}, empresa = {} } = {}) {
  const tecnologias = tecnologiasVaga(vaga)
  const contextoCandidato = textoCandidato(candidato)
  const compatibilidades = tecnologias.filter((item) => contextoCandidato.includes(normalizarTextoEmpresa(item)))
  const lacunas = tecnologias.filter((item) => !contextoCandidato.includes(normalizarTextoEmpresa(item)))
  const evidencias = evidenciaPerfil(candidato)
  const suficiente = dadosSuficientes(candidato, evidencias)
  const riscos = []

  if (!possui(candidato.perfilProfissional?.projetos || candidato.curriculo?.projetos)) riscos.push('Pouca evidência prática de projetos no perfil')
  if (!possui(candidato.perfilProfissional?.github || candidato.curriculo?.github)) riscos.push('GitHub não informado')
  if (!possui(candidato.curriculo?.objetivo) || !possui(candidato.curriculo?.resumo)) riscos.push('Currículo ainda pode ser mais específico')

  let score = tecnologias.length ? Math.round((compatibilidades.length / tecnologias.length) * 58) : 22
  score += Math.min(24, evidencias.length * 4)
  if (normalizarTextoEmpresa(vaga.modalidade).includes('remoto')) score += 5
  else if (normalizarTextoEmpresa(candidato.localizacao).includes(normalizarTextoEmpresa(vaga.localizacao))) score += 5
  if (contextoCandidato.includes(normalizarTextoEmpresa(vaga.nivel))) score += 6
  if (!suficiente) score = Math.min(score, 35)
  score = Math.max(10, Math.min(96, score))

  const nivel = nivelDoScore(score, suficiente)
  const nivelChave = !suficiente ? 'dados-insuficientes' : score >= 75 ? 'alta' : score >= 50 ? 'boa' : 'inicial'
  const primeiroNome = texto(candidato.nome).split(' ')[0] || 'A pessoa candidata'
  const resumo = !suficiente
    ? `${primeiroNome} ainda possui poucos dados no perfil para uma análise mais conclusiva. Use o dossiê para identificar o que precisa ser validado diretamente.`
    : compatibilidades.length
      ? `${primeiroNome} apresenta ${nivel.toLowerCase()} com esta vaga. Os sinais mais próximos dos requisitos são ${compatibilidades.slice(0, 4).join(', ')}.`
      : `${primeiroNome} ainda possui poucas evidências diretamente relacionadas às tecnologias principais desta vaga.`

  const recomendacaoInterna = !suficiente
    ? 'Dados insuficientes para concluir. Revise o currículo e valide projetos, tecnologias e objetivo profissional antes de decidir.'
    : score >= 75
      ? 'Há bons sinais de aderência. Vale revisar projetos, currículo e profundidade prática antes de avançar para uma próxima etapa.'
      : score >= 50
        ? 'Pode ser avaliado para uma conversa inicial se a vaga aceitar perfil em formação. Recomenda-se validar as lacunas e evidências práticas.'
        : 'Há lacunas importantes para esta oportunidade. Use a análise como apoio e registre os pontos que precisam ser validados pela equipe.'

  return {
    score,
    nivel,
    nivelChave,
    rotulo: nivel,
    resumo,
    compatibilidades: compatibilidades.slice(0, 8),
    lacunas: lacunas.slice(0, 8),
    evidencias,
    riscos,
    recomendacaoInterna,
    recomendacao: recomendacaoInterna,
    empresa: texto(empresa.nome || empresa.nomeOficial, 80),
  }
}

export function gerarDossieCandidato({ candidato = {}, vaga = {}, empresa = {}, analiseCompatibilidade } = {}) {
  return analiseCompatibilidade || analisarCompatibilidadeCandidatoVaga({ candidato, vaga, empresa })
}

export function gerarFeedbackCandidatoFallback({ candidato = {}, vaga = {}, status = 'rejeitado', motivo = '', analiseCompatibilidade = {} } = {}) {
  const primeiroNome = texto(candidato.nome).split(' ')[0] || 'Olá'
  const titulo = texto(vaga.titulo, 120) || 'oportunidade'
  const aprovado = /apro|selecion|proxima etapa/i.test(normalizarTextoEmpresa(status))

  if (aprovado) {
    return `${primeiroNome}, agradecemos sua candidatura para ${titulo}. Seu perfil apresenta pontos alinhados à oportunidade e poderá seguir para uma próxima etapa de avaliação. A equipe entrará em contato caso seja necessário conhecer melhor seus projetos, experiências e objetivos profissionais.`
  }

  const lacunas = (analiseCompatibilidade.lacunas || []).slice(0, 3)
  const motivoSeguro = texto(motivo, 180)
  const complemento = motivoSeguro
    ? ` Nesta etapa, o principal ponto considerado foi ${motivoSeguro.toLowerCase()}.`
    : lacunas.length
      ? ` Para esta vaga, buscamos mais evidências práticas relacionadas a ${lacunas.join(', ')}.`
      : ''
  return `${primeiroNome}, agradecemos sua candidatura para ${titulo}.${complemento} Neste momento, seguiremos com outros perfis, mas recomendamos manter seus projetos, currículo e conhecimentos atualizados para futuras oportunidades.`
}

export function validarFeedbackCandidato(valor) {
  const feedback = texto(valor, 900)
  const normalizado = normalizarTextoEmpresa(feedback)
  if (feedback.length < 60 || feedback.length > 900) return false
  if (TERMOS_SENSIVEIS.test(normalizado) || TERMOS_OFENSIVOS.test(normalizado) || PROMESSA_CONTRATACAO.test(normalizado)) return false
  if (/ollama|api|modelo de linguagem|como ia|inteligencia artificial/.test(normalizado)) return false
  if (/\b\d{1,3}%/.test(normalizado)) return false
  return true
}
