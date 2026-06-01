import { cursos } from '../dados/cursos'
import { trilhas } from '../dados/trilhas'

export function cursoComoConteudo(curso) {
  const aulas = curso.aulas?.length
    ? curso.aulas.map((aula) => ({ ...aula, professor: aula.professor || curso.professor }))
    : [
        {
          id: `${curso.id}-video`,
          titulo: curso.titulo,
          duracao: curso.duracao,
          videoUrl: curso.videoUrl || curso.youtubeUrl,
          descricao: curso.descricao,
          professor: curso.professor,
        },
      ]
  const modulos = curso.modulos?.length
    ? curso.modulos.map((modulo) => ({
        ...modulo,
        aulas: (modulo.aulas || []).map((aula) => ({ ...aula, professor: aula.professor || curso.professor })),
      }))
    : [
        {
          id: `${curso.id}-conteudo`,
          titulo: 'Conteúdo do curso',
          descricao: curso.destaque,
          aulas,
        },
      ]

  return {
    ...curso,
    tipoConteudo: 'curso',
    tempoSugerido: curso.tempoSugerido || '',
    tecnologias: [curso.tecnologia],
    modulos,
  }
}

export function encontrarConteudo(conteudoId) {
  const trilha = trilhas.find((item) => item.id === conteudoId)
  if (trilha) return { ...trilha, tipoConteudo: 'trilha' }

  const curso = cursos.find((item) => item.id === conteudoId)
  return curso ? cursoComoConteudo(curso) : null
}

export function cursosDaTrilha(trilhaId) {
  const trilha = trilhas.find((item) => item.id === trilhaId)

  if (trilha?.cursoIds?.length) {
    return trilha.cursoIds.map((cursoId) => cursos.find((curso) => curso.id === cursoId)).filter(Boolean)
  }

  return cursos.filter((curso) => curso.trilhaIds?.includes(trilhaId))
}
