import { ArrowRight, RefreshCw, X } from 'lucide-react'
import { useState } from 'react'
import { createPortal } from 'react-dom'

function resumirOrientacao(texto = '', limite = 340) {
  const limpo = String(texto).replace(/\s+/g, ' ').trim()
  if (limpo.length <= limite) return limpo

  const frases = limpo.match(/[^.!?]+[.!?]+/g) || []
  const resumoPorFrases = frases.reduce((resumo, frase) => {
    const candidato = `${resumo} ${frase}`.trim()
    return candidato.length <= limite ? candidato : resumo
  }, '')

  if (resumoPorFrases) return resumoPorFrases

  const palavras = limpo.slice(0, limite).split(' ')
  palavras.pop()
  return `${palavras.join(' ')}.`
}

export function MentorInteligenteConteudo({ mensagemPadrao, cenario, onFixadoChange }) {
  const [detalheAberto, setDetalheAberto] = useState(false)
  const [detalheGerado, setDetalheGerado] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [duvidaAtiva, setDuvidaAtiva] = useState(null)
  const resumo = resumirOrientacao(cenario?.resumo || mensagemPadrao)
  const detalheBase = cenario?.detalhe || cenario?.descricao || mensagemPadrao
  const detalhe = detalheGerado || detalheBase

  async function prepararOrientacao(atualizar = false) {
    if (!cenario?.gerar || carregando) return
    setCarregando(true)
    onFixadoChange?.(true)

    try {
      const resultado = await cenario.gerar({ atualizar })
      setDetalheGerado(resultado || '')
    } finally {
      setCarregando(false)
    }
  }

  function abrirDetalhe() {
    setDetalheAberto(true)
    onFixadoChange?.(true)
    if (!detalheGerado) prepararOrientacao(false)
  }

  function fecharDetalhe() {
    setDetalheAberto(false)
    onFixadoChange?.(false)
  }

  return (
    <>
      <p>{resumo}</p>
      <div className="mentor-orientacao-acao-bolha">
        <button className="mentor-orientacao-abrir" type="button" onClick={abrirDetalhe}>
          Ver orientação completa <ArrowRight size={14} />
        </button>
      </div>

      {detalheAberto &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="mentor-orientacao-overlay" role="presentation" onClick={fecharDetalhe}>
            <aside
              className="mentor-orientacao-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Orientação completa do mentor"
              onClick={(evento) => evento.stopPropagation()}
            >
              <header>
                <div>
                  <span>Mentor</span>
                  <h2>{cenario?.titulo || 'Orientação completa'}</h2>
                </div>
                <button type="button" onClick={fecharDetalhe} aria-label="Fechar orientação completa">
                  <X size={18} />
                </button>
              </header>

              <div className="mentor-orientacao-corpo">
                <p>{carregando ? 'Preparando uma orientação personalizada para você...' : detalhe}</p>
                {!!cenario?.blocos?.length && (
                  <section className="mentor-orientacao-blocos" aria-label="Resumo da análise">
                    {cenario.blocos.map((bloco) => (
                      <article className="mentor-orientacao-bloco" key={bloco.titulo}>
                        <strong>{bloco.titulo}</strong>
                        <span>{bloco.valor}</span>
                      </article>
                    ))}
                  </section>
                )}
                {!!cenario?.sugestoes?.length && (
                  <section className="mentor-orientacao-lista">
                    <strong>{cenario?.modo === 'curso' ? 'O que focar neste curso' : 'Ordem sugerida'}</strong>
                    <ul>
                      {cenario.sugestoes.map((sugestao) => (
                        <li key={sugestao}>{sugestao}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {!!cenario?.exemplos?.length && (
                  <section className="mentor-orientacao-exemplos">
                    <strong>Exemplo</strong>
                    {cenario.exemplos.map((exemplo) => (
                      <p key={exemplo}>{exemplo}</p>
                    ))}
                  </section>
                )}
                {!!cenario?.duvidasRapidas?.length && (
                  <section className="mentor-orientacao-duvidas">
                    <strong>Dúvidas rápidas</strong>
                    <div>
                      {cenario.duvidasRapidas.map((duvida) => (
                        <button
                          className={duvidaAtiva?.pergunta === duvida.pergunta ? 'ativa' : ''}
                          key={duvida.pergunta}
                          type="button"
                          onClick={() => setDuvidaAtiva(duvida)}
                        >
                          {duvida.pergunta}
                        </button>
                      ))}
                    </div>
                    {duvidaAtiva && (
                      <p className="mentor-orientacao-resposta">
                        <strong>{duvidaAtiva.pergunta}</strong>
                        {duvidaAtiva.resposta}
                      </p>
                    )}
                  </section>
                )}
                {cenario?.acao?.to && (
                  <a className="mentor-orientacao-acao" href={cenario.acao.to}>
                    {cenario.acao.label}
                  </a>
                )}
                {cenario?.acao?.onClick && (
                  <button className="mentor-orientacao-acao" type="button" onClick={cenario.acao.onClick}>
                    {cenario.acao.label}
                  </button>
                )}
                {!!cenario?.acoes?.length && (
                  <div className="mentor-orientacao-acoes-contextuais">
                    {cenario.acoes.map((acao) => (
                      <button key={acao.label} type="button" onClick={acao.onClick}>
                        {acao.label}
                      </button>
                    ))}
                  </div>
                )}
                {!!cenario?.acoesLinks?.length && (
                  <nav className="mentor-orientacao-links" aria-label="Ações relacionadas">
                    {cenario.acoesLinks.map((acao) => (
                      <a key={acao.label} href={acao.to}>
                        {acao.label} <ArrowRight size={13} />
                      </a>
                    ))}
                  </nav>
                )}
              </div>

              <footer>
                {cenario?.gerar && (
                  <button type="button" onClick={() => prepararOrientacao(true)} disabled={carregando}>
                    <RefreshCw size={14} /> {carregando ? 'Preparando orientação...' : 'Atualizar orientação'}
                  </button>
                )}
                <small>Dica gerada pelo mentor da plataforma.</small>
              </footer>
            </aside>
          </div>,
          document.body,
        )}
    </>
  )
}
