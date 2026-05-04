import { Search } from 'lucide-react'
import { useState } from 'react'
import { CursoCard } from '../../../componentes/cursos/CursoCard'
import { cursos } from '../../../dados/cursos'
import { filtrarCursos } from '../../../servicos/filtros'

export function Cursos() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [tecnologia, setTecnologia] = useState('todas')
  const [nivel, setNivel] = useState('todos')
  const categorias = ['todas', ...new Set(cursos.map((curso) => curso.categoria))]
  const tecnologias = ['todas', ...new Set(cursos.map((curso) => curso.tecnologia))]
  const niveis = ['todos', ...new Set(cursos.map((curso) => curso.nivel))]
  const cursosFiltrados = filtrarCursos(cursos, busca, categoria, tecnologia, nivel)

  return (
    <section className="pagina">
      <div className="secao-cabecalho linha">
        <div>
          <span className="eyebrow">Catalogo</span>
          <h1>Cursos</h1>
          <p>Explore os Conteúdos da Plataforma e assista tudo por aqui.</p>
        </div>
      </div>
      <div className="filtros">
        <span className="filtro-label">FILTRAR</span>
        <label className="busca">
          <Search size={18} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por curso, tecnologia ou nivel" />
        </label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          {categorias.map((item) => (
            <option key={item} value={item}>
              {item === 'todas' ? 'Todas as categorias' : item}
            </option>
          ))}
        </select>
        <select value={tecnologia} onChange={(e) => setTecnologia(e.target.value)}>
          {tecnologias.map((item) => (
            <option key={item} value={item}>
              {item === 'todas' ? 'Todas as tecnologias' : item}
            </option>
          ))}
        </select>
        <select value={nivel} onChange={(e) => setNivel(e.target.value)}>
          {niveis.map((item) => (
            <option key={item} value={item}>
              {item === 'todos' ? 'Todos os niveis' : item}
            </option>
          ))}
        </select>
      </div>

      <section className="catalogo-bloco">
        <div className="secao-cabecalho linha">
          <div>
            <span className="eyebrow">Cursos</span>
            <h2>Conteúdos da Plataforma</h2>
          </div>
          <span>{cursosFiltrados.length} cursos</span>
        </div>
        <div className="grade-cards">
          {cursosFiltrados.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </div>
      </section>

      {!cursosFiltrados.length && (
        <div className="info-card">
          <h2>Nenhum resultado encontrado</h2>
          <p>Tente buscar por outra tecnologia, categoria ou nivel.</p>
        </div>
      )}
    </section>
  )
}
