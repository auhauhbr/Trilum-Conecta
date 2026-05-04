import { BookOpen, CheckCircle2, Code2, Layers3, LockKeyhole, PlayCircle, Rocket } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '../../../componentes/interface/Badge'
import { Botao } from '../../../componentes/interface/Botao'
import { useApp } from '../../../contextos/AppContext'
import { cursosDaTrilha, encontrarConteudo } from '../../../servicos/conteudosCurso'
import { calcularProgresso } from '../../../servicos/recomendacoes'

export function DetalheCurso() {
  const { trilhaId } = useParams()
  const { progressoCursos } = useApp()
  const conteudo = encontrarConteudo(trilhaId)

  if (!conteudo) return <section className="pagina">Curso ou trilha não encontrada.</section>

  const progresso = calcularProgresso(conteudo, progressoCursos)
  const primeiraAula = conteudo.modulos[0]?.aulas[0]
  const totalAulas = conteudo.modulos.flatMap((modulo) => modulo.aulas).length
  const cursosRelacionados = conteudo.tipoConteudo === 'trilha' ? cursosDaTrilha(conteudo.id) : []
  const rotuloTipo = conteudo.tipoConteudo === 'trilha' ? 'Trilha completa' : 'Curso'
  const tempoSecundario = conteudo.tempoSugerido && conteudo.tempoSugerido !== conteudo.duracao ? conteudo.tempoSugerido : ''
  const professoresDasAulas = conteudo.modulos.flatMap((modulo) => modulo.aulas || []).map((aula) => aula.professor).filter(Boolean)
  const professores = [...new Set(professoresDasAulas.length ? professoresDasAulas : [conteudo.professor].filter(Boolean))]
  const professoresTexto = professores.length ? professores.join(', ') : 'Professores externos'
  const iniciaisProfessores = professores.length === 1 ? professores[0].slice(0, 2).toUpperCase() : `${professores.length}P`

  function cursoRelacionadoDoModulo(modulo) {
    if (!cursosRelacionados.length) return null

    const aulasDoModulo = new Set((modulo.aulas || []).map((aula) => aula.id))
    const relacionadoPorAula = cursosRelacionados.find((curso) => (curso.aulas || []).some((aula) => aulasDoModulo.has(aula.id)))

    return relacionadoPorAula || null
  }

  return (
    <section className="pagina detalhe-curso">
      <header className="curso-hero curso-hero-apresentacao">
        <div>
          <Badge tone="brand">{rotuloTipo}</Badge>
          <h1>{conteudo.titulo}</h1>
          <p>{conteudo.descricao}</p>

          <div className="curso-features">
            <span>
              <BookOpen size={20} />
              {totalAulas} {totalAulas === 1 ? 'aula' : 'aulas'}
            </span>
            <span>
              <Code2 size={20} />
              {conteudo.nivel}
            </span>
            <span>
              <Rocket size={20} />
              {conteudo.destaque}
            </span>
          </div>
        </div>

        <div className="curso-resumo curso-resumo-destaque">
          <strong>{conteudo.categoria}</strong>
          <span>{conteudo.duracao}</span>
          {tempoSecundario && <span>{tempoSecundario}</span>}
          <div>
            <small>Progresso: {progresso}%</small>
            <div className="progresso">
              <span style={{ width: `${progresso}%` }} />
            </div>
          </div>
          {primeiraAula && (
            <Botao to={`/aluno/cursos/${conteudo.id}/aula/${primeiraAula.id}`}>
              <PlayCircle size={18} /> {progresso ? 'Continuar' : 'Começar'}
            </Botao>
          )}
        </div>
      </header>

      <main className="curso-conteudo-grid">
        <article className="course-info">
          <span className="eyebrow">Apresentação</span>
          <h2>O que você vai desenvolver</h2>
          <p>{conteudo.descricao}</p>
          <p>{conteudo.destaque}</p>
          <div className="professor-card">
            <span>{iniciaisProfessores}</span>
            <div>
              <strong>{professoresTexto}</strong>
              <small>Professor(es) responsável(is) pelos vídeos selecionados para este conteúdo.</small>
            </div>
          </div>
        </article>

        <aside className="curso-modulos-sidebar">
          {conteudo.modulos.map((modulo, indice) => {
            const cursoRelacionado = cursoRelacionadoDoModulo(modulo)

            return (
              <section className="modulo-bloco modulo-bloco-compacto" key={modulo.id}>
                <div className="modulo-header-linha">
                  <span className="mod-idx">{indice + 1}</span>
                  <div>
                    <span className="eyebrow">Nível {indice + 1}</span>
                    <h2>{modulo.titulo}</h2>
                  </div>
                </div>
                <p>{modulo.descricao}</p>
                {modulo.aviso && <p className="modulo-aviso">{modulo.aviso}</p>}

                {conteudo.tipoConteudo === 'trilha' && cursoRelacionado && (
                  <Link className="curso-link-mini" to={`/aluno/cursos/${cursoRelacionado.id}`}>
                    <Layers3 size={17} />
                    <span>Ir ao curso: {cursoRelacionado.titulo}</span>
                  </Link>
                )}

                <div className="aulas-lista">
                  {modulo.aulas.map((aula) => {
                    const concluida = progressoCursos[aula.id]
                    return (
                      <Link className="aula-item" key={aula.id} to={`/aluno/cursos/${conteudo.id}/aula/${aula.id}`}>
                        {concluida ? <CheckCircle2 size={20} /> : <PlayCircle size={20} />}
                        <div>
                          <strong>{aula.titulo}</strong>
                          <span>{aula.descricao}</span>
                        </div>
                        <small>{aula.duracao}</small>
                      </Link>
                    )
                  })}
                  {conteudo.tipoConteudo === 'trilha' && (
                    <div className="aula-item bloqueado">
                      <LockKeyhole size={19} />
                      <div>
                        <strong>Quiz - {modulo.titulo.replace('Nivel ', '').replace('Nível ', '')}</strong>
                        <span>Atividade avaliativa liberada após concluir as aulas do módulo.</span>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )
          })}
        </aside>
      </main>
    </section>
  )
}
