import { ArrowRight, Clock, Layers3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { modoApresentacao } from '../../dados/usuarios'

function obterYoutubeId(url = '') {
  const match = url.match(/(?:embed\/|watch\?v=|youtu\.be\/)([^?&/]+)/)
  return match?.[1]
}

function primeiraAula(trilha) {
  return trilha.modulos?.flatMap((modulo) => modulo.aulas || [])[0]
}

function professoresDaTrilha(trilha) {
  const nomes = trilha.modulos?.flatMap((modulo) => modulo.aulas || []).map((aula) => aula.professor).filter(Boolean) || []
  return [...new Set(nomes)].join(', ') || 'Professores externos'
}

export function TrilhaCard({ trilha, progresso = 0, origem = 'catalogo' }) {
  const aula = primeiraAula(trilha)
  const videoId = obterYoutubeId(aula?.videoUrl)
  const thumbnail = trilha.thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '')
  const professores = professoresDaTrilha(trilha)
  const conteudo = (
    <>
      <div className="curso-thumb-card trilha-thumb-card">{thumbnail ? <img src={thumbnail} alt="" /> : <span>{trilha.categoria}</span>}</div>
      <h3>{trilha.titulo}</h3>
      <p className="card-professor">{professores}</p>
      <div className="progresso">
        <span style={{ width: `${progresso}%` }} />
      </div>
      <div className="card-preview">
        <strong>{trilha.titulo}</strong>
        <small>{professores}</small>
        <p>{trilha.descricao}</p>
        <small className="preview-meta">
          <Clock size={14} /> {trilha.duracao} · <Layers3 size={14} /> {trilha.modulos.length} níveis
        </small>
        <span>{modoApresentacao.ativo ? 'Conferir trilha' : 'Ir para a trilha'}</span>
        <ArrowRight size={16} />
      </div>
    </>
  )

  if (modoApresentacao.ativo) {
    return <article className="trilha-card card-interativo">{conteudo}</article>
  }

  return (
    <Link className="trilha-card card-interativo" to={`/aluno/cursos/${trilha.id}?origem=${origem}`}>
      {conteudo}
    </Link>
  )
}
