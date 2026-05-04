import { ArrowLeft, Check, Download, UsersRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Badge } from '../../../componentes/interface/Badge'
import { Botao } from '../../../componentes/interface/Botao'
import { useApp } from '../../../contextos/AppContext'
import { cursos } from '../../../dados/cursos'
import { baixarCertificadoPdf } from '../../../servicos/certificados'

function encontrarCurso(nome) {
  const termo = nome.toLowerCase()
  return cursos.find((curso) => curso.titulo.toLowerCase().includes(termo) || termo.includes(curso.titulo.toLowerCase()))
}

export function PerfilCandidato() {
  const { vagaId, candidatoId } = useParams()
  const { vagasEmpresa, candidatos } = useApp()
  const vaga = vagasEmpresa.find((item) => item.id === vagaId)
  const candidato = candidatos.find((item) => item.id === candidatoId)

  if (!candidato) {
    return (
      <section className="pagina perfil-candidato-page">
        <div className="perfil-candidato-header">
          <h1>Candidato não encontrado</h1>
          <Link className="botao botao-secondary" to={`/empresa/vagas/${vagaId}/candidatos`}>
            <ArrowLeft size={16} /> Voltar
          </Link>
        </div>
        <p>O candidato selecionado não existe ou foi removido.</p>
      </section>
    )
  }

  return (
    <section className="pagina perfil-candidato-page">
      <div className="perfil-candidato-header">
        <div>
          <span className="eyebrow">Perfil do candidato</span>
          <h1>{candidato.nome}</h1>
          <p>{candidato.cargo}</p>
        </div>
        <Link className="botao botao-secondary" to={`/empresa/vagas/${vagaId}/candidatos`}>
          <ArrowLeft size={16} /> Voltar
        </Link>
      </div>

      <div className="perfil-candidato-grid">
        <section className="perfil-candidato-card">
          <div className="perfil-candidato-topo">
            <span className="avatar">{candidato.nome.split(' ').map((parte) => parte[0]).slice(0, 2).join('')}</span>
            <div>
              <strong>{candidato.nome}</strong>
              <span>{candidato.cargo}</span>
            </div>
          </div>
          <div className="perfil-candidato-meta">
            <Badge tone={candidato.status === 'Reprovado' ? 'danger' : candidato.status === 'Selecionado' ? 'success' : 'brand'}>
              {candidato.status}
            </Badge>
            <span>Aderência estimada: {candidato.aderencia}%</span>
            {vaga && <span>Vaga relacionada: {vaga.titulo}</span>}
          </div>
        </section>

        <section className="perfil-candidato-card">
          <h2>Cursos realizados</h2>
          <div className="perfil-candidato-lista">
            {candidato.cursos.map((cursoNome) => {
              const curso = encontrarCurso(cursoNome)
              return (
                <div className="perfil-candidato-item" key={cursoNome}>
                  {curso?.thumbnailUrl && <img src={curso.thumbnailUrl} alt={cursoNome} />}
                  <div>
                    <strong>{cursoNome}</strong>
                  </div>
                  <Botao
                    className="botao botao-secondary botao-quadrado"
                    variant="secondary"
                    onClick={() =>
                      baixarCertificadoPdf({
                        aluno: candidato.nome,
                        curso: cursoNome,
                        professor: curso?.professor || 'RiseUp',
                        horas: curso?.duracao || 'Não informada',
                      })
                    }
                  >
                    <Download size={16} /> Ver certificado
                  </Botao>
                </div>
              )
            })}
          </div>
        </section>

        <section className="perfil-candidato-card">
          <h2>Tecnologias</h2>
          <div className="perfil-candidato-tags">
            {candidato.tecnologias.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
