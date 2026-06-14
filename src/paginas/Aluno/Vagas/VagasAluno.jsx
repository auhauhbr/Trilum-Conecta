import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe2,
  MapPin,
  MessageSquare,
  Search,
  Share2,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { MentorPaginaAlunoToast } from '../../../componentes/interface/MentorPaginaAlunoToast'
import { useApp } from '../../../contextos/AppContext'
import { mensagensVagas } from '../../../dados/mensagensMentorAluno'
import { filtrarVagas } from '../../../servicos/filtros'
import { gerarExplicacaoVaga, montarContextoMentorAluno } from '../../../servicos/mentorIA'
import { recomendarVagas } from '../../../servicos/recomendacoes'

const mapaMentorVagas = {
  filtros: 'vagas-filtros',
  lista: 'vagas-relevantes',
  detalhe: 'vagas-junior',
  tags: 'vagas-tags',
}

function textoCurto(texto, limite = 180) {
  if (!texto || texto.length <= limite) return texto || ''
  return `${texto.slice(0, limite).trim()}...`
}

function lista(valor) {
  return Array.isArray(valor) ? valor : []
}

function formatarEmpresa(empresa) {
  return empresa?.nome || 'Empresa Trilum Conecta'
}

function classeModalidade(modalidade = '') {
  const texto = modalidade.toLowerCase()
  if (texto.includes('presencial')) return 'presencial'
  if (texto.includes('híbrido') || texto.includes('hibrido')) return 'hibrido'
  return 'remoto'
}

function tagsDaVaga(vaga) {
  return Array.isArray(vaga.tags) ? vaga.tags.slice(0, 4) : []
}

export function VagasAluno() {
  const { usuarioAtual, respostasWizard, candidaturas, vagasEmpresa, empresas, candidatar, cancelarCandidatura } = useApp()
  const [searchParams, setSearchParams] = useSearchParams()
  const [busca, setBusca] = useState('')
  const [data, setData] = useState('todas')
  const [modelo, setModelo] = useState('todos')
  const [local, setLocal] = useState('')
  const [cargo, setCargo] = useState('')
  const [abaAtiva, setAbaAtiva] = useState('vaga')
  const selecionadaId = searchParams.get('vaga') || ''
  const vagaRefs = useRef(new Map())
  const listaRef = useRef(null)
  const detalheRef = useRef(null)
  const candidaturasDoAluno = useMemo(
    () => candidaturas.filter((item) => item.alunoId === usuarioAtual?.id),
    [candidaturas, usuarioAtual?.id],
  )

  const recomendadas = useMemo(
    () => recomendarVagas(respostasWizard, candidaturasDoAluno, vagasEmpresa, empresas),
    [respostasWizard, candidaturasDoAluno, vagasEmpresa, empresas],
  )

  const vagasComEmpresa = useMemo(
    () =>
      vagasEmpresa.map((vaga) => ({
        ...vaga,
        empresa: empresas.find((empresa) => empresa.id === vaga.empresaId),
        match: recomendadas.find((item) => item.id === vaga.id)?.match || 52,
      })),
    [empresas, recomendadas, vagasEmpresa],
  )

  const modelos = ['todos', ...new Set(vagasComEmpresa.map((vaga) => vaga.modalidade).filter(Boolean))]
  const filtradas = filtrarVagas(vagasComEmpresa, { termo: busca, data, modelo, local, cargo })
  const vagaAtiva = filtradas.find((vaga) => vaga.id === selecionadaId) || filtradas[0]
  const candidatura = candidaturasDoAluno.find((item) => item.vagaId === vagaAtiva?.id)
  const empresaAtiva = vagaAtiva?.empresa
  const contextoMentorVaga = vagaAtiva
    ? montarContextoMentorAluno({
        usuarioAtual,
        respostasWizard,
        vagasRecomendadas: [vagaAtiva],
      })
    : null

  useEffect(() => {
    if (!selecionadaId) return undefined

    const timer = window.setTimeout(() => {
      const cardSelecionado = vagaRefs.current.get(selecionadaId)
      const emTelaPequena = window.matchMedia('(max-width: 980px)').matches

      if (emTelaPequena) {
        detalheRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (cardSelecionado && listaRef.current) {
          listaRef.current.scrollTo({
            top: Math.max(cardSelecionado.offsetTop - 18, 0),
            behavior: 'smooth',
          })
        }
      }
    }, 80)

    return () => window.clearTimeout(timer)
  }, [selecionadaId, filtradas.length])

  function selecionarVaga(vagaId) {
    setAbaAtiva('vaga')
    setSearchParams({ vaga: vagaId })
  }

  return (
    <section className="pagina vagas-board-page">
      <div className="vagas-toolbar" data-mentor-pagina-section="filtros">
        <label className="vagas-search-pill">
          <Search size={17} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Cargo, tecnologia ou empresa" />
        </label>
        <select value={modelo} onChange={(e) => setModelo(e.target.value)} aria-label="Modelo de trabalho">
          {modelos.map((item) => (
            <option key={item} value={item}>
              {item === 'todos' ? 'Modelo de trabalho' : item}
            </option>
          ))}
        </select>
        <input value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Cidade ou remoto" />
        <input value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder="Cargo" />
        <select value={data} onChange={(e) => setData(e.target.value)} aria-label="Data do anúncio">
          <option value="todas">Publicação</option>
          <option value="hoje">Hoje</option>
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
        </select>
      </div>

      <div className="vagas-board-meta">
        <span>
          {filtradas.length} vaga{filtradas.length === 1 ? '' : 's'} encontrada{filtradas.length === 1 ? '' : 's'}
        </span>
        <button
          type="button"
          onClick={() => {
            setBusca('')
            setData('todas')
            setModelo('todos')
            setLocal('')
            setCargo('')
          }}
        >
          Apagar filtros
        </button>
      </div>

      <div className="vagas-board">
        <div className="vagas-lista" data-mentor-pagina-section="lista" ref={listaRef}>
          <div className="vagas-tabs">
            <strong>Relevantes</strong>
            <span>Recentes</span>
            <span>Próximas</span>
          </div>

          {filtradas.map((vaga) => (
            <button
              className={vaga.id === vagaAtiva?.id ? 'vaga-list-card vaga-list-job-card ativo' : 'vaga-list-card vaga-list-job-card'}
              key={vaga.id}
              ref={(elemento) => {
                if (elemento) vagaRefs.current.set(vaga.id, elemento)
                else vagaRefs.current.delete(vaga.id)
              }}
              type="button"
              onClick={() => selecionarVaga(vaga.id)}
            >
              <header className="job-card-header">
                <div className="job-badges">
                  <span className={`job-badge badge-${classeModalidade(vaga.modalidade)}`}>{vaga.modalidade || 'Remoto'}</span>
                  <span className="job-badge badge-tipo">{vaga.tipo || 'CLT'}</span>
                  <span className="job-badge badge-nivel">{vaga.nivel || 'Júnior'}</span>
                </div>
                <h2 className="job-title">{vaga.titulo}</h2>
                <div className="job-company">
                  <span className="company-logo">
                    {vaga.empresa?.logoUrl ? <img src={vaga.empresa.logoUrl} alt="" /> : vaga.empresa?.logo || 'UP'}
                  </span>
                  {formatarEmpresa(vaga.empresa)}
                </div>
              </header>

              <div className="job-card-body">
                <p className="job-section-label">Salário</p>
                <strong className="job-salary">{vaga.salario || 'A combinar'}</strong>

                <p className="job-section-label">Descrição</p>
                <p className="job-description">{textoCurto(vaga.descricao)}</p>

                <div className="job-meta">
                  <span className="job-meta-item">
                    <BriefcaseBusiness size={15} /> {vaga.modalidade}
                  </span>
                  <span className="job-meta-item">
                    <MapPin size={15} /> {vaga.localizacao}
                  </span>
                  <span className="job-meta-item">
                    <Clock3 size={15} /> {vaga.publicadaEm || 'Hoje'}
                  </span>
                </div>

                <div className="job-tags">
                  {tagsDaVaga(vaga).map((tag) => (
                    <span className="job-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}

          {!filtradas.length && (
            <div className="vagas-empty">
              <h2>Nenhuma vaga encontrada</h2>
              <p>Limpe os filtros ou tente buscar por outro cargo.</p>
            </div>
          )}
        </div>

        {vagaAtiva && (
          <article className="vaga-detalhe-preview" data-mentor-pagina-section="detalhe" ref={detalheRef}>
            <header>
              <span className="vaga-nova">Nova vaga</span>
              <span className="vaga-detalhe-logo">
                {empresaAtiva?.logoUrl ? <img src={empresaAtiva.logoUrl} alt="" /> : empresaAtiva?.logo || 'UP'}
              </span>
              <h1>{vagaAtiva.titulo}</h1>
              <strong>{formatarEmpresa(vagaAtiva.empresa)}</strong>
              <p>{vagaAtiva.localizacao}</p>
              <p>{vagaAtiva.salario || 'Salário a combinar'}</p>
              <div className="vaga-preview-meta">
                <span>
                  <BriefcaseBusiness size={16} /> {vagaAtiva.modalidade}
                </span>
                <span>
                  <Clock3 size={16} /> {vagaAtiva.tipo}
                </span>
                <span>
                  <CalendarDays size={16} /> {vagaAtiva.publicadaEm}
                </span>
              </div>
              <div className="vaga-preview-actions">
                {candidatura ? (
                  <Botao variant="secondary" onClick={() => cancelarCandidatura(vagaAtiva.id)}>
                    Cancelar candidatura
                  </Botao>
                ) : (
                  <Botao disabled={vagaAtiva.status !== 'ativa'} onClick={() => candidatar(vagaAtiva.id)}>
                    Candidatar-me
                  </Botao>
                )}
                <button className="icone-botao" type="button" disabled={!candidatura} aria-label="Chat com recrutador">
                  <MessageSquare size={18} />
                </button>
                <button className="icone-botao" type="button" aria-label="Compartilhar vaga">
                  <Share2 size={18} />
                </button>
              </div>
              {candidatura && <span className="vaga-candidatura-status">Candidatura: {candidatura.status}</span>}
            </header>

            <nav className="vaga-preview-tabs" aria-label="Seções da vaga">
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
                  <p>{vagaAtiva.descricao}</p>
                </section>

                <section>
                  <h2>Principais atividades:</h2>
                  <ul>
                    {lista(vagaAtiva.atividades).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2>Perfil desejado:</h2>
                  <ul>
                    {lista(vagaAtiva.requisitos).map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={15} /> {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="vaga-tags-preview" data-mentor-pagina-section="tags">
                  {lista(vagaAtiva.tags).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </section>

                <footer>
                  <MapPin size={16} />
                  {vagaAtiva.modalidade} em {vagaAtiva.localizacao}
                </footer>
              </>
            ) : (
              <section className="vaga-empresa-detalhes">
                <div
                  className="vaga-empresa-capa"
                  style={
                    empresaAtiva?.capaUrl
                      ? { backgroundImage: `linear-gradient(120deg, rgba(15, 23, 42, 0.18), rgba(15, 23, 42, 0.62)), url(${empresaAtiva.capaUrl})` }
                      : { background: empresaAtiva?.capa || 'linear-gradient(120deg, #0f172a, #1a6bff)' }
                  }
                >
                  <span className="vaga-empresa-capa-logo">
                    {empresaAtiva?.logoUrl ? <img src={empresaAtiva.logoUrl} alt="" /> : empresaAtiva?.logo || 'UP'}
                  </span>
                </div>
                <div className="vaga-empresa-topo">
                  <div>
                    <h2>{empresaAtiva?.nome || 'Empresa Trilum Conecta'}</h2>
                    <p>{empresaAtiva?.localizacao || 'Brasil'}</p>
                  </div>
                </div>
                <p>{empresaAtiva?.descricao || 'Empresa parceira da Trilum Conecta em busca de talentos em formação.'}</p>
                <dl>
                  {empresaAtiva?.setor && (
                    <div>
                      <dt>Setor:</dt>
                      <dd>{empresaAtiva.setor}</dd>
                    </div>
                  )}
                  {empresaAtiva?.tamanho && (
                    <div>
                      <dt>Tamanho:</dt>
                      <dd>{empresaAtiva.tamanho}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Localização:</dt>
                    <dd>{empresaAtiva?.localizacao || 'Brasil'}</dd>
                  </div>
                  {empresaAtiva?.hub && (
                    <div>
                      <dt>Hub:</dt>
                      <dd>{empresaAtiva.hub}</dd>
                    </div>
                  )}
                </dl>
                {!!empresaAtiva?.especialidades?.length && (
                  <div className="vaga-empresa-tags">
                    {empresaAtiva.especialidades.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                )}
                {(empresaAtiva?.site || empresaAtiva?.linkedin || empresaAtiva?.instagram || empresaAtiva?.youtube) && (
                  <div className="vaga-empresa-links">
                    <strong>Links:</strong>
                    {empresaAtiva.site && (
                      <a href={empresaAtiva.site} target="_blank" rel="noreferrer" aria-label="Site oficial" title="Site oficial">
                        <Globe2 size={17} />
                      </a>
                    )}
                    {empresaAtiva.linkedin && (
                      <a href={empresaAtiva.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                        <span className="social-logo social-logo-linkedin">in</span>
                      </a>
                    )}
                    {empresaAtiva.instagram && (
                      <a href={empresaAtiva.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                        <span className="social-logo social-logo-instagram">◎</span>
                      </a>
                    )}
                    {empresaAtiva.youtube && (
                      <a href={empresaAtiva.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube">
                        <span className="social-logo social-logo-youtube">▶</span>
                      </a>
                    )}
                  </div>
                )}
              </section>
            )}
          </article>
        )}
      </div>

      <MentorPaginaAlunoToast
        mensagens={mensagensVagas}
        mapaSecoes={mapaMentorVagas}
        cenariosInteligentes={
          vagaAtiva
            ? [
                {
                  id: vagaAtiva.id,
                  label: 'Compatibilidade',
                  titulo: `Compatibilidade com ${vagaAtiva.titulo}`,
                  descricao: 'Veja como esta vaga se aproxima do seu perfil e quais requisitos podem orientar seus estudos.',
                  acao: { label: 'Ver vaga selecionada', to: `#/aluno/vagas?vaga=${vagaAtiva.id}` },
                  gerar: (opcoes) => gerarExplicacaoVaga(contextoMentorVaga, opcoes),
                },
              ]
            : []
        }
      />
    </section>
  )
}
