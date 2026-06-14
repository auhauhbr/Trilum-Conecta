import { RefreshCw, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import mentorRoboEsquerda from '../../ativos/imagens/mentores/mentor-robo-esquerda.png'
import { criarOrientacoesMentorAluno } from '../../servicos/mentorAlunoOrientacoes'
import { criarMensagensMentor } from '../../servicos/mentorRecomendacao'
import { lerStorage, salvarStorage } from '../../servicos/storage'
import { MentorCompactadoButton } from './MentorCompactadoButton'
import { MentorInteligenteConteudo } from './MentorInteligenteConteudo'

const mensagemPorSecao = {
  resumo: 'saudacao',
  trilhas: 'trilhas',
  cursos: 'cursos',
  vagas: 'vagas',
}

function indiceDaMensagem(mensagens, id) {
  const indice = mensagens.findIndex((mensagem) => mensagem.id === id)
  return indice >= 0 ? indice : 0
}

function deveIniciarCompacto() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px), (max-height: 620px)').matches
}

function cenarioDaMensagem(mensagem, cenarios) {
  const idPorMensagem = {
    trilhas: 'trilha',
    cursos: 'curso',
  }
  const id = idPorMensagem[mensagem?.id] || 'geral'
  return cenarios.find((cenario) => cenario.id === id) || cenarios[0]
}

export function MentorRecomendacaoToast({
  usuarioAtual,
  respostasWizard,
  trilhasRecomendadas,
  cursosRecomendados,
  cenariosInteligentes = [],
  orientacaoContextual = null,
}) {
  const usuarioId = usuarioAtual?.id || 'sem-usuario'
  const assinaturaWizard = useMemo(() => JSON.stringify(respostasWizard || {}), [respostasWizard])
  const chaveFechado = `mentor-recomendacao-fechado:${usuarioId}`
  const chaveAssinatura = `mentor-recomendacao-assinatura:${usuarioId}`
  const assinaturaSalva = lerStorage(chaveAssinatura, '')
  const [fechado, setFechado] = useState(
    () => deveIniciarCompacto() || (assinaturaSalva === assinaturaWizard && lerStorage(chaveFechado, false)),
  )
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [dicaFixada, setDicaFixada] = useState(false)
  const [secaoAtual, setSecaoAtual] = useState('resumo')
  const [reiniciarDica, setReiniciarDica] = useState(0)
  const ratiosRef = useRef(new Map())
  const interacaoManualRef = useRef(false)
  const liberarInteracaoRef = useRef()
  const mensagens = useMemo(
    () =>
      criarMensagensMentor({
        usuarioAtual,
        respostasWizard,
        trilhasRecomendadas,
        cursosRecomendados,
      }),
    [usuarioAtual, respostasWizard, trilhasRecomendadas, cursosRecomendados],
  )
  const orientacoesBase = useMemo(
    () =>
      criarOrientacoesMentorAluno({
        paginaAtual: 'painel',
        mensagens,
        trilhasRecomendadas,
        cursosRecomendados,
      }),
    [cursosRecomendados, mensagens, trilhasRecomendadas],
  )
  const orientacoes = useMemo(
    () => (orientacaoContextual ? [orientacaoContextual, ...orientacoesBase] : orientacoesBase),
    [orientacaoContextual, orientacoesBase],
  )
  const indiceSeguro = Math.min(indiceAtual, Math.max(orientacoes.length - 1, 0))
  const mensagemAtual = orientacoes[indiceSeguro] || orientacoes[0]
  const mensagemEhContextual = Boolean(orientacaoContextual && mensagemAtual?.id === orientacaoContextual.id)
  const cenarioBase = mensagemEhContextual ? {} : cenarioDaMensagem(mensagemAtual, cenariosInteligentes)
  const cenarioAtual = {
    ...cenarioBase,
    titulo: mensagemAtual?.titulo || cenarioBase?.titulo,
    resumo: mensagemAtual?.resumo,
    detalhe: mensagemAtual?.detalhe || cenarioBase?.detalhe,
    acao: mensagemAtual?.acao || cenarioBase?.acao,
    exemplos: mensagemAtual?.exemplos,
    sugestoes: mensagemAtual?.sugestoes,
  }
  const fechadoEfetivo = fechado

  useEffect(() => {
    if (assinaturaSalva !== assinaturaWizard) {
      salvarStorage(chaveAssinatura, assinaturaWizard)
      salvarStorage(chaveFechado, false)
    }
  }, [assinaturaSalva, assinaturaWizard, chaveAssinatura, chaveFechado])

  useEffect(() => {
    const secoes = Array.from(document.querySelectorAll('[data-mentor-aluno-section]'))
    if (!secoes.length || !orientacoes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-mentor-aluno-section')
          if (!id) return
          ratiosRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const [maisVisivel] = Array.from(ratiosRef.current.entries()).sort((a, b) => b[1] - a[1])
        const mensagemId = mensagemPorSecao[maisVisivel?.[0]]

        if (maisVisivel?.[1] > 0.28 && mensagemId && !interacaoManualRef.current) {
          setSecaoAtual(maisVisivel[0])
          setIndiceAtual(indiceDaMensagem(orientacoes, mensagemId))
        }
      },
      {
        threshold: [0.2, 0.35, 0.55, 0.75],
        rootMargin: '-12% 0px -24% 0px',
      },
    )

    secoes.forEach((secao) => observer.observe(secao))
    return () => observer.disconnect()
  }, [dicaFixada, orientacoes])

  if (!mensagemAtual || typeof document === 'undefined') return null

  function fechar() {
    salvarStorage(chaveFechado, true)
    setFechado(true)
  }

  function abrirCompactado() {
    salvarStorage(chaveFechado, false)
    setFechado(false)
  }

  function proximaMensagem() {
    interacaoManualRef.current = true
    setDicaFixada(false)
    setReiniciarDica((valor) => valor + 1)
    setIndiceAtual((atual) => (atual + 1) % orientacoes.length)
    window.clearTimeout(liberarInteracaoRef.current)
    liberarInteracaoRef.current = window.setTimeout(() => {
      interacaoManualRef.current = false
    }, 900)
  }

  function fixarDica(fixada) {
    interacaoManualRef.current = fixada
    setDicaFixada(fixada)
  }

  return createPortal(
    fechadoEfetivo ? (
      <MentorCompactadoButton posicao="direita" onClick={abrirCompactado} />
    ) : (
    <aside className={`mentor-recomendacao-toast ${['trilhas', 'cursos', 'vagas'].includes(secaoAtual) && !dicaFixada ? 'mentor-modo-semi' : ''}`} aria-live="polite">
      <button type="button" className="mentor-recomendacao-close" onClick={fechar} aria-label="Fechar mentor">
        <X size={16} />
      </button>

      <div className="mentor-recomendacao-content">
        <div className="mentor-recomendacao-bubble" key={mensagemAtual.id}>
          <span>{mensagemAtual.titulo}</span>
          <MentorInteligenteConteudo
            key={`${mensagemAtual.id}:${reiniciarDica}:${cenariosInteligentes.map((cenario) => cenario.id).join(':')}`}
            mensagemPadrao={mensagemAtual.resumo}
            cenario={cenarioAtual}
            onFixadoChange={fixarDica}
          />
          {orientacoes.length > 1 && (
            <div className="mentor-recomendacao-acoes">
              <button type="button" className="mentor-recomendacao-next" onClick={proximaMensagem}>
                Outra dica <RefreshCw size={13} />
              </button>
            </div>
          )}
        </div>
        <img className="mentor-recomendacao-robot" src={mentorRoboEsquerda} alt="" aria-hidden="true" />
      </div>
    </aside>
    ),
    document.body,
  )
}
