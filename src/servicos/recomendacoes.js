import { cursos } from '../dados/cursos'
import { empresas } from '../dados/empresas'
import { trilhas } from '../dados/trilhas'
import { vagas } from '../dados/vagas'

const areasExploratorias = ['frontend', 'backend', 'dados', 'qa']
const tecnologiasPorArea = {
  frontend: ['javascript', 'react', 'angular', 'html', 'css', 'typescript'],
  backend: ['node', 'java', 'php', 'go', 'sql'],
  dados: ['python', 'sql'],
  devops: ['docker-cloud', 'git-github'],
  qa: ['qa', 'git-github'],
  'produto-suporte': ['informatica', 'git-github', 'qa', 'carreira'],
}

const prioridadeInicial = {
  'informatica-essencial': 120,
  'logica-algoritmos': 110,
  'git-github': 88,
  'carreira-comunicacao': 78,
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
  'react',
  'angular',
  'node',
  'python',
  'java',
  'php',
  'go',
  'sql',
  'docker-cloud',
  'git-github',
  'qa',
])

const dependenciasPorTecnologia = {
  react: ['javascript'],
  angular: ['javascript'],
  node: ['javascript'],
}

const complementosPorTecnologia = {
  javascript: ['git-github'],
  react: ['git-github', 'docker-cloud'],
  angular: ['git-github', 'docker-cloud'],
  node: ['sql', 'git-github', 'docker-cloud'],
  java: ['sql', 'git-github', 'docker-cloud'],
  php: ['sql', 'git-github'],
  go: ['sql', 'git-github', 'docker-cloud'],
  python: ['sql', 'git-github'],
  sql: ['python', 'git-github'],
  qa: ['git-github', 'sql'],
  'docker-cloud': ['git-github'],
}

function normalizarTexto(valor = '') {
  return String(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function nivelUsuarioComoPeso(nivelTecnologia) {
  return pesoNivelUsuario[nivelTecnologia] ?? 0
}

function nivelCursoComoPeso(nivelCurso) {
  return pesoNivelCurso[normalizarTexto(nivelCurso)] ?? 1
}

function calcularLimiteTrilhas(perfilBase) {
  const { inicianteDigital, inicianteCodigo, querMigrarStack, tecnologiaPrincipal, tempoSemanal } = perfilBase
  const tempo = tempoSemanal || 'medio'

  if (inicianteDigital || inicianteCodigo) {
    if (tempo === 'baixo') return 2
    if (tempo === 'medio') return tecnologiaPrincipal ? 4 : 3
    return 4
  }

  if (querMigrarStack) {
    if (tempo === 'baixo') return 2
    if (tempo === 'intenso') return 4
    return 3
  }

  if (tempo === 'baixo') return 2
  return 3
}

function perfilDasRespostas(respostas = {}) {
  const linguagemConhecida = respostas.linguagem && respostas.linguagem !== 'nenhuma' ? respostas.linguagem : ''
  const tecnologiaInteresse = respostas.tecnologiaInteresse && respostas.tecnologiaInteresse !== 'nenhuma' ? respostas.tecnologiaInteresse : ''
  const tecnologiaPrincipal = tecnologiaInteresse || linguagemConhecida
  const inicianteDigital = respostas.informatica === 'iniciante' || respostas.informatica === 'basico'
  const inicianteCodigo = !respostas.programacao || respostas.programacao === 'nenhum'
  const perfilInicial = inicianteDigital || inicianteCodigo
  const areaDesejada = respostas.areaDesejada || 'nao-sei'
  const nivelTecnologia = respostas.nivelTecnologia || (respostas.programacao === 'experiente' ? 'avancar' : 'quero-comecar')
  const jaTrabalhaTech = respostas.areaAtual === 'tecnologia'
  const vemDeForaTech = Boolean(respostas.areaAtual && respostas.areaAtual !== 'tecnologia')
  const emTransicao = respostas.objetivo === 'transicao' || (vemDeForaTech && areaDesejada !== 'nao-sei')
  const querMigrarStack = Boolean(tecnologiaInteresse && linguagemConhecida && tecnologiaInteresse !== linguagemConhecida)
  const querAprofundarStackAtual = Boolean(
    jaTrabalhaTech && tecnologiaPrincipal && !querMigrarStack && ['projetos', 'avancar'].includes(nivelTecnologia),
  )
  const nivelUsuarioPeso = nivelUsuarioComoPeso(nivelTecnologia)
  const perfilBase = {
    inicianteDigital,
    inicianteCodigo,
    querMigrarStack,
    tecnologiaPrincipal,
    tempoSemanal: respostas.tempoSemanal,
  }

  return {
    areaDesejada,
    tecnologiaPrincipal,
    linguagemConhecida,
    tecnologiaInteresse,
    nivelTecnologia,
    nivelUsuarioPeso,
    inicianteDigital,
    inicianteCodigo,
    perfilInicial,
    jaTrabalhaTech,
    vemDeForaTech,
    emTransicao,
    querMigrarStack,
    querAprofundarStackAtual,
    limiteTrilhas: calcularLimiteTrilhas(perfilBase),
    conheceProjetos: respostas.programacao === 'projetos' || respostas.programacao === 'experiente',
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
  return tagsPerfil.reduce((total, tag) => total + (tag && texto.includes(tag) ? 12 : 0), 0)
}

function itemTemFocoTecnologia(item, tecnologia) {
  if (!tecnologia) return false
  return item.tecnologia === tecnologia || item.tecnologias?.[0] === tecnologia || item.id?.includes(tecnologia)
}

function pontuarTrilha(trilha, perfil) {
  const {
    areaDesejada,
    tecnologiaPrincipal,
    nivelTecnologia,
    perfilInicial,
    conheceProjetos,
    respostas,
    jaTrabalhaTech,
    emTransicao,
    querMigrarStack,
    querAprofundarStackAtual,
  } = perfil
  const semWizard = !Object.keys(respostas).length
  const tecnologiasArea = tecnologiasPorArea[areaDesejada] || []
  const tagsPerfil = [areaDesejada, tecnologiaPrincipal, respostas.linguagem, respostas.objetivo, respostas.programacao]
  const nivelTrilha = normalizarTexto(trilha.nivel)
  const ehFundamento = trilha.area === 'fundamentos'
  const combinaStack = tecnologiaPrincipal && (trilha.tecnologias?.includes(tecnologiaPrincipal) || trilha.tags?.includes(tecnologiaPrincipal))
  const dependenciasStack = dependenciasPorTecnologia[tecnologiaPrincipal] || []
  const complementosStack = complementosPorTecnologia[tecnologiaPrincipal] || []
  const ehDependenciaDaStack = dependenciasStack.some((tecnologia) => itemTemFocoTecnologia(trilha, tecnologia))
  const ehComplementoDaStack = complementosStack.some((tecnologia) => itemTemFocoTecnologia(trilha, tecnologia))
  let pontos = semWizard ? 95 - (trilha.ordemBase || 99) : 20

  pontos += pontuarPorTags(trilha, tagsPerfil)

  if (trilha.area === areaDesejada) pontos += 70
  if (tecnologiasArea.some((tecnologia) => trilha.tecnologias?.includes(tecnologia) || trilha.tags?.includes(tecnologia))) pontos += 32
  if (combinaStack) pontos += 82
  if (ehDependenciaDaStack) pontos += perfilInicial ? 54 : 22
  if (ehComplementoDaStack) pontos += respostas.objetivo === 'portfolio' || respostas.objetivo === 'primeira-vaga' ? 34 : 18

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

  if (respostas.objetivo === 'portfolio' && trilha.tags?.includes('portfolio')) pontos += 42
  if (respostas.objetivo === 'primeira-vaga' && ['git-github', 'carreira-comunicacao', 'ingles-tech'].includes(trilha.id)) pontos += 24
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
    tecnologiaPrincipal,
    nivelTecnologia,
    nivelUsuarioPeso,
    perfilInicial,
    conheceProjetos,
    respostas,
    tecnologiaInteresse,
    jaTrabalhaTech,
    emTransicao,
    querMigrarStack,
    querAprofundarStackAtual,
  } = perfil
  const semWizard = !Object.keys(respostas).length
  const trilhaIdsRecomendadas = new Set(trilhasRecomendadas.slice(0, 5).map((trilha) => trilha.id))
  const tagsPerfil = [areaDesejada, tecnologiaPrincipal, respostas.linguagem, respostas.objetivo, respostas.programacao]
  const nivelCurso = normalizarTexto(curso.nivel)
  const nivelCursoPeso = nivelCursoComoPeso(curso.nivel)
  const distanciaNivel = Math.abs(nivelUsuarioPeso - nivelCursoPeso)
  const categoriaCurso = normalizarTexto(curso.categoria)
  const ehCursoStackPrincipal = tecnologiaPrincipal && curso.tecnologia === tecnologiaPrincipal
  const dependenciasStack = dependenciasPorTecnologia[tecnologiaPrincipal] || []
  const complementosStack = complementosPorTecnologia[tecnologiaPrincipal] || []
  const ehCursoDependencia = dependenciasStack.some((tecnologia) => itemTemFocoTecnologia(curso, tecnologia))
  const ehCursoComplemento = complementosStack.some((tecnologia) => itemTemFocoTecnologia(curso, tecnologia))
  const ehStackAlternativa =
    tecnologiaPrincipal &&
    tecnologiasDeduplicaveis.has(curso.tecnologia) &&
    !ehCursoStackPrincipal &&
    !ehCursoDependencia &&
    !ehCursoComplemento &&
    curso.tecnologia !== 'git-github' &&
    curso.tecnologia !== 'qa'
  const ehCursoBase = nivelCurso === 'iniciante' || nivelCurso === 'basico'
  const ehCursoIntermediario = nivelCurso === 'intermediario'
  let pontos = semWizard ? 80 : 18

  pontos += pontuarPorTags(curso, tagsPerfil)

  if (ehCursoStackPrincipal) pontos += 90
  if (ehCursoStackPrincipal && tecnologiaInteresse) pontos += 36
  if (tecnologiaPrincipal && curso.tags?.includes(tecnologiaPrincipal)) pontos += 30
  if (curso.trilhaIds?.some((id) => trilhaIdsRecomendadas.has(id))) pontos += 34
  if (categoriaCurso === areaDesejada) pontos += 38
  if (ehCursoDependencia) pontos += perfilInicial ? 42 : 16
  if (ehCursoComplemento) pontos += respostas.objetivo === 'portfolio' || respostas.objetivo === 'primeira-vaga' ? 28 : 16
  if (ehStackAlternativa) pontos -= categoriaCurso === areaDesejada ? 35 : 48

  if (perfilInicial) {
    if (['informatica', 'logica', 'git-github', 'carreira', 'ingles'].includes(curso.tecnologia)) pontos += 52
    if (ehCursoBase) pontos += 30
    if (ehCursoIntermediario) pontos -= 24
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

export function recomendarVagas(respostas = {}, candidaturas = []) {
  const tagsPerfil = new Set([
    respostas.areaDesejada,
    respostas.linguagem,
    respostas.tecnologiaInteresse,
    respostas.programacao === 'nenhum' ? 'informatica' : '',
    respostas.softSkills === 'baixo' ? 'comunicacao' : '',
  ])

  return vagas
    .map((vaga) => {
      const empresa = empresas.find((item) => item.id === vaga.empresaId)
      const match = vaga.tags.reduce((total, tag) => total + (tagsPerfil.has(tag) ? 22 : 0), 40)
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
  const { areaDesejada, perfilInicial, respostas, tecnologiaPrincipal, inicianteDigital, inicianteCodigo, limiteTrilhas } = perfil
  const limite = limiteTrilhas
  const selecionadas = []
  const areasUsadas = new Set()

  function adicionar(trilha) {
    if (!trilha || selecionadas.some((item) => item.id === trilha.id)) return
    selecionadas.push(trilha)
  }

  function porId(id) {
    return ordenadas.find((trilha) => trilha.id === id)
  }

  function combinaTecnologia(trilha) {
    return tecnologiaPrincipal && (trilha.tecnologias?.includes(tecnologiaPrincipal) || trilha.tags?.includes(tecnologiaPrincipal))
  }

  function adicionarPorTecnologias(tecnologias = []) {
    tecnologias.forEach((tecnologia) => adicionar(ordenadas.find((trilha) => itemTemFocoTecnologia(trilha, tecnologia))))
  }

  const dependenciasStack = dependenciasPorTecnologia[tecnologiaPrincipal] || []
  const complementosStack = complementosPorTecnologia[tecnologiaPrincipal] || []

  if (inicianteDigital) {
    adicionar(porId('informatica-essencial'))
    adicionar(porId('logica-algoritmos'))
    adicionar(porId('git-github'))
    adicionarPorTecnologias(dependenciasStack)
    adicionar(ordenadas.find((trilha) => combinaTecnologia(trilha) && !['informatica-essencial', 'logica-algoritmos', 'git-github'].includes(trilha.id)))
    adicionar(ordenadas.find((trilha) => trilha.area === areaDesejada && !['informatica-essencial', 'logica-algoritmos', 'git-github'].includes(trilha.id)))
    adicionarPorTecnologias(complementosStack)
    for (const trilha of ordenadas) adicionar(trilha)
    return selecionadas.slice(0, limite)
  }

  if (inicianteCodigo) {
    adicionar(porId('logica-algoritmos'))
    adicionar(porId('git-github'))
    adicionarPorTecnologias(dependenciasStack)
    adicionar(ordenadas.find((trilha) => combinaTecnologia(trilha)))
    adicionar(ordenadas.find((trilha) => trilha.area === areaDesejada))
    adicionarPorTecnologias(complementosStack)
    for (const trilha of ordenadas) adicionar(trilha)
    return selecionadas.slice(0, limite)
  }

  for (const trilha of ordenadas) {
    if (trilha.pontuacao < 70) continue

    const ehBaseObrigatoria = prioridadeInicial[trilha.id] && (perfilInicial || areaDesejada === 'nao-sei')
    const ehComplementarImportante =
      (trilha.id === 'ingles-tech' && ['baixo', 'basico'].includes(respostas.ingles)) ||
      (trilha.id === 'carreira-comunicacao' && ['baixo', 'medio'].includes(respostas.softSkills))
    const ehDependenciaDaStack = dependenciasStack.some((tecnologia) => itemTemFocoTecnologia(trilha, tecnologia))
    const ehComplementoDaStack = complementosStack.some((tecnologia) => itemTemFocoTecnologia(trilha, tecnologia))
    const ehAreaPrincipal = trilha.area === areaDesejada || areaDesejada === 'nao-sei'
    const ehAreaRelevante =
      ehAreaPrincipal && (!tecnologiaPrincipal || combinaTecnologia(trilha) || ehDependenciaDaStack || ehComplementoDaStack)

    if (!ehBaseObrigatoria && !ehComplementarImportante && !ehAreaRelevante && areasUsadas.has(trilha.area)) {
      continue
    }

    selecionadas.push(trilha)
    if (!['fundamentos', 'carreira'].includes(trilha.area)) areasUsadas.add(trilha.area)
    if (selecionadas.length >= limite) break
  }

  if (selecionadas.length) return selecionadas
  return ordenadas.slice(0, limite)
}

function removerCursosRedundantes(cursosOrdenados, perfil) {
  const { nivelTecnologia, nivelUsuarioPeso, tecnologiaPrincipal } = perfil
  const melhoresPorTecnologia = new Map()
  const cursosComplementares = []

  for (const curso of cursosOrdenados) {
    if (!tecnologiasDeduplicaveis.has(curso.tecnologia)) {
      cursosComplementares.push(curso)
      continue
    }

    const atual = melhoresPorTecnologia.get(curso.tecnologia)
    if (!atual || cursoAdequadoAoMomento(curso, perfil) > cursoAdequadoAoMomento(atual, perfil)) {
      melhoresPorTecnologia.set(curso.tecnologia, curso)
    }
  }

  return [...melhoresPorTecnologia.values(), ...cursosComplementares].sort((a, b) => {
    const diferencaPontuacao = b.pontuacao - a.pontuacao
    if (diferencaPontuacao) return diferencaPontuacao

    const diferencaAdequacao = cursoAdequadoAoMomento(b, perfil) - cursoAdequadoAoMomento(a, perfil)
    if (diferencaAdequacao) return diferencaAdequacao

    if (a.tecnologia === tecnologiaPrincipal && b.tecnologia !== tecnologiaPrincipal) return -1
    if (b.tecnologia === tecnologiaPrincipal && a.tecnologia !== tecnologiaPrincipal) return 1

    const aNivel = nivelCursoComoPeso(a.nivel)
    const bNivel = nivelCursoComoPeso(b.nivel)
    if (nivelTecnologia === 'quero-comecar') return aNivel - bNivel
    if (nivelUsuarioPeso >= 2) return bNivel - aNivel

    return a.titulo.localeCompare(b.titulo)
  })
}

function cursoAdequadoAoMomento(curso, perfil) {
  const { nivelTecnologia, nivelUsuarioPeso, tecnologiaPrincipal, respostas } = perfil
  const nivelCurso = normalizarTexto(curso.nivel)
  const nivelCursoPeso = nivelCursoComoPeso(curso.nivel)
  const ehStackPrincipal = tecnologiaPrincipal && curso.tecnologia === tecnologiaPrincipal
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
  const { tecnologiaPrincipal, areaDesejada, perfilInicial, respostas } = perfil
  const dependenciasStack = dependenciasPorTecnologia[tecnologiaPrincipal] || []
  const complementosStack = complementosPorTecnologia[tecnologiaPrincipal] || []

  if (perfilInicial && prioridadeInicial[trilha.id]) {
    return 'Recomendado para organizar sua base antes de avançar para stacks mais específicas.'
  }

  if (dependenciasStack.some((tecnologia) => itemTemFocoTecnologia(trilha, tecnologia))) {
    return `Prepara a base necessaria para evoluir melhor em ${tecnologiaPrincipal}.`
  }

  if (tecnologiaPrincipal && (trilha.tecnologias?.includes(tecnologiaPrincipal) || trilha.tags?.includes(tecnologiaPrincipal))) {
    return `Combina com seu interesse em ${tecnologiaPrincipal} e ajuda a evoluir com uma sequência guiada.`
  }

  if (complementosStack.some((tecnologia) => itemTemFocoTecnologia(trilha, tecnologia))) {
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
  const { tecnologiaPrincipal, nivelTecnologia, perfilInicial, respostas } = perfil
  const dependenciasStack = dependenciasPorTecnologia[tecnologiaPrincipal] || []
  const complementosStack = complementosPorTecnologia[tecnologiaPrincipal] || []

  if (tecnologiaPrincipal && curso.tecnologia === tecnologiaPrincipal) {
    if (nivelTecnologia === 'projetos' || nivelTecnologia === 'avancar') {
      return `Você demonstrou interesse em ${tecnologiaPrincipal} e já tem alguma prática, então este curso acelera seu aprofundamento.`
    }

    return `Você demonstrou interesse em ${tecnologiaPrincipal}, então este curso ajuda a começar pelo nível certo.`
  }

  if (dependenciasStack.includes(curso.tecnologia)) {
    return `Ajuda a construir a base necessaria antes de aprofundar em ${tecnologiaPrincipal}.`
  }

  if (complementosStack.includes(curso.tecnologia)) {
    return `Complementa ${tecnologiaPrincipal} com uma habilidade comum em projetos e vagas.`
  }

  if (perfilInicial && ['informatica', 'logica', 'git-github'].includes(curso.tecnologia)) {
    return 'Recomendado para criar base e evitar pular etapas importantes.'
  }

  if (respostas.objetivo === 'portfolio' && curso.tags?.includes('portfolio')) {
    return 'Boa escolha para gerar evidências práticas no seu portfólio.'
  }

  if (curso.tecnologia === 'ingles') return 'Complementa sua rotina com leitura de documentação e vagas.'
  if (curso.tecnologia === 'carreira') return 'Ajuda a apresentar melhor seus projetos e sua trajetória.'

  return curso.destaque
}
