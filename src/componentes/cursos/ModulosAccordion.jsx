import { CheckCircle2, ChevronDown, Layers3, LockKeyhole, PlayCircle } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { minutosParaDuracao, somarDuracoes } from '../../servicos/duracao'

const LIMITE_MODULOS_INICIAL = 10

function resumoDoModulo(modulo) {
  const aulas = modulo.aulas || []
  const totalAulas = aulas.length
  const duracao = minutosParaDuracao(somarDuracoes(aulas.map((aula) => aula.duracao)))

  return `${totalAulas} ${totalAulas === 1 ? 'aula' : 'aulas'}${totalAulas ? ` • ${duracao}` : ''}`
}

function agruparModulosPorCurso(modulos, cursoRelacionadoDoModulo) {
  if (!cursoRelacionadoDoModulo) return [{ id: 'conteudo', curso: null, modulos }]

  return modulos.reduce((grupos, modulo) => {
    const curso = cursoRelacionadoDoModulo(modulo)
    const idGrupo = curso?.id || `sem-curso-${grupos.length}`
    const ultimoGrupo = grupos[grupos.length - 1]

    if (ultimoGrupo?.id === idGrupo) {
      ultimoGrupo.modulos.push(modulo)
      return grupos
    }

    return [...grupos, { id: idGrupo, curso, modulos: [modulo] }]
  }, [])
}

export function ModulosAccordion({
  conteudo,
  progressoCursos = {},
  cursoRelacionadoDoModulo,
  aulaAtivaId,
  compacto = false,
  mostrarQuiz = false,
}) {
  const modulos = conteudo.modulos || []
  const primeiroModuloId = modulos[0]?.id
  const [modulosAbertos, setModulosAbertos] = useState(() => new Set(primeiroModuloId ? [primeiroModuloId] : []))
  const [mostrarTodos, setMostrarTodos] = useState(false)
  const modulosVisiveis = mostrarTodos ? modulos : modulos.slice(0, LIMITE_MODULOS_INICIAL)
  const todosVisiveisAbertos = modulosVisiveis.length > 0 && modulosVisiveis.every((modulo) => modulosAbertos.has(modulo.id))
  const modulosRestantes = Math.max(0, modulos.length - LIMITE_MODULOS_INICIAL)
  const aulas = modulos.flatMap((modulo) => modulo.aulas || [])
  const totalAulas = aulas.length
  const duracaoTotal = minutosParaDuracao(somarDuracoes(aulas.map((aula) => aula.duracao)))
  const gruposDeModulos = agruparModulosPorCurso(modulosVisiveis, cursoRelacionadoDoModulo)

  function alternarModulo(moduloId) {
    setModulosAbertos((atuais) => {
      const proximos = new Set(atuais)
      if (proximos.has(moduloId)) proximos.delete(moduloId)
      else proximos.add(moduloId)
      return proximos
    })
  }

  function alternarTodos() {
    setModulosAbertos(() => {
      if (todosVisiveisAbertos) return new Set()
      return new Set(modulosVisiveis.map((modulo) => modulo.id))
    })
  }

  return (
    <div className={compacto ? 'modulos-accordion compacto' : 'modulos-accordion'}>
      <div className="modulos-accordion-topo">
        <div>
          <h2>Conteúdo do curso</h2>
          <p>
            {modulos.length} {modulos.length === 1 ? 'seção' : 'seções'} • {totalAulas} {totalAulas === 1 ? 'aula' : 'aulas'} •
            Duração total: {duracaoTotal}
          </p>
        </div>
        {modulos.length > 1 && (
          <button type="button" onClick={alternarTodos}>
            {todosVisiveisAbertos ? 'Recolher todas as seções' : 'Expandir todas as seções'}
          </button>
        )}
      </div>

      <div className="modulos-accordion-lista">
        {gruposDeModulos.map((grupo, grupoIndice) => (
          <div className="modulos-curso-grupo" key={grupo.id}>
            {grupo.curso && (
              <div className="modulos-curso-topo">
                <span>Curso {grupoIndice + 1}</span>
                <Link to={`/aluno/cursos/${grupo.curso.id}`}>
                  <Layers3 size={17} />
                  {grupo.curso.titulo}
                </Link>
              </div>
            )}

            {grupo.modulos.map((modulo) => {
              const aberto = modulosAbertos.has(modulo.id)
              const indiceModulo = modulosVisiveis.findIndex((item) => item.id === modulo.id)

              return (
                <section className={aberto ? 'modulo-accordion-item aberto' : 'modulo-accordion-item'} key={modulo.id}>
                  <button type="button" className="modulo-accordion-resumo" onClick={() => alternarModulo(modulo.id)} aria-expanded={aberto}>
                    <ChevronDown size={18} />
                    <span className="mod-idx">{indiceModulo + 1}</span>
                    <strong>{modulo.titulo}</strong>
                    <small>{resumoDoModulo(modulo)}</small>
                  </button>

                  {aberto && (
                    <div className="modulo-accordion-corpo">
                      {modulo.descricao && <p>{modulo.descricao}</p>}
                      {modulo.aviso && <p className="modulo-aviso">{modulo.aviso}</p>}

                      <div className="aulas-lista">
                        {(modulo.aulas || []).map((aula) => {
                          const concluida = progressoCursos[aula.id]
                          return (
                            <Link
                              className={aula.id === aulaAtivaId ? 'aula-item ativa' : 'aula-item'}
                              key={aula.id}
                              to={`/aluno/cursos/${conteudo.id}/aula/${aula.id}`}
                            >
                              {concluida ? <CheckCircle2 size={20} /> : <PlayCircle size={20} />}
                              <div>
                                <strong>{aula.titulo}</strong>
                                {!compacto && <span>{aula.descricao}</span>}
                              </div>
                              <small>{aula.duracao}</small>
                            </Link>
                          )
                        })}

                        {mostrarQuiz && (
                          <div className="aula-item bloqueado">
                            <LockKeyhole size={19} />
                            <div>
                              <strong>Quiz - {modulo.titulo.replace('Nivel ', '').replace('Nível ', '')}</strong>
                              <span>Atividade avaliativa liberada apos concluir as aulas do modulo.</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        ))}
      </div>

      {!mostrarTodos && modulosRestantes > 0 && (
        <button className="modulos-ver-mais" type="button" onClick={() => setMostrarTodos(true)}>
          mais {modulosRestantes} {modulosRestantes === 1 ? 'seção' : 'seções'}
        </button>
      )}
    </div>
  )
}
