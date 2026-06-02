import { ArrowRight } from 'lucide-react'
import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { MentorLandingToast } from '../../componentes/interface/MentorLandingToast'
import brunoAvatar from '../../ativos/imagens/equipe/bruno-v-m-silva.jpg'
import eduardoAvatar from '../../ativos/imagens/equipe/eduardo-farias.png'
import eltonAvatar from '../../ativos/imagens/equipe/elton-bezerra-da-silva.png'
import evertonAvatar from '../../ativos/imagens/equipe/everton-m-silva.jpg'
import gabrielAvatar from '../../ativos/imagens/equipe/gabriel-monteiro.png'
import jeffersonAvatar from '../../ativos/imagens/equipe/jefferson-santos.jpg'
import logoPlataforma from '../../ativos/imagens/logo-plataforma.png'
import oportunidadesImg from '../../ativos/imagens/oportunidades-ia.webp'
import phpBadge from '../../ativos/imagens/php-badge.svg'
import reactBadge from '../../ativos/imagens/react-badge.svg'

const membrosEquipe = [
  {
    nome: 'Everton M. Silva',
    faculdade: 'Análise e Desenvolvimento de Sistemas - UNIT',
    foto: evertonAvatar,
    iniciais: 'ES',
    github: 'https://github.com/evertonmsilva1080-crypto',
  },
  {
    nome: 'Bruno V. M. Silva',
    faculdade: 'Análise e Desenvolvimento de Sistemas - UNIT',
    foto: brunoAvatar,
    iniciais: 'BS',
    github: 'https://github.com/bvenicius',
  },
  {
    nome: 'Jefferson Santos',
    faculdade: 'Análise e Desenvolvimento de Sistemas - UNIT',
    foto: jeffersonAvatar,
    iniciais: 'JS',
    github: 'https://github.com/auhauhbr',
  },
  {
    nome: 'Elton Bezerra da Silva',
    faculdade: 'Análise e Desenvolvimento de Sistemas - UNIT',
    foto: eltonAvatar,
    iniciais: 'EB',
    github: 'https://github.com/Elton-bezerra-da-silva',
  },
  {
    nome: 'Eduardo Farias',
    faculdade: 'Análise e Desenvolvimento de Sistemas - UNIT',
    foto: eduardoAvatar,
    iniciais: 'EF',
    github: 'https://github.com/EduFarias23',
  },
  {
    nome: 'Gabriel Monteiro',
    faculdade: 'Análise e Desenvolvimento de Sistemas - UNIT',
    foto: gabrielAvatar,
    iniciais: 'GM',
    github: 'https://github.com/gbrlmonteiron',
    linkedin: 'https://www.linkedin.com/in/gabriel-monteiro-45b8411b8/',
  },
]

export function LandingPage() {
  return (
    <div className="landing-udemy">
      <section className="landing-udemy-hero" id="hero" data-mentor-section="hero">
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

      <section className="stats-bar" data-mentor-section="vagas">
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

      <section className="landing-opportunity-band" id="vagas" data-mentor-section="vagas">
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

      <section className="landing-section-udemy" id="como-funciona" data-mentor-section="como-funciona">
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

      <section className="landing-about" id="quem-somos" data-mentor-section="quem-somos">
        <div>
          <h2>Quem somos</h2>
          <p>
            A Trilum Conecta nasceu para reduzir as barreiras de entrada em TI. Unimos aprendizado estruturado, prática real e
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

      <section className="landing-team" aria-labelledby="landing-team-title" data-mentor-section="quem-somos">
        <div className="landing-team-heading">
          <span>Nossa equipe</span>
          <h2 id="landing-team-title">As pessoas por trás da Trilum Conecta</h2>
          <p>Um time unido para transformar orientação, estudo e oportunidades em uma jornada mais clara.</p>
        </div>

        <div className="landing-team-grid">
          {membrosEquipe.map((membro) => (
            <article className="team-card" key={membro.nome}>
              <div className="team-avatar" aria-hidden="true">
                {membro.foto ? (
                  <>
                    <img
                      src={membro.foto}
                      alt=""
                      loading="lazy"
                      onError={(evento) => {
                        evento.currentTarget.hidden = true
                        evento.currentTarget.nextElementSibling.hidden = false
                      }}
                    />
                    <span hidden>{membro.iniciais}</span>
                  </>
                ) : (
                  <span>{membro.iniciais}</span>
                )}
              </div>
              <h3>{membro.nome}</h3>
              <p>{membro.faculdade}</p>
              <div className="team-socials" aria-label={`Redes sociais de ${membro.nome}`}>
                {membro.github ? (
                  <a href={membro.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${membro.nome}`}>
                    <TbBrandGithub size={20} />
                  </a>
                ) : (
                  <span title="GitHub em breve" aria-label={`GitHub de ${membro.nome} em breve`}>
                    <TbBrandGithub size={20} />
                  </span>
                )}
                {membro.linkedin && (
                  <a href={membro.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${membro.nome}`}>
                    <TbBrandLinkedin size={20} />
                  </a>
                )}
              </div>
            </article>
          ))}
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

      <MentorLandingToast />
    </div>
  )
}
