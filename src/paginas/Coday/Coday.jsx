import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Code2,
  GraduationCap,
  Presentation,
  ShieldCheck,
} from 'lucide-react'
import logoPlataforma from '../../ativos/imagens/logo-plataforma.png'

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
    href: 'https://drive.google.com/file/d/1lhtqJuuEM68KanhU55ACK4ZJfSK7UGj-/view?usp=sharing',
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
  const temporizadorCopia = useRef(null)
  const contasDemoRef = useRef(null)

  useEffect(() => () => clearTimeout(temporizadorCopia.current), [])

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
        <Link className="coday-brand" to="/" aria-label="Ir para a página inicial da Trilum Conecta">
          <img src={logoPlataforma} alt="" />
          <span>Trilum Conecta</span>
        </Link>
        <Link className="coday-header-link" to="/">
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
              <Link className="coday-primary-button" to="/">
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
          <Link className="coday-primary-button" to="/">
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
            <p>Copie os dados e acesse o login. Nenhuma configuração adicional é necessária.</p>
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
                <Link className="coday-card-action" to={`/entrar?demo=${id}`}>
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
    </div>
  )
}
