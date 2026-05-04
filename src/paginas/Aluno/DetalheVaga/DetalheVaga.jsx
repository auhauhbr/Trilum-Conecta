import { BriefcaseBusiness, CheckCircle2, MapPin, MessageSquare } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Badge } from '../../../componentes/interface/Badge'
import { Botao } from '../../../componentes/interface/Botao'
import { useApp } from '../../../contextos/AppContext'

export function DetalheVaga() {
  const { vagaId } = useParams()
  const { empresas, usuarioAtual, candidaturas, vagasEmpresa, candidatar, cancelarCandidatura } = useApp()
  const vaga = vagasEmpresa.find((item) => item.id === vagaId)
  const empresa = empresas.find((item) => item.id === vaga?.empresaId)
  const candidatura = candidaturas.find((item) => item.vagaId === vagaId && item.alunoId === usuarioAtual?.id)

  if (!vaga) return <section className="pagina">Vaga nao encontrada.</section>

  return (
    <section className="pagina detalhe-vaga">
      <div className="vaga-hero">
        <div>
          <Badge tone={vaga.status === 'ativa' ? 'success' : 'neutral'}>{vaga.status}</Badge>
          <h1>{vaga.titulo}</h1>
          <p>{vaga.descricao}</p>
          <div className="meta-linha grande">
            <span>
              <BriefcaseBusiness size={18} />
              {vaga.tipo} · {vaga.nivel}
            </span>
            <span>
              <MapPin size={18} />
              {vaga.localizacao} · {vaga.modalidade}
            </span>
            <span>{vaga.salario}</span>
          </div>
          <div className="linha-acoes">
            {candidatura ? (
              <Botao variant="secondary" onClick={() => cancelarCandidatura(vaga.id)}>
                Cancelar candidatura
              </Botao>
            ) : (
              <Botao disabled={vaga.status !== 'ativa'} onClick={() => candidatar(vaga.id)}>
                Candidatar-se
              </Botao>
            )}
            <Botao variant="ghost" disabled={!candidatura}>
              <MessageSquare size={18} /> Chat com recrutador
            </Botao>
          </div>
          {candidatura && (
            <div className="feedback-sucesso">
              <CheckCircle2 />
              Candidatura registrada. Status: {candidatura.status}. Atualizado em {candidatura.atualizadoEm}.
            </div>
          )}
        </div>
        <aside className="empresa-box">
          <span className="avatar avatar-grande">{empresa?.logo || 'UP'}</span>
          <h3>{empresa?.nome}</h3>
          <p>{empresa?.descricao}</p>
          <small>{empresa?.localizacao}</small>
        </aside>
      </div>

      <div className="grade-2">
        <section className="info-card">
          <h2>Requisitos</h2>
          <ul className="lista-check compacta">
            {vaga.requisitos.map((item) => (
              <li key={item}>
                <CheckCircle2 /> {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="info-card">
          <h2>Atividades</h2>
          <ul className="lista-check compacta">
            {vaga.atividades.map((item) => (
              <li key={item}>
                <CheckCircle2 /> {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
