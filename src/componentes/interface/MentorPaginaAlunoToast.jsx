import { ChevronRight, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import mentorRoboEsquerda from '../../ativos/imagens/mentores/mentor-robo-esquerda.png'
import { MentorCompactadoButton } from './MentorCompactadoButton'

function indiceDaMensagem(mensagens, id) {
  const indice = mensagens.findIndex((mensagem) => mensagem.id === id)
  return indice >= 0 ? indice : 0
}

export function MentorPaginaAlunoToast({ mensagens = [], mapaSecoes = {}, className = '' }) {
  const [fechado, setFechado] = useState(false)
  const [indiceAtual, setIndiceAtual] = useState(0)
  const ratiosRef = useRef(new Map())
  const mensagensValidas = useMemo(() => mensagens.filter(Boolean), [mensagens])
  const indiceSeguro = Math.min(indiceAtual, Math.max(mensagensValidas.length - 1, 0))
  const mensagemAtual = mensagensValidas[indiceSeguro]

  useEffect(() => {
    const secoes = Array.from(document.querySelectorAll('[data-mentor-pagina-section]'))
    if (!secoes.length || !mensagensValidas.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-mentor-pagina-section')
          if (!id) return
          ratiosRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const [maisVisivel] = Array.from(ratiosRef.current.entries()).sort((a, b) => b[1] - a[1])
        const mensagemId = mapaSecoes[maisVisivel?.[0]]

        if (maisVisivel?.[1] > 0.24 && mensagemId) {
          setIndiceAtual(indiceDaMensagem(mensagensValidas, mensagemId))
        }
      },
      {
        threshold: [0.18, 0.32, 0.5, 0.7],
        rootMargin: '-10% 0px -24% 0px',
      },
    )

    secoes.forEach((secao) => observer.observe(secao))
    return () => observer.disconnect()
  }, [mapaSecoes, mensagensValidas])

  if (!mensagemAtual || typeof document === 'undefined') return null

  return createPortal(
    fechado ? (
      <MentorCompactadoButton posicao="direita" onClick={() => setFechado(false)} />
    ) : (
    <aside className={`mentor-recomendacao-toast mentor-pagina-toast ${className}`} aria-live="polite">
      <button type="button" className="mentor-recomendacao-close" onClick={() => setFechado(true)} aria-label="Fechar mentor">
        <X size={16} />
      </button>

      <div className="mentor-recomendacao-content">
        <div className="mentor-recomendacao-bubble" key={mensagemAtual.id}>
          <span>Mentor</span>
          <p>{mensagemAtual.msg}</p>
          {mensagensValidas.length > 1 && (
            <button type="button" className="mentor-recomendacao-next" onClick={() => setIndiceAtual((atual) => (atual + 1) % mensagensValidas.length)}>
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
