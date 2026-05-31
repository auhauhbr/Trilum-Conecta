import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import logoPlataforma from '../../ativos/imagens/logo-plataforma.png'
import oportunidadesImg from '../../ativos/imagens/oportunidades-ia.webp'
import phpBadge from '../../ativos/imagens/php-badge.svg'
import reactBadge from '../../ativos/imagens/react-badge.svg'

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
            <strong>Assista aulas dentro da plataforma</strong>
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

      <section className="stats-bar">
        <article>
          <strong>28+</strong>
          <span>cursos e trilhas</span>
        </article>
        <article>
          <strong>12 sem.</strong>
          <span>plano de estudo sugerido</span>
        </article>
        <article>
          <strong>100%</strong>
          <span>jornada guiada</span>
        </article>
        <article>
          <strong>1</strong>
          <span>perfil para estudar e se candidatar</span>
        </article>
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

      <section className="landing-exemplar">
        <h2>Uma plataforma construída para quem está começando</h2>
        <p>Tecnologia moderna e trilhas ideais para você, tudo em um só lugar.</p>
        <div className="landing-screen-mock" aria-label="Prévia em wireframe da plataforma">
          <div className="mock-window-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="mock-content">
            <div className="mock-sidebar">
              <span className="mock-menu-item active" />
              <span className="mock-menu-item" />
              <span className="mock-menu-item" />
              <span className="mock-menu-item" />
            </div>
            <div className="mock-main">
              <article className="mock-course-card">
                <img src={phpBadge} alt="PHP" />
                <div className="mock-text-lines">
                  <span className="mock-line title" />
                  <span className="mock-line short" />
                  <span className="mock-progress">
                    <span style={{ width: '62%' }} />
                  </span>
                </div>
              </article>
              <article className="mock-course-card">
                <img src={reactBadge} alt="React" />
                <div className="mock-text-lines">
                  <span className="mock-line title" />
                  <span className="mock-line medium" />
                  <span className="mock-progress">
                    <span style={{ width: '38%' }} />
                  </span>
                </div>
              </article>
            </div>
          </div>
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

      <section className="landing-about">
        <div>
          <h2>Quem somos</h2>
          <p>
            A RiseUp nasceu para reduzir as barreiras de entrada em TI. Unimos aprendizado estruturado, prática real e
            conexão com empresas numa plataforma que acompanha cada etapa da sua jornada.
          </p>
          <p>Aqui você encontra direcionamento certo para fazer a transição para a tecnologia.</p>
        </div>
        <div className="landing-about-stats">
          <article>
            <strong>28h</strong>
            <span>tempo médio de estudo semanal</span>
          </article>
          <article>
            <strong>4.8★</strong>
            <span>avaliação dos alunos</span>
          </article>
          <article>
            <strong>80%</strong>
            <span>piso de certificado</span>
          </article>
          <article>
            <strong>0</strong>
            <span>alunos sem suporte</span>
          </article>
        </div>
      </section>

      <section className="landing-platform-mark">
        <img src={logoPlataforma} alt="Logo da plataforma" />
        <p>Acreditamos em aprendizado simples, prático e com propósito real.</p>
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
