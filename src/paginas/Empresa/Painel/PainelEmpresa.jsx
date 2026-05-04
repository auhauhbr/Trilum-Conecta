import { BriefcaseBusiness, CheckCircle2, Plus, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { Avatar } from '../../../componentes/perfis/Avatar'
import { useApp } from '../../../contextos/AppContext'

function statusClasse(status) {
  return status === 'ativa' ? 'status-chip status-ativa' : 'status-chip status-encerrada'
}

function statusRotulo(status) {
  return status === 'ativa' ? 'Ativa' : 'Encerrada'
}

export function PainelEmpresa() {
  const { usuarioAtual, vagasEmpresa } = useApp()
  const minhasVagas = vagasEmpresa.filter((vaga) => vaga.empresaId === usuarioAtual?.id || usuarioAtual?.id === 'empresa-1')
  const ativas = minhasVagas.filter((vaga) => vaga.status === 'ativa').length
  const candidatos = minhasVagas.reduce((total, vaga) => total + Number(vaga.candidatos || 0), 0)
  const capaStyle = usuarioAtual?.capaUrl
    ? { backgroundImage: `url("${usuarioAtual.capaUrl}")` }
    : { background: usuarioAtual?.capa }

  return (
    <section className="pagina dashboard empresa-dashboard-page">
      <div className="empresa-hero empresa-hero-profile empresa-dashboard-hero" style={capaStyle}>
        <Avatar texto={usuarioAtual?.logo || 'EM'} imagem={usuarioAtual?.logoUrl} grande />
        <div className="empresa-dashboard-info">
          <span className="eyebrow">Painel da empresa</span>
          <h1>{usuarioAtual?.nome}</h1>
          <p>{usuarioAtual?.descricao || 'Adicione uma descrição no perfil da empresa para apresentar melhor sua marca aos candidatos.'}</p>
        </div>
        <Botao className="botao botao-primary botao-quadrado" to="/empresa/criar-vaga">
          <Plus size={18} /> Criar vaga
        </Botao>
      </div>

      <div className="empresa-metricas-compactas">
        <article>
          <BriefcaseBusiness size={20} />
          <span>Vagas publicadas</span>
          <strong>{minhasVagas.length}</strong>
        </article>
        <article>
          <CheckCircle2 size={20} />
          <span>Vagas ativas</span>
          <strong>{ativas}</strong>
        </article>
        <article>
          <UsersRound size={20} />
          <span>Candidatos</span>
          <strong>{candidatos}</strong>
        </article>
      </div>

      <div className="secao-cabecalho linha empresa-section-head">
        <div>
          <span className="eyebrow">Publicadas</span>
          <h2>Vagas recentes</h2>
        </div>
        <Botao className="botao botao-secondary botao-quadrado" to="/empresa/gerenciar-vagas" variant="secondary">
          Gerenciar vagas
        </Botao>
      </div>
      <div className="empresa-vagas-recentes">
        {minhasVagas.slice(0, 4).map((vaga) => (
          <Link className="empresa-vaga-row" key={vaga.id} to={`/empresa/vagas/${vaga.id}/candidatos`}>
            <div className="empresa-vaga-titulo">
              <Avatar texto={usuarioAtual?.logo || 'EM'} imagem={usuarioAtual?.logoUrl} />
              <div>
                <small>{usuarioAtual?.nome}</small>
                <strong>{vaga.titulo}</strong>
              </div>
            </div>
            <div className="empresa-vaga-candidatos">
              <span>Número de candidatos</span>
              <strong>{vaga.candidatos || 0}</strong>
            </div>
            <div className="empresa-vaga-meta">
              <span>Data publicação: {vaga.publicadaEm}</span>
              <span>Status: <b className={statusClasse(vaga.status)}>{statusRotulo(vaga.status)}</b></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
