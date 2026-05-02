import heroImg from '../../ativos/imagens/riseup-tech-hero.png'
import { Link } from 'react-router-dom'
import { 
  FaUser, FaBuilding, FaCode, FaDatabase, 
  FaPaintBrush, FaMedal, FaMap, FaBriefcase, 
  FaChartLine, FaComments, FaGraduationCap, 
  FaBell, FaArrowRight, FaCheckCircle 
} from 'react-icons/fa'
import { TbCertificate } from 'react-icons/tb'
import { MdOutlineDashboard } from 'react-icons/md'

export function LandingPage() {
  return (
    <div className="landing-html">
      <div className="landing-hero-html">
        <img className="landing-hero-html-img" src={heroImg} alt="Ambiente colaborativo de aprendizado" />
        <div className="landing-hero-html-text">
          <h1>Aprenda hoje<br /><span>Trabalhe<br />amanhã</span></h1>
        </div>
      </div>

      <div className="landing-section-html how" id="como-funciona">
        <p className="landing-section-label">Como funciona</p>
        <h2 className="landing-section-title">Da transição à contratação</h2>
        <p className="landing-section-desc">Uma plataforma que guia cada etapa da sua jornada para entrar em TI.</p>
        <div className="how-grid-html">
          <div className="steps-html">
            <div className="step-html">
              <div className="step-num-html">1</div>
              <div className="step-body-html">
                <h3>Crie seu perfil</h3>
                <p>Informe área atual, objetivo e disponibilidade. Leva menos de 3 minutos.</p>
              </div>
            </div>
            <div className="step-html">
              <div className="step-num-html">2</div>
              <div className="step-body-html">
                <h3>Receba sua trilha personalizada</h3>
                <p>Cursos, projetos práticos e soft skills alinhados ao seu perfil e objetivos.</p>
              </div>
            </div>
            <div className="step-html">
              <div className="step-num-html">3</div>
              <div className="step-body-html">
                <h3>Candidate-se às vagas</h3>
                <p>Vagas filtradas para o seu nível. Aplique com currículo e portfólio integrados.</p>
              </div>
            </div>
            <div className="step-html">
              <div className="step-num-html">4</div>
              <div className="step-body-html">
                <h3>Seja contratado</h3>
                <p>Empresas visualizam seu histórico de cursos e certificados diretamente.</p>
              </div>
            </div>
          </div>
          <div className="how-visual-html">
            <p className="visual-label-html">Seus cursos</p>
            <div className="course-card-html">
              <FaCode className="course-icon-html blue-soft" size={32} />
              <div className="course-meta-html">
                <h4>JavaScript do zero</h4>
                <p>Desenvolvimento Web · 24h</p>
                <div className="bar-html"><div className="bar-fill-html w-68"></div></div>
              </div>
              <span>68%</span>
            </div>
            <div className="course-card-html">
              <FaDatabase className="course-icon-html green-soft" size={32} />
              <div className="course-meta-html">
                <h4>Banco de dados SQL</h4>
                <p>Dados · 16h</p>
                <div className="bar-html"><div className="bar-fill-html complete"></div></div>
              </div>
              <span className="ok"><FaCheckCircle size={16} /></span>
            </div>
            <div className="course-card-html">
              <FaPaintBrush className="course-icon-html orange-soft" size={32} />
              <div className="course-meta-html">
                <h4>UX/UI Design</h4>
                <p>Design · 18h</p>
                <div className="bar-html"><div className="bar-fill-html w-22"></div></div>
              </div>
              <span>22%</span>
            </div>
            <div className="cert-pill-html">
              <TbCertificate size={24} />
              <div>
                <p>Certificado disponível!</p>
                <small>Banco de dados SQL · ver em Meu Perfil</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-section-html forwho" id="para-quem">
        <p className="landing-section-label">Para quem é</p>
        <h2 className="landing-section-title">Dois lados, uma solução</h2>
        <p className="landing-section-desc">Conectamos quem quer entrar em TI com empresas que precisam de talentos.</p>
        <div className="forwho-grid-html">
          <div className="persona-card-html">
            <FaUser className="persona-icon-html" size={48} />
            <h3>Para você, profissional</h3>
            <p>Está buscando mudar de área e entrar em TI mas não sabe por onde começar? A RiseUp oferece direcionamento real, projetos práticos e conexão com empresas.</p>
            <div className="tags-html">
              <span>Trilhas de carreira</span>
              <span>Projetos práticos</span>
              <span>Simulações de entrevista</span>
              <span>Soft skills</span>
              <span>Certificados</span>
            </div>
          </div>
          <div className="persona-card-html">
            <FaBuilding className="persona-icon-html" size={48} />
            <h3>Para sua empresa</h3>
            <p>Cansado de currículos sem consistência? Acesse perfis com histórico real de cursos, métricas de desempenho e candidatos verdadeiramente prontos.</p>
            <div className="tags-html">
              <span>Filtro de candidatos</span>
              <span>Histórico de cursos</span>
              <span>Métricas reais</span>
              <span>Chat com candidatos</span>
              <span>Gestão de vagas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-section-html features" id="funcionalidades">
        <p className="landing-section-label">Funcionalidades</p>
        <h2 className="landing-section-title">Tudo que você precisa em um lugar</h2>
        <div className="features-grid-html">
          <div className="feature-card-html">
            <FaMap size={32} />
            <h3>Trilhas personalizadas</h3>
            <p>Roteiros de aprendizado montados com base no seu perfil e disponibilidade.</p>
          </div>
          <div className="feature-card-html">
            <FaBriefcase size={32} />
            <h3>Vagas filtradas</h3>
            <p>Encontre oportunidades compatíveis com seu nível e candidate-se com um clique.</p>
          </div>
          <div className="feature-card-html">
            <MdOutlineDashboard size={32} />
            <h3>Portfólio integrado</h3>
            <p>Cursos, certificados e métricas visíveis diretamente para os recrutadores.</p>
          </div>
          <div className="feature-card-html">
            <FaComments size={32} />
            <h3>Chat com recrutadores</h3>
            <p>Comunicação direta com a empresa após candidatura, pela própria plataforma.</p>
          </div>
          <div className="feature-card-html">
            <FaGraduationCap size={32} />
            <h3>Certificados automáticos</h3>
            <p>Ao concluir um curso, o certificado é emitido e salvo no perfil automaticamente.</p>
          </div>
          <div className="feature-card-html">
            <FaBell size={32} />
            <h3>Notificações em tempo real</h3>
            <p>Acompanhe candidaturas e receba atualizações das empresas na hora.</p>
          </div>
        </div>
      </div>

      <div className="landing-section-html cta-html" id="cadastro">
        <p className="landing-section-label">Comece agora</p>
        <h2 className="landing-section-title">Sua carreira em TI começa aqui</h2>
        <p className="landing-section-desc">Junte-se a profissionais que já estão se qualificando e conectando com as empresas certas.</p>
        <div className="cta-actions-html">
          <Link to="/cadastro/aluno" className="btn-primary-html">
            Criar conta grátis <FaArrowRight size={14} />
          </Link>
          <Link to="/entrar" className="btn-ghost-html" id="login">Já tenho conta</Link>
        </div>
      </div>

      <footer className="footer-html">
        <div>Rise<span>Up</span></div>
        <p>© 2026 RiseUp · Squad 14 · Unit-PE · Porto Digital</p>
      </footer>
    </div>
  )
}