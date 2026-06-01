import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { perguntasWizard } from '../../../dados/perguntasWizard'
import { useApp } from '../../../contextos/AppContext'

const perguntasPorEtapa = perguntasWizard.reduce((etapas, pergunta, indice) => {
  const etapa = Math.floor(indice / 2)
  return etapas.map((grupo, grupoIndice) => (grupoIndice === etapa ? [...grupo, pergunta] : grupo)).concat(etapas[etapa] ? [] : [[pergunta]])
}, [])

export function Questionario() {
  const { usuarioAtual, respostasWizard, salvarWizard, pularWizard } = useApp()
  const chaveUsuario = usuarioAtual?.id || 'sem-usuario'

  return (
    <QuestionarioFormulario
      key={chaveUsuario}
      respostasIniciais={respostasWizard}
      salvarWizard={salvarWizard}
      pularWizard={pularWizard}
    />
  )
}

function QuestionarioFormulario({ respostasIniciais, salvarWizard, pularWizard }) {
  const navigate = useNavigate()
  const [etapa, setEtapa] = useState(0)
  const [respostas, setRespostas] = useState(respostasIniciais)
  const perguntas = perguntasPorEtapa[etapa]
  const progresso = Math.round(((etapa + 1) / perguntasPorEtapa.length) * 100)
  const podeAvancar = perguntas.every((pergunta) => respostas[pergunta.id])

  function responder(id, valor) {
    setRespostas((atual) => ({ ...atual, [id]: valor }))
  }

  function avancar() {
    if (!podeAvancar) return
    if (etapa === perguntasPorEtapa.length - 1) {
      salvarWizard(respostas)
      navigate('/aluno/painel')
      return
    }
    setEtapa((atual) => atual + 1)
  }

  function pular() {
    pularWizard()
    navigate('/aluno/painel')
  }

  return (
    <section className="pagina pagina-estreita wizard-pagina">
      <div className="wizard-topo">
        <span className="eyebrow">Questionário de perfil</span>
        <h1>Vamos montar suas recomendações.</h1>
        <div className="wizard-progresso">
          <span style={{ width: `${progresso}%` }} />
        </div>
        <p>
          Etapa {etapa + 1} de {perguntasPorEtapa.length}
        </p>
      </div>

      <div className="wizard-lista">
        {perguntas.map((pergunta) => (
          <article className="wizard-card" key={pergunta.id}>
            <h2>{pergunta.titulo}</h2>
            <p>{pergunta.subtitulo}</p>
            <div className="opcoes-grid">
              {pergunta.opcoes.map((opcao) => {
                const ativo = respostas[pergunta.id] === opcao.valor
                return (
                  <button
                    className={ativo ? 'opcao-card ativo' : 'opcao-card'}
                    key={opcao.valor}
                    type="button"
                    onClick={() => responder(pergunta.id, opcao.valor)}
                  >
                    {ativo && <CheckCircle2 size={18} />}
                    {opcao.rotulo}
                  </button>
                )
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="linha-acoes fixa">
        <Botao variant="secondary" disabled={etapa === 0} onClick={() => setEtapa((atual) => atual - 1)}>
          <ArrowLeft size={18} /> Voltar
        </Botao>
        <Botao variant="secondary" onClick={pular}>
          Pular por enquanto
        </Botao>
        <Botao disabled={!podeAvancar} onClick={avancar}>
          {etapa === perguntasPorEtapa.length - 1 ? 'Finalizar' : 'Próximo'} <ArrowRight size={18} />
        </Botao>
      </div>
    </section>
  )
}
