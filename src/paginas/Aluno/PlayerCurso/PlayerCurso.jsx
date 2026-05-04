import { CheckCircle2, ChevronLeft, PlayCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { useApp } from '../../../contextos/AppContext'
import { encontrarConteudo } from '../../../servicos/conteudosCurso'
import { calcularProgresso, encontrarAula } from '../../../servicos/recomendacoes'

export function PlayerCurso() {
  const { trilhaId, aulaId } = useParams()
  const { progressoCursos, alternarAula } = useApp()
  const conteudo = encontrarConteudo(trilhaId)
  const aula = conteudo ? encontrarAula(conteudo, aulaId) : null

  if (!conteudo || !aula) return <section className="pagina">Aula não encontrada.</section>

  const progresso = calcularProgresso(conteudo, progressoCursos)
  const concluida = progressoCursos[aula.id]
  const capitulos = aula.capitulos || []

  return (
    <section className="player-page">
      <div className="player-topbar">
        <Link to={`/aluno/cursos/${conteudo.id}`}>
          <ChevronLeft size={18} /> Voltar
        </Link>
        <strong>{conteudo.titulo}</strong>
        <span>{progresso}% completo</span>
      </div>
      <div className="player-grid">
        <main className="player-main">
          <div className="video-frame">
            <iframe src={aula.videoUrl} title={aula.titulo} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <div className="player-info">
            <span className="eyebrow">{aula.modulo.titulo}</span>
            <h1>{aula.titulo}</h1>
            <p>{aula.descricao}</p>
            <Botao onClick={() => alternarAula(aula.id)} variant={concluida ? 'secondary' : 'primary'}>
              {concluida ? <CheckCircle2 size={18} /> : <PlayCircle size={18} />}
              {concluida ? 'Marcar como não concluída' : 'Marcar aula como concluída'}
            </Botao>
            {capitulos.length > 0 && (
              <div className="capitulos-video">
                <h2>Grade do vídeo</h2>
                <div className="capitulos-grid">
                  {capitulos.map((capitulo) => (
                    <div className="capitulo-item" key={`${capitulo.inicio}-${capitulo.titulo}`}>
                      <span>{capitulo.fim ? `${capitulo.inicio} - ${capitulo.fim}` : capitulo.inicio}</span>
                      <strong>{capitulo.titulo}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {progresso >= 80 && (
            <div className="certificado-pop">
              <CheckCircle2 />
              <div>
                <strong>Certificado disponivel</strong>
                <span>Você atingiu o piso de conclusão desta trilha. Consulte em Meu Perfil.</span>
              </div>
            </div>
          )}
        </main>
        <aside className="player-sidebar">
          <h2>Conteudo do curso</h2>
          {conteudo.modulos.map((modulo) => (
            <details key={modulo.id} open>
              <summary>{modulo.titulo}</summary>
              {modulo.aulas.map((item) => (
                <Link className={item.id === aula.id ? 'sidebar-aula ativa' : 'sidebar-aula'} key={item.id} to={`/aluno/cursos/${conteudo.id}/aula/${item.id}`}>
                  {progressoCursos[item.id] ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}
                  <span>{item.titulo}</span>
                  <small>{item.duracao}</small>
                </Link>
              ))}
            </details>
          ))}
        </aside>
      </div>
    </section>
  )
}
