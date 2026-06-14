import { useState } from 'react'
import { Link } from 'react-router-dom'
import mentorLadoDireito from '../../ativos/imagens/mentores/mentor-lado-direito.png'
import mentorLadoEsquerdo from '../../ativos/imagens/mentores/mentor-lado-esquerdo.png'

const exemplosPorCaso = [
  {
    termos: ['nome oficial', 'razão social', 'razao social', 'nome empresarial', 'nome jurídico', 'nome juridico'],
    rotulo: 'Nome oficial da empresa',
    exemplos: ['Trilum Tecnologia Ltda.', 'Avanade Brasil Ltda.', 'NexaFlow Soluções Digitais S.A.'],
  },
  {
    termos: ['setor de atuação', 'informar setor', 'setor'],
    rotulo: 'Setor da empresa',
    exemplos: ['Consultoria de Tecnologia', 'Desenvolvimento de Software', 'Dados e Inteligência Artificial'],
  },
  {
    termos: ['especialidades reais', 'listar especialidades', 'especialidades'],
    rotulo: 'Especialidades da empresa',
    exemplos: ['Cloud Computing', 'Desenvolvimento Web', 'Engenharia de Dados'],
  },
  {
    termos: ['stack usada', 'detalhar a stack', 'stack do dia a dia', 'stack'],
    rotulo: 'Stack em prática',
    exemplos: ['React, TypeScript e .NET', 'Azure, Docker e Kubernetes', 'Python, SQL e Power BI'],
  },
  {
    termos: ['nome comercial', 'nome da empresa'],
    rotulo: 'Nome de empresa válido',
    exemplos: ['Trilum Conecta', 'Avanade Brasil', 'Porto Digital Lab'],
  },
  {
    termos: ['e-mail corporativo', 'e-mails corporativos'],
    rotulo: 'E-mail corporativo válido',
    exemplos: ['rh@empresa.com.br', 'contato@meudominio.io', 'suporte@suaempresa.org'],
  },
  {
    termos: ['e-mail', 'e-mails'],
    rotulo: 'E-mail válido',
    exemplos: ['joao@empresa.com', 'maria@gmail.com', 'ana@uol.com.br'],
  },
  {
    termos: ['cpf'],
    rotulo: 'CPF válido',
    exemplos: ['529.982.247-25', '52998224725'],
  },
  {
    termos: ['cnpj'],
    rotulo: 'CNPJ válido',
    exemplos: ['11.222.333/0001-81', '00.000.000/0001-91', '06.990.590/0001-23'],
  },
  {
    termos: ['data', 'nascimento'],
    rotulo: 'Data válida',
    exemplos: ['15/08/1990', '01/01/2000', '29/02/2024'],
  },
  {
    termos: ['senha', 'senhas', 'caracteres', 'maiúscula', 'especiais', 'número'],
    rotulo: 'Senha válida',
    exemplos: ['Abc@1234', 'Trilum2026!', 'Conecta#123'],
  },
  {
    termos: ['nome'],
    rotulo: 'Nome válido',
    exemplos: ['Maria Silva', 'João Santos', 'Trilum Tecnologia'],
  },
  {
    termos: ['localização'],
    rotulo: 'Localização válida',
    exemplos: ['Recife, PE', 'São Paulo, SP', 'Remoto'],
  },
]

function exemploDoItem(item) {
  const texto = String(item || '').toLowerCase()
  return exemplosPorCaso.find((caso) => caso.termos.some((termo) => texto.includes(termo)))
}

export function MentorFeedback({
  saudacao,
  titulo = 'Mentor',
  itens = [],
  mensagem = '',
  acao,
  acaoSecundaria,
  posicao = 'direita',
  onClose,
}) {
  const [exemplosAbertos, setExemplosAbertos] = useState({})
  const [verMais, setVerMais] = useState({})
  const temConteudo = itens.length > 0 || mensagem
  if (!temConteudo) return null

  const noCantoDireito = posicao === 'direita'
  const robo = noCantoDireito ? mentorLadoDireito : mentorLadoEsquerdo
  const fimPrimeiraFrase = mensagem.indexOf('. ')
  const mensagemPrincipal = fimPrimeiraFrase >= 0 ? mensagem.slice(0, fimPrimeiraFrase + 1) : mensagem
  const mensagemDetalhe = fimPrimeiraFrase >= 0 ? mensagem.slice(fimPrimeiraFrase + 2) : ''

  function alternarExemplo(chave) {
    setExemplosAbertos((atual) => ({ ...atual, [chave]: !atual[chave] }))
  }

  function alternarVerMais(chave) {
    setVerMais((atual) => ({ ...atual, [chave]: !atual[chave] }))
  }

  return (
    <aside className={`mentor-feedback mentor-feedback-${posicao}`} aria-live="polite">
      <div className="mentor-feedback-shell">
        {onClose && (
          <button type="button" className="mentor-feedback-close" onClick={onClose} aria-label="Fechar aviso">
            X
          </button>
        )}
        <div className="mentor-feedback-bubble">
          <span className="mentor-feedback-label">{titulo}</span>
          {saudacao && <p className="mentor-feedback-greeting">{saudacao}</p>}
          {itens.length > 0 ? (
            <ul>
              {itens.map((item, index) => {
                const exemplo = exemploDoItem(item)
                const chave = `${index}-${item}-${exemplo?.rotulo || 'sem-exemplo'}`
                const aberto = Boolean(exemplosAbertos[chave])
                const mostrandoMais = Boolean(verMais[chave])
                const exemplos = mostrandoMais ? exemplo?.exemplos || [] : (exemplo?.exemplos || []).slice(0, 2)

                return (
                  <li key={chave}>
                    <div className="mentor-feedback-item-row">
                      <span>{item}</span>
                      {exemplo && (
                        <button type="button" aria-expanded={aberto} onClick={() => alternarExemplo(chave)}>
                          {aberto ? 'Ocultar exemplo' : `Ver exemplo de ${exemplo.rotulo}`}
                        </button>
                      )}
                    </div>
                    {exemplo && aberto && (
                      <div className="mentor-feedback-examples">
                        {exemplos.map((valor) => (
                          <code key={valor}>{valor}</code>
                        ))}
                        {exemplo.exemplos.length > 2 && (
                          <button type="button" onClick={() => alternarVerMais(chave)}>
                            {mostrandoMais ? 'ver menos' : 'ver mais'}
                          </button>
                        )}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          ) : (
            <>
              <p className="mentor-feedback-message">{mensagemPrincipal}</p>
              {mensagemDetalhe && <p className="mentor-feedback-message-detail">{mensagemDetalhe}</p>}
            </>
          )}
          {(acao || acaoSecundaria) && (
            <div className="mentor-feedback-actions">
              {acao?.to ? (
                <Link className="mentor-feedback-action" to={acao.to}>
                  {acao.label}
                </Link>
              ) : acao?.onClick ? (
                <button type="button" className="mentor-feedback-action" onClick={acao.onClick}>
                  {acao.label}
                </button>
              ) : acao ? (
                <a className="mentor-feedback-action" href={acao.href}>
                  {acao.label}
                </a>
              ) : null}
              {acaoSecundaria?.onClick && (
                <>
                  {acaoSecundaria.prefixo && <span className="mentor-feedback-action-prefix">{acaoSecundaria.prefixo}</span>}
                  <button type="button" className="mentor-feedback-action mentor-feedback-action-secondary" onClick={acaoSecundaria.onClick}>
                    {acaoSecundaria.label}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
        <img className="mentor-feedback-robot" src={robo} alt="" aria-hidden="true" />
      </div>
    </aside>
  )
}
