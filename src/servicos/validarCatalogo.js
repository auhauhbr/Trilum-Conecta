import { cursos } from '../dados/cursos'
import { inserirCurso } from '../dados/inserirCurso'
import { trilhas } from '../dados/trilhas'
import { duracaoDoCurso, duracaoDosCursos, duracaoParaMinutos } from './duracao'

const categoriasValidas = new Set([
  'Fundamentos',
  'Programação',
  'Programacao',
  'Ferramentas',
  'Front-end',
  'Back-end',
  'Dados',
  'DevOps',
  'QA',
  'Carreira',
  'Soft skills',
])
const niveisValidos = new Set(['iniciante', 'basico', 'básico', 'intermediario', 'intermediário', 'todos'])

const trilhasObrigatoriasParaRecomendacao = [
  'informatica-essencial',
  'logica-algoritmos',
  'git-github',
  'javascript-frontend',
  'frontend-base-portfolio',
  'react-frontend',
  'angular-frontend',
  'node-backend',
  'backend-api-base',
  'java-spring',
  'backend-java-profissional',
  'php-backend',
  'backend-php-web-profissional',
  'go-backend',
  'python-dados',
  'dados-base-primeira-vaga',
  'dados-python-sql-profissional',
  'sql-banco-dados',
  'devops-base-docker',
  'devops-docker-cloud',
  'linux-fundamentos',
  'seguranca-informacao',
  'api-http-rest',
  'qa-testes',
  'qa-base-primeira-vaga',
  'qa-automacao-profissional',
  'backend-node-api-profissional',
  'frontend-angular-profissional',
  'devops-cloud-profissional',
  'suporte-tecnico-inicial',
  'produto-suporte-carreira',
  'primeira-vaga-portfolio',
  'carreira-comunicacao',
  'ingles-tech',
]

const trilhasProfissionaisComGate = new Set([
  'backend-java-profissional',
  'devops-cloud-profissional',
  'qa-automacao-profissional',
  'backend-node-api-profissional',
  'frontend-angular-profissional',
  'backend-php-web-profissional',
  'dados-python-sql-profissional',
])

const trilhasJornadaObrigatoria = new Set([
  'javascript-frontend',
  'react-frontend',
  'angular-frontend',
  'node-backend',
  'java-spring',
  'php-backend',
  'python-dados',
  'devops-docker-cloud',
  'qa-testes',
  'frontend-base-portfolio',
  'backend-api-base',
  'dados-base-primeira-vaga',
  'devops-base-docker',
  'qa-base-primeira-vaga',
  'suporte-tecnico-inicial',
  'produto-suporte-carreira',
  'primeira-vaga-portfolio',
])

function registrarDuplicados(itens, tipo, problemas) {
  const vistos = new Set()
  const duplicados = new Set()

  itens.forEach((item) => {
    if (vistos.has(item.id)) duplicados.add(item.id)
    vistos.add(item.id)
  })

  duplicados.forEach((id) => problemas.push(`${tipo} com ID duplicado: ${id}`))
}

function aulasDoCurso(curso) {
  if (Array.isArray(curso.aulas) && curso.aulas.length) return curso.aulas
  if (Array.isArray(curso.modulos) && curso.modulos.length) {
    return curso.modulos.flatMap((modulo) => modulo.aulas || [])
  }

  return []
}

function listaSimples(valor) {
  if (Array.isArray(valor)) return valor.map((item) => String(item).trim()).filter(Boolean)
  return String(valor || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

function linkParecePlaceholder(link = '') {
  const texto = String(link).trim().toLowerCase()
  if (!texto) return true
  if (!texto.startsWith('http://') && !texto.startsWith('https://')) return true

  return ['link_do_video', 'exemplo', 'placeholder', 'abc7', 'abc8', 'abc9', 'watch?v=abc'].some((trecho) =>
    texto.includes(trecho),
  )
}

function trilhaEhProfissional(trilha) {
  return String(`${trilha.id} ${trilha.titulo}`).toLowerCase().includes('profissional')
}

export function validarCatalogo({ emitirAvisos = false } = {}) {
  const problemas = []
  const cursosPorId = new Map(cursos.map((curso) => [curso.id, curso]))
  const trilhasPorId = new Map(trilhas.map((trilha) => [trilha.id, trilha]))

  registrarDuplicados(cursos, 'Curso', problemas)
  registrarDuplicados(trilhas, 'Trilha', problemas)

  trilhasObrigatoriasParaRecomendacao.forEach((id) => {
    if (!trilhasPorId.has(id)) {
      problemas.push(`Trilha usada na recomendacao nao existe: ${id}`)
    }
  })

  inserirCurso.forEach((cursoInserido) => {
    if (!listaSimples(cursoInserido.trilhas || cursoInserido.trilhaIds).length) {
      problemas.push(`Curso inserido com trilhas vazio antes da conversao: ${cursoInserido.id || cursoInserido.titulo}`)
    }

    if (linkParecePlaceholder(cursoInserido.videoPrincipal || cursoInserido.youtubeUrl)) {
      problemas.push(`Curso inserido com videoPrincipal/youtubeUrl vazio ou placeholder: ${cursoInserido.id || cursoInserido.titulo}`)
    }
  })

  cursos.forEach((curso) => {
    const aulas = aulasDoCurso(curso)

    if (!curso.tecnologia) problemas.push(`Curso sem tecnologia: ${curso.id}`)
    if (!categoriasValidas.has(curso.categoria)) problemas.push(`Curso com categoria fora do padrao: ${curso.id}`)
    if (!niveisValidos.has(String(curso.nivel || '').toLowerCase())) problemas.push(`Curso com nivel fora do padrao: ${curso.id}`)
    if (!duracaoParaMinutos(curso.duracao) && !duracaoDoCurso(curso)) problemas.push(`Curso com duracao invalida: ${curso.id}`)
    if (!aulas.length) problemas.push(`Curso sem aulas e sem modulos: ${curso.id}`)
    if (!Array.isArray(curso.trilhaIds) || !curso.trilhaIds.length) problemas.push(`Curso com trilhas vazio: ${curso.id}`)
    if (linkParecePlaceholder(curso.youtubeUrl || curso.videoUrl)) problemas.push(`Curso com youtubeUrl/videoUrl vazio ou placeholder: ${curso.id}`)

    curso.trilhaIds?.forEach((trilhaId) => {
      if (!trilhasPorId.has(trilhaId)) problemas.push(`Curso ${curso.id} aponta para trilha inexistente: ${trilhaId}`)
    })

    aulas.forEach((aula) => {
      if (!duracaoParaMinutos(aula.duracao)) problemas.push(`Aula com duracao invalida: ${curso.id} / ${aula.id || aula.titulo}`)
      if (linkParecePlaceholder(aula.videoUrl || aula.link)) problemas.push(`Aula com link vazio ou placeholder: ${curso.id} / ${aula.id || aula.titulo}`)
    })
  })

  trilhas.forEach((trilha) => {
    if (!trilha.tecnologias?.length) problemas.push(`Trilha sem tecnologia: ${trilha.id}`)
    if (!niveisValidos.has(String(trilha.nivel || '').toLowerCase())) problemas.push(`Trilha com nivel fora do padrao: ${trilha.id}`)
    if ('cursoIds' in trilha && !trilha.cursoIds?.length) problemas.push(`Trilha com cursoIds vazio: ${trilha.id}`)

    if (trilhasJornadaObrigatoria.has(trilha.id) && (!trilha.cursoIds || trilha.cursoIds.length < 3)) {
      problemas.push(`Trilha de jornada com menos de 3 cursos: ${trilha.id}`)
    }

    if (trilhaEhProfissional(trilha)) {
      if (!trilha.cursoIds?.length) problemas.push(`Trilha profissional sem cursoIds: ${trilha.id}`)
      if ((trilha.cursoIds?.length || 0) < 4) problemas.push(`Trilha profissional com menos de 4 cursos: ${trilha.id}`)
      if (!trilhasProfissionaisComGate.has(trilha.id)) problemas.push(`Trilha profissional sem gate mapeado no recomendador: ${trilha.id}`)
    }

    trilha.cursoIds?.forEach((cursoId) => {
      if (!cursosPorId.has(cursoId)) problemas.push(`Trilha ${trilha.id} aponta para curso inexistente: ${cursoId}`)
    })

    if (trilha.cursoIds?.length) {
      const duracaoCalculada = duracaoDosCursos(trilha.cursoIds.map((cursoId) => cursosPorId.get(cursoId)).filter(Boolean))
      const duracaoInformada = duracaoParaMinutos(trilha.duracao)

      if (duracaoInformada && Math.abs(duracaoInformada - duracaoCalculada) > 1) {
        problemas.push(`Trilha com duracao divergente da soma dos cursos: ${trilha.id}`)
      }
    }
  })

  if (emitirAvisos && problemas.length) {
    console.warn(`Problemas encontrados no catalogo:\n${problemas.join('\n')}`)
  }

  return problemas
}
