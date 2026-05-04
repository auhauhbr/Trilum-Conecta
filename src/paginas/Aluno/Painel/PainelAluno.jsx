import { ArrowRight, Bell, BookOpen, BriefcaseBusiness, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CursoCard } from '../../../componentes/cursos/CursoCard'
import { TrilhaCard } from '../../../componentes/cursos/TrilhaCard'
import { Badge } from '../../../componentes/interface/Badge'
import { Botao } from '../../../componentes/interface/Botao'
import { VagaCard } from '../../../componentes/vagas/VagaCard'
import { useApp } from '../../../contextos/AppContext'
import { calcularProgresso, recomendarCursos, recomendarTrilhas, recomendarVagas } from '../../../servicos/recomendacoes'

const rotulos = {
  areaDesejada: 'Area',
  tecnologiaInteresse: 'Foco',
  nivelTecnologia: 'Nivel',
  objetivo: 'Objetivo',
}

export function PainelAluno() {
  const { usuarioAtual, respostasWizard, progressoCursos, candidaturas } = useApp()
  const recomendadas = recomendarTrilhas(respostasWizard)
  const cursosSugeridos = recomendarCursos(respostasWizard).slice(0, 4)
  const vagas = recomendarVagas(respostasWizard, candidaturas).slice(0, 3)
  const temWizard = Object.keys(respostasWizard).length > 0
  const primeiroNome = usuarioAtual?.nome?.split(' ')[0] || 'aluno'
  const iniciais = usuarioAtual?.foto || primeiroNome.slice(0, 2).toUpperCase()
  const trilhaPrincipal = recomendadas[0]
  const cursoPrincipal = cursosSugeridos[0]
  const resumoPerfil = Object.entries(rotulos)
    .map(([chave, rotulo]) => ({ rotulo, valor: respostasWizard[chave] }))
    .filter((item) => item.valor)

  return (
    <section className="dashboard-page">
      <div className="dashboard-html-hero">
        <div className="dashboard-hero-text">
          <span className="greeting-tag">Bem-vindo de volta</span>
          <h1>
            Ola, <span>{primeiroNome}!</span>
            <br />
            Continue sua jornada
          </h1>
          <p>
            {temWizard
              ? 'Seus proximos passos foram priorizados para evitar excesso de caminhos ao mesmo tempo.'
              : 'Complete o questionario para receber trilhas, cursos e vagas mais precisos.'}
          </p>
          <div className="hero-acoes">
            <Botao to="/aluno/cursos">Ver cursos</Botao>
            <Botao to="/aluno/vagas" variant="secondary">
              Explorar vagas
            </Botao>
          </div>
        </div>

        <aside className="dashboard-hero-panel">
          <div className="hero-panel-top">
            <div className="hero-panel-avatar">{iniciais}</div>
            <div className="hero-panel-greeting">
              <h3>{temWizard ? 'Perfil personalizado ativo' : 'Perfil generico'}</h3>
              <p>{trilhaPrincipal ? `${trilhaPrincipal.titulo} como prioridade` : 'Responda o wizard para personalizar'}</p>
            </div>
            <div className="bell-sm">
              <Bell size={15} />
              <span className="dot" />
            </div>
          </div>

          <div className="panel-cards">
            <article>
              <BookOpen size={18} />
              <span>Curso foco</span>
              <strong>{cursoPrincipal?.tecnologia || 'base'}</strong>
            </article>
            <article>
              <Target size={18} />
              <span>Trilhas</span>
              <strong>{recomendadas.length}</strong>
            </article>
            <article>
              <BriefcaseBusiness size={18} />
              <span>Vagas</span>
              <strong>{vagas.length}</strong>
            </article>
          </div>

          <div className="perfil-resumo-linha">
            {resumoPerfil.length ? (
              resumoPerfil.map((item) => (
                <Badge key={item.rotulo}>
                  {item.rotulo}: {item.valor}
                </Badge>
              ))
            ) : (
              <span>Sem respostas do wizard ainda.</span>
            )}
          </div>
        </aside>
      </div>

      <section className="dashboard-section bg-gray">
        <div className="section-header-html">
          <div>
            <h2>Trilhas para voce</h2>
            <p>Somente os caminhos mais importantes para o seu momento.</p>
          </div>
        </div>
        <div className="grade-cards">
          {recomendadas.map((trilha) => (
            <TrilhaCard key={trilha.id} trilha={trilha} progresso={calcularProgresso(trilha, progressoCursos)} />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-header-html">
          <div>
            <h2>Cursos recomendados</h2>
            <p>Conteudos para assistir na plataforma e dar o proximo passo.</p>
          </div>
          <Link className="see-all" to="/aluno/cursos">
            Ver catalogo <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grade-cards">
          {cursosSugeridos.map((curso) => (
            <CursoCard key={curso.id} curso={curso} motivo={curso.motivo} />
          ))}
        </div>
      </section>

      <section className="dashboard-section bg-gray">
        <div className="section-header-html">
          <div>
            <h2>Vagas para voce</h2>
            <p>Oportunidades compativeis com seu perfil atual.</p>
          </div>
          <Link className="see-all" to="/aluno/vagas">
            Ver vagas <ArrowRight size={14} />
          </Link>
        </div>
        <div className="vagas-painel-grid">
          {vagas.map((vaga) => (
            <VagaCard key={vaga.id} vaga={vaga} empresa={vaga.empresa} match={vaga.match} />
          ))}
        </div>
      </section>
    </section>
  )
}
