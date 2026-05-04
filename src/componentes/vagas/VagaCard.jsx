import { ArrowRight, BriefcaseBusiness, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '../interface/Badge'

export function VagaCard({ vaga, empresa, match }) {
  const destino = `/aluno/vagas/${vaga.id}`

  return (
    <Link className="vaga-card card-interativo" to={destino}>
      <div className="card-topo">
        <Badge tone={vaga.status === 'ativa' ? 'success' : 'neutral'}>{vaga.status}</Badge>
        {match ? <span>{match}% aderente</span> : <span>{vaga.publicadaEm}</span>}
      </div>
      <h3>{vaga.titulo}</h3>
      <p>{vaga.descricao}</p>
      <div className="meta-linha">
        <span>
          <BriefcaseBusiness size={16} />
          {vaga.tipo} · {vaga.nivel}
        </span>
        <span>
          <MapPin size={16} />
          {vaga.modalidade}
        </span>
      </div>
      <div className="empresa-mini">
        <span>{empresa?.logoUrl ? <img src={empresa.logoUrl} alt="" /> : empresa?.logo || 'UP'}</span>
        <strong>{empresa?.nome || 'Empresa RiseUp'}</strong>
        <ArrowRight size={17} />
      </div>
    </Link>
  )
}
