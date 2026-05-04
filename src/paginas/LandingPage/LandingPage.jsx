import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import oportunidadesImg from '../../ativos/imagens/oportunidades-ia.webp'

export function LandingPage() {
  return (
    <div className="landing-udemy">
      <section className="landing-udemy-hero">
        <div className="landing-hero-copy">
          <span className="hero-label">Plataforma de carreira em TI</span>
          <h1>
            Aprenda hoje. <br />
            <em>Trabalhe</em>
            <br />
            amanhã.
          </h1>
          <p>
            Uma plataforma que guia cada etapa da sua jornada para entrar em TI: cursos, trilhas personalizadas e
            vagas compatíveis com seu perfil.
          </p>
          <div className="hero-cta">
            <Link className="btn-large primary" to="/cadastro/aluno">
              Começar agora <ArrowRight size={16} />
            </Link>
            <Link className="btn-large ghost" to="/entrar">
              Já tenho conta
            </Link>
          </div>
        </div>

        <aside className="landing-video-card" aria-label="Prévia de curso na plataforma">
          <div className="landing-video-copy">
            <span>Prévia da experiência</span>
            <strong>Assista aulas dentro da RiseUp</strong>
            <p>Prévia de entrevista para programadores: veja os primeiros 40 segundos e continue pela plataforma.</p>
          </div>
          <div className="landing-video-frame">
            <iframe
              title="Prévia de entrevista de emprego para programadores"
              src="https://www.youtube.com/embed/1AEc30Do97E?start=0&end=40"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </aside>
      </section>

      <section className="landing-opportunity-band">
        <div className="landing-opportunity-image">
          <img src={oportunidadesImg} alt="Pessoa segurando anotação sobre inteligência artificial" />
        </div>
        <div className="landing-opportunity-copy">
          <h2>Encontre sua próxima oportunidade com mais facilidade</h2>
          <p>
            Pare de perder tempo procurando vagas sem direção. Com nossa plataforma, você recebe oportunidades
            alinhadas ao seu perfil e acompanha tudo de forma simples e organizada.
          </p>
          <p>
            Descubra vagas ideais, acompanhe suas candidaturas e avance na sua carreira com mais clareza, confiança e
            praticidade.
          </p>
        </div>
      </section>

      <section className="landing-section-udemy">
        <div className="section-heading">
          <span>Como funciona</span>
          <h2>Da transição à candidatura</h2>
          <p>O aluno responde ao wizard, recebe os próximos passos e acompanha o progresso no próprio perfil.</p>
        </div>
        <div className="feature-grid-udemy">
          <article>
            <span>01</span>
            <h3>Trilhas personalizadas</h3>
            <p>Caminhos curtos e priorizados para evitar excesso de opções.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Cursos na plataforma</h3>
            <p>Conteúdos da plataforma com tela de detalhes, player e progresso.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Vagas compatíveis</h3>
            <p>Oportunidades ordenadas de acordo com o perfil, objetivo e tecnologias estudadas.</p>
          </article>
        </div>
      </section>

      <section className="landing-section-udemy dual">
        <article>
          <h3>Para quem quer entrar em TI</h3>
          <p>Direcionamento, portfólio, soft skills e progresso visível para entrevistas.</p>
        </article>
        <article>
          <h3>Para empresas parceiras</h3>
          <p>Perfis com histórico de estudo, candidaturas e indicadores de formação.</p>
        </article>
      </section>

      <section className="landing-section-udemy cta-udemy">
        <h2>Comece sua jornada com uma trilha clara.</h2>
        <Link className="btn-large primary" to="/cadastro/aluno">
          Criar conta grátis <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
