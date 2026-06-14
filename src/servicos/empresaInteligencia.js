const PLACEHOLDERS = ['texto', 'textotexto', 'dd', 'sasas', 'sdsd', 'teste', 'lorem ipsum', 'exemplo']
const SINONIMOS_TECNOLOGIA = {
  react: ['react', 'reactjs', 'react.js'],
  typescript: ['typescript', 'type script'],
  javascript: ['javascript', 'java script'],
  frontend: ['frontend', 'front-end', 'front end', 'interfaces', 'interface', 'telas', 'ui'],
  'fluent-ui': ['fluent-ui', 'fluent ui', 'fluent'],
  azure: ['azure', 'azure functions', 'azure devops'],
  acessibilidade: ['acessibilidade', 'acessiveis', 'acessivel', 'a11y'],
  docker: ['docker', 'container', 'containers'],
  sql: ['sql', 'banco de dados', 'database'],
  'api-rest': ['api rest', 'apis rest', 'restful', 'apis', 'api'],
  api: ['api', 'apis', 'restful'],
  'git-github': ['git', 'github', 'git/github'],
  git: ['git', 'github', 'git/github'],
  node: ['node', 'nodejs', 'node.js'],
  'node.js': ['node', 'nodejs', 'node.js'],
}

function texto(valor = '') {
  return String(valor || '').trim()
}

export function normalizarTextoEmpresa(valor = '') {
  return texto(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function listaEmpresa(valor) {
  if (Array.isArray(valor)) return valor.map(texto).filter(Boolean)
  return texto(valor)
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function unico(itens = [], limite = 8) {
  return [...new Set(itens.filter(Boolean))].slice(0, limite)
}

function preenchido(valor, minimo = 2) {
  return texto(valor).length >= minimo && !PLACEHOLDERS.includes(normalizarTextoEmpresa(valor))
}

function urlValida(valor) {
  if (!texto(valor)) return false
  try {
    const url = new URL(valor)
    return ['http:', 'https:'].includes(url.protocol) && !/ficticio|exemplo|example/i.test(url.hostname)
  } catch {
    return false
  }
}

function nivelPorScore(score, niveis) {
  return niveis.find((item) => score >= item.minimo)?.rotulo || niveis[niveis.length - 1].rotulo
}

export function analisarForcaPerfilEmpresa(empresa = {}) {
  let score = 0
  const pontosFortes = []
  const lacunas = []

  const criterios = [
    { ok: preenchido(empresa.nome), pontos: 7, forte: 'Nome comercial informado', lacuna: 'Informar nome comercial' },
    { ok: preenchido(empresa.nomeOficial), pontos: 5, forte: 'Nome oficial informado', lacuna: 'Informar nome oficial' },
    { ok: preenchido(empresa.descricaoCurta, 25), pontos: 8, forte: 'Proposta resumida com clareza', lacuna: 'Criar uma descrição curta e objetiva' },
    { ok: preenchido(empresa.descricao, 100), pontos: 12, forte: 'Descrição institucional completa', lacuna: 'Explicar história, mercado, cultura e impacto' },
    { ok: preenchido(empresa.setor), pontos: 6, forte: 'Setor identificado', lacuna: 'Informar setor de atuação' },
    { ok: preenchido(empresa.tamanho), pontos: 5, forte: 'Tamanho da empresa informado', lacuna: 'Informar tamanho aproximado' },
    { ok: preenchido(empresa.hub || empresa.sede || empresa.localizacao), pontos: 6, forte: 'Localização informada', lacuna: 'Informar sede, localização ou hub principal' },
    { ok: urlValida(empresa.site), pontos: 6, forte: 'Website oficial válido', lacuna: 'Adicionar um website válido' },
    { ok: urlValida(empresa.linkedin) && normalizarTextoEmpresa(empresa.linkedin).includes('linkedin.com'), pontos: 6, forte: 'LinkedIn oficial válido', lacuna: 'Adicionar o LinkedIn oficial' },
    { ok: listaEmpresa(empresa.especialidades).length >= 2, pontos: 8, forte: 'Especialidades bem definidas', lacuna: 'Listar especialidades reais' },
    { ok: listaEmpresa(empresa.stackDetalhes).length >= 3, pontos: 10, forte: 'Stack do dia a dia bem definida', lacuna: 'Detalhar a stack usada na prática' },
    { ok: listaEmpresa(empresa.beneficios).length >= 2, pontos: 9, forte: 'Diferenciais apresentados', lacuna: 'Explicar benefícios, cultura ou diferenciais' },
    { ok: Boolean(empresa.logoUrl || empresa.logo), pontos: 6, forte: 'Identidade visual informada', lacuna: 'Adicionar logo ou iniciais' },
    { ok: Boolean(empresa.capaUrl || empresa.capa), pontos: 6, forte: 'Capa do perfil informada', lacuna: 'Adicionar imagem de capa' },
  ]

  criterios.forEach((criterio) => {
    if (criterio.ok) {
      score += criterio.pontos
      pontosFortes.push(criterio.forte)
    } else {
      lacunas.push(criterio.lacuna)
    }
  })

  const nivel = nivelPorScore(score, [
    { minimo: 85, rotulo: 'Muito forte' },
    { minimo: 65, rotulo: 'Forte' },
    { minimo: 40, rotulo: 'Em preparação' },
    { minimo: 0, rotulo: 'Inicial' },
  ])

  return {
    score: Math.min(100, score),
    nivel,
    incompleto: lacunas.length > 0,
    pontosFortes: pontosFortes.slice(0, 5),
    lacunas: lacunas.slice(0, 6),
    avisos: lacunas.slice(0, 6).map((item) => item.charAt(0).toLowerCase() + item.slice(1)),
    proximaAcao: lacunas[0] ? { label: lacunas[0], campo: normalizarTextoEmpresa(lacunas[0]).replace(/\s+/g, '-') } : null,
  }
}

export function analisarQualidadeVaga(vaga = {}) {
  const erros = []
  const alertas = []
  const sugestoes = []
  const pontosFortes = []
  const requisitos = listaEmpresa(vaga.requisitos)
  const atividades = listaEmpresa(vaga.atividades)
  const tags = listaEmpresa(vaga.tags)
  const titulo = texto(vaga.titulo)
  const descricao = texto(vaga.descricao)
  const nivel = normalizarTextoEmpresa(vaga.nivel)
  const modalidade = normalizarTextoEmpresa(vaga.modalidade)
  const requisitosTexto = normalizarTextoEmpresa(requisitos.join(' '))
  const textoCompletoDaVaga = normalizarTextoEmpresa([titulo, descricao, ...requisitos, ...atividades].join(' '))

  if (!preenchido(titulo)) erros.push('Informe o título da vaga.')
  else if (titulo.length < 12 || ['dev', 'vaga', 'desenvolvedor', 'programador'].includes(normalizarTextoEmpresa(titulo))) {
    alertas.push('Use um título mais específico com área e senioridade.')
  } else pontosFortes.push('Título específico')

  if (!preenchido(descricao)) erros.push('Adicione uma descrição para a vaga.')
  else if (descricao.length < 100) sugestoes.push('Explique um pouco mais sobre o time, produto e desafio da vaga.')
  else pontosFortes.push('Descrição contextualizada')

  if (!requisitos.length) erros.push('Adicione os requisitos necessários para a vaga.')
  else if (requisitos.length > 8) alertas.push('Há muitos requisitos obrigatórios; separe o que é desejável.')
  else pontosFortes.push('Requisitos objetivos')

  if (!atividades.length) erros.push('Liste as atividades do dia a dia.')
  else if (atividades.length < 2) sugestoes.push('Adicione mais uma atividade concreta do dia a dia.')
  else pontosFortes.push('Dia a dia explicado')

  if (!preenchido(vaga.salario)) erros.push('Informe uma faixa salarial.')
  else pontosFortes.push('Faixa salarial visível')
  if (!preenchido(vaga.tipo)) erros.push('Informe o tipo de contrato.')
  if (!preenchido(vaga.nivel)) erros.push('Informe o nível da vaga.')
  if (!preenchido(vaga.modalidade)) erros.push('Informe a modalidade de trabalho.')

  if ((modalidade.includes('presencial') || modalidade.includes('hibrido')) && !preenchido(vaga.localizacao)) {
    alertas.push('Para vaga presencial ou híbrida, informe cidade e estado.')
  } else if (preenchido(vaga.modalidade)) pontosFortes.push('Modalidade e localização coerentes')

  if (!tags.length) erros.push('Adicione tecnologias ou competências para a compatibilidade.')
  else if (tags.length < 3) sugestoes.push('Adicione mais tags centrais para melhorar a compatibilidade.')
  else if (tags.length > 10) alertas.push('Reduza as tags para destacar as competências centrais.')
  else pontosFortes.push('Tags suficientes para compatibilidade')

  const tagsSemContexto = tags.filter((tag) => {
    const normalizada = normalizarTextoEmpresa(tag)
    const termos = SINONIMOS_TECNOLOGIA[normalizada] || [normalizada]
    return !termos.some((termo) => textoCompletoDaVaga.includes(normalizarTextoEmpresa(termo)))
  })
  if (tagsSemContexto.length) {
    alertas.push(`Conecte melhor estas tags ao conteúdo da vaga: ${tagsSemContexto.slice(0, 3).join(', ')}.`)
  } else if (tags.length) {
    pontosFortes.push('Tecnologias conectadas ao conteúdo da vaga')
  }

  const vagaJunior = nivel.includes('junior') || nivel.includes('estagio') || nivel.includes('trainee')
  if (vagaJunior && /(3\+|3 anos|4 anos|5 anos|senior|especialista)/i.test(requisitosTexto)) {
    alertas.push('A senioridade é inicial, mas os requisitos pedem experiência avançada.')
  } else if (vagaJunior && requisitos.length) pontosFortes.push('Requisitos coerentes com o nível')

  if ([titulo, descricao, ...requisitos, ...atividades].some((item) => PLACEHOLDERS.includes(normalizarTextoEmpresa(item)))) {
    erros.push('Troque textos de teste por informações reais antes de publicar.')
  }

  const score = Math.max(0, 100 - erros.length * 14 - alertas.length * 8)
  const atratividadeScore = Math.max(0, Math.min(100, score + (preenchido(vaga.salario) ? 3 : -8) + (atividades.length >= 3 ? 3 : 0)))
  const coerenciaScore = Math.max(0, 100 - alertas.length * 12)
  const mensagemPositiva = 'Vaga clara e pronta para candidatos.'

  return {
    pontuacao: score,
    score,
    nivel: nivelPorScore(score, [
      { minimo: 85, rotulo: 'Excelente' },
      { minimo: 65, rotulo: 'Boa' },
      { minimo: 40, rotulo: 'Em construção' },
      { minimo: 0, rotulo: 'Fraca' },
    ]),
    atratividade: { score: atratividadeScore, nivel: nivelPorScore(atratividadeScore, [{ minimo: 75, rotulo: 'Alta' }, { minimo: 50, rotulo: 'Média' }, { minimo: 0, rotulo: 'Baixa' }]) },
    coerencia: { score: coerenciaScore, nivel: coerenciaScore >= 70 ? 'Coerente' : 'Atenção' },
    clareza: { score: Math.max(0, 100 - erros.length * 16 - sugestoes.length * 3) },
    erros: unico(erros, 6),
    alertas: unico(alertas, 6),
    sugestoes: unico(sugestoes, 4),
    avisos: unico([...erros, ...alertas], 6),
    dicas: unico(sugestoes, 4),
    pontosFortes: unico(pontosFortes, 5),
    severidade: erros.length ? 'erro' : alertas.length ? 'alerta' : sugestoes.length ? 'sugestao' : 'ok',
    alertaPrincipal: erros[0] || alertas[0] || sugestoes[0] || mensagemPositiva,
    mensagemPositiva,
    proximaAcao: erros[0] || alertas[0] || sugestoes[0] || 'Revisar e publicar a vaga.',
  }
}

function termosCandidato(candidato = {}) {
  return unico([
    ...listaEmpresa(candidato.tecnologias),
    ...listaEmpresa(candidato.cursos),
    ...listaEmpresa(candidato.cursosConcluidos),
    ...listaEmpresa(candidato.certificados),
    ...listaEmpresa(candidato.perfilProfissional?.tecnologiasComNivel),
  ], 80)
}

export function analisarCompatibilidadeCandidatoVaga(candidato = {}, vaga = {}) {
  const tags = listaEmpresa(vaga.tags)
  const textoCandidato = normalizarTextoEmpresa([
    candidato.cargo,
    candidato.bio,
    candidato.localizacao,
    ...termosCandidato(candidato),
    candidato.curriculo?.resumo,
    candidato.curriculo?.objetivo,
    candidato.perfilProfissional?.projetos,
  ].join(' '))
  const compatibilidades = tags.filter((tag) => textoCandidato.includes(normalizarTextoEmpresa(tag)))
  const lacunas = tags.filter((tag) => !textoCandidato.includes(normalizarTextoEmpresa(tag)))
  const evidencias = []

  if (listaEmpresa(candidato.cursos).length) evidencias.push(`${listaEmpresa(candidato.cursos).length} cursos ou trilhas no perfil`)
  if (listaEmpresa(candidato.certificados).length) evidencias.push(`${listaEmpresa(candidato.certificados).length} certificados registrados`)
  if (preenchido(candidato.perfilProfissional?.projetos || candidato.curriculo?.projetos, 20)) evidencias.push('Projetos descritos no perfil')
  if (preenchido(candidato.perfilProfissional?.github || candidato.curriculo?.github)) evidencias.push('GitHub informado')

  let score = tags.length ? Math.round((compatibilidades.length / tags.length) * 65) : 25
  score += Math.min(20, evidencias.length * 5)
  if (textoCandidato.includes(normalizarTextoEmpresa(vaga.nivel))) score += 8
  if (normalizarTextoEmpresa(vaga.modalidade).includes('remoto') || textoCandidato.includes(normalizarTextoEmpresa(vaga.localizacao))) score += 7
  score = Math.min(96, Math.max(15, score))

  const nivel = nivelPorScore(score, [
    { minimo: 75, rotulo: 'Alta compatibilidade' },
    { minimo: 50, rotulo: 'Média compatibilidade' },
    { minimo: 30, rotulo: 'Baixa compatibilidade' },
    { minimo: 0, rotulo: 'Fora do foco' },
  ])
  const nivelChave = score >= 75 ? 'alta' : score >= 50 ? 'boa' : 'inicial'
  const riscos = []
  if (!evidencias.some((item) => item.includes('Projetos'))) riscos.push('Pouca evidência de projeto prático no perfil')
  if (!evidencias.some((item) => item.includes('GitHub'))) riscos.push('GitHub não informado')

  return {
    score,
    nivel,
    nivelChave,
    rotulo: nivel,
    compatibilidades: compatibilidades.slice(0, 8),
    motivos: compatibilidades.slice(0, 4),
    lacunas: lacunas.slice(0, 8),
    evidencias,
    riscos,
    recomendacao: score >= 75
      ? 'Perfil com bons sinais para uma entrevista inicial. Valide as experiências e projetos relacionados aos requisitos.'
      : score >= 50
        ? 'Perfil com compatibilidade parcial. Uma conversa inicial pode esclarecer conhecimentos e interesse na vaga.'
        : 'Use o perfil como apoio à decisão e valide se a pessoa deseja desenvolver as lacunas identificadas.',
  }
}

export function gerarDossieCandidato(candidato = {}, vaga = {}) {
  const analise = analisarCompatibilidadeCandidatoVaga(candidato, vaga)
  const nome = texto(candidato.nome).split(' ')[0] || 'A pessoa candidata'
  const resumo = analise.compatibilidades.length
    ? `${nome} apresenta compatibilidade com a vaga principalmente por ${analise.compatibilidades.slice(0, 4).join(', ')}.`
    : `${nome} ainda possui poucas evidências diretamente relacionadas às tags principais desta vaga.`

  return { ...analise, resumo }
}

export function gerarPerguntasEntrevista(candidato = {}, vaga = {}) {
  const analise = analisarCompatibilidadeCandidatoVaga(candidato, vaga)
  const tecnologias = listaEmpresa(vaga.tags).slice(0, 4)
  const tecnicas = tecnologias.map((tecnologia) => `Conte sobre uma situação prática em que você utilizou ou estudou ${tecnologia}.`)
  if (!tecnicas.length) tecnicas.push('Conte sobre um projeto técnico recente e as decisões que você tomou.')

  return {
    tecnicas: unico([
      ...tecnicas,
      'Como você organiza seu trabalho com Git e registra mudanças importantes?',
      'Como você validaria a qualidade de uma entrega antes de disponibilizá-la?',
    ], 5),
    comportamentais: [
      'Conte sobre uma dificuldade técnica que você enfrentou e como buscou ajuda.',
      'Como você organiza seus estudos e prioridades quando precisa aprender algo novo?',
      'Como prefere receber feedback durante um projeto?',
    ],
    lacunas: analise.lacunas.slice(0, 3).map((lacuna) => `A vaga utiliza ${lacuna}. Qual contato você já teve com essa tecnologia e como pretende evoluir nela?`),
  }
}

export function gerarFeedbackCandidato(candidato = {}, vaga = {}, status = 'rejeitado', motivo = '') {
  const primeiroNome = texto(candidato.nome).split(' ')[0] || 'Olá'
  const titulo = texto(vaga.titulo) || 'oportunidade'
  if (normalizarTextoEmpresa(status).includes('apro') || normalizarTextoEmpresa(status).includes('selecion')) {
    return `${primeiroNome}, agradecemos sua candidatura para ${titulo}. Gostaríamos de avançar para a próxima etapa e conversar melhor sobre seus projetos, conhecimentos e objetivos profissionais.`
  }

  const complemento = motivo ? ` Neste momento, o principal ponto considerado foi: ${motivo.toLowerCase()}.` : ''
  return `${primeiroNome}, agradecemos seu interesse na vaga de ${titulo}.${complemento} Seguiremos com outros perfis nesta etapa, mas recomendamos manter seus projetos e conhecimentos atualizados para futuras oportunidades.`
}

export function analisarFunilVaga(vaga = {}, candidatos = []) {
  const destaVaga = candidatos.filter((item) => item.vagaId === vaga.id)
  const contar = (termo) => destaVaga.filter((item) => normalizarTextoEmpresa(item.status).includes(termo)).length
  return {
    total: destaVaga.length,
    emAnalise: destaVaga.filter((item) => !/selecion|apro|reprov|rejeit|entrevista/i.test(normalizarTextoEmpresa(item.status))).length,
    entrevistas: contar('entrevista'),
    aprovados: contar('selecion') + contar('apro'),
    rejeitados: contar('reprov') + contar('rejeit'),
    alerta: destaVaga.length === 0 ? 'Esta vaga ainda não recebeu candidatos. Revise título, salário, descrição e tags.' : '',
  }
}
