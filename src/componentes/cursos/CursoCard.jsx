import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

function obterYoutubeId(url = '') {
  const match = url.match(/(?:embed\/|watch\?v=|youtu\.be\/)([^?&/]+)/)
  return match?.[1]
}

function obterThumbnail(curso) {
  if (curso.thumbnailUrl) return curso.thumbnailUrl
  const videoUrl = curso.aulas?.[0]?.videoUrl || curso.videoUrl || curso.youtubeUrl
  const videoId = obterYoutubeId(videoUrl)
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
}

export function CursoCard({ curso, motivo }) {
  const thumbnail = obterThumbnail(curso)

  return (
    <Link className="curso-card card-interativo" to={`/aluno/cursos/${curso.id}`}>
      <div className="curso-thumb-card">{thumbnail ? <img src={thumbnail} alt="" /> : <span>{curso.tecnologia}</span>}</div>
      <h3>{curso.titulo}</h3>
      <p className="card-professor">{curso.professor || 'Professor externo'}</p>
      <div className="card-preview">
        <strong>{curso.titulo}</strong>
        <small>{curso.professor || 'Professor externo'}</small>
        <p>{curso.descricao}</p>
        {motivo && <small>{motivo}</small>}
        <small className="preview-meta">
          <Clock size={14} /> {curso.duracao} · {curso.nivel}
        </small>
        <span>Ir para o curso</span>
        <ArrowRight size={16} />
      </div>
    </Link>
  )
}
