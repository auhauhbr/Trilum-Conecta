import { BriefcaseBusiness, CheckCircle2, Plus, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { MentorEmpresaToast } from '../../../componentes/interface/MentorEmpresaToast'
import { Avatar } from '../../../componentes/perfis/Avatar'
import { useApp } from '../../../contextos/AppContext'
import { contarCandidatosDasVagas, metricasCandidatosDaVaga } from '../../../servicos/candidaturas'

function statusClasse(status) {
  return status === 'ativa' ? 'status-chip status-ativa' : 'status-chip status-encerrada'
}

function statusRotulo(status) {
  return status === 'ativa' ? 'Ativa' : 'Encerrada'
}

function classeModalidade(modalidade = '') {
  const texto = modalidade.toLowerCase()
  if (texto.includes('presencial')) return 'presencial'
  if (texto.includes('híbrido') || texto.includes('hibrido')) return 'hibrido'
  return 'remoto'
}

function publicadaNasUltimas24Horas(dataPublicacao) {
  if (!dataPublicacao) return false
  const publicadaEm = new Date(dataPublicacao.includes('T') ? dataPublicacao : `${dataPublicacao}T00:00:00`)
  if (Number.isNaN(publicadaEm.getTime())) return false

  const agora = new Date()
  const diff = agora.getTime() - publicadaEm.getTime()
  return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000
}

export function PainelEmpresa() {
  const { usuarioAtual, vagasEmpresa, candidatos, candidaturas } = useApp()
  const minhasVagas = vagasEmpresa.filter((vaga) => vaga.empresaId === usuarioAtual?.id)
  const vagasRecentes = minhasVagas
    .filter((vaga) => publicadaNasUltimas24Horas(vaga.publicadaEm))
    .sort((a, b) => new Date(`${b.publicadaEm}T00:00:00`) - new Date(`${a.publicadaEm}T00:00:00`))
    .slice(0, 4)
  const ativas = minhasVagas.filter((vaga) => vaga.status === 'ativa').length
  const totalCandidatos = contarCandidatosDasVagas(minhasVagas, candidatos, candidaturas)
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
          <p>
            {usuarioAtual?.descricaoCurta ||
              usuarioAtual?.descricao ||
              'Adicione uma descrição no perfil da empresa para apresentar melhor sua marca aos candidatos.'}
          </p>
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
          <strong>{totalCandidatos}</strong>
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
        {vagasRecentes.map((vaga) => {
          const metricas = metricasCandidatosDaVaga(vaga.id, candidatos, candidaturas)

          return (
            <Link className="empresa-vaga-row empresa-job-row" key={vaga.id} to={`/empresa/vagas/${vaga.id}/candidatos`}>
              <div className="empresa-job-row-main">
                <div className="empresa-job-badges">
                  <span className="empresa-job-badge-status">{statusRotulo(vaga.status)}</span>
                  <span className={`empresa-job-badge-${classeModalidade(vaga.modalidade)}`}>{vaga.modalidade}</span>
                  <span>{vaga.tipo}</span>
                  <span>{vaga.nivel}</span>
                </div>
                <strong>{vaga.titulo}</strong>
                <small>{usuarioAtual?.nome}</small>
              </div>

              <div className="empresa-job-row-info">
                <span>Candidatos</span>
                <strong>{metricas.total}</strong>
                <small>{metricas.emAnalise} em análise</small>
              </div>

              <div className="empresa-job-row-info empresa-job-row-wide">
                <span>Salário oferecido</span>
                <strong>{vaga.salario || 'A combinar'}</strong>
                <small>Publicado em {vaga.publicadaEm}</small>
              </div>

              <div className="empresa-job-row-status">
                <b className={statusClasse(vaga.status)}>{statusRotulo(vaga.status)}</b>
              </div>
            </Link>
          )
        })}

        {!vagasRecentes.length && (
          <div className="vagas-empty">
            <h2>Nenhuma vaga publicada nas últimas 24 horas</h2>
            <p>As vagas antigas continuam disponíveis em Gerenciar vagas.</p>
          </div>
        )}
      </div>

      <MentorEmpresaToast
        empresaAtual={usuarioAtual}
        tela="painel"
        vagas={minhasVagas}
        candidatos={candidatos}
        candidaturas={candidaturas}
      />
    </section>
  )
}
