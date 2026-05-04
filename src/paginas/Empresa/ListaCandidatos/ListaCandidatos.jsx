import { Check, Eye, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge } from '../../../componentes/interface/Badge'
import { Botao } from '../../../componentes/interface/Botao'
import { cursos } from '../../../dados/cursos'
import { useApp } from '../../../contextos/AppContext'

function encontrarCurso(nome) {
  const termo = nome.toLowerCase()
  return cursos.find((curso) => curso.titulo.toLowerCase().includes(termo) || termo.includes(curso.titulo.toLowerCase()))
}

export function ListaCandidatos() {
  const { vagaId } = useParams()
  const { vagasEmpresa, candidatos, atualizarStatusCandidato } = useApp()
  const [busca, setBusca] = useState('')
  const vaga = vagasEmpresa.find((item) => item.id === vagaId)
  const filtrados = candidatos.filter((candidato) => {
    const texto = `${candidato.nome} ${candidato.cargo} ${candidato.tecnologias.join(' ')} ${candidato.cursos.join(' ')}`.toLowerCase()
    return texto.includes(busca.toLowerCase())
  })

  return (
    <section className="pagina candidatos-page">
      <div className="empresa-candidatos-hero">
        <span className="eyebrow">Visualizar candidatos</span>
        <h1>{vaga?.titulo || 'Vaga'}</h1>
        <p>{filtrados.length} candidatos encontrados para avaliação.</p>
      </div>
      <div className="filtros">
        <label className="busca">
          <Search size={18} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Filtrar por nome, curso, experiência ou tecnologia" />
        </label>
      </div>
      <div className="empresa-candidatos-lista">
        {filtrados.map((candidato) => (
          <article className="empresa-candidato-row" key={candidato.id}>
            <div className="empresa-candidato-info">
              <span className="avatar">{candidato.nome.split(' ').map((parte) => parte[0]).slice(0, 2).join('')}</span>
              <div>
                <h3>Nome: {candidato.nome}</h3>
                <p>{candidato.cargo}</p>
                <Badge tone={candidato.status === 'Reprovado' ? 'danger' : 'brand'}>{candidato.status}</Badge>
              </div>
            </div>
            <div className="empresa-candidato-cursos">
              <strong>Cursos realizados:</strong>
              <div>
                {candidato.cursos.map((nomeCurso) => {
                  const curso = encontrarCurso(nomeCurso)
                  return (
                    <span className={curso?.thumbnailUrl ? 'curso-chip-mini com-thumb' : 'curso-chip-mini'} key={nomeCurso}>
                      {curso?.thumbnailUrl && <img src={curso.thumbnailUrl} alt="" />}
                      {nomeCurso}
                    </span>
                  )
                })}
              </div>
            </div>
            <div className="empresa-candidato-acoes">
              <Botao className="botao botao-secondary botao-quadrado" variant="secondary">
                <Eye size={18} /> Perfil do candidato
              </Botao>
              <button type="button" onClick={() => atualizarStatusCandidato(candidato.id, 'Selecionado')}>
                <Check size={20} /> Aceitar
              </button>
              <button type="button" onClick={() => atualizarStatusCandidato(candidato.id, 'Reprovado')}>
                <X size={20} /> Rejeitar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
