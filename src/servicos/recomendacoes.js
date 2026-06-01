import { cursos } from '../dados/cursos'
import { empresas } from '../dados/empresas'
import { trilhas } from '../dados/trilhas'
import { vagas } from '../dados/vagas'

const areasExploratorias = ['frontend', 'backend', 'dados', 'qa', 'produto-suporte']
const tecnologiasPorArea = {
  frontend: ['javascript', 'react', 'angular', 'html', 'css', 'typescript', 'design-system'],
  backend: ['node', 'java', 'java-spring', 'php', 'go', 'sql', 'api', 'api-rest', 'mongodb', 'mensageria', 'seguranca', 'design-patterns'],
  dados: ['python', 'sql', 'mongodb'],
  devops: ['docker-cloud', 'git-github', 'linux', 'seguranca', 'aws', 'cloud', 'ci-cd', 'devops'],
  qa: ['qa', 'git-github', 'api', 'api-rest', 'testes-unitarios', 'cypress', 'docker-cloud'],
  'produto-suporte': ['informatica', 'git-github', 'qa', 'carreira', 'linux', 'seguranca'],
}

const areaPorFocoCarreira = {
  interfaces: 'frontend',
  apis: 'backend',
  dados: 'dados',
  testes: 'qa',
  'cloud-devops': 'devops',
  seguranca: 'devops',
  explorando: 'nao-sei',
}

const tecnologiasPorFocoCarreira = {
  interfaces: ['javascript', 'typescript', 'design-system'],
  apis: ['api', 'api-rest', 'sql'],
  dados: ['python', 'sql', 'mongodb'],
  testes: ['qa', 'cypress', 'api-rest', 'git-github', 'docker-cloud', 'testes-unitarios'],
  'cloud-devops': ['linux', 'docker-cloud', 'git-github', 'seguranca', 'aws', 'cloud', 'ci-cd'],
  seguranca: ['seguranca', 'api-rest', 'docker-cloud', 'linux'],
  explorando: [],
}

const tecnologiaCanonica = {
  'java-spring': 'java',
  typescript: 'javascript',
  'api-rest': 'api',
  'testes-unitarios': 'qa',
  'arquitetura-software': 'java',
  'estrutura-de-dados': 'logica',
  csharp: 'java',
  aws: 'docker-cloud',
  cloud: 'docker-cloud',
  'ci-cd': 'docker-cloud',
}

const stacksProtegidasDevOps = ['angular', 'react', 'go', 'java', 'java-spring', 'php']
const stacksExclusivas = ['angular', 'react', 'node', 'go', 'java', 'java-spring', 'php']
const trilhasProtegidasDevOps = [
  'angular-frontend',
  'frontend-angular-profissional',
  'react-frontend',
  'go-backend',
  'java-spring',
  'backend-java-profissional',
  'backend-php-web-profissional',
  'php-backend',
]
const trilhasProfissionais = new Set([
  'backend-java-profissional',
  'devops-cloud-profissional',
  'qa-automacao-profissional',
  'backend-node-api-profissional',
  'frontend-angular-profissional',
  'backend-php-web-profissional',
  'dados-python-sql-profissional',
])
const tecnologiasPrincipaisDevOps = ['docker-cloud', 'linux']
const tecnologiasComplementaresDevOps = ['git-github', 'seguranca', 'api', 'api-rest']

const pesoExperienciaProjetos = {
  nenhuma: 0,
  tutorial: 1,
  proprio: 2,
  equipe: 3,
  profissional: 4,
}

const prioridadeInicial = {
  'informatica-essencial': 120,
  'logica-algoritmos': 110,
  'git-github': 88,
  'carreira-comunicacao': 78,
  'primeira-vaga-portfolio': 74,
  'ingles-tech': 58,
}

const pesoNivelUsuario = {
  'quero-comecar': 0,
  basico: 1,
  projetos: 2,
  avancar: 3,
}

const pesoNivelCurso = {
  iniciante: 0,
  basico: 1,
  intermediario: 2,
  todos: 1,
}

const tecnologiasDeduplicaveis = new Set([
  'javascript',
  'typescript',
  'react',
  'angular',
  'node',
  'python',
  'java',
  'java-spring',
  'testes-unitarios',
  'arquitetura-software',
  'php',
  'go',
  'sql',
  'mongodb',
  'api',
  'api-rest',
  'mensageria',
  'seguranca',
  'linux',
  'design-system',
  'design-patterns',
  'estrutura-de-dados',
  'docker-cloud',
  'git-github',
  'qa',
])

const dependenciasPorTecnologia = {
  react: ['javascript'],
  angular: ['javascript', 'typescript'],
  typescript: ['javascript'],
  node: ['javascript', 'api'],
  'java-spring': ['java', 'sql', 'api-rest'],
  'api-rest': ['api', 'sql'],
  mongodb: ['sql'],
  linux: ['git-github'],
  seguranca: ['linux', 'git-github', 'api-rest'],
  'docker-cloud': ['git-github', 'linux'],
}

const complementosPorTecnologia = {
  javascript: ['typescript', 'git-github'],
  typescript: ['javascript', 'angular', 'git-github'],
  react: ['git-github', 'docker-cloud'],
  angular: ['typescript', 'design-system', 'git-github', 'docker-cloud'],
  node: ['sql', 'git-github', 'mongodb', 'api-rest', 'mensageria', 'seguranca', 'docker-cloud'],
  'java-spring': ['sql', 'git-github', 'api-rest', 'testes-unitarios', 'arquitetura-software', 'design-patterns', 'mensageria', 'seguranca', 'docker-cloud'],
  java: ['sql', 'git-github', 'java-spring', 'api-rest', 'testes-unitarios', 'arquitetura-software', 'design-patterns', 'mensageria', 'seguranca', 'docker-cloud'],
  php: ['sql', 'git-github', 'api-rest', 'mongodb', 'seguranca'],
  go: ['sql', 'git-github', 'api-rest', 'design-patterns', 'docker-cloud'],
  python: ['sql', 'mongodb', 'git-github'],
  sql: ['python', 'mongodb', 'git-github'],
  mongodb: ['sql', 'node', 'java', 'php', 'python'],
  'api-rest': ['sql', 'qa', 'git-github', 'seguranca'],
  api: ['sql', 'qa', 'git-github'],
  linux: ['docker-cloud', 'git-github', 'seguranca'],
  seguranca: ['linux', 'docker-cloud', 'api-rest', 'node', 'java', 'java-spring', 'php'],
  'design-system': ['javascript', 'react', 'angular'],
  'testes-unitarios': ['java', 'java-spring', 'qa'],
  mensageria: ['java', 'java-spring', 'node', 'docker-cloud'],
  'design-patterns': ['java', 'java-spring', 'php', 'go'],
  'arquitetura-software': ['java', 'java-spring'],
  qa: ['git-github', 'docker-cloud', 'api-rest', 'api', 'sql', 'testes-unitarios'],
  'docker-cloud': ['git-github', 'linux', 'seguranca'],
  'git-github': ['portfolio'],
}

const aliasesTecnologia = {
  'java-spring': ['java'],
  typescript: ['javascript'],
  'api-rest': ['api'],
  'testes-unitarios': ['java'],
  'arquitetura-software': ['java'],
  'estrutura-de-dados': ['logica'],
  csharp: ['java', 'api-rest'],
  cypress: ['qa'],
  aws: ['docker-cloud'],
  cloud: ['docker-cloud'],
  'ci-cd': ['docker-cloud'],
}

function normalizarTexto(valor = '') {
  return String(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function tecnologiasEquivalentes(tecnologia) {
  const chave = normalizarTexto(tecnologia)
  const equivalentes = new Set([chave])

  aliasesTecnologia[chave]?.forEach((alias) => equivalentes.add(alias))

  Object.entries(aliasesTecnologia).forEach(([tecnologiaAlias, aliases]) => {
    if (aliases.includes(chave)) {
      equivalentes.add(tecnologiaAlias)
    }
  })

  return equivalentes
}

function tecnologiasDoItem(item = {}) {
  const valores = [
    item.tecnologia,
    item.categoria,
    item.area,
    ...(item.tags || []),
    ...(item.tecnologias || []),
  ].filter(Boolean)
  const tecnologias = new Set()

  valores.forEach((valor) => {
    const tecnologia = normalizarTexto(valor)
    tecnologias.add(tecnologia)
    tecnologiasEquivalentes(tecnologia).forEach((equivalente) => tecnologias.add(equivalente))
  })

  return tecnologias
}

function chaveTecnologiaDeduplicacao(curso) {
  const tecnologia = normalizarTexto(curso.tecnologia)

  if (tecnologia === 'java-spring') return 'java'
  if (tecnologia === 'typescript') return 'javascript'
  if (tecnologia === 'api-rest') return 'api'
  if (!tecnologiasDeduplicaveis.has(tecnologia)) return ''

  return tecnologia
}

function nivelUsuarioComoPeso(nivelTecnologia) {
  return pesoNivelUsuario[nivelTecnologia] ?? 0
}

function nivelCursoComoPeso(nivelCurso) {
  return pesoNivelCurso[normalizarTexto(nivelCurso)] ?? 1
}

function tecnologiaCanonicaDe(tecnologia) {
  const tecnologiaNormalizada = normalizarTexto(tecnologia)
  return tecnologiaCanonica[tecnologiaNormalizada] || tecnologiaNormalizada
}

function calcularLimiteTrilhas(perfilBase) {
  const {
    inicianteDigital,
    inicianteCodigo,
    querMigrarStack,
    tecnologiaPrincipal,
    tempoSemanal,
    jaTrabalhaTech,
    conheceProjetos,
    areaDesejada,
    objetivo,
  } = perfilBase
  const tempo = tempoSemanal || 'medio'

  if (inicianteDigital || inicianteCodigo) {
    if (tempo === 'baixo') return 3
    if (tempo === 'medio') return tecnologiaPrincipal ? 4 : 3
    return 4
  }

  if (areaDesejada === 'devops') {
    if (tempo === 'baixo') return 3
    if (tempo === 'medio') return objetivo === 'freelancer' || conheceProjetos ? 5 : 4
    return 5
  }

  if (areaDesejada === 'qa' || areaDesejada === 'dados') {
    if (tempo === 'baixo') return 3
    if (tempo === 'medio') return 4
    return 5
  }

  if (objetivo === 'freelancer' || objetivo === 'portfolio' || objetivo === 'especializar') {
    if (tempo === 'baixo') return 3
    if (tempo === 'medio') return 4
    return 5
  }

  if (querMigrarStack) {
    if (tempo === 'baixo') return 3
    if (tempo === 'medio') return 4
    return 5
  }

  if (jaTrabalhaTech || conheceProjetos) {
    if (tempo === 'baixo') return 3
    if (tempo === 'medio') return 4
    return 5
  }

  if (tempo === 'baixo') return 2
  return 3
}

function perfilDasRespostas(respostas = {}) {
  const linguagemOriginal = respostas.linguagem && respostas.linguagem !== 'nenhuma' ? respostas.linguagem : ''
  const tecnologiaInteresseOriginal =
    respostas.tecnologiaInteresse && respostas.tecnologiaInteresse !== 'nenhuma' ? respostas.tecnologiaInteresse : ''
  const linguagemConhecida = normalizarTexto(linguagemOriginal)
  const tecnologiaInteresse = normalizarTexto(tecnologiaInteresseOriginal)
  const tecnologiaPrincipal = tecnologiaInteresse || linguagemConhecida
  const tecnologiaPrincipalCanonica = tecnologiaCanonicaDe(tecnologiaPrincipal)
  const focoCarreira = respostas.focoCarreira || 'explorando'
  const areaFoco = areaPorFocoCarreira[focoCarreira] || ''
  const tecnologiasFoco = tecnologiasPorFocoCarreira[focoCarreira] || []
  const areaDesejadaInformada = respostas.areaDesejada || 'nao-sei'
  const areaDesejada = areaDesejadaInformada === 'nao-sei' && areaFoco && areaFoco !== 'nao-sei' ? areaFoco : areaDesejadaInformada
  const fezExercicios = respostas.programacao === 'exercicios'
  const experienciaProjetos =
    respostas.experienciaProjetos ||
    (respostas.programacao === 'experiente'
      ? 'profissional'
      : respostas.programacao === 'projetos'
        ? 'proprio'
        : fezExercicios
          ? 'tutorial'
          : 'nenhuma')
  const baseBackendDados = respostas.baseBackendDados || 'nenhum'
  const experienciaPeso = pesoExperienciaProjetos[experienciaProjetos] ?? 0
  const temBaseBanco = ['banco', 'ambos', 'projetos'].includes(baseBackendDados)
  const temBaseApi = ['api', 'ambos', 'projetos'].includes(baseBackendDados)
  const conheceProjetos =
    respostas.programacao === 'projetos' ||
    respostas.programacao === 'experiente' ||
    ['proprio', 'equipe', 'profissional'].includes(experienciaProjetos) ||
    baseBackendDados === 'projetos'
  const temProjetoReal = ['equipe', 'profissional'].includes(experienciaProjetos)
  const inicianteDigital = respostas.informatica === 'iniciante' || respostas.informatica === 'basico'
  const inicianteCodigo = !respostas.programacao || respostas.programacao === 'nenhum'
  const perfilInicial = inicianteDigital || (inicianteCodigo && !conheceProjetos)
  const nivelTecnologia = respostas.nivelTecnologia || (respostas.programacao === 'experiente' ? 'avancar' : 'quero-comecar')
  const precisaBaseLogica = inicianteCodigo || fezExercicios
  const maturidade = conheceProjetos || ['projetos', 'avancar'].includes(nivelTecnologia) ? 'intermediario' : 'basico'
  const jaTrabalhaTech = respostas.areaAtual === 'tecnologia'
  const vemDeForaTech = Boolean(respostas.areaAtual && respostas.areaAtual !== 'tecnologia')
  const emTransicao = respostas.objetivo === 'transicao' || (vemDeForaTech && areaDesejadaInformada !== 'nao-sei')
  const querMigrarStack = Boolean(tecnologiaInteresse && linguagemConhecida && tecnologiaInteresse !== linguagemConhecida)
  const querAprofundarStackAtual = Boolean(
    jaTrabalhaTech && tecnologiaPrincipal && !querMigrarStack && ['projetos', 'avancar'].includes(nivelTecnologia),
  )
  const focoDefineArea = areaDesejadaInformada === 'nao-sei'
  const perfilDevOps = areaDesejada === 'devops' || ['docker-cloud', 'linux'].includes(tecnologiaInteresse)
  const perfilBackendApi = areaDesejada === 'backend' || tecnologiaInteresse === 'api-rest' || (focoDefineArea && temBaseApi)
  const perfilFrontend = areaDesejada === 'frontend' || ['react', 'angular'].includes(tecnologiaInteresse)
  const perfilQA = areaDesejada === 'qa' || tecnologiaInteresse === 'qa'
  const perfilDados = areaDesejada === 'dados' || ['python', 'sql', 'mongodb'].includes(tecnologiaInteresse)
  const nivelUsuarioPeso = nivelUsuarioComoPeso(nivelTecnologia)
  const perfilBase = {
    inicianteDigital,
    inicianteCodigo,
    querMigrarStack,
    tecnologiaPrincipal,
    tempoSemanal: respostas.tempoSemanal,
    jaTrabalhaTech,
    conheceProjetos,
    areaDesejada,
    objetivo: respostas.objetivo,
  }

  return {
    areaDesejada,
    areaDesejadaInformada,
    focoCarreira,
    areaFoco,
    tecnologiasFoco,
    tecnologiaPrincipal,
    tecnologiaPrincipalCanonica,
    linguagemConhecida,
    linguagemOriginal,
    tecnologiaInteresse,
    tecnologiaInteresseOriginal,
    nivelTecnologia,
    nivelUsuarioPeso,
    fezExercicios,
    precisaBaseLogica,
    maturidade,
    experienciaProjetos,
    experienciaPeso,
    baseBackendDados,
    conheceBanco: temBaseBanco,
    conheceApi: temBaseApi,
    temBaseBanco,
    temBaseApi,
    inicianteDigital,
    inicianteCodigo,
    perfilInicial,
    jaTrabalhaTech,
    vemDeForaTech,
    emTransicao,
    querMigrarStack,
    querAprofundarStackAtual,
    temProjetoReal,
    perfilDevOps,
    perfilBackendApi,
    perfilFrontend,
    perfilQA,
    perfilDados,
    limiteTrilhas: calcularLimiteTrilhas(perfilBase),
    conheceProjetos,
    respostas,
  }
}

function textoBuscaDoItem(item) {
  return [item.titulo, item.descricao, item.categoria, item.area, item.nivel, item.tecnologia, ...(item.tags || []), ...(item.tecnologias || [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function pontuarPorTags(item, tagsPerfil) {
  const texto = textoBuscaDoItem(item)
  return tagsPerfil.reduce((total, tag) => total + (tag && texto.includes(tag) ? 4 : 0), 0)
}

function itemTemTecnologiaPrincipal(item, tecnologia) {
  const alvo = normalizarTexto(tecnologia)
  if (!alvo) return false

  const id = normalizarTexto(item.id)
  const tecnologiaItem = normalizarTexto(item.tecnologia)
  const areaItem = normalizarTexto(item.area)
  const categoriaItem = normalizarTexto(item.categoria)
  const tecnologias = (item.tecnologias || []).map(normalizarTexto)
  const tokensId = id.split(/[^a-z0-9]+/).filter(Boolean)

  return (
    tecnologiaItem === alvo ||
    tecnologias[0] === alvo ||
    areaItem === alvo ||
    categoriaItem === alvo ||
    id === alvo ||
    tokensId.includes(alvo) ||
    (alvo.includes('-') && id.includes(alvo))
  )
}

function itemTemFocoTecnologia(item, tecnologia) {
  return itemTemAfinidadeTecnologia(item, tecnologia)
}

function itemTemAfinidadeTecnologia(item, tecnologia) {
  if (!tecnologia) return false
  const tecnologiasItem = tecnologiasDoItem(item)
  const tecnologiasAlvo = tecnologiasEquivalentes(tecnologia)
  const idItem = normalizarTexto(item.id)
  const tokensId = idItem.split(/[^a-z0-9]+/).filter(Boolean)

  return [...tecnologiasAlvo].some((tecnologiaAlvo) => tecnologiasItem.has(tecnologiaAlvo) || tokensId.includes(tecnologiaAlvo))
}

function itemCombinaTecnologiaPrincipal(item, tecnologia, tecnologiaCanonicaItem = tecnologiaCanonicaDe(tecnologia)) {
  return (
    itemTemTecnologiaPrincipal(item, tecnologia) ||
    (tecnologiaCanonicaItem && tecnologiaCanonicaItem !== tecnologia && itemTemTecnologiaPrincipal(item, tecnologiaCanonicaItem))
  )
}

function tecnologiaEscolhidaExplicitamente(perfil) {
  return normalizarTexto(perfil.tecnologiaInteresseOriginal || perfil.tecnologiaInteresse)
}

function temMaturidadeParaTrilhaProfissional(perfil) {
  if (perfil.perfilInicial || perfil.fezExercicios) return false
  return Boolean(
    perfil.conheceProjetos ||
      perfil.temProjetoReal ||
      perfil.experienciaPeso >= 2 ||
      ['projetos', 'avancar'].includes(perfil.nivelTecnologia),
  )
}

function podeRecomendarTrilhaProfissional(trilha, perfil) {
  if (!trilhasProfissionais.has(trilha.id)) return true
  if (!temMaturidadeParaTrilhaProfissional(perfil)) return false

  const {
    areaDesejada,
    focoCarreira,
    linguagemConhecida,
    tecnologiaInteresse,
    tecnologiaPrincipal,
    tecnologiaPrincipalCanonica,
  } = perfil

  if (trilha.id === 'backend-java-profissional') {
    return tecnologiaPrincipal === 'java' || tecnologiaPrincipalCanonica === 'java' || tecnologiaInteresse === 'java-spring'
  }

  if (trilha.id === 'backend-php-web-profissional') {
    return tecnologiaPrincipal === 'php' || tecnologiaInteresse === 'php'
  }

  if (trilha.id === 'dados-python-sql-profissional') {
    return areaDesejada === 'dados' || ['python', 'sql', 'mongodb'].includes(tecnologiaInteresse)
  }

  if (trilha.id === 'devops-cloud-profissional') {
    return areaDesejada === 'devops' || focoCarreira === 'cloud-devops' || ['docker-cloud', 'linux'].includes(tecnologiaInteresse)
  }

  if (trilha.id === 'qa-automacao-profissional') {
    return areaDesejada === 'qa' || focoCarreira === 'testes' || tecnologiaInteresse === 'qa'
  }

  if (trilha.id === 'backend-node-api-profissional') {
    return (
      tecnologiaPrincipal === 'node' ||
      (areaDesejada === 'backend' && ['javascript', 'typescript'].includes(linguagemConhecida) && focoCarreira === 'apis')
    )
  }

  if (trilha.id === 'frontend-angular-profissional') {
    return (
      tecnologiaInteresse === 'angular' ||
      tecnologiaPrincipal === 'angular' ||
      (areaDesejada === 'frontend' && ['angular', 'typescript'].includes(tecnologiaInteresse))
    )
  }

  return true
}

function pontuarTrilha(trilha, perfil) {
  const {
    areaDesejada,
    areaDesejadaInformada,
    areaFoco,
    focoCarreira,
    tecnologiasFoco,
    tecnologiaPrincipal,
    tecnologiaPrincipalCanonica,
    tecnologiaInteresseOriginal,
    nivelTecnologia,
    perfilInicial,
    conheceProjetos,
    experienciaProjetos,
    experienciaPeso,
    baseBackendDados,
    conheceBanco,
    conheceApi,
    temBaseBanco,
    temBaseApi,
    perfilDevOps,
    respostas,
    jaTrabalhaTech,
    emTransicao,
    querMigrarStack,
    querAprofundarStackAtual,
  } = perfil
  const semWizard = !Object.keys(respostas).length
  const focoApenasComplementar = areaDesejadaInformada !== 'nao-sei' && areaFoco && areaFoco !== 'nao-sei' && areaFoco !== areaDesejada
  const areaFocoPontuacao = focoApenasComplementar || (perfilDevOps && areaDesejada === 'devops' && areaFoco === 'backend') ? '' : areaFoco
  const tecnologiasArea = [
    ...(tecnologiasPorArea[areaDesejada] || []),
    ...(areaFocoPontuacao && areaFocoPontuacao !== areaDesejada ? tecnologiasPorArea[areaFocoPontuacao] || [] : []),
    ...tecnologiasFoco,
  ]
  const tagsPerfil = [
    areaDesejada,
    areaFoco,
    focoCarreira,
    tecnologiaPrincipal,
    ...tecnologiasFoco,
    respostas.linguagem,
    respostas.objetivo,
    respostas.programacao,
    experienciaProjetos,
    baseBackendDados,
  ]
  const nivelTrilha = normalizarTexto(trilha.nivel)
  const ehFundamento = trilha.area === 'fundamentos'
  const combinaStack =
    tecnologiaPrincipal && itemCombinaTecnologiaPrincipal(trilha, tecnologiaPrincipal, tecnologiaPrincipalCanonica)
  const combinaFocoCarreira = tecnologiasFoco.some((tecnologia) => itemTemTecnologiaPrincipal(trilha, tecnologia))
  const dependenciasStack = dependenciasPorTecnologia[tecnologiaPrincipal] || []
  const complementosStack = complementosPorTecnologia[tecnologiaPrincipal] || []
  const ehDependenciaDaStack = dependenciasStack.some((tecnologia) => itemCombinaTecnologiaPrincipal(trilha, tecnologia))
  const ehComplementoDaStack = complementosStack.some((tecnologia) => itemTemAfinidadeTecnologia(trilha, tecnologia))
  let pontos = semWizard ? 95 - (trilha.ordemBase || 99) : 20

  if (!podeRecomendarTrilhaProfissional(trilha, perfil)) return 0

  pontos += pontuarPorTags(trilha, tagsPerfil)

  if (trilha.area === areaDesejada) pontos += 90
  if (areaFocoPontuacao && areaFocoPontuacao !== 'nao-sei' && trilha.area === areaFocoPontuacao) pontos += areaDesejada === 'nao-sei' ? 58 : 34
  if (tecnologiasArea.some((tecnologia) => itemCombinaTecnologiaPrincipal(trilha, tecnologia))) pontos += 32
  if (combinaFocoCarreira) pontos += focoApenasComplementar ? 16 : 40
  if (combinaStack) pontos += 82
  if (ehDependenciaDaStack) pontos += perfilInicial ? 54 : 22
  if (ehComplementoDaStack) pontos += respostas.objetivo === 'portfolio' || respostas.objetivo === 'primeira-vaga' ? 34 : 18
  if (trilhasProfissionais.has(trilha.id)) pontos += 70

  if (perfil.precisaBaseLogica) {
    if (trilha.id === 'logica-algoritmos') pontos += 95
    if (trilha.id === 'git-github') pontos += 45
  }

  if ((conheceBanco || temBaseBanco) && ['sql', 'mongodb'].some((tecnologia) => itemCombinaTecnologiaPrincipal(trilha, tecnologia))) pontos += 34
  if ((conheceApi || temBaseApi) && ['api', 'api-rest', 'qa'].some((tecnologia) => itemTemAfinidadeTecnologia(trilha, tecnologia))) {
    pontos += 34
  }

  if (experienciaPeso >= 2) {
    if (nivelTrilha === 'intermediario') pontos += 24
    if (
      ['arquitetura', 'arquitetura-software', 'testes-unitarios', 'mensageria', 'seguranca', 'ci-cd', 'design-patterns'].some(
        (tecnologia) => itemTemFocoTecnologia(trilha, tecnologia),
      )
    ) {
      pontos += 34
    }
  } else if (nivelTrilha === 'intermediario' && !combinaStack && !combinaFocoCarreira) {
    pontos -= 18
  }

  if (perfilInicial) {
    pontos += prioridadeInicial[trilha.id] || 0
    if (nivelTrilha === 'intermediario') pontos -= 35
  }

  if (emTransicao) {
    if (ehFundamento) pontos += 28
    if (trilha.id === 'carreira-comunicacao') pontos += 28
  }

  if (jaTrabalhaTech && !perfilInicial) {
    if (ehFundamento && !combinaStack) pontos -= 38
    if (nivelTrilha === 'intermediario') pontos += 24
  }

  if (querMigrarStack) {
    if (combinaStack) pontos += 42
    if (ehFundamento && !['git-github'].includes(trilha.id)) pontos -= 18
  }

  if (querAprofundarStackAtual) {
    if (combinaStack) pontos += 34
    if (ehFundamento) pontos -= 32
  }

  if (perfil.inicianteDigital) {
    if (trilha.id === 'informatica-essencial') pontos += 220
    if (trilha.id === 'logica-algoritmos') pontos += 135
    if (trilha.id === 'git-github') pontos += 75
    if (['carreira-comunicacao', 'ingles-tech'].includes(trilha.id)) pontos -= 55
    if (!['informatica-essencial', 'logica-algoritmos', 'git-github'].includes(trilha.id) && nivelTrilha === 'intermediario') pontos -= 70
  }

  if (areaDesejada === 'nao-sei') {
    pontos += prioridadeInicial[trilha.id] || 0
    if (areasExploratorias.includes(trilha.area)) pontos += 18
  }

  if (conheceProjetos || nivelTecnologia === 'avancar') {
    if (nivelTrilha === 'intermediario') pontos += 34
    if (combinaStack) pontos += 36
  }

  if (perfilDevOps) {
    const ehDevOpsPrincipal =
      trilha.area === 'devops' || tecnologiasPrincipaisDevOps.some((tecnologia) => itemTemTecnologiaPrincipal(trilha, tecnologia))
    const ehComplementoDevOps = tecnologiasComplementaresDevOps.some((tecnologia) => itemTemAfinidadeTecnologia(trilha, tecnologia))
    const tecnologiaExplicita = tecnologiaEscolhidaExplicitamente(perfil)
    const tecnologiaExplicitaCanonica = tecnologiaCanonicaDe(tecnologiaExplicita)
    const escolheuStackProtegida = stacksProtegidasDevOps.some(
      (tecnologia) => tecnologia === tecnologiaExplicita || tecnologia === tecnologiaExplicitaCanonica,
    )

    if (ehDevOpsPrincipal) pontos += 95
    else if (ehComplementoDevOps) pontos += 35
    else if (trilha.area !== 'fundamentos' && trilha.area !== 'carreira') pontos -= 120

    if (!escolheuStackProtegida && trilhasProtegidasDevOps.includes(trilha.id)) {
      pontos -= 90
    }

    if (trilha.id === 'devops-cloud-profissional') {
      pontos += 90
    }
  }

  if (trilha.id === 'backend-java-profissional') {
    const interesseJava = tecnologiaPrincipal === 'java' || tecnologiaInteresseOriginal === 'java-spring'
    const maturidadeJava = interesseJava && (conheceProjetos || ['projetos', 'avancar'].includes(nivelTecnologia) || experienciaPeso >= 2)
    const inicianteTotal = perfil.inicianteDigital && perfil.inicianteCodigo && !conheceProjetos

    if (inicianteTotal || !interesseJava || !maturidadeJava) return 0
    pontos += 120
  }

  if (respostas.objetivo === 'portfolio' && trilha.tags?.includes('portfolio')) pontos += 42
  if (
    respostas.objetivo === 'primeira-vaga' &&
    ['git-github', 'carreira-comunicacao', 'primeira-vaga-portfolio', 'frontend-base-portfolio', 'dados-base-primeira-vaga', 'qa-base-primeira-vaga'].includes(
      trilha.id,
    )
  ) {
    pontos += 34
  }
  if (respostas.objetivo === 'freelancer' && (trilha.tags?.includes('portfolio') || trilha.tags?.includes('api'))) pontos += 34
  if (respostas.objetivo === 'melhorar-emprego-atual' && nivelTrilha === 'intermediario') pontos += 24
  if (respostas.ingles === 'baixo' || respostas.ingles === 'basico') {
    if (trilha.id === 'ingles-tech') pontos += 65
  }
  if (respostas.softSkills === 'baixo' || respostas.softSkills === 'medio') {
    if (trilha.id === 'carreira-comunicacao') pontos += 68
  }
  if (respostas.agil === 'nao' || respostas.agil === 'ouvi') {
    if (trilha.id === 'qa-testes' || trilha.id === 'carreira-comunicacao') pontos += 16
  }
  if (respostas.tempoSemanal === 'baixo' && ['informatica-essencial', 'git-github', 'ingles-tech', 'carreira-comunicacao'].includes(trilha.id)) {
    pontos += 18
  }

  return Math.max(0, Math.round(pontos))
}

function pontuarCurso(curso, perfil, trilhasRecomendadas) {
  const {
    areaDesejada,
    areaDesejadaInformada,
    areaFoco,
    focoCarreira,
    tecnologiasFoco,
    tecnologiaPrincipal,
    tecnologiaPrincipalCanonica,
    nivelTecnologia,
    nivelUsuarioPeso,
    perfilInicial,
    conheceProjetos,
    experienciaProjetos,
    experienciaPeso,
    baseBackendDados,
    conheceBanco,
    conheceApi,
    temBaseBanco,
    temBaseApi,
    perfilDevOps,
    perfilQA,
    perfilDados,
    perfilBackendApi,
    respostas,
    tecnologiaInteresse,
    jaTrabalhaTech,
    emTransicao,
    querMigrarStack,
    querAprofundarStackAtual,
  } = perfil
  const semWizard = !Object.keys(respostas).length
  const trilhaIdsRecomendadas = new Set(trilhasRecomendadas.slice(0, 5).map((trilha) => trilha.id))
  const tagsPerfil = [
    areaDesejada,
    areaFoco,
    focoCarreira,
    tecnologiaPrincipal,
    ...tecnologiasFoco,
    respostas.linguagem,
    respostas.objetivo,
    respostas.programacao,
    experienciaProjetos,
    baseBackendDados,
  ]
  const nivelCurso = normalizarTexto(curso.nivel)
  const nivelCursoPeso = nivelCursoComoPeso(curso.nivel)
  const distanciaNivel = Math.abs(nivelUsuarioPeso - nivelCursoPeso)
  const focoApenasComplementar = areaDesejadaInformada !== 'nao-sei' && areaFoco && areaFoco !== 'nao-sei' && areaFoco !== areaDesejada
  const areaFocoPontuacao = focoApenasComplementar || (perfilDevOps && areaDesejada === 'devops' && areaFoco === 'backend') ? '' : areaFoco
  const categoriaCurso = normalizarTexto(curso.categoria)
  const categoriaCursoArea = categoriaCurso.replace(/-/g, '')
  const areaDesejadaNormalizada = normalizarTexto(areaDesejada).replace(/-/g, '')
  const areaFocoNormalizada = normalizarTexto(areaFocoPontuacao).replace(/-/g, '')
  const tecnologiaCurso = normalizarTexto(curso.tecnologia)
  const tecnologiaCursoCanonica = tecnologiaCanonicaDe(tecnologiaCurso)
  const ehCursoStackPrincipal =
    tecnologiaPrincipal && itemCombinaTecnologiaPrincipal(curso, tecnologiaPrincipal, tecnologiaPrincipalCanonica)
  const ehCursoFocoCarreira = tecnologiasFoco.some((tecnologia) => itemTemTecnologiaPrincipal(curso, tecnologia))
  const dependenciasStack = dependenciasPorTecnologia[tecnologiaPrincipal] || []
  const complementosStack = complementosPorTecnologia[tecnologiaPrincipal] || []
  const ehCursoDependencia = dependenciasStack.some((tecnologia) => itemCombinaTecnologiaPrincipal(curso, tecnologia))
  const ehCursoComplemento = complementosStack.some((tecnologia) => itemTemAfinidadeTecnologia(curso, tecnologia))
  const ehStackAlternativa =
    tecnologiaPrincipal &&
    tecnologiasDeduplicaveis.has(tecnologiaCurso) &&
    !ehCursoStackPrincipal &&
    !ehCursoDependencia &&
    !ehCursoComplemento &&
    tecnologiaCurso !== 'git-github' &&
    tecnologiaCurso !== 'qa'
  const usuarioEscolheuStackExclusiva =
    stacksExclusivas.includes(tecnologiaPrincipal) || stacksExclusivas.includes(tecnologiaPrincipalCanonica)
  const ehCursoStackAlternativaExplicita =
    usuarioEscolheuStackExclusiva &&
    (stacksExclusivas.includes(tecnologiaCurso) || stacksExclusivas.includes(tecnologiaCursoCanonica)) &&
    !ehCursoStackPrincipal
  const ehCursoBase = nivelCurso === 'iniciante' || nivelCurso === 'basico'
  const ehCursoIntermediario = nivelCurso === 'intermediario'
  let pontos = semWizard ? 80 : 18

  pontos += pontuarPorTags(curso, tagsPerfil)

  if (ehCursoStackPrincipal) pontos += 90
  if (ehCursoStackPrincipal && tecnologiaInteresse) pontos += 36
  if (tecnologiaPrincipal && curso.tags?.includes(tecnologiaPrincipal)) pontos += 30
  if (curso.trilhaIds?.some((id) => trilhaIdsRecomendadas.has(id))) pontos += 34
  if (categoriaCursoArea === areaDesejadaNormalizada) pontos += 38
  if (areaFocoPontuacao && areaFocoPontuacao !== 'nao-sei' && categoriaCursoArea === areaFocoNormalizada) pontos += areaDesejada === 'nao-sei' ? 34 : 20
  if (ehCursoFocoCarreira) pontos += focoApenasComplementar ? 14 : 34
  if (ehCursoDependencia) pontos += perfilInicial ? 42 : 16
  if (ehCursoComplemento) pontos += respostas.objetivo === 'portfolio' || respostas.objetivo === 'primeira-vaga' ? 28 : 16
  if (
    (['node', 'java', 'java-spring', 'php', 'go'].includes(tecnologiaPrincipal) ||
      ['node', 'java', 'php', 'go'].includes(tecnologiaPrincipalCanonica)) &&
    ['sql', 'git-github'].some((tecnologia) => itemTemFocoTecnologia(curso, tecnologia))
  ) {
    pontos += tecnologiaPrincipal === 'php' ? 64 : 44
  }
  if (ehStackAlternativa) pontos -= categoriaCursoArea === areaDesejadaNormalizada ? 35 : 48
  if (ehCursoStackAlternativaExplicita) pontos -= 200

  if ((conheceBanco || temBaseBanco) && ['sql', 'mongodb'].some((tecnologia) => itemCombinaTecnologiaPrincipal(curso, tecnologia))) pontos += 35
  if ((conheceApi || temBaseApi) && ['api', 'api-rest', 'qa'].some((tecnologia) => itemTemAfinidadeTecnologia(curso, tecnologia))) {
    pontos += 34
  }

  if (perfilBackendApi && ['sql', 'mongodb'].includes(tecnologiaCurso)) pontos += 55
  if (tecnologiaPrincipalCanonica === 'java' && tecnologiaCurso === 'sql') pontos += 45

  if (focoCarreira === 'apis') {
    if (['api', 'api-rest'].includes(tecnologiaCurso)) pontos += 28
    if (tecnologiaCurso === 'node' && respostas.linguagem === 'javascript') pontos += perfilDevOps ? 14 : 28
    if (!perfilDevOps && ['node', 'java', 'java-spring', 'php', 'go'].includes(tecnologiaCurso)) pontos += 18
  }

  if (focoCarreira === 'cloud-devops') {
    if (['docker-cloud', 'linux', 'seguranca', 'git-github'].includes(tecnologiaCurso)) pontos += 45
  }

  if (focoCarreira === 'interfaces') {
    if (['javascript', 'typescript', 'react', 'angular', 'design-system'].includes(tecnologiaCurso)) pontos += 45
  }

  if (focoCarreira === 'testes') {
    if (['qa', 'testes-unitarios', 'api-rest'].includes(tecnologiaCurso)) pontos += focoApenasComplementar ? 16 : 45
  }

  if (focoCarreira === 'dados') {
    if (['python', 'sql', 'mongodb'].includes(tecnologiaCurso)) pontos += 45
  }

  if (perfilDevOps) {
    const ehCursoDevOps = [...tecnologiasPrincipaisDevOps, ...tecnologiasComplementaresDevOps].includes(tecnologiaCurso)
    const ehEscolhaExplicita = tecnologiaEscolhidaExplicitamente(perfil) && ehCursoStackPrincipal
    const tagsDevOps = ['aws', 'cloud', 'ci-cd', 'github-actions', 'terraform', 'deploy', 'nginx']
    const bonusTagsDevOps = tagsDevOps.reduce((total, tag) => total + (curso.tags?.includes(tag) ? 8 : 0), 0)

    if (ehCursoDevOps) pontos += 110
    if (tecnologiaCurso === 'linux') pontos += 90
    pontos += bonusTagsDevOps

    if (
      !ehCursoDevOps &&
      !ehEscolhaExplicita &&
      (stacksProtegidasDevOps.includes(tecnologiaCurso) || stacksProtegidasDevOps.includes(tecnologiaCanonicaDe(tecnologiaCurso)))
    ) {
      pontos -= 220
    }
  }

  if (perfilQA) {
    const tecnologiasQA = ['qa', 'api', 'api-rest', 'git-github', 'docker-cloud', 'seguranca', 'testes-unitarios']
    const ehCursoQAComplementar = tecnologiasQA.includes(tecnologiaCurso)

    if (nivelTecnologia === 'quero-comecar') {
      if (tecnologiaCurso === 'git-github' || ['api', 'api-rest'].includes(tecnologiaCurso)) pontos += 42
      if (curso.tags?.includes('cypress') || curso.tags?.includes('automacao')) pontos -= 180
    }

    if (!ehCursoQAComplementar && ['frontend', 'backend', 'dados'].includes(categoriaCursoArea)) {
      pontos -= 90
    }
  }

  if (perfilDados && !['python', 'sql', 'mongodb', 'git-github', 'ingles', 'carreira'].includes(tecnologiaCurso)) {
    if (['frontend', 'backend', 'qa', 'devops'].includes(categoriaCursoArea)) pontos -= 70
  }

  if (perfilDados && nivelTecnologia === 'quero-comecar' && tecnologiaCurso === 'mongodb' && tecnologiaPrincipal !== 'mongodb') {
    pontos -= 60
  }

  if (perfilDados && tecnologiaCurso === 'sql' && (temBaseBanco || tecnologiaPrincipal === 'sql')) {
    pontos += 35
  }

  if (baseBackendDados === 'nenhum' && ['api', 'api-rest', 'mongodb'].some((tecnologia) => itemTemAfinidadeTecnologia(curso, tecnologia))) {
    pontos -= perfilInicial ? 12 : 0
  }

  if (experienciaPeso >= 2) {
    if (ehCursoIntermediario) pontos += 20
    if (
      ['arquitetura', 'arquitetura-software', 'testes-unitarios', 'mensageria', 'seguranca', 'ci-cd', 'design-patterns'].some(
        (tecnologia) => itemTemFocoTecnologia(curso, tecnologia),
      )
    ) {
      pontos += 36
    }
  } else if (ehCursoIntermediario && !ehCursoStackPrincipal && !ehCursoFocoCarreira) {
    pontos -= 14
  }

  if (perfilInicial) {
    if (['informatica', 'logica', 'git-github', 'carreira', 'ingles'].includes(curso.tecnologia)) pontos += 52
    if (ehCursoBase) pontos += 30
    if (ehCursoIntermediario) pontos -= 24
    if (['angular', 'react', 'java-spring'].includes(tecnologiaPrincipal) && ehCursoStackPrincipal && ehCursoIntermediario) {
      pontos -= 180
    }
    if (curso.tags?.includes('cypress') || curso.tags?.includes('automacao')) pontos -= 120
    if (curso.tecnologia === 'design-system') pontos -= 120
    if (!perfilDevOps && categoriaCursoArea === 'devops') pontos -= 160
  }

  if (emTransicao) {
    if (['informatica', 'logica', 'git-github', 'carreira'].includes(curso.tecnologia)) pontos += 16
    if (curso.tags?.includes('primeira-vaga') || curso.tags?.includes('portfolio')) pontos += 12
  }

  if (jaTrabalhaTech && !perfilInicial) {
    if (['informatica', 'logica'].includes(curso.tecnologia)) pontos -= 42
    if (ehCursoIntermediario) pontos += 18
  }

  if (querMigrarStack && ehCursoStackPrincipal) pontos += 34
  if (querAprofundarStackAtual && ehCursoStackPrincipal && ehCursoIntermediario) pontos += 44

  if (perfil.inicianteDigital) {
    if (curso.id === 'curso-info-computador') pontos += 260
    if (curso.id === 'curso-logica-zero') pontos += 190
    if (curso.id === 'curso-git-github') pontos += 120
    if (curso.id === 'curso-info-windows') pontos += 70
    if (curso.tecnologia === 'carreira' || curso.tecnologia === 'ingles') pontos -= 60
    if (ehCursoStackPrincipal && !ehCursoIntermediario) pontos += 50
  }

  if (nivelTecnologia === 'quero-comecar') {
    if (ehCursoBase) pontos += 48
    if (ehCursoIntermediario) pontos -= 46
  }

  if (nivelTecnologia === 'basico') {
    if (nivelCurso === 'basico') pontos += 44
    if (nivelCurso === 'iniciante') pontos += 12
    if (ehCursoIntermediario) pontos += 8
  }

  if (nivelTecnologia === 'projetos' || nivelTecnologia === 'avancar' || conheceProjetos) {
    if (ehCursoIntermediario) pontos += 58
    if (ehCursoBase && ehCursoStackPrincipal) pontos -= nivelTecnologia === 'avancar' ? 42 : 24
    if (curso.tags?.includes('portfolio') || curso.tags?.includes('api')) pontos += 18
  }

  if (ehCursoStackPrincipal) {
    if (distanciaNivel === 0) pontos += 26
    if (distanciaNivel === 1) pontos += 10
    if (distanciaNivel >= 2) pontos -= 22
  }

  if (respostas.objetivo === 'portfolio' && curso.tags?.includes('portfolio')) pontos += 42
  if (respostas.objetivo === 'primeira-vaga' && (curso.tags?.includes('primeira-vaga') || curso.tecnologia === 'git-github')) pontos += 28
  if (respostas.objetivo === 'freelancer' && (curso.tags?.includes('portfolio') || curso.tags?.includes('api'))) pontos += 32
  if (respostas.objetivo === 'melhorar-emprego-atual' && ehCursoIntermediario) pontos += 18
  if ((respostas.ingles === 'baixo' || respostas.ingles === 'basico') && curso.tecnologia === 'ingles') pontos += 48
  if ((respostas.softSkills === 'baixo' || respostas.softSkills === 'medio') && curso.tecnologia === 'carreira') pontos += 48
  if (respostas.tempoSemanal === 'baixo' && parseFloat(curso.duracao) <= 3) pontos += 20

  return Math.max(0, Math.round(pontos))
}

export function recomendarTrilhas(respostas = {}) {
  const perfil = perfilDasRespostas(respostas)
  const semWizard = !Object.keys(respostas).length

  const ordenadas = trilhas
    .map((trilha) => ({
      ...trilha,
      pontuacao: pontuarTrilha(trilha, perfil),
      motivo: motivoDaTrilha(trilha, perfil),
    }))
    .sort((a, b) => b.pontuacao - a.pontuacao || (a.ordemBase || 99) - (b.ordemBase || 99))

  if (semWizard) return ordenadas.slice(0, 4)

  return selecionarTrilhasEssenciais(ordenadas, perfil)
}

export function recomendarCursos(respostas = {}) {
  const perfil = perfilDasRespostas(respostas)
  const trilhasRecomendadas = recomendarTrilhas(respostas)
  const ordenados = cursos
    .map((cursoItem) => ({
      ...cursoItem,
      pontuacao: pontuarCurso(cursoItem, perfil, trilhasRecomendadas),
      motivo: motivoDoCurso(cursoItem, perfil),
    }))
    .sort((a, b) => b.pontuacao - a.pontuacao || a.titulo.localeCompare(b.titulo))

  return removerCursosRedundantes(ordenados, perfil)
}

export function recomendarVagas(respostas = {}, candidaturas = [], vagasFonte = vagas, empresasFonte = empresas) {
  const perfil = perfilDasRespostas(respostas)
  const tagsPerfil = new Set([
    perfil.areaDesejada,
    perfil.areaFoco,
    perfil.focoCarreira,
    perfil.linguagemConhecida,
    perfil.tecnologiaInteresse,
    perfil.tecnologiaPrincipal,
    perfil.baseBackendDados,
    ...perfil.tecnologiasFoco,
    respostas.programacao === 'nenhum' ? 'informatica' : '',
    respostas.softSkills === 'baixo' ? 'comunicacao' : '',
  ])

  return vagasFonte
    .map((vaga) => {
      const empresa = empresasFonte.find((item) => item.id === vaga.empresaId)
      const tags = Array.isArray(vaga.tags) ? vaga.tags : []
      const match = tags.reduce((total, tag) => total + (tagsPerfil.has(tag) ? 22 : 0), 40)
      const candidatura = candidaturas.find((item) => item.vagaId === vaga.id)
      return { ...vaga, empresa, match: Math.min(match, 96), candidatura }
    })
    .sort((a, b) => b.match - a.match)
}

export function calcularProgresso(trilha, progresso = {}) {
  const aulas = trilha.modulos.flatMap((modulo) => modulo.aulas)
  if (!aulas.length) return 0
  const concluidas = aulas.filter((aula) => progresso[aula.id]).length
  return Math.round((concluidas / aulas.length) * 100)
}

export function encontrarAula(trilha, aulaId) {
  const aulas = trilha.modulos.flatMap((modulo) => modulo.aulas.map((aula) => ({ ...aula, modulo })))
  return aulas.find((aula) => aula.id === aulaId) || (aulaId === `${trilha.id}-video` ? aulas[0] : null)
}

function selecionarTrilhasEssenciais(ordenadas, perfil) {
  const {
    areaDesejada,
    areaFoco,
    perfilInicial,
    respostas,
    tecnologiaPrincipal,
    tecnologiaPrincipalCanonica,
    tecnologiasFoco,
    inicianteDigital,
    inicianteCodigo,
    nivelTecnologia,
    limiteTrilhas,
    perfilDevOps,
    perfilQA,
    perfilDados,
    perfilFrontend,
    conheceProjetos,
    temBaseApi,
    temBaseBanco,
    precisaBaseLogica,
  } = perfil
  const limite = limiteTrilhas
  const selecionadas = []
  const areasUsadas = new Set()
  const tecnologiasFocoTrilhas =
    areaFoco === 'devops' ? tecnologiasFoco.filter((tecnologia) => !['aws', 'cloud', 'ci-cd'].includes(tecnologia)) : tecnologiasFoco

  function adicionar(trilha) {
    if (!trilha || selecionadas.some((item) => item.id === trilha.id)) return
    if (trilha.pontuacao <= 0) return
    selecionadas.push(trilha)
  }

  function porId(id) {
    return ordenadas.find((trilha) => trilha.id === id)
  }

  function objetivoDeCarreira() {
    return ['primeira-vaga', 'portfolio', 'transicao'].includes(respostas.objetivo)
  }

  function adicionarBaseDaArea() {
    if (areaDesejada === 'frontend') adicionar(porId('frontend-base-portfolio'))
    if (areaDesejada === 'backend') adicionar(porId('backend-api-base'))
    if (areaDesejada === 'dados') adicionar(porId('dados-base-primeira-vaga'))
    if (areaDesejada === 'devops') adicionar(porId('devops-base-docker'))
    if (areaDesejada === 'qa') adicionar(porId('qa-base-primeira-vaga'))
    if (areaDesejada === 'produto-suporte') adicionar(porId('suporte-tecnico-inicial'))
  }

  function adicionarCarreiraComoComplemento() {
    if (!objetivoDeCarreira()) return
    adicionar(porId('primeira-vaga-portfolio'))
  }

  function combinaTecnologia(trilha) {
    return tecnologiaPrincipal && itemCombinaTecnologiaPrincipal(trilha, tecnologiaPrincipal, tecnologiaPrincipalCanonica)
  }

  function trilhaEhStackAlternativa(trilha) {
    const tecnologiaPrimaria = normalizarTexto(trilha?.tecnologias?.[0])
    const usuarioEscolheuStackExclusiva =
      stacksExclusivas.includes(tecnologiaPrincipal) || stacksExclusivas.includes(tecnologiaPrincipalCanonica)

    return (
      usuarioEscolheuStackExclusiva &&
      stacksExclusivas.includes(tecnologiaPrimaria) &&
      !itemCombinaTecnologiaPrincipal(trilha, tecnologiaPrincipal, tecnologiaPrincipalCanonica)
    )
  }

  function adicionarPorTecnologias(tecnologias = []) {
    tecnologias.forEach((tecnologia) => {
      const tecnologiaNormalizada = normalizarTexto(tecnologia)
      const jaTemTrilhaPrimaria = selecionadas.some(
        (trilha) =>
          normalizarTexto(trilha.tecnologias?.[0]) === tecnologiaNormalizada || normalizarTexto(trilha.id) === tecnologiaNormalizada,
      )
      const candidatoPrimario = ordenadas.find(
        (trilha) =>
          !selecionadas.some((item) => item.id === trilha.id) &&
          (normalizarTexto(trilha.tecnologias?.[0]) === tecnologiaNormalizada || normalizarTexto(trilha.id) === tecnologiaNormalizada),
      )
      const candidato =
        candidatoPrimario ||
        (!jaTemTrilhaPrimaria &&
          ordenadas.find(
            (trilha) =>
              !selecionadas.some((item) => item.id === trilha.id) &&
              (itemCombinaTecnologiaPrincipal(trilha, tecnologia) || itemTemAfinidadeTecnologia(trilha, tecnologia)),
          ))

      if (!candidato || candidato.pontuacao < 70 || trilhaEhStackAlternativa(candidato)) return
      if (areaDesejada !== 'qa' && candidato.area === 'qa') return
      adicionar(candidato)
    })
  }

  const dependenciasStack = dependenciasPorTecnologia[tecnologiaPrincipal] || []
  const complementosStack = complementosPorTecnologia[tecnologiaPrincipal] || []

  if (inicianteDigital) {
    adicionar(porId('informatica-essencial'))
    adicionar(porId('logica-algoritmos'))
    adicionar(porId('git-github'))
    if (areaDesejada === 'frontend') adicionar(porId('javascript-frontend'))
    adicionarPorTecnologias(dependenciasStack)
    adicionarPorTecnologias(tecnologiasFocoTrilhas)
    adicionarBaseDaArea()
    adicionar(ordenadas.find((trilha) => combinaTecnologia(trilha) && !['informatica-essencial', 'logica-algoritmos', 'git-github'].includes(trilha.id)))
    adicionar(ordenadas.find((trilha) => trilha.area === areaDesejada && !['informatica-essencial', 'logica-algoritmos', 'git-github'].includes(trilha.id)))
    adicionar(ordenadas.find((trilha) => areaFoco && trilha.area === areaFoco && !['informatica-essencial', 'logica-algoritmos', 'git-github'].includes(trilha.id)))
    adicionarCarreiraComoComplemento()
    adicionarPorTecnologias(complementosStack)
    for (const trilha of ordenadas) adicionar(trilha)
    return selecionadas.slice(0, limite)
  }

  if (inicianteCodigo) {
    adicionar(porId('logica-algoritmos'))
    adicionar(porId('git-github'))
    if (areaDesejada === 'frontend') adicionar(porId('javascript-frontend'))
    adicionarPorTecnologias(dependenciasStack)
    adicionarPorTecnologias(tecnologiasFocoTrilhas)
    adicionarBaseDaArea()
    if (nivelTecnologia !== 'quero-comecar') {
      adicionar(ordenadas.find((trilha) => combinaTecnologia(trilha)))
    }
    adicionar(ordenadas.find((trilha) => trilha.area === areaDesejada))
    adicionar(ordenadas.find((trilha) => areaFoco && trilha.area === areaFoco))
    adicionarCarreiraComoComplemento()
    adicionarPorTecnologias(complementosStack)
    for (const trilha of ordenadas) adicionar(trilha)
    return selecionadas.slice(0, limite)
  }

  if (areaDesejada === 'nao-sei' && !tecnologiaPrincipal) {
    adicionar(porId('logica-algoritmos'))
    adicionar(porId('git-github'))
    adicionar(ordenadas.find((trilha) => areasExploratorias.includes(trilha.area)))
    for (const trilha of ordenadas) adicionar(trilha)
    return selecionadas.slice(0, limite)
  }

  if (perfilDevOps) {
    const priorizarProfissionalDevOps = ['projetos', 'avancar'].includes(nivelTecnologia) || respostas.objetivo === 'especializar'

    if (priorizarProfissionalDevOps) adicionar(porId('devops-cloud-profissional'))
    adicionar(porId('devops-base-docker'))
    adicionar(porId('devops-docker-cloud'))
    adicionar(porId('git-github'))
    adicionar(porId('linux-fundamentos'))
    adicionar(porId('seguranca-informacao'))

    if (respostas.focoCarreira === 'apis' || temBaseApi || temBaseBanco) {
      adicionar(porId('api-http-rest'))
    }

    if (respostas.focoCarreira === 'apis' && respostas.linguagem === 'javascript') {
      adicionar(porId('backend-node-api-profissional'))
    }

    for (const trilha of ordenadas) {
      if (selecionadas.length >= limite) break
      if (trilha.pontuacao < 70) continue
      if (
        trilha.area === 'devops' ||
        trilha.id === 'api-http-rest' ||
        trilha.id === 'git-github' ||
        trilha.area === 'fundamentos'
      ) {
        adicionar(trilha)
      }
    }

    return selecionadas.slice(0, limite)
  }

  if (perfilFrontend) {
    if (objetivoDeCarreira()) adicionar(porId('frontend-base-portfolio'))

    if (tecnologiaPrincipal === 'angular' || tecnologiaPrincipalCanonica === 'angular') {
      adicionar(porId('javascript-frontend'))
      if (nivelTecnologia !== 'quero-comecar') adicionar(porId('angular-frontend'))
      if (['projetos', 'avancar'].includes(nivelTecnologia)) adicionar(porId('frontend-angular-profissional'))
      adicionar(porId('git-github'))
      adicionarPorTecnologias(complementosStack)
    } else if (tecnologiaPrincipal === 'react') {
      adicionar(porId('javascript-frontend'))
      adicionar(porId('react-frontend'))
      adicionar(porId('git-github'))
      adicionarPorTecnologias(complementosStack)
    } else {
      adicionar(porId('javascript-frontend'))
    }

    for (const trilha of ordenadas) {
      if (selecionadas.length >= limite) break
      if (trilha.pontuacao >= 70 && (trilha.area === 'frontend' || trilha.id === 'git-github' || trilha.area === 'carreira')) {
        adicionar(trilha)
      }
    }

    if (selecionadas.length) return selecionadas.slice(0, limite)
  }

  if (perfilQA) {
    if (precisaBaseLogica) adicionar(porId('logica-algoritmos'))
    adicionar(porId('git-github'))
    adicionar(porId('qa-base-primeira-vaga'))
    adicionar(porId('qa-testes'))
    adicionar(porId('api-http-rest'))
    if (['projetos', 'avancar'].includes(nivelTecnologia) || conheceProjetos) adicionar(porId('qa-automacao-profissional'))

    for (const trilha of ordenadas) {
      if (selecionadas.length >= limite) break
      if (trilha.pontuacao >= 70 && (trilha.area === 'qa' || trilha.id === 'api-http-rest' || trilha.area === 'devops')) {
        adicionar(trilha)
      }
    }

    return selecionadas.slice(0, limite)
  }

  if (precisaBaseLogica && !perfilInicial) {
    adicionar(porId('logica-algoritmos'))
    adicionar(porId('git-github'))
  }

  if (perfilDados) {
    if (objetivoDeCarreira() || perfilInicial || inicianteCodigo) adicionar(porId('dados-base-primeira-vaga'))
    if (['projetos', 'avancar'].includes(nivelTecnologia) || conheceProjetos) adicionar(porId('dados-python-sql-profissional'))
    adicionar(porId('python-dados'))
    adicionar(porId('sql-banco-dados'))
    adicionar(porId('git-github'))
    if (nivelTecnologia === 'quero-comecar' || perfilInicial || inicianteCodigo) {
      adicionar(porId('logica-algoritmos'))
    }
    if (respostas.objetivo === 'primeira-vaga' || respostas.objetivo === 'portfolio' || respostas.objetivo === 'transicao') {
      adicionar(porId('primeira-vaga-portfolio'))
    }

    for (const trilha of ordenadas) {
      if (selecionadas.length >= limite) break
      if (
        trilha.pontuacao >= 70 &&
        (trilha.area === 'dados' ||
          trilha.id === 'git-github' ||
          trilha.id === 'logica-algoritmos' ||
          trilha.area === 'carreira' ||
          (respostas.focoCarreira === 'testes' && trilha.area === 'qa'))
      ) {
        adicionar(trilha)
      }
    }

    return selecionadas.slice(0, limite)
  }

  if (tecnologiaPrincipal) {
    adicionar(ordenadas.find((trilha) => combinaTecnologia(trilha)))
    adicionarPorTecnologias(dependenciasStack)
    adicionarPorTecnologias(complementosStack)
  }

  adicionarPorTecnologias(tecnologiasFocoTrilhas)

  if (selecionadas.length >= limite) return selecionadas.slice(0, limite)

  for (const trilha of ordenadas) {
    if (trilha.pontuacao < 70) continue
    if (trilhaEhStackAlternativa(trilha)) continue
    if (areaDesejada !== 'qa' && trilha.area === 'qa') continue

    const ehBaseObrigatoria = prioridadeInicial[trilha.id] && (perfilInicial || areaDesejada === 'nao-sei')
    const ehComplementarImportante =
      (trilha.id === 'ingles-tech' && ['baixo', 'basico'].includes(respostas.ingles)) ||
      (trilha.id === 'carreira-comunicacao' && ['baixo', 'medio'].includes(respostas.softSkills))
    const ehDependenciaDaStack = dependenciasStack.some((tecnologia) => itemCombinaTecnologiaPrincipal(trilha, tecnologia))
    const ehComplementoDaStack = complementosStack.some((tecnologia) => itemTemAfinidadeTecnologia(trilha, tecnologia))
    const ehFocoCarreira = tecnologiasFoco.some((tecnologia) => itemTemTecnologiaPrincipal(trilha, tecnologia))
    const ehAreaPrincipal = trilha.area === areaDesejada || trilha.area === areaFoco || areaDesejada === 'nao-sei'
    const ehAreaRelevante =
      ehAreaPrincipal &&
      (!tecnologiaPrincipal || combinaTecnologia(trilha) || ehDependenciaDaStack || ehComplementoDaStack || ehFocoCarreira)

    if (!ehBaseObrigatoria && !ehComplementarImportante && !ehAreaRelevante) {
      if (areaDesejada !== 'nao-sei' || areasUsadas.has(trilha.area)) continue
    }

    adicionar(trilha)
    if (!['fundamentos', 'carreira'].includes(trilha.area)) areasUsadas.add(trilha.area)
    if (selecionadas.length >= limite) break
  }

  if (selecionadas.length) return selecionadas
  return ordenadas.slice(0, limite)
}

function removerCursosRedundantes(cursosOrdenados, perfil) {
  const { nivelTecnologia, nivelUsuarioPeso, tecnologiaPrincipal, tecnologiaPrincipalCanonica } = perfil
  const melhoresPorTecnologia = new Map()
  const cursosComplementares = []
  const focoDevops = perfil.perfilDevOps

  for (const curso of cursosOrdenados) {
    const chaveTecnologia = chaveTecnologiaDeduplicacao(curso)
    if (focoDevops && ['docker-cloud', 'git-github', 'linux', 'seguranca', 'api'].includes(chaveTecnologia)) {
      cursosComplementares.push(curso)
      continue
    }

    if (perfil.perfilQA && ['qa', 'api', 'git-github', 'docker-cloud'].includes(chaveTecnologia)) {
      cursosComplementares.push(curso)
      continue
    }

    if (!chaveTecnologia) {
      cursosComplementares.push(curso)
      continue
    }

    const atual = melhoresPorTecnologia.get(chaveTecnologia)
    if (!atual || cursoAdequadoAoMomento(curso, perfil) > cursoAdequadoAoMomento(atual, perfil)) {
      melhoresPorTecnologia.set(chaveTecnologia, curso)
    }
  }

  return [...melhoresPorTecnologia.values(), ...cursosComplementares].sort((a, b) => {
    const diferencaPontuacao = b.pontuacao - a.pontuacao
    if (diferencaPontuacao) return diferencaPontuacao

    const diferencaAdequacao = cursoAdequadoAoMomento(b, perfil) - cursoAdequadoAoMomento(a, perfil)
    if (diferencaAdequacao) return diferencaAdequacao

    if (itemCombinaTecnologiaPrincipal(a, tecnologiaPrincipal, tecnologiaPrincipalCanonica) && !itemCombinaTecnologiaPrincipal(b, tecnologiaPrincipal, tecnologiaPrincipalCanonica)) return -1
    if (itemCombinaTecnologiaPrincipal(b, tecnologiaPrincipal, tecnologiaPrincipalCanonica) && !itemCombinaTecnologiaPrincipal(a, tecnologiaPrincipal, tecnologiaPrincipalCanonica)) return 1

    const aNivel = nivelCursoComoPeso(a.nivel)
    const bNivel = nivelCursoComoPeso(b.nivel)
    if (nivelTecnologia === 'quero-comecar') return aNivel - bNivel
    if (nivelUsuarioPeso >= 2) return bNivel - aNivel

    return a.titulo.localeCompare(b.titulo)
  })
}

function cursoAdequadoAoMomento(curso, perfil) {
  const { nivelTecnologia, nivelUsuarioPeso, tecnologiaPrincipal, tecnologiaPrincipalCanonica, respostas } = perfil
  const nivelCurso = normalizarTexto(curso.nivel)
  const nivelCursoPeso = nivelCursoComoPeso(curso.nivel)
  const ehStackPrincipal = tecnologiaPrincipal && itemCombinaTecnologiaPrincipal(curso, tecnologiaPrincipal, tecnologiaPrincipalCanonica)
  const distancia = Math.abs(nivelUsuarioPeso - nivelCursoPeso)
  let adequacao = curso.pontuacao - distancia * 18

  if (ehStackPrincipal) adequacao += 40
  if (nivelTecnologia === 'quero-comecar' && (nivelCurso === 'iniciante' || nivelCurso === 'basico')) adequacao += 38
  if (nivelTecnologia === 'quero-comecar' && nivelCurso === 'intermediario') adequacao -= 55
  if (nivelTecnologia === 'basico' && nivelCurso === 'basico') adequacao += 30
  if (nivelTecnologia === 'projetos' && nivelCurso === 'intermediario') adequacao += 40
  if (nivelTecnologia === 'avancar' && nivelCurso === 'intermediario') adequacao += 55
  if (nivelUsuarioPeso >= 2 && nivelCurso === 'basico' && ehStackPrincipal) adequacao -= 35
  if ((curso.tags?.includes('api') || curso.tags?.includes('portfolio')) && ['projetos', 'avancar'].includes(nivelTecnologia)) adequacao += 16
  if (respostas.tempoSemanal === 'baixo' && parseFloat(curso.duracao) <= 3) adequacao += 8

  return adequacao
}

function motivoDaTrilha(trilha, perfil) {
  const { tecnologiaPrincipal, tecnologiaPrincipalCanonica, areaDesejada, focoCarreira, perfilInicial, perfilDados, respostas } = perfil
  const dependenciasStack = dependenciasPorTecnologia[tecnologiaPrincipal] || []
  const complementosStack = complementosPorTecnologia[tecnologiaPrincipal] || []

  if (perfilInicial && prioridadeInicial[trilha.id]) {
    return 'Recomendado para organizar sua base antes de avançar para stacks mais específicas.'
  }

  if (perfilDados) {
    if (trilha.id === 'python-dados') {
      return 'Voce escolheu Dados e Python; esta trilha fortalece a base para analise, automacao e banco de dados.'
    }

    if (trilha.id === 'sql-banco-dados') {
      return 'Como voce marcou base ou interesse em banco de dados, SQL entra como fundamento do caminho de Dados.'
    }

    if (focoCarreira === 'testes' && trilha.area === 'qa') {
      return 'Voce marcou interesse em testes, entao esta trilha entra como complemento ao seu caminho principal.'
    }
  }

  if (perfil.perfilDevOps) {
    if (trilha.id === 'devops-cloud-profissional') {
      return 'Voce escolheu Docker/Cloud e tem maturidade para aprofundar em containers, Linux, AWS, CI/CD, deploy e seguranca.'
    }

    if (trilha.id === 'devops-docker-cloud' || trilha.area === 'devops') {
      return 'Voce escolheu Docker/Cloud; esta trilha prioriza containers, deploy, cloud e infraestrutura.'
    }

    if (trilha.id === 'git-github') {
      return 'Git e GitHub entram como base para versionar projetos e trabalhar com deploys e automacoes.'
    }

    if (trilha.id === 'api-http-rest') {
      return 'Como voce marcou foco em APIs, este conteudo ajuda a entender aplicacoes que serao publicadas ou testadas.'
    }
  }

  if (dependenciasStack.some((tecnologia) => itemCombinaTecnologiaPrincipal(trilha, tecnologia))) {
    return `Prepara a base necessaria para evoluir melhor em ${tecnologiaPrincipal}.`
  }

  if (tecnologiaPrincipal && itemCombinaTecnologiaPrincipal(trilha, tecnologiaPrincipal, tecnologiaPrincipalCanonica)) {
    return `Combina com seu interesse em ${tecnologiaPrincipal} e ajuda a evoluir com uma sequência guiada.`
  }

  if (complementosStack.some((tecnologia) => itemTemAfinidadeTecnologia(trilha, tecnologia))) {
    return `Complementa sua stack de ${tecnologiaPrincipal} com habilidades importantes para projetos reais.`
  }

  if (trilha.area === areaDesejada) {
    return 'Esta trilha conversa diretamente com o caminho de tecnologia que você escolheu.'
  }

  if (respostas.objetivo === 'portfolio' && trilha.tags?.includes('portfolio')) {
    return 'Ajuda a transformar estudo em projetos demonstráveis para o portfólio.'
  }

  if (trilha.id === 'ingles-tech') return 'Ajuda a ler documentação, vagas e materiais internacionais.'
  if (trilha.id === 'carreira-comunicacao') return 'Fortalece entrevistas, portfólio e comunicação profissional.'

  return trilha.destaque
}

function motivoDoCurso(curso, perfil) {
  const { tecnologiaPrincipal, tecnologiaPrincipalCanonica, nivelTecnologia, perfilInicial, perfilDados, respostas } = perfil
  const dependenciasStack = dependenciasPorTecnologia[tecnologiaPrincipal] || []
  const complementosStack = complementosPorTecnologia[tecnologiaPrincipal] || []

  if (perfil.perfilDevOps) {
    if (['docker-cloud', 'linux', 'git-github', 'seguranca'].includes(curso.tecnologia)) {
      return 'Voce escolheu Docker/Cloud; este curso fortalece publicacao, operacao, infraestrutura e seguranca.'
    }

    if (['api', 'api-rest'].includes(curso.tecnologia)) {
      return 'Como voce marcou foco em APIs, este conteudo ajuda a entender aplicacoes que serao publicadas ou testadas.'
    }
  }

  if (perfilDados) {
    if (curso.tecnologia === 'python') {
      return 'Voce escolheu Dados e Python; este curso ajuda a construir a base para analise e automacao.'
    }

    if (curso.tecnologia === 'sql') {
      return 'Banco de dados e SQL sustentam boa parte do caminho de Dados, por isso este curso aparece cedo.'
    }

    if (curso.tecnologia === 'mongodb') {
      return 'MongoDB entra como banco complementar depois da base de Python e SQL.'
    }

    if (curso.tecnologia === 'qa') {
      return 'Como voce marcou testes, este curso entra como complemento ao caminho principal de Dados.'
    }
  }

  if (tecnologiaPrincipal && itemCombinaTecnologiaPrincipal(curso, tecnologiaPrincipal, tecnologiaPrincipalCanonica)) {
    if (nivelTecnologia === 'projetos' || nivelTecnologia === 'avancar') {
      return `Você demonstrou interesse em ${tecnologiaPrincipal} e já tem alguma prática, então este curso acelera seu aprofundamento.`
    }

    return `Você demonstrou interesse em ${tecnologiaPrincipal}, então este curso ajuda a começar pelo nível certo.`
  }

  if (dependenciasStack.some((tecnologia) => itemCombinaTecnologiaPrincipal(curso, tecnologia))) {
    return `Ajuda a construir a base necessaria antes de aprofundar em ${tecnologiaPrincipal}.`
  }

  if (complementosStack.some((tecnologia) => itemTemAfinidadeTecnologia(curso, tecnologia))) {
    return `Complementa ${tecnologiaPrincipal} com uma habilidade comum em projetos e vagas.`
  }

  if (perfilInicial && ['informatica', 'logica', 'git-github'].includes(curso.tecnologia)) {
    return 'Recomendado para criar base e evitar pular etapas importantes.'
  }

  if (respostas.objetivo === 'primeira-vaga' && curso.tecnologia === 'carreira') {
    return 'Como seu objetivo e primeira vaga, este curso ajuda a preparar portfolio, LinkedIn e entrevistas.'
  }

  if (respostas.objetivo === 'portfolio' && curso.tags?.includes('portfolio')) {
    return 'Boa escolha para gerar evidências práticas no seu portfólio.'
  }

  if (curso.tecnologia === 'ingles') return 'Complementa sua rotina com leitura de documentação e vagas.'
  if (curso.tecnologia === 'carreira') return 'Ajuda a apresentar melhor seus projetos e sua trajetória.'

  return curso.destaque
}
