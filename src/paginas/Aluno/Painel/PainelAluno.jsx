import { ArrowRight, Bell, BookOpen, BriefcaseBusiness, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CursoCard } from '../../../componentes/cursos/CursoCard'
import { TrilhaCard } from '../../../componentes/cursos/TrilhaCard'
import { Badge } from '../../../componentes/interface/Badge'
import { Botao } from '../../../componentes/interface/Botao'
import { MentorRecomendacaoToast } from '../../../componentes/interface/MentorRecomendacaoToast'
import { VagaCard } from '../../../componentes/vagas/VagaCard'
import { useApp } from '../../../contextos/AppContext'
import { modoApresentacao } from '../../../dados/usuarios'
import { contarCandidatosDaVaga } from '../../../servicos/candidaturas'
import { criarOrientacaoPainel } from '../../../servicos/mentorAlunoContextual'
import {
  gerarExplicacaoCurso,
  gerarExplicacaoRecomendacoes,
  gerarExplicacaoTrilha,
  montarContextoMentorAluno,
} from '../../../servicos/mentorIA'
import { calcularProgresso, recomendarCursos, recomendarTrilhas, recomendarVagas } from '../../../servicos/recomendacoes'

const rotulos = {
  areaDesejada: 'Area',
  tecnologiaInteresse: 'Foco',
  nivelTecnologia: 'Nivel',
  objetivo: 'Objetivo',
}

export function PainelAluno() {
  const { usuarioAtual, respostasWizard, progressoCursos, candidaturas, candidatos, vagasEmpresa, empresas } = useApp()
  const apresentacaoAtiva = modoApresentacao.ativo
  const recomendadas = recomendarTrilhas(respostasWizard)
  const cursosSugeridos = recomendarCursos(respostasWizard).slice(0, 4)
  const vagas = apresentacaoAtiva ? [] : recomendarVagas(respostasWizard, candidaturas, vagasEmpresa, empresas).slice(0, 3)
  const temWizard = Object.keys(respostasWizard).length > 0
  const primeiroNome = usuarioAtual?.nome?.split(' ')[0] || 'aluno'
  const iniciais = usuarioAtual?.foto || primeiroNome.slice(0, 2).toUpperCase()
  const trilhaPrincipal = recomendadas[0]
  const cursoPrincipal = cursosSugeridos[0]
  const contextoMentor = montarContextoMentorAluno({
    usuarioAtual,
    respostasWizard,
    trilhasRecomendadas: recomendadas,
    cursosRecomendados: cursosSugeridos,
    vagasRecomendadas: vagas,
    curriculo: usuarioAtual?.curriculo,
  })
  const orientacaoContextual = criarOrientacaoPainel({
    usuarioAtual,
    perfilProfissional: usuarioAtual?.perfilProfissional,
    curriculo: usuarioAtual?.curriculo,
    progresso: progressoCursos,
    respostasWizard,
    trilhasRecomendadas: recomendadas,
    cursosRecomendados: cursosSugeridos,
    candidaturas,
  })
  const cenariosMentor = [
    {
      id: 'geral',
      label: 'Visão geral',
      titulo: 'Seus próximos passos',
      gerar: (opcoes) => gerarExplicacaoRecomendacoes(contextoMentor, opcoes),
    },
    trilhaPrincipal && {
      id: 'trilha',
      label: 'Trilha principal',
      titulo: `Por que ${trilhaPrincipal.titulo}?`,
      resumo: `${trilhaPrincipal.titulo} é sua jornada principal porque combina melhor com seu perfil e momento atual.`,
      detalhe: trilhaPrincipal.motivo,
      acao: { label: 'Ir para trilha principal', to: `#/aluno/cursos/${trilhaPrincipal.id}` },
      gerar: (opcoes) => gerarExplicacaoTrilha({ ...contextoMentor, trilhas: contextoMentor.trilhas.slice(0, 1) }, opcoes),
    },
    cursoPrincipal && {
      id: 'curso',
      label: 'Curso principal',
      titulo: `Por que começar por ${cursoPrincipal.titulo}?`,
      resumo: `${cursoPrincipal.titulo} é o próximo passo prático dentro da sua jornada atual.`,
      detalhe: cursoPrincipal.motivo,
      acao: { label: 'Ver curso recomendado', to: `#/aluno/cursos/${cursoPrincipal.id}` },
      gerar: (opcoes) => gerarExplicacaoCurso({ ...contextoMentor, cursos: contextoMentor.cursos.slice(0, 1) }, opcoes),
    },
  ].filter(Boolean)
  const resumoPerfil = Object.entries(rotulos)
    .map(([chave, rotulo]) => ({ rotulo, valor: respostasWizard[chave] }))
    .filter((item) => item.valor)

  return (
    <section className="dashboard-page">
      <div className="dashboard-html-hero" data-mentor-aluno-section="resumo">
        <div className="dashboard-hero-text">
          <span className="greeting-tag">Bem-vindo de volta</span>
          <h1>
            Ola, <span>{primeiroNome}!</span>
            <br />
            Continue sua jornada
          </h1>
          <p>
            {temWizard
              ? 'Seus próximos passos foram priorizados para evitar excesso de caminhos ao mesmo tempo.'
              : 'lorem.'}
          </p>
          <div className="hero-acoes">
            <Botao to="/aluno/cursos">Ver cursos</Botao>
            {apresentacaoAtiva ? (
              <button className="botao botao-secondary" disabled type="button">
                Explorar vagas
              </button>
            ) : (
              <Botao to="/aluno/vagas" variant="secondary">
                Explorar vagas
              </Botao>
            )}
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

      <section className="dashboard-section bg-gray" data-mentor-aluno-section="trilhas">
        <div className="section-header-html">
          <div>
            <h2>Trilhas para você</h2>
            <p>Somente os caminhos mais importantes para o seu momento.</p>
          </div>
        </div>
        <div className="grade-cards">
          {recomendadas.map((trilha) => (
            <TrilhaCard key={trilha.id} trilha={trilha} progresso={calcularProgresso(trilha, progressoCursos)} origem="recomendacao" />
          ))}
        </div>
      </section>

      <section className="dashboard-section" data-mentor-aluno-section="cursos">
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
            <CursoCard key={curso.id} curso={curso} motivo={curso.motivo} origem="recomendacao" />
          ))}
        </div>
      </section>

      <section className="dashboard-section bg-gray" data-mentor-aluno-section="vagas">
        <div className="section-header-html">
          <div>
            <h2>Vagas para você</h2>
            <p>Oportunidades compatíveis com seu perfil atual.</p>
          </div>
          {apresentacaoAtiva ? (
            <span className="see-all">Ver vagas <ArrowRight size={14} /></span>
          ) : (
            <Link className="see-all" to="/aluno/vagas">
              Ver vagas <ArrowRight size={14} />
            </Link>
          )}
        </div>
        <div className="vagas-painel-grid">
          {apresentacaoAtiva ? (
            <p>Vazio vazio man</p>
          ) : (
            vagas.map((vaga) => (
              <VagaCard
                key={vaga.id}
                vaga={vaga}
                empresa={vaga.empresa}
                match={vaga.match}
                totalCandidatos={contarCandidatosDaVaga(vaga.id, candidatos, candidaturas)}
              />
            ))
          )}
        </div>
      </section>
      {usuarioAtual?.wizardConcluido && (
        <MentorRecomendacaoToast
          usuarioAtual={usuarioAtual}
          respostasWizard={respostasWizard}
          trilhasRecomendadas={recomendadas}
          cursosRecomendados={cursosSugeridos}
          cenariosInteligentes={cenariosMentor}
          orientacaoContextual={orientacaoContextual}
        />
      )}
    </section>
  )
}
