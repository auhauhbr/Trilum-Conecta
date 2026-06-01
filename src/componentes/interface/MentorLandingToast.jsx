import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import mentorRoboDireita from '../../ativos/imagens/mentores/mentor-robo-direita.png'

const mensagensLanding = [
  {
    sectionId: 'hero',
    pose: 'right',
    msg: 'Oi! Sou o mentor da Trilum. Se você quer entrar em TI mas não sabe por onde começar, você está no lugar certo. Dá uma olhada.',
  },
  {
    sectionId: 'vagas',
    pose: 'left',
    msg: 'Com 1 perfil você já aparece pras vagas certas. Sem precisar ficar mandando currículo no escuro por aí.',
  },
  {
    sectionId: 'como-funciona',
    pose: 'right',
    msg: 'O processo é simples: responde o wizard, recebe sua trilha e vai avançando. Sem aquela sensação de não saber o que fazer.',
  },
  {
    sectionId: 'quem-somos',
    pose: 'left',
    msg: 'A Trilum foi criada por quem também está aprendendo. O time todo é da UNIT, um projeto feito com propósito real.',
  },
]

export function MentorLandingToast() {
  const [fechado, setFechado] = useState(false)
  const [sectionId, setSectionId] = useState(mensagensLanding[0].sectionId)
  const ratiosRef = useRef(new Map())
  const mensagemAtual = useMemo(
    () => mensagensLanding.find((mensagem) => mensagem.sectionId === sectionId) || mensagensLanding[0],
    [sectionId],
  )

  useEffect(() => {
    const secoes = Array.from(document.querySelectorAll('[data-mentor-section]'))
    if (!secoes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-mentor-section')
          if (!id) return
          ratiosRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const [maisVisivel] = Array.from(ratiosRef.current.entries()).sort((a, b) => b[1] - a[1])
        if (maisVisivel?.[1] > 0.18) {
          setSectionId((atual) => (atual === maisVisivel[0] ? atual : maisVisivel[0]))
        }
      },
      {
        threshold: [0.18, 0.35, 0.5, 0.7],
        rootMargin: '-8% 0px -28% 0px',
      },
    )

    secoes.forEach((secao) => observer.observe(secao))
    return () => observer.disconnect()
  }, [])

  if (fechado || typeof document === 'undefined') return null

  return createPortal(
    <aside className="mentor-landing-toast" aria-live="polite">
      <img className="mentor-landing-robot" src={mentorRoboDireita} alt="" aria-hidden="true" />
      <div className="mentor-landing-bubble" key={mensagemAtual.sectionId}>
        <span>Mentor</span>
        <p>{mensagemAtual.msg}</p>
      </div>
      <button type="button" className="mentor-landing-close" onClick={() => setFechado(true)} aria-label="Fechar mentor">
        X
      </button>
    </aside>,
    document.body,
  )
}
