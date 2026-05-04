import { Search } from 'lucide-react'
import { useState } from 'react'
import { VagaCard } from '../../../componentes/vagas/VagaCard'
import { useApp } from '../../../contextos/AppContext'
import { filtrarVagas } from '../../../servicos/filtros'
import { recomendarVagas } from '../../../servicos/recomendacoes'

export function VagasAluno() {
  const { respostasWizard, candidaturas, vagasEmpresa, empresas } = useApp()
  const [busca, setBusca] = useState('')
  const [data, setData] = useState('todas')
  const [modelo, setModelo] = useState('todos')
  const [local, setLocal] = useState('')
  const [cargo, setCargo] = useState('')
  const recomendadas = recomendarVagas(respostasWizard, candidaturas)
  const vagasComEmpresa = vagasEmpresa.map((vaga) => ({
    ...vaga,
    empresa: empresas.find((empresa) => empresa.id === vaga.empresaId),
    match: recomendadas.find((item) => item.id === vaga.id)?.match || 52,
  }))
  const modelos = ['todos', ...new Set(vagasComEmpresa.map((vaga) => vaga.modalidade))]
  const filtradas = filtrarVagas(vagasComEmpresa, { termo: busca, data, modelo, local, cargo })

  return (
    <section className="pagina">
      <div className="secao-cabecalho">
        <span className="eyebrow">Vagas</span>
        <h1>Oportunidades para sua jornada</h1>
        <p>Busque por cargo, tecnologia, senioridade ou status da vaga.</p>
      </div>
      <div className="filtros">
        <span className="filtro-label">FILTRAR</span>
        <label className="busca">
          <Search size={18} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por nome da vaga" />
        </label>
        <select value={data} onChange={(e) => setData(e.target.value)} aria-label="Data do anuncio">
          <option value="todas">Data do Anuncio</option>
          <option value="hoje">Hoje</option>
          <option value="7">Ultimos 7 dias</option>
          <option value="30">Ultimos 30 dias</option>
        </select>
        <select value={modelo} onChange={(e) => setModelo(e.target.value)} aria-label="Modelo de trabalho">
          {modelos.map((item) => (
            <option key={item} value={item}>
              {item === 'todos' ? 'Modelo de Trabalho' : item}
            </option>
          ))}
        </select>
        <input className="filtro-input" value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Local" />
        <input className="filtro-input" value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder="Cargo" />
      </div>
      <div className="grade-cards">
        {filtradas.map((vaga) => (
          <VagaCard key={vaga.id} vaga={vaga} empresa={vaga.empresa} match={vaga.match} />
        ))}
      </div>
    </section>
  )
}
