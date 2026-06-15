import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Check,
  Clock3,
  Copy,
  Cpu,
  ExternalLink,
  FileText,
  Code2,
  GraduationCap,
  Presentation,
  ShieldCheck,
} from 'lucide-react'
import logoPlataforma from '../../ativos/imagens/logo-plataforma.png'

const DOCUMENTACAO_COMPLETA_URL = 'https://drive.google.com/file/d/1lhtqJuuEM68KanhU55ACK4ZJfSK7UGj-/view?usp=sharing'

const contasDemo = [
  {
    id: 'aluno',
    tipo: 'Conta de aluno',
    nome: 'Lucas Andrade',
    email: 'aluno.demo@trilum.demo',
    senha: 'Aluno@123',
    descricao: 'Aluno DevOps em evolução, com radar, projetos em andamento e melhorias guiadas pelo mentor.',
    Icone: GraduationCap,
  },
  {
    id: 'empresa',
    tipo: 'Conta de empresa',
    nome: 'NexaCloud Solutions',
    email: 'empresa.demo@trilum.demo',
    senha: 'Empresa@123',
    descricao: 'Conheça o painel de recrutamento, vagas, candidatos e análises assistidas.',
    Icone: Building2,
  },
]

const materiaisCoday = [
  {
    id: 'slides',
    titulo: 'Slides da apresentação',
    descricao: 'Apresentação resumida usada durante o Coday, com os principais fluxos e diferenciais do projeto.',
    paginas: '11 páginas',
    href: 'https://drive.google.com/file/d/1ZvMnWteT7lnOrgJq_GQYmOZB_p9J00KW/view?usp=sharing',
    disponivel: true,
    Icone: Presentation,
  },
  {
    id: 'documentacao',
    titulo: 'Documentação visual completa',
    descricao: 'Apresentação detalhada da proposta, arquitetura, jornadas, regras, IA e principais funcionalidades.',
    paginas: '36 páginas',
    href: DOCUMENTACAO_COMPLETA_URL,
    disponivel: true,
    Icone: FileText,
  },
  {
    id: 'github',
    titulo: 'Código no GitHub',
    descricao: 'Acesse o repositório público e conheça a implementação do projeto.',
    href: 'https://github.com/auhauhbr/Trilum-Conecta',
    disponivel: true,
    Icone: Code2,
  },
]

async function copiarParaAreaTransferencia(texto) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(texto)
    return
  }

  const campoTemporario = document.createElement('textarea')
  campoTemporario.value = texto
  campoTemporario.setAttribute('readonly', '')
  campoTemporario.style.position = 'fixed'
  campoTemporario.style.opacity = '0'
  document.body.appendChild(campoTemporario)
  campoTemporario.select()
  document.execCommand('copy')
  document.body.removeChild(campoTemporario)
}

function BotaoCopiar({ identificador, valor, copiado, aoCopiar }) {
  const estaCopiado = copiado === identificador

  return (
    <button
      className={`coday-copy-button${estaCopiado ? ' is-copied' : ''}`}
      type="button"
      onClick={() => aoCopiar(identificador, valor)}
      aria-label={`Copiar ${identificador.includes('email') ? 'e-mail' : 'senha'}`}
    >
      {estaCopiado ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {estaCopiado ? 'Copiado' : 'Copiar'}
    </button>
  )
}

export function Coday() {
  const [copiado, setCopiado] = useState('')
  const [destinoPendente, setDestinoPendente] = useState('')
  const [segundosRestantes, setSegundosRestantes] = useState(10)
  const temporizadorCopia = useRef(null)
  const contasDemoRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => () => clearTimeout(temporizadorCopia.current), [])
  useEffect(() => {
    if (!destinoPendente) return undefined

    const temporizador = window.setInterval(() => {
      setSegundosRestantes((atual) => {
        if (atual <= 1) {
          window.clearInterval(temporizador)
          navigate(destinoPendente)
          return 0
        }
        return atual - 1
      })
    }, 1000)

    return () => window.clearInterval(temporizador)
  }, [destinoPendente, navigate])

  function prepararAcesso(evento, destino) {
    evento.preventDefault()
    setDestinoPendente(destino)
    setSegundosRestantes(10)
  }

  function continuarAgora() {
    const destino = destinoPendente
    setDestinoPendente('')
    if (destino) navigate(destino)
  }

  function irParaContasDemo(evento) {
    evento.preventDefault()
    contasDemoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => document.getElementById('titulo-contas-demo')?.focus(), 500)
  }

  async function copiarDado(identificador, valor) {
    try {
      await copiarParaAreaTransferencia(valor)
      setCopiado(identificador)
      clearTimeout(temporizadorCopia.current)
      temporizadorCopia.current = setTimeout(() => setCopiado(''), 1800)
    } catch {
      setCopiado('')
    }
  }

  return (
    <div className="coday-page">
      <header className="coday-header">
        <Link className="coday-brand" to="/" onClick={(evento) => prepararAcesso(evento, '/')} aria-label="Ir para a página inicial da Trilum Conecta">
          <img src={logoPlataforma} alt="" />
          <span>Trilum Conecta</span>
        </Link>
        <Link className="coday-header-link" to="/" onClick={(evento) => prepararAcesso(evento, '/')}>
          Abrir projeto <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </header>

      <main>
        <section className="coday-hero">
          <div className="coday-hero-content">
            <span className="coday-eyebrow">

              Projeto acadêmico apresentado no Coday 2026.1
            </span>
            <h1>Trilum Conecta — Coday 2026.1</h1>
            <p className="coday-hero-lead">
              Uma plataforma que conecta aprendizado, projetos práticos, candidaturas e empresas em
              uma jornada profissional mais clara.
            </p>
            <p className="coday-hero-support">
              Conheça recomendações por regras, mentor inteligente opcional e experiências
              completas para alunos e recrutadores.
            </p>
            <div className="coday-hero-actions">
              <Link className="coday-primary-button" to="/" onClick={(evento) => prepararAcesso(evento, '/')}>
                Abrir projeto <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <a className="coday-secondary-button" href="#contas-demo" onClick={irParaContasDemo}>
                Ver contas de demonstração
              </a>
            </div>
          </div>

          <div className="coday-journey" aria-label="Jornada conectada pela plataforma">
            <span className="coday-journey-label">Uma jornada conectada</span>
            {[
              ['01', 'Aluno e aprendizado', 'Perfil, trilhas, cursos e projetos práticos.'],
              ['02', 'Prontidão e candidatura', 'Evidências reais e próximos passos claros.'],
              ['03', 'Empresa e recrutamento', 'Vagas melhores e análise humana apoiada por dados.'],
            ].map(([numero, titulo, texto]) => (
              <div className="coday-journey-step" key={numero}>
                <span>{numero}</span>
                <div>
                  <strong>{titulo}</strong>
                  <p>{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="coday-section coday-access-section" aria-labelledby="acessar-projeto">
          <div>
            <span className="coday-section-kicker">Acesso rápido</span>
            <h2 id="acessar-projeto">Explore a experiência completa</h2>
            <p>
              Navegue pela landing page e entre com uma das contas de demonstração para explorar os
              dois lados da plataforma.
            </p>
          </div>
          <Link className="coday-primary-button" to="/" onClick={(evento) => prepararAcesso(evento, '/')}>
            Acessar Trilum Conecta <ExternalLink size={18} aria-hidden="true" />
          </Link>
        </section>

        <section
          className="coday-section"
          id="contas-demo"
          ref={contasDemoRef}
          aria-labelledby="titulo-contas-demo"
        >
          <div className="coday-section-heading">
            <span className="coday-section-kicker">Demonstração guiada</span>
            <h2 id="titulo-contas-demo" tabIndex="-1">Escolha uma conta para começar</h2>
            <p>Copie os dados e acesse o login. Sem Ollama local, a demonstração usa fallback seguro.</p>
          </div>
          <div className="coday-demo-grid">
            {contasDemo.map(({ id, tipo, nome, email, senha, descricao, Icone }) => (
              <article className="coday-demo-card" key={id}>
                <div className="coday-card-icon"><Icone size={24} aria-hidden="true" /></div>
                <span className="coday-card-kicker">{tipo}</span>
                <h3>{nome}</h3>
                <p>{descricao}</p>
                <dl className="coday-credentials">
                  {[['email', 'E-mail', email], ['senha', 'Senha', senha]].map(([campo, label, valor]) => (
                    <div key={campo}>
                      <dt>{label}</dt>
                      <dd>
                        <code>{valor}</code>
                        <BotaoCopiar identificador={`${id}-${campo}`} valor={valor} copiado={copiado} aoCopiar={copiarDado} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <Link className="coday-card-action" to={`/entrar?demo=${id}`} onClick={(evento) => prepararAcesso(evento, `/entrar?demo=${id}`)}>
                  Ir para o login <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="coday-section" aria-labelledby="titulo-materiais">
          <div className="coday-section-heading">
            <span className="coday-section-kicker">Materiais da apresentação</span>
            <h2 id="titulo-materiais">Continue explorando o projeto</h2>
            <p>Os materiais podem ser atualizados sem alterar a estrutura desta página.</p>
          </div>
          <div className="coday-materials-grid">
            {materiaisCoday.map(({ id, titulo, descricao, paginas, href, disponivel, Icone }) => (
              <article className="coday-material-card" key={id}>
                <div className="coday-material-icon"><Icone size={22} aria-hidden="true" /></div>
                <div>
                  <h3>{titulo}</h3>
                  {paginas && <span className="coday-card-kicker">{paginas}</span>}
                  <p>{descricao}</p>
                </div>
                {disponivel ? (
                  <a href={href} target="_blank" rel="noreferrer">
                    Acessar material <ExternalLink size={16} aria-hidden="true" />
                  </a>
                ) : <span className="coday-coming-soon">Em breve</span>}
              </article>
            ))}
          </div>
        </section>

        <section className="coday-section coday-notice" aria-labelledby="titulo-aviso">
          <div className="coday-notice-icon"><ShieldCheck size={28} aria-hidden="true" /></div>
          <div>
            <span className="coday-section-kicker">Ambiente de demonstração</span>
            <h2 id="titulo-aviso">Dados fictícios e uso acadêmico</h2>
            <p>
              As pessoas, empresas, vagas, candidaturas e demais informações exibidas nesta
              demonstração são fictícias e foram criadas exclusivamente para apresentar as
              funcionalidades da plataforma.
            </p>
          </div>
        </section>
      </main>

      <footer className="coday-footer">
        <div><strong>Trilum Conecta</strong><span>Projeto acadêmico — Coday 2026.1</span></div>
        <p>Link recomendado para QR Code: <code>/Trilum-Conecta/#/coday</code></p>
      </footer>

      {destinoPendente && (
        <div className="coday-ai-transition" role="presentation">
          <section
            className="coday-ai-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-aviso-ia"
            aria-describedby="descricao-aviso-ia"
          >
            <div className="coday-ai-dialog-icon"><Cpu size={28} aria-hidden="true" /></div>
            <span className="coday-section-kicker">Antes de explorar o projeto</span>
            <h2 id="titulo-aviso-ia">A IA do Trilum é local e opcional</h2>
            <p id="descricao-aviso-ia">
              Para receber textos personalizados pela IA, este computador precisa ter o Ollama
              instalado, o modelo local configurado e o domínio do projeto autorizado.
            </p>
            <div className="coday-ai-dialog-grid">
              <div>
                <strong>Sem Ollama</strong>
                <p>
                  O sistema continua funcionando com regras, pesos, validações e textos seguros de
                  fallback. Algumas sugestões serão padronizadas em vez de geradas pela IA.
                </p>
              </div>
              <div>
                <strong>Com Ollama</strong>
                <p>
                  O mentor pode personalizar explicações e melhorar textos, sem decidir
                  recomendações, candidaturas ou ações automaticamente.
                </p>
              </div>
            </div>
            <p className="coday-ai-documentation-note">
              Para visualizar como as funcionalidades ficam com a IA ativa, consulte a documentação
              visual completa de 36 páginas.
            </p>
            <div className="coday-ai-dialog-actions">
              <a href={DOCUMENTACAO_COMPLETA_URL} target="_blank" rel="noreferrer">
                Abrir documentação completa <ExternalLink size={16} aria-hidden="true" />
              </a>
              <button type="button" onClick={continuarAgora}>
                Continuar agora <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="coday-ai-countdown" aria-live="polite">
              <Clock3 size={16} aria-hidden="true" />
              Encaminhando para o projeto em {segundosRestantes} segundos
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
