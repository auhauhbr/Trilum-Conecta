import { ArrowRight, BriefcaseBusiness, Clock3, Heart, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

function classeModalidade(modalidade = '') {
  const texto = modalidade.toLowerCase()
  if (texto.includes('presencial')) return 'presencial'
  if (texto.includes('híbrido') || texto.includes('hibrido')) return 'hibrido'
  return 'remoto'
}

function textoCurto(texto = '', limite = 170) {
  if (texto.length <= limite) return texto
  return `${texto.slice(0, limite).trim()}...`
}

function tagsDaVaga(vaga) {
  return Array.isArray(vaga.tags) ? vaga.tags.slice(0, 5) : []
}

export function VagaCard({ vaga, empresa, totalCandidatos }) {
  const destino = `/aluno/vagas?vaga=${vaga.id}`
  const tags = tagsDaVaga(vaga)
  const empresaLogo = empresa?.logo || 'UP'
  const candidatos = totalCandidatos ?? Number(vaga.candidatos || 0)

  return (
    <Link className="vaga-card vaga-job-card job-card job-card-candidato" to={destino}>
      <header className="job-card-header">
        <div className="job-badges">
          <span className={`job-badge badge-${classeModalidade(vaga.modalidade)}`}>{vaga.modalidade || 'Remoto'}</span>
          <span className="job-badge badge-tipo">{vaga.tipo || 'CLT'}</span>
          <span className="job-badge badge-nivel">{vaga.nivel || 'Júnior'}</span>
        </div>

        <h3 className="job-title">{vaga.titulo}</h3>
        <div className="job-company">
          <span className="company-logo">{empresa?.logoUrl ? <img src={empresa.logoUrl} alt="" /> : empresaLogo}</span>
          {empresa?.nome || 'Empresa Trilum Conecta'}
        </div>
      </header>

      <div className="job-card-body">
        <p className="job-section-label">Salário</p>
        <strong className="job-salary">{vaga.salario || 'A combinar'}</strong>

        <p className="job-section-label">Descrição</p>
        <p className="job-description">{textoCurto(vaga.descricao)}</p>

        <div className="job-meta">
          <span className="job-meta-item">
            <BriefcaseBusiness size={16} />
            {vaga.modalidade || 'Remoto'}
          </span>
          <span className="job-meta-item">
            <MapPin size={16} />
            {vaga.localizacao || 'Brasil'}
          </span>
          <span className="job-meta-item">
            <Clock3 size={16} />
            {vaga.publicadaEm || 'Hoje'}
          </span>
        </div>

        {tags.length > 0 && (
          <>
            <p className="job-section-label">Tecnologias</p>
            <div className="job-tags">
              {tags.map((tag) => (
                <span className="job-tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="job-card-footer">
        <span className="job-stats">
          <span className="stat-item">
            <strong className="stat-number">{candidatos}</strong> {candidatos === 1 ? 'candidato' : 'candidatos'}
          </span>
        </span>
        <span className="job-actions">
          <span className="btn btn-secondary">
            <Heart size={15} />
            Salvar
          </span>
          <strong className="btn btn-primary">
            Ver detalhes <ArrowRight size={15} />
          </strong>
        </span>
      </footer>
    </Link>
  )
}
