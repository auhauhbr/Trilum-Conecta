import { Eye, Pencil, Power, Search, Trash2, UsersRound } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { Avatar } from '../../../componentes/perfis/Avatar'
import { useApp } from '../../../contextos/AppContext'
import { filtrarPorTextoEStatus } from '../../../servicos/filtros'

function statusClasse(status) {
  return status === 'ativa' ? 'status-chip status-ativa' : 'status-chip status-encerrada'
}

function statusRotulo(status) {
  return status === 'ativa' ? 'Ativa' : 'Encerrada'
}

export function GerenciarVagas() {
  const { usuarioAtual, vagasEmpresa, atualizarStatusVaga, excluirVaga } = useApp()
  const [busca, setBusca] = useState('')
  const [status, setStatus] = useState('todos')
  const [notificacao, setNotificacao] = useState('')
  const [vagaParaExcluir, setVagaParaExcluir] = useState(null)
  const notificacaoTimeout = useRef(null)
  const minhas = vagasEmpresa.filter((vaga) => vaga.empresaId === usuarioAtual?.id || usuarioAtual?.id === 'empresa-1')
  const filtradas = filtrarPorTextoEStatus(minhas, busca, status)

  function mostrarNotificacao(mensagem, duracao = 3000) {
    setNotificacao(mensagem)
    if (notificacaoTimeout.current) {
      clearTimeout(notificacaoTimeout.current)
    }
    notificacaoTimeout.current = setTimeout(() => {
      setNotificacao('')
      notificacaoTimeout.current = null
    }, duracao)
  }

  function solicitarExclusao(vagaId) {
    setVagaParaExcluir(vagaId)
  }

  function confirmarExclusao() {
    if (!vagaParaExcluir) return
    excluirVaga(vagaParaExcluir)
    mostrarNotificacao('Vaga excluída com sucesso', 4500)
    setVagaParaExcluir(null)
  }

  function mudarStatus(vagaId, statusAtual) {
    const novoStatus = statusAtual === 'ativa' ? 'encerrada' : 'ativa'
    atualizarStatusVaga(vagaId, novoStatus)
    const mensagem = novoStatus === 'ativa' ? 'Vaga reativada com sucesso' : 'Vaga encerrada com sucesso'
    mostrarNotificacao(mensagem, novoStatus === 'encerrada' ? 6000 : 4000)
  }

  return (
    <section className="pagina empresa-gerenciar-page">
      {notificacao && (
        <div className="notificacao notificacao-sucesso">
          {notificacao}
        </div>
      )}
      {vagaParaExcluir && (
        <div className="notificacao notificacao-confirmacao">
          <strong>Confirmar exclusão</strong>
          <p>Deseja excluir esta vaga permanentemente? Esta ação não pode ser desfeita.</p>
          <div className="notificacao-acoes">
            <button type="button" className="botao botao-secondary" onClick={() => setVagaParaExcluir(null)}>
              Cancelar
            </button>
            <button type="button" className="botao botao-danger" onClick={confirmarExclusao}>
              Excluir vaga
            </button>
          </div>
        </div>
      )}
      <div className="secao-cabecalho linha">
        <div>
          <span className="eyebrow">Gerenciar</span>
          <h1>Vagas publicadas</h1>
        </div>
        <Botao className="botao botao-primary botao-quadrado" to="/empresa/criar-vaga">
          Criar vaga
        </Botao>
      </div>
      <div className="filtros">
        <label className="busca">
          <Search size={18} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar vaga" />
        </label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todos">Todos os status</option>
          <option value="ativa">Ativas</option>
          <option value="encerrada">Encerradas</option>
        </select>
      </div>
      <div className="empresa-gerenciar-lista">
        {filtradas.map((vaga) => (
          <article className="empresa-gerenciar-row" key={vaga.id}>
            <div className="empresa-vaga-titulo">
              <Avatar texto={usuarioAtual?.logo || 'EM'} imagem={usuarioAtual?.logoUrl} />
              <div>
                <small>{usuarioAtual?.nome}</small>
                <strong>{vaga.titulo}</strong>
              </div>
            </div>
            <div className="empresa-vaga-candidatos">
              <UsersRound size={22} />
              <span>Número de candidato:</span>
              <strong>{vaga.candidatos || 0}</strong>
            </div>
            <div className="empresa-vaga-meta">
              <span>Data publicação: {vaga.publicadaEm}</span>
              <span>Status: <b className={statusClasse(vaga.status)}>{statusRotulo(vaga.status)}</b></span>
            </div>
            <div className="empresa-row-acoes">
              <Link to={`/empresa/vagas/${vaga.id}/candidatos`}>
                <UsersRound size={18} /> Visualizar candidatos
              </Link>
              <Link to={`/empresa/vagas/${vaga.id}/editar`}>
                <Pencil size={18} /> Editar
              </Link>
              <button type="button" onClick={() => mudarStatus(vaga.id, vaga.status)}>
                <Power size={18} /> {vaga.status === 'ativa' ? 'Encerrar' : 'Reativar'}
              </button>
              <button type="button" onClick={() => solicitarExclusao(vaga.id)}>
                <Trash2 size={18} /> Excluir
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
