import { RefreshCw, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import mentorRoboEsquerda from '../../ativos/imagens/mentores/mentor-robo-esquerda.png'
import { criarOrientacoesMentorAluno } from '../../servicos/mentorAlunoOrientacoes'
import { MentorCompactadoButton } from './MentorCompactadoButton'
import { MentorInteligenteConteudo } from './MentorInteligenteConteudo'

function indiceDaMensagem(mensagens, id) {
  const indice = mensagens.findIndex((mensagem) => mensagem.id === id)
  return indice >= 0 ? indice : 0
}

function deveIniciarCompacto() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px), (max-height: 620px)').matches
}

export function MentorPaginaAlunoToast({
  mensagens = [],
  mapaSecoes = {},
  cenariosInteligentes = [],
  orientacaoContextual = null,
  className = '',
}) {
  const [fechado, setFechado] = useState(deveIniciarCompacto)
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [dicaFixada, setDicaFixada] = useState(false)
  const [reiniciarDica, setReiniciarDica] = useState(0)
  const [contextoIgnoradoId, setContextoIgnoradoId] = useState('')
  const ratiosRef = useRef(new Map())
  const interacaoManualRef = useRef(false)
  const liberarInteracaoRef = useRef()
  const mensagensValidas = useMemo(() => mensagens.filter(Boolean), [mensagens])
  const orientacoesBase = useMemo(
    () => criarOrientacoesMentorAluno({ paginaAtual: 'pagina-aluno', mensagens: mensagensValidas }),
    [mensagensValidas],
  )
  const orientacoes = useMemo(() => {
    if (!orientacaoContextual) return orientacoesBase
    return [orientacaoContextual, ...orientacoesBase.filter((orientacao) => orientacao.id !== orientacaoContextual.id)]
  }, [orientacaoContextual, orientacoesBase])
  const orientacaoContextualId = orientacaoContextual?.id
  const indiceSeguro = Math.min(indiceAtual, Math.max(orientacoes.length - 1, 0))
  const mensagemAtual =
    orientacaoContextual && contextoIgnoradoId !== orientacaoContextualId ? orientacaoContextual : orientacoes[indiceSeguro]
  const mensagemEhContextual = Boolean(orientacaoContextualId && mensagemAtual?.id === orientacaoContextualId)

  useEffect(() => {
    if (!orientacaoContextualId) return undefined
    interacaoManualRef.current = true
    window.clearTimeout(liberarInteracaoRef.current)
    const atualizarContexto = window.setTimeout(() => {
      setIndiceAtual(0)
      setReiniciarDica((valor) => valor + 1)
    }, 0)
    liberarInteracaoRef.current = window.setTimeout(() => {
      interacaoManualRef.current = false
    }, 1400)
    return () => window.clearTimeout(atualizarContexto)
  }, [orientacaoContextualId])

  useEffect(() => {
    const secoes = Array.from(document.querySelectorAll('[data-mentor-pagina-section]'))
    if (!secoes.length || !orientacoes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-mentor-pagina-section')
          if (!id) return
          ratiosRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const [maisVisivel] = Array.from(ratiosRef.current.entries()).sort((a, b) => b[1] - a[1])
        const mensagemId = mapaSecoes[maisVisivel?.[0]]

        if (maisVisivel?.[1] > 0.24 && mensagemId && !interacaoManualRef.current) {
          setIndiceAtual(indiceDaMensagem(orientacoes, mensagemId))
        }
      },
      {
        threshold: [0.18, 0.32, 0.5, 0.7],
        rootMargin: '-10% 0px -24% 0px',
      },
    )

    secoes.forEach((secao) => observer.observe(secao))
    return () => observer.disconnect()
  }, [dicaFixada, mapaSecoes, orientacoes])

  if (!mensagemAtual || typeof document === 'undefined') return null

  function fixarDica(fixada) {
    interacaoManualRef.current = fixada
    setDicaFixada(fixada)
  }

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
          <MentorInteligenteConteudo
            key={`${mensagemAtual.id}:${reiniciarDica}:${cenariosInteligentes.map((cenario) => cenario.id).join(':')}`}
            mensagemPadrao={mensagemAtual.resumo}
            cenario={{
              ...(mensagemEhContextual ? {} : cenariosInteligentes[0]),
              id: mensagemAtual.id,
              titulo: mensagemAtual.titulo || cenariosInteligentes[0]?.titulo,
              resumo: mensagemAtual.resumo,
              detalhe: mensagemAtual.detalhe || cenariosInteligentes[0]?.descricao,
              acao: mensagemAtual.acao || cenariosInteligentes[0]?.acao,
              exemplos: mensagemAtual.exemplos,
              sugestoes: mensagemAtual.sugestoes,
              acoes: mensagemAtual.acoes,
              blocos: mensagemAtual.blocos,
              duvidasRapidas: mensagemAtual.duvidasRapidas,
              acoesLinks: mensagemAtual.acoesLinks,
              modo: mensagemAtual.modo,
              gerar: mensagemAtual.gerar || (mensagemEhContextual ? undefined : cenariosInteligentes[0]?.gerar),
            }}
            onFixadoChange={fixarDica}
          />
          {orientacoes.length > 1 && (
            <div className="mentor-recomendacao-acoes">
              <button
                type="button"
                className="mentor-recomendacao-next"
                onClick={() => {
                  interacaoManualRef.current = true
                  setContextoIgnoradoId(orientacaoContextualId || '')
                  setDicaFixada(false)
                  setReiniciarDica((valor) => valor + 1)
                  setIndiceAtual((atual) => (atual + 1) % orientacoes.length)
                  window.clearTimeout(liberarInteracaoRef.current)
                  liberarInteracaoRef.current = window.setTimeout(() => {
                    interacaoManualRef.current = false
                  }, 900)
                }}
              >
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
