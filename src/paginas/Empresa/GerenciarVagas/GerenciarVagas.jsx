import { Eye, Pencil, Power, Search, Trash2, UsersRound } from 'lucide-react'
import { useState } from 'react'
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
  const minhas = vagasEmpresa.filter((vaga) => vaga.empresaId === usuarioAtual?.id || usuarioAtual?.id === 'empresa-1')
  const filtradas = filtrarPorTextoEStatus(minhas, busca, status)

  return (
    <section className="pagina empresa-gerenciar-page">
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
              <Link className="mini-acao-azul" to={`/empresa/vagas/${vaga.id}/candidatos`}>
                Visualizar candidatos
              </Link>
            </div>
            <div className="empresa-vaga-meta">
              <span>Data publicação: {vaga.publicadaEm}</span>
              <span>Status: <b className={statusClasse(vaga.status)}>{statusRotulo(vaga.status)}</b></span>
            </div>
            <div className="empresa-row-acoes">
              <Link to={`/empresa/vagas/${vaga.id}/editar`}>
                <Pencil size={18} /> Editar
              </Link>
              <button type="button" onClick={() => atualizarStatusVaga(vaga.id, vaga.status === 'ativa' ? 'encerrada' : 'ativa')}>
                <Power size={18} /> {vaga.status === 'ativa' ? 'Encerrar' : 'Reativar'}
              </button>
              <button type="button" onClick={() => excluirVaga(vaga.id)}>
                <Trash2 size={18} /> Excluir
              </button>
              <Link to={`/empresa/vagas/${vaga.id}/candidatos`}>
                <Eye size={18} /> Visualizar vaga
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
