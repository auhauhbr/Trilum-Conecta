import { AlertCircle, CheckCircle2, Copy, Globe2, RefreshCw, ShieldCheck, Sparkles, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { Campo } from '../../../componentes/interface/Campo'
import { MentorEmpresaToast } from '../../../componentes/interface/MentorEmpresaToast'
import { Avatar } from '../../../componentes/perfis/Avatar'
import { useApp } from '../../../contextos/AppContext'
import { contarCandidatosDaVaga } from '../../../servicos/candidaturas'
import { analisarForcaPerfilEmpresa } from '../../../servicos/empresaInteligencia'
import { melhorarPerfilEmpresaComIA } from '../../../servicos/empresaIA'

function listaParaTexto(valor) {
  return Array.isArray(valor) ? valor.join(', ') : valor || ''
}

function textoParaLista(valor) {
  if (Array.isArray(valor)) return valor.filter(Boolean)
  return String(valor || '')
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function dadosEmpresa(usuario) {
  return {
    nome: usuario?.nome || '',
    nomeOficial: usuario?.nomeOficial || usuario?.nome || '',
    descricao: usuario?.descricao || '',
    descricaoCurta: usuario?.descricaoCurta || '',
    setor: usuario?.setor || '',
    tamanho: usuario?.tamanho || '',
    sede: usuario?.sede || '',
    localizacao: usuario?.localizacao || '',
    hub: usuario?.hub || '',
    site: usuario?.site || '',
    instagram: usuario?.instagram || '',
    linkedin: usuario?.linkedin || '',
    youtube: usuario?.youtube || '',
    logo: usuario?.logo || '',
    logoUrl: usuario?.logoUrl || '',
    capa: usuario?.capa || '',
    capaUrl: usuario?.capaUrl || '',
    especialidades: listaParaTexto(usuario?.especialidades),
    stackDetalhes: listaParaTexto(usuario?.stackDetalhes),
    beneficios: listaParaTexto(usuario?.beneficios),
  }
}

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

function previewEmpresa(form) {
  return {
    ...form,
    especialidades: textoParaLista(form.especialidades),
    stackDetalhes: textoParaLista(form.stackDetalhes),
    beneficios: textoParaLista(form.beneficios),
  }
}

const ajudaCamposEmpresa = {
  nome: 'Como sua empresa e conhecida comercialmente no mercado.',
  nomeOficial: 'A Razao Social ou nome juridico. Ex: Avanade Brasil Ltda.',
  logo: '2 letras para exibir quando nao houver imagem de logo. Ex: AV.',
  setor: 'Sua area principal de atuacao. Ex: Tecnologia, Financas, Saude.',
  descricaoCurta: 'Um slogan ou resumo rapido do seu proposito em uma linha.',
  tamanho: 'Quantidade estimada de funcionarios. Ex: 100-500, 10k+.',
  descricao: 'Texto principal contando historia, missao, cultura e impacto da empresa.',
  sede: 'Cidade e estado do escritorio administrativo principal.',
  localizacao: 'Endereco fisico completo ou regiao principal de operacao.',
  hub: 'Principal polo de inovacao ou base tecnologica. Ex: Porto Digital.',
  links: 'Insira a URL completa para validar a autoridade da empresa.',
  especialidades: 'Areas de negocio que voces dominam. Separe por virgula. Ex: Cloud Computing, Ciberseguranca, E-commerce.',
  stackDetalhes: 'Linguagens, frameworks e ferramentas do dia a dia. Ex: React, .NET 8, AWS, Figma. Separe por virgula.',
  beneficios: 'Beneficios e atrativos para candidatos. Ex: Trabalho remoto, Certificacoes pagas, PLR. Separe por virgula.',
}

const perfilNexaFlow = {
  nome: 'NexaFlow',
  nomeOficial: 'NexaFlow Solucoes Inteligentes e Tecnologia Ltda.',
  descricao:
    'Nascida em 2022 com o proposito de desmistificar a Inteligencia Artificial, a NexaFlow e uma scale-up focada em criar ecossistemas de automacao para o mercado corporativo. Nos transformamos o caos de dados e processos manuais em fluxos de trabalho fluidos, eficientes e preditivos. Nossa cultura e pautada na autonomia, na transparencia radical e no equilibrio entre vida pessoal e profissional. Acreditamos que tecnologia de ponta so e feita por pessoas que tem espaco para criar, errar e evoluir.',
  descricaoCurta: 'Transformando dados complexos em fluxos de trabalho inteligentes e automaticos.',
  setor: 'Tecnologia e Inteligencia Artificial',
  tamanho: '100-500 funcionarios',
  sede: 'Recife, PE',
  localizacao: 'Cais do Apolo, 222 - Bairro do Recife, Recife - PE, 50030-230',
  hub: 'Porto Digital',
  site: 'https://www.nexaflow.ficticio.com',
  instagram: 'https://www.instagram.com/nexaflow.tech',
  linkedin: 'https://www.linkedin.com/company/nexaflow-tech',
  youtube: 'https://www.youtube.com/@nexaflow-inside',
  logo: 'NF',
  capa: 'linear-gradient(120deg, rgba(10, 37, 64, 0.96), rgba(20, 184, 166, 0.72))',
  especialidades: 'Inteligencia Artificial, Automacao de Processos (RPA), Big Data, Cloud Architecture, Engenharia de Dados',
  stackDetalhes: 'Python, TypeScript, React, Node.js, AWS (Lambda, S3, Redshift), Docker, Kubernetes, PostgreSQL',
  beneficios:
    'Trabalho 100% remoto com ajuda de custo, Horario flexivel, Short Friday, Participacao nos Lucros e Resultados semestral, Orcamento anual individual para cursos e certificacoes, Plano de saude e odontologico integral',
}

function estaVazio(valor) {
  if (Array.isArray(valor)) return valor.length === 0
  return !String(valor || '').trim()
}

export function PerfilEmpresa() {
  const navigate = useNavigate()
  const edicaoPerfilRef = useRef(null)
  const { usuarioAtual, atualizarEmpresa, vagasEmpresa, candidatos, candidaturas, logout } = useApp()
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState(() => dadosEmpresa(usuarioAtual))
  const [sugestaoMentor, setSugestaoMentor] = useState(null)
  const [carregandoSugestao, setCarregandoSugestao] = useState(false)
  const [mensagemSugestao, setMensagemSugestao] = useState('')
  const perfil = previewEmpresa(form)
  const forcaPerfil = analisarForcaPerfilEmpresa(perfil)
  const vagas = vagasEmpresa.filter((vaga) => vaga.empresaId === usuarioAtual?.id)

  function abrirEdicaoPerfil() {
    setEditando(true)
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        edicaoPerfilRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })
  }

  function atualizar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  function autocompletarVazios() {
    setEditando(true)
    setForm((atual) => {
      const preenchido = { ...atual }
      Object.entries(perfilNexaFlow).forEach(([campo, valor]) => {
        if (estaVazio(preenchido[campo])) {
          preenchido[campo] = valor
        }
      })
      return preenchido
    })
  }

  async function gerarSugestaoMentor() {
    setEditando(true)
    setCarregandoSugestao(true)
    setMensagemSugestao('')
    try {
      const sugestao = await melhorarPerfilEmpresaComIA({
        empresa: perfil,
        analisePerfil: forcaPerfil,
      })
      setSugestaoMentor(sugestao)
    } finally {
      setCarregandoSugestao(false)
    }
  }

  function aplicarSugestaoMentor() {
    if (!sugestaoMentor) return
    setForm((atual) => ({
      ...atual,
      descricaoCurta: sugestaoMentor.descricaoCurta || atual.descricaoCurta,
      descricao: sugestaoMentor.descricaoEmpresa || atual.descricao,
      especialidades: sugestaoMentor.especialidades?.length ? sugestaoMentor.especialidades.join(', ') : atual.especialidades,
      stackDetalhes: sugestaoMentor.stackPratica || atual.stackDetalhes,
      beneficios: sugestaoMentor.diferenciais || atual.beneficios,
    }))
    setMensagemSugestao('Sugestões aplicadas ao formulário. Revise os textos e clique em Atualizar perfil para salvar.')
    setSugestaoMentor(null)
  }

  async function copiarSugestaoMentor() {
    if (!sugestaoMentor) return
    const conteudo = [
      'Descrição curta:', sugestaoMentor.descricaoCurta, '', 'Descrição da empresa:', sugestaoMentor.descricaoEmpresa,
      '', 'Especialidades:', sugestaoMentor.especialidades.join(', '), '', 'Stack em prática:', sugestaoMentor.stackPratica,
      '', 'Diferenciais:', sugestaoMentor.diferenciais,
    ].join('\n')
    try {
      await navigator.clipboard.writeText(conteudo)
      setMensagemSugestao('Textos sugeridos copiados.')
    } catch {
      setMensagemSugestao('Não foi possível copiar automaticamente. Você ainda pode revisar e aplicar as sugestões.')
    }
  }

  function salvar() {
    const atualizado = {
      ...form,
      especialidades: textoParaLista(form.especialidades),
      stackDetalhes: textoParaLista(form.stackDetalhes),
      beneficios: textoParaLista(form.beneficios),
    }
    atualizarEmpresa(atualizado)
    setForm(dadosEmpresa(atualizado))
    setEditando(false)
  }

  function cancelar() {
    setForm(dadosEmpresa(usuarioAtual))
    setEditando(false)
  }

  function selecionarImagem(campo, evento) {
    const arquivo = evento.target.files?.[0]
    if (!arquivo) return
    const leitor = new FileReader()
    leitor.onload = () => atualizar(campo, leitor.result)
    leitor.readAsDataURL(arquivo)
  }

  function sair() {
    logout()
    navigate('/')
  }

  return (
    <section className="pagina perfil-empresa-page">
      <div className="perfil-empresa-hero" style={{ background: perfil.capaUrl ? undefined : perfil.capa || usuarioAtual?.capa }}>
        {perfil.capaUrl && <img className="empresa-capa-img" src={perfil.capaUrl} alt="" />}
        <div className="perfil-empresa-overlay">
          <Avatar texto={perfil.logo || 'EM'} imagem={perfil.logoUrl} grande />
          <div>
            <span className="eyebrow">Perfil da empresa</span>
            <h1>{perfil.nome}</h1>
            <p>{perfil.descricaoCurta || perfil.descricao}</p>
          </div>
          <div className="perfil-empresa-acoes">
            <Botao className="botao botao-primary botao-quadrado" onClick={abrirEdicaoPerfil}>
              Atualizar perfil
            </Botao>
            <Botao className="botao botao-secondary botao-quadrado" variant="secondary" onClick={sair}>
              Sair
            </Botao>
          </div>
        </div>
      </div>

      <section className="empresa-inteligencia-card empresa-forca-perfil">
        <header>
          <div>
            <span className="empresa-inteligencia-label"><ShieldCheck size={16} /> Força do perfil da empresa</span>
            <strong>{forcaPerfil.score}%</strong>
          </div>
          <span className={`empresa-inteligencia-nivel nivel-${forcaPerfil.score >= 65 ? 'forte' : 'atencao'}`}>{forcaPerfil.nivel}</span>
        </header>
        <div className="empresa-inteligencia-barra"><i style={{ width: `${forcaPerfil.score}%` }} /></div>
        <div className="empresa-forca-grid">
          <div>
            <h3><CheckCircle2 size={15} /> Pontos fortes</h3>
            <ul>{forcaPerfil.pontosFortes.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3><AlertCircle size={15} /> Próximos ajustes</h3>
            <ul>{forcaPerfil.lacunas.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          {forcaPerfil.proximaAcao && (
            <button type="button" onClick={abrirEdicaoPerfil}>
              Melhorar perfil
              <small>{forcaPerfil.proximaAcao.label}</small>
            </button>
          )}
        </div>
      </section>

      <div className="perfil-empresa-conteudo">
        <section className="perfil-empresa-info-card perfil-empresa-sobre">
          <h2>Sobre</h2>
          <p>{perfil.descricao}</p>

          <div className="perfil-empresa-info-lista">
            {perfil.setor && (
              <div>
                <span>Setor</span>
                <strong>{perfil.setor}</strong>
              </div>
            )}
            {perfil.tamanho && (
              <div>
                <span>Tamanho</span>
                <strong>{perfil.tamanho}</strong>
              </div>
            )}
            {perfil.sede && (
              <div>
                <span>Sede</span>
                <strong>{perfil.sede}</strong>
              </div>
            )}
            {perfil.hub && (
              <div>
                <span>Hub principal</span>
                <strong>{perfil.hub}</strong>
              </div>
            )}
          </div>

          {(perfil.site || perfil.linkedin || perfil.instagram || perfil.youtube) && (
            <div className="perfil-empresa-links">
              {perfil.site && (
                <a href={perfil.site} target="_blank" rel="noreferrer" aria-label="Site oficial" title="Site oficial">
                  <Globe2 size={18} />
                </a>
              )}
              {perfil.linkedin && (
                <a href={perfil.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                  <span className="social-logo social-logo-linkedin">in</span>
                </a>
              )}
              {perfil.instagram && (
                <a href={perfil.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
                  <span className="social-logo social-logo-instagram">◎</span>
                </a>
              )}
              {perfil.youtube && (
                <a href={perfil.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube">
                  <span className="social-logo social-logo-youtube">▶</span>
                </a>
              )}
            </div>
          )}
        </section>

        <aside className="perfil-empresa-info-card perfil-empresa-lateral">
          <h2>Stack e Cultura</h2>
          {!!perfil.especialidades.length && (
            <>
              <span className="perfil-empresa-label">Especialidades</span>
              <div className="perfil-empresa-chips">
                {perfil.especialidades.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </>
          )}
          {!!perfil.stackDetalhes.length && (
            <>
              <span className="perfil-empresa-label">Stack em prática</span>
              <ul>
                {perfil.stackDetalhes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
          {!!perfil.beneficios.length && (
            <>
              <span className="perfil-empresa-label">Diferenciais</span>
              <ul>
                {perfil.beneficios.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </aside>
      </div>

      {editando && (
        <section className="empresa-editar-perfil empresa-editar-inline" ref={edicaoPerfilRef}>
          <header>
            <div>
              <span className="eyebrow">Editar</span>
              <h2>Atualizar perfil</h2>
              <button className="vaga-mentor-trigger" type="button" onClick={gerarSugestaoMentor} disabled={carregandoSugestao}>
                {carregandoSugestao ? <RefreshCw className="girando" size={17} /> : <Sparkles size={17} />}
                {carregandoSugestao ? 'Analisando perfil...' : 'Melhorar perfil com mentor'}
              </button>
              {mensagemSugestao && <p className="vaga-mentor-status">{mensagemSugestao}</p>}
              <p>Revise as informações sem sair da visualização pública do perfil.</p>
            </div>
            <button type="button" onClick={cancelar} aria-label="Fechar edição">
              Fechar
            </button>
          </header>

          <div className="empresa-editar-grid">
            <label className="empresa-upload-box">
              <span>Logo da empresa</span>
              <strong>Escolher logo</strong>
              <small>PNG ou JPG até 2MB</small>
              <input accept="image/*" type="file" onChange={(evento) => selecionarImagem('logoUrl', evento)} />
            </label>

            <label className="empresa-upload-box empresa-upload-bg">
              <span>Imagem de capa</span>
              <strong>Escolher capa</strong>
              <small>Use uma imagem ampla para o topo do perfil</small>
              <input accept="image/*" type="file" onChange={(evento) => selecionarImagem('capaUrl', evento)} />
            </label>

            <Campo label="Nome da empresa" helper={ajudaCamposEmpresa.nome} value={form.nome} onChange={(e) => atualizar('nome', e.target.value)} />
            <Campo label="Nome oficial" helper={ajudaCamposEmpresa.nomeOficial} value={form.nomeOficial} onChange={(e) => atualizar('nomeOficial', e.target.value)} />
            <Campo label="Logo em iniciais" helper={ajudaCamposEmpresa.logo} value={form.logo} onChange={(e) => atualizar('logo', e.target.value)} />
            <Campo label="Setor" helper={ajudaCamposEmpresa.setor} value={form.setor} onChange={(e) => atualizar('setor', e.target.value)} />
            <Campo label="Descrição curta" helper={ajudaCamposEmpresa.descricaoCurta} value={form.descricaoCurta} onChange={(e) => atualizar('descricaoCurta', e.target.value)} />
            <Campo label="Tamanho" helper={ajudaCamposEmpresa.tamanho} value={form.tamanho} onChange={(e) => atualizar('tamanho', e.target.value)} />
            <Campo
              label="Descrição da empresa"
              helper={ajudaCamposEmpresa.descricao}
              textarea
              rows="5"
              value={form.descricao}
              onChange={(e) => atualizar('descricao', e.target.value)}
            />
            <Campo label="Sede" helper={ajudaCamposEmpresa.sede} value={form.sede} onChange={(e) => atualizar('sede', e.target.value)} />
            <Campo label="Localização" helper={ajudaCamposEmpresa.localizacao} value={form.localizacao} onChange={(e) => atualizar('localizacao', e.target.value)} />
            <Campo label="Hub principal" helper={ajudaCamposEmpresa.hub} value={form.hub} onChange={(e) => atualizar('hub', e.target.value)} />
            <Campo label="Website" helper={ajudaCamposEmpresa.links} value={form.site} onChange={(e) => atualizar('site', e.target.value)} />
            <Campo label="LinkedIn" helper={ajudaCamposEmpresa.links} value={form.linkedin} onChange={(e) => atualizar('linkedin', e.target.value)} />
            <Campo label="Instagram" helper={ajudaCamposEmpresa.links} value={form.instagram} onChange={(e) => atualizar('instagram', e.target.value)} />
            <Campo label="YouTube" helper={ajudaCamposEmpresa.links} value={form.youtube} onChange={(e) => atualizar('youtube', e.target.value)} />
            <Campo
              label="Especialidades"
              helper={ajudaCamposEmpresa.especialidades}
              textarea
              rows="3"
              value={form.especialidades}
              onChange={(e) => atualizar('especialidades', e.target.value)}
            />
            <Campo
              label="Stack em prática"
              helper={ajudaCamposEmpresa.stackDetalhes}
              textarea
              rows="4"
              value={form.stackDetalhes}
              onChange={(e) => atualizar('stackDetalhes', e.target.value)}
            />
            <Campo
              label="Diferenciais"
              helper={ajudaCamposEmpresa.beneficios}
              textarea
              rows="3"
              value={form.beneficios}
              onChange={(e) => atualizar('beneficios', e.target.value)}
            />
          </div>

          <div className="empresa-editar-acoes">
            <Botao variant="secondary" onClick={cancelar}>
              Cancelar
            </Botao>
            <Botao onClick={salvar}>Atualizar perfil</Botao>
          </div>
        </section>
      )}

      <section className="perfil-empresa-vagas">
        <div className="secao-cabecalho linha">
          <h2>Vagas divulgadas</h2>
          <Botao className="botao botao-secondary botao-quadrado" to="/empresa/gerenciar-vagas" variant="secondary">
            Gerenciar vagas
          </Botao>
        </div>
        <div className="perfil-empresa-vagas-grid">
          {vagas.map((vaga) => {
            const total = contarCandidatosDaVaga(vaga.id, candidatos, candidaturas)

            return (
              <Link className="perfil-empresa-vaga-card empresa-mini-job-card" key={vaga.id} to={`/empresa/vagas/${vaga.id}/candidatos`}>
                <header>
                  <div className="empresa-job-badges">
                    <span className="empresa-job-badge-status">{statusRotulo(vaga.status)}</span>
                    <span className={`empresa-job-badge-${classeModalidade(vaga.modalidade)}`}>{vaga.modalidade}</span>
                    <span>{vaga.tipo}</span>
                    <span>{vaga.nivel}</span>
                  </div>
                  <h3>{vaga.titulo}</h3>
                  <small>{vaga.salario || 'A combinar'}</small>
                </header>
                <p>{vaga.descricao}</p>
                <footer>
                  <strong>{total} {total === 1 ? 'candidato' : 'candidatos'}</strong>
                  <b className={statusClasse(vaga.status)}>{statusRotulo(vaga.status)}</b>
                </footer>
              </Link>
            )
          })}
        </div>
      </section>

      <MentorEmpresaToast
        empresaAtual={{ ...perfil, id: usuarioAtual?.id }}
        tela="perfil-empresa"
        vagas={vagas}
        candidatos={candidatos}
        candidaturas={candidaturas}
        onEditarPerfil={abrirEdicaoPerfil}
        onAutocompletarPerfil={editando ? autocompletarVazios : null}
        onMelhorarPerfil={gerarSugestaoMentor}
      />

      {sugestaoMentor && (
        <div className="vaga-mentor-modal" role="presentation" onMouseDown={(evento) => {
          if (evento.target === evento.currentTarget) setSugestaoMentor(null)
        }}>
          <section className="vaga-mentor-modal-card perfil-mentor-modal-card" role="dialog" aria-modal="true" aria-labelledby="perfil-mentor-titulo">
            <header>
              <div>
                <span className="empresa-inteligencia-label"><Sparkles size={15} /> Mentor da empresa</span>
                <h2 id="perfil-mentor-titulo">Sugestão do mentor para o perfil</h2>
                <p>Revise antes de aplicar. O mentor não salva o perfil automaticamente.</p>
              </div>
              <button type="button" aria-label="Fechar sugestão" onClick={() => setSugestaoMentor(null)}><X size={20} /></button>
            </header>

            <div className="vaga-mentor-sugestoes">
              <article className="span-2"><span>Descrição curta sugerida</span><strong>{sugestaoMentor.descricaoCurta}</strong></article>
              <article className="span-2"><span>Descrição da empresa sugerida</span><p>{sugestaoMentor.descricaoEmpresa}</p></article>
              <article><span>Especialidades sugeridas</span><div className="vaga-mentor-tags">{sugestaoMentor.especialidades.map((item) => <i key={item}>{item}</i>)}</div></article>
              <article><span>Stack em prática sugerida</span><p className="vaga-mentor-texto-linhas">{sugestaoMentor.stackPratica}</p></article>
              <article><span>Diferenciais sugeridos</span><p className="vaga-mentor-texto-linhas">{sugestaoMentor.diferenciais}</p></article>
              <article><span>Observações do mentor</span><ul>{sugestaoMentor.observacoes.map((item) => <li key={item}>{item}</li>)}</ul></article>
            </div>

            <footer>
              <button className="botao botao-secondary" type="button" onClick={() => setSugestaoMentor(null)}>Cancelar</button>
              <button className="botao botao-secondary" type="button" onClick={copiarSugestaoMentor}><Copy size={16} /> Copiar textos</button>
              <button className="botao botao-secondary" type="button" onClick={gerarSugestaoMentor} disabled={carregandoSugestao}><RefreshCw size={16} /> Gerar outra versão</button>
              <button className="botao botao-primary" type="button" onClick={aplicarSugestaoMentor}><CheckCircle2 size={16} /> Aplicar sugestões</button>
            </footer>
          </section>
        </div>
      )}
    </section>
  )
}

