import { BookOpenCheck, BriefcaseBusiness, Route, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoPlataforma from '../../ativos/imagens/logo-plataforma.png'

const iconesBeneficios = [BookOpenCheck, Route, BriefcaseBusiness]

export function AuthSplitLayout({
  children,
  imagem,
  imagemAlt,
  titulo,
  descricao,
  etiqueta,
  beneficios = [],
  compacto = false,
}) {
  return (
    <section className={`auth-split-page${compacto ? ' auth-split-page-compacto' : ''}`}>
      <aside className="auth-split-visual">
        <div className="auth-split-orbe auth-split-orbe-a" />
        <div className="auth-split-orbe auth-split-orbe-b" />

        <Link className="auth-split-brand" to="/">
          <img src={logoPlataforma} alt="" />
          <span>Trilum Conecta</span>
        </Link>

        <div className="auth-split-copy">
          <span className="auth-split-etiqueta">{etiqueta}</span>
          <h1>{titulo}</h1>
          <p>{descricao}</p>
        </div>

        {!!beneficios.length && (
          <div className="auth-split-beneficios">
            {beneficios.map((beneficio, index) => {
              const Icone = iconesBeneficios[index] || Sparkles
              return (
                <div key={beneficio}>
                  <span><Icone size={18} /></span>
                  <p>{beneficio}</p>
                </div>
              )
            })}
          </div>
        )}

        <img className="auth-split-personagem" src={imagem} alt={imagemAlt} />
      </aside>

      <main className="auth-split-conteudo">
        {children}
      </main>
    </section>
  )
}
