import { AlertTriangle, BriefcaseBusiness, CalendarDays, CheckCircle2, Clock3, Eye, MapPin, Pencil, Power, Search, Trash2, UsersRound, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { MentorEmpresaToast } from '../../../componentes/interface/MentorEmpresaToast'
import { useApp } from '../../../contextos/AppContext'
import { metricasCandidatosDaVaga } from '../../../servicos/candidaturas'
import { filtrarPorTextoEStatus } from '../../../servicos/filtros'
import { analisarQualidadeVaga } from '../../../servicos/empresaInteligencia'

function statusRotulo(status) {
  return status === 'ativa' ? 'Ativa' : 'Encerrada'
}

function classeModalidade(modalidade = '') {
  const texto = modalidade.toLowerCase()
  if (texto.includes('presencial')) return 'presencial'
  if (texto.includes('híbrido') || texto.includes('hibrido')) return 'hibrido'
  return 'remoto'
}

function tagsDaVaga(vaga) {
  return Array.isArray(vaga.tags) ? vaga.tags.slice(0, 5) : []
}

function textoCurto(texto = '', limite = 150) {
  if (texto.length <= limite) return texto
  return `${texto.slice(0, limite).trim()}...`
}

function PreviewCard({ vaga, empresa, totalCandidatos }) {
  return (
    <article className="job-card job-card-candidato">
      <header className="job-card-header">
        <div className="job-badges">
          <span className={`job-badge badge-${classeModalidade(vaga.modalidade)}`}>{vaga.modalidade}</span>
          <span className="job-badge badge-tipo">{vaga.tipo}</span>
          <span className="job-badge badge-nivel">{vaga.nivel}</span>
        </div>
        <h3 className="job-title">{vaga.titulo}</h3>
        <div className="job-company">
          <span className="company-logo">{empresa?.logoUrl ? <img src={empresa.logoUrl} alt="" /> : empresa?.logo || 'AV'}</span>
          {empresa?.nome}
        </div>
      </header>
      <div className="job-card-body">
        <p className="job-section-label">Salário</p>
        <strong className="job-salary">{vaga.salario || 'A combinar'}</strong>
        <p className="job-section-label">Descrição</p>
        <p className="job-description">{vaga.descricao}</p>
        <p className="job-section-label">Tecnologias</p>
        <div className="job-tags">
          {tagsDaVaga(vaga).map((tag) => (
            <span className="job-tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <footer className="job-card-footer">
        <span className="job-stats">
          <span className="stat-item">
            <strong className="stat-number">{totalCandidatos}</strong> {totalCandidatos === 1 ? 'candidato' : 'candidatos'}
          </span>
        </span>
        <span className="job-actions">
          <span className="btn btn-secondary">Salvar</span>
          <strong className="btn btn-primary">Ver detalhes</strong>
        </span>
      </footer>
    </article>
  )
}

function PreviewTelaVagas({ vaga, empresa }) {
  const [abaAtiva, setAbaAtiva] = useState('vaga')

  return (
    <div className="vaga-preview-board-demo">
      <button className="vaga-list-card vaga-list-job-card ativo" type="button">
        <header className="job-card-header">
          <div className="job-badges">
            <span className={`job-badge badge-${classeModalidade(vaga.modalidade)}`}>{vaga.modalidade}</span>
            <span className="job-badge badge-tipo">{vaga.tipo}</span>
            <span className="job-badge badge-nivel">{vaga.nivel}</span>
          </div>
          <h2 className="job-title">{vaga.titulo}</h2>
          <div className="job-company">
            <span className="company-logo">{empresa?.logoUrl ? <img src={empresa.logoUrl} alt="" /> : empresa?.logo || 'AV'}</span>
            {empresa?.nome}
          </div>
        </header>
        <div className="job-card-body">
          <p className="job-section-label">Salário</p>
          <strong className="job-salary">{vaga.salario || 'A combinar'}</strong>
          <p className="job-section-label">Descrição</p>
          <p className="job-description">{textoCurto(vaga.descricao)}</p>
          <div className="job-tags">
            {tagsDaVaga(vaga).slice(0, 4).map((tag) => (
              <span className="job-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </button>

      <article className="vaga-detalhe-preview">
        <header>
          <span className="vaga-nova">Nova vaga</span>
          <span className="vaga-detalhe-logo">{empresa?.logoUrl ? <img src={empresa.logoUrl} alt="" /> : empresa?.logo || 'AV'}</span>
          <h1>{vaga.titulo}</h1>
          <strong>{empresa?.nome}</strong>
          <p>{vaga.localizacao}</p>
          <p>{vaga.salario || 'Salário a combinar'}</p>
          <div className="vaga-preview-meta">
            <span><BriefcaseBusiness size={16} /> {vaga.modalidade}</span>
            <span><Clock3 size={16} /> {vaga.tipo}</span>
            <span><CalendarDays size={16} /> {vaga.publicadaEm}</span>
          </div>
        </header>
        <nav className="vaga-preview-tabs" aria-label="Preview">
          <button className={abaAtiva === 'vaga' ? 'ativo' : ''} type="button" onClick={() => setAbaAtiva('vaga')}>
            Vaga
          </button>
          <button className={abaAtiva === 'empresa' ? 'ativo' : ''} type="button" onClick={() => setAbaAtiva('empresa')}>
            Empresa
          </button>
        </nav>
        {abaAtiva === 'vaga' ? (
          <>
            <section>
              <h2>Descrição:</h2>
              <p>{vaga.descricao}</p>
            </section>
            <section>
              <h2>Principais atividades:</h2>
              <ul>
                {(vaga.atividades || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h2>Perfil desejado:</h2>
              <ul>
                {(vaga.requisitos || []).map((item) => (
                  <li key={item}><CheckCircle2 size={15} /> {item}</li>
                ))}
              </ul>
            </section>
            <footer>
              <MapPin size={16} />
              {vaga.modalidade} em {vaga.localizacao}
            </footer>
          </>
        ) : (
          <section className="vaga-empresa-detalhes">
            <div className="vaga-empresa-topo">
              <span className="avatar avatar-grande">
                {empresa?.logoUrl ? <img src={empresa.logoUrl} alt="" /> : empresa?.logo || 'AV'}
              </span>
              <div>
                <h2>{empresa?.nome || 'Empresa Trilum Conecta'}</h2>
                <p>{empresa?.localizacao || 'Brasil'}</p>
              </div>
            </div>
            <p>{empresa?.descricao || 'Empresa parceira da Trilum Conecta em busca de talentos em formacao.'}</p>
            <dl>
              {empresa?.setor && (
                <div>
                  <dt>Setor:</dt>
                  <dd>{empresa.setor}</dd>
                </div>
              )}
              {empresa?.tamanho && (
                <div>
                  <dt>Tamanho:</dt>
                  <dd>{empresa.tamanho}</dd>
                </div>
              )}
              {empresa?.hub && (
                <div>
                  <dt>Hub:</dt>
                  <dd>{empresa.hub}</dd>
                </div>
              )}
            </dl>
            {!!empresa?.especialidades?.length && (
              <div className="vaga-empresa-tags">
                {empresa.especialidades.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            )}
          </section>
        )}
      </article>
    </div>
  )
}

export function GerenciarVagas() {
  const { usuarioAtual, vagasEmpresa, candidatos, candidaturas, atualizarStatusVaga, excluirVaga } = useApp()
  const [busca, setBusca] = useState('')
  const [status, setStatus] = useState('todos')
  const [vagaPreview, setVagaPreview] = useState(null)
  const [modoPreview, setModoPreview] = useState('card')
  const minhas = vagasEmpresa.filter((vaga) => vaga.empresaId === usuarioAtual?.id)
  const filtradas = filtrarPorTextoEStatus(minhas, busca, status)

  return (
    <section className="pagina empresa-gerenciar-page">
      <div className="secao-cabecalho linha">
        <div>
          <span className="eyebrow">Gerenciar</span>
          <h1>Vagas publicadas</h1>
          <p className="empresa-gerenciar-subtitle">Visão da empresa com estatísticas e ações de gestão.</p>
        </div>
        <Botao className="botao botao-primary botao-quadrado" to="/empresa/criar-vaga">
          Criar vaga
        </Botao>
      </div>

      <div className="filtros">
        <label className="busca">
          <Search size={18} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar vaga" />
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todos">Todos os status</option>
          <option value="ativa">Ativas</option>
          <option value="encerrada">Encerradas</option>
        </select>
      </div>

      <div className="empresa-gerenciar-lista">
        {filtradas.map((vaga) => {
          const metricas = metricasCandidatosDaVaga(vaga.id, candidatos, candidaturas)
          const diagnostico = analisarQualidadeVaga(vaga)

          return (
            <article className="empresa-job-manage-card" key={vaga.id}>
              <header className="job-card-header">
                <div className="empresa-job-badges">
                  <span className="empresa-job-badge-status">{statusRotulo(vaga.status)}</span>
                  <span className={`empresa-job-badge-${classeModalidade(vaga.modalidade)}`}>{vaga.modalidade}</span>
                  <span>{vaga.tipo}</span>
                  <span>{vaga.nivel}</span>
                </div>
                <h3 className="job-title">{vaga.titulo}</h3>
                <div className="job-company">
                  <span className="company-logo">{usuarioAtual?.logoUrl ? <img src={usuarioAtual.logoUrl} alt="" /> : usuarioAtual?.logo || 'AV'}</span>
                  {usuarioAtual?.nome}
                </div>
              </header>

              <div className="job-card-body">
                <p className="job-section-label">Salário oferecido</p>
                <strong className="job-salary">{vaga.salario || 'A combinar'}</strong>
                <div className="job-meta">
                  <span className="job-meta-item"><Clock3 size={16} /> Publicado em {vaga.publicadaEm}</span>
                </div>
                <p className="job-section-label">Tecnologias</p>
                <div className="job-tags">
                  {tagsDaVaga(vaga).map((tag) => (
                    <span className="job-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="empresa-vaga-diagnostico">
                  <div>
                    <span>Qualidade da vaga</span>
                    <strong>{diagnostico.pontuacao}% · {diagnostico.nivel}</strong>
                  </div>
                  <div className="empresa-inteligencia-barra"><i style={{ width: `${diagnostico.pontuacao}%` }} /></div>
                  <p className={`empresa-vaga-diagnostico-${metricas.total === 0 ? 'alerta' : diagnostico.severidade}`}>
                    {metricas.total === 0 || diagnostico.severidade === 'erro' || diagnostico.severidade === 'alerta'
                      ? <AlertTriangle size={14} />
                      : <CheckCircle2 size={14} />}
                    {metricas.total === 0 ? 'Ainda sem candidatos. Revise atratividade e tags.' : diagnostico.alertaPrincipal}
                  </p>
                </div>
              </div>

              <footer className="job-card-footer empresa-job-manage-footer">
                <div className="job-stats">
                  <span className="stat-item"><strong className="stat-number">{metricas.total}</strong> {metricas.total === 1 ? 'candidato' : 'candidatos'}</span>
                  <span className="stat-item"><strong className="stat-number">{metricas.emAnalise}</strong> em análise</span>
                  <span className="stat-item"><strong className="stat-number">{metricas.entrevistas}</strong> entrevistas</span>
                </div>
                <div className="job-actions">
                  <Link className="btn btn-secondary" to={`/empresa/vagas/${vaga.id}/editar`}>
                    <Pencil size={16} /> Editar
                  </Link>
                  <Link className="btn btn-primary" to={`/empresa/vagas/${vaga.id}/candidatos`}>
                    <UsersRound size={16} /> Ver candidatos
                  </Link>
                  <button className="btn btn-secondary" type="button" onClick={() => atualizarStatusVaga(vaga.id, vaga.status === 'ativa' ? 'encerrada' : 'ativa')}>
                    <Power size={16} /> {vaga.status === 'ativa' ? 'Encerrar' : 'Reativar'}
                  </button>
                  <button className="btn btn-secondary" type="button" onClick={() => setVagaPreview(vaga)}>
                    <Eye size={16} /> Ver vaga
                  </button>
                  <button className="btn btn-secondary btn-danger-soft" type="button" onClick={() => excluirVaga(vaga.id)}>
                    <Trash2 size={16} /> Excluir
                  </button>
                </div>
              </footer>
            </article>
          )
        })}
      </div>

      {vagaPreview && (
        <div className="vaga-preview-modal" role="dialog" aria-modal="true" aria-label="Preview da vaga">
          <div className="vaga-preview-modal-backdrop" onClick={() => setVagaPreview(null)} />
          <div className={modoPreview === 'board' ? 'vaga-preview-modal-shell vaga-preview-modal-shell-wide' : 'vaga-preview-modal-shell'}>
            <button className="vaga-preview-modal-close" type="button" onClick={() => setVagaPreview(null)} aria-label="Fechar preview">
              <X size={18} />
            </button>
            <header className="vaga-preview-modal-top">
              <div>
                <span className="eyebrow">Preview da vaga</span>
                <h2>{vagaPreview.titulo}</h2>
              </div>
              <div className="vaga-preview-toggle">
                <button className={modoPreview === 'card' ? 'ativo' : ''} type="button" onClick={() => setModoPreview('card')}>
                  Card
                </button>
                <button className={modoPreview === 'board' ? 'ativo' : ''} type="button" onClick={() => setModoPreview('board')}>
                  Tela de vagas
                </button>
              </div>
            </header>
            {modoPreview === 'card' ? (
              <PreviewCard
                vaga={vagaPreview}
                empresa={usuarioAtual}
                totalCandidatos={metricasCandidatosDaVaga(vagaPreview.id, candidatos, candidaturas).total}
              />
            ) : (
              <PreviewTelaVagas key={vagaPreview.id} vaga={vagaPreview} empresa={usuarioAtual} />
            )}
          </div>
        </div>
      )}
      <MentorEmpresaToast
        empresaAtual={usuarioAtual}
        tela="gerenciar-vagas"
        vagas={minhas}
        candidatos={candidatos}
        candidaturas={candidaturas}
      />
    </section>
  )
}
