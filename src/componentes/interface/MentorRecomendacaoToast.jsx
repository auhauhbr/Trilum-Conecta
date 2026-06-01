import { ChevronRight, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import mentorRoboEsquerda from '../../ativos/imagens/mentores/mentor-robo-esquerda.png'
import { criarMensagensMentor } from '../../servicos/mentorRecomendacao'
import { lerStorage, salvarStorage } from '../../servicos/storage'
import { MentorCompactadoButton } from './MentorCompactadoButton'

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

export function MentorRecomendacaoToast({
  usuarioAtual,
  respostasWizard,
  trilhasRecomendadas,
  cursosRecomendados,
}) {
  const usuarioId = usuarioAtual?.id || 'sem-usuario'
  const assinaturaWizard = useMemo(() => JSON.stringify(respostasWizard || {}), [respostasWizard])
  const chaveFechado = `mentor-recomendacao-fechado:${usuarioId}`
  const chaveAssinatura = `mentor-recomendacao-assinatura:${usuarioId}`
  const assinaturaSalva = lerStorage(chaveAssinatura, '')
  const [fechado, setFechado] = useState(() => assinaturaSalva === assinaturaWizard && lerStorage(chaveFechado, false))
  const [indiceAtual, setIndiceAtual] = useState(0)
  const ratiosRef = useRef(new Map())
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
  const indiceSeguro = Math.min(indiceAtual, Math.max(mensagens.length - 1, 0))
  const mensagemAtual = mensagens[indiceSeguro] || mensagens[0]
  const fechadoEfetivo = assinaturaSalva === assinaturaWizard && fechado

  useEffect(() => {
    if (assinaturaSalva !== assinaturaWizard) {
      salvarStorage(chaveAssinatura, assinaturaWizard)
      salvarStorage(chaveFechado, false)
    }
  }, [assinaturaSalva, assinaturaWizard, chaveAssinatura, chaveFechado])

  useEffect(() => {
    const secoes = Array.from(document.querySelectorAll('[data-mentor-aluno-section]'))
    if (!secoes.length || !mensagens.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-mentor-aluno-section')
          if (!id) return
          ratiosRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const [maisVisivel] = Array.from(ratiosRef.current.entries()).sort((a, b) => b[1] - a[1])
        const mensagemId = mensagemPorSecao[maisVisivel?.[0]]

        if (maisVisivel?.[1] > 0.28 && mensagemId) {
          setIndiceAtual(indiceDaMensagem(mensagens, mensagemId))
        }
      },
      {
        threshold: [0.2, 0.35, 0.55, 0.75],
        rootMargin: '-12% 0px -24% 0px',
      },
    )

    secoes.forEach((secao) => observer.observe(secao))
    return () => observer.disconnect()
  }, [mensagens])

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
    setIndiceAtual((atual) => (atual + 1) % mensagens.length)
  }

  return createPortal(
    fechadoEfetivo ? (
      <MentorCompactadoButton posicao="direita" onClick={abrirCompactado} />
    ) : (
    <aside className="mentor-recomendacao-toast" aria-live="polite">
      <button type="button" className="mentor-recomendacao-close" onClick={fechar} aria-label="Fechar mentor">
        <X size={16} />
      </button>

      <div className="mentor-recomendacao-content">
        <div className="mentor-recomendacao-bubble" key={mensagemAtual.id}>
          <span>{mensagemAtual.titulo}</span>
          <p>{mensagemAtual.texto}</p>
          {mensagens.length > 1 && (
            <button type="button" className="mentor-recomendacao-next" onClick={proximaMensagem}>
              Proxima dica <ChevronRight size={14} />
            </button>
          )}
        </div>
        <img className="mentor-recomendacao-robot" src={mentorRoboEsquerda} alt="" aria-hidden="true" />
      </div>
    </aside>
    ),
    document.body,
  )
}
