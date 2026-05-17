import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { modoApresentacao } from '../../dados/usuarios'

export function AppLayout({ tipo = 'publico' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const apresentacaoAtiva = modoApresentacao.ativo
  const rotaInicial = tipo === 'aluno' ? '/aluno/painel' : tipo === 'empresa' ? '/empresa/painel' : '/'
  const mostrarVoltar = !apresentacaoAtiva && tipo !== 'publico' && location.pathname !== rotaInicial
  const telaDeAula = /^\/aluno\/cursos\/[^/]+\/aula\/[^/]+/.test(location.pathname)
  const mainClassName = tipo === 'publico' ? undefined : telaDeAula ? 'main-com-nav nav-aula' : 'main-com-nav'
  const navClassName = 'public-nav nav-fixa'
  const linksPublicos = [
    { to: '/', label: 'Home' },
    { to: '/cadastro/aluno', label: 'Cadastrar' },
    { to: '/entrar', label: 'Login' },
  ]
  const linksAluno = [
    { to: '/aluno/painel', label: 'Painel' },
    { to: '/aluno/cursos', label: 'Cursos' },
    { to: '/aluno/vagas', label: 'Vagas' },
    { to: '/aluno/perfil', label: 'Meu Perfil' },
  ]
  const linksAlunoApresentacao = [
    { to: '/aluno/painel', label: 'Painel' },
    { to: '/aluno/cursos', label: 'Cursos' },
  ]
  const linksEmpresa = [
    { to: '/empresa/painel', label: 'Painel' },
    { to: '/empresa/criar-vaga', label: 'Criar' },
    { to: '/empresa/gerenciar-vagas', label: 'Gerenciar' },
    { to: '/empresa/perfil', label: 'Meu Perfil' },
  ]
  const links = tipo === 'aluno' ? (apresentacaoAtiva ? linksAlunoApresentacao : linksAluno) : tipo === 'empresa' ? linksEmpresa : linksPublicos

  return (
    <div className="app-shell public-shell">
      {!telaDeAula && (
        <header className={navClassName}>
          <nav className="public-nav-links">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
            {mostrarVoltar && (
              <button className="nav-voltar" type="button" onClick={() => navigate(-1)}>
                Voltar
              </button>
            )}
          </nav>
        </header>
      )}
      <main className={mainClassName}>
        <Outlet />
      </main>
      {!telaDeAula && (
        <footer className="site-footer">
          <strong>
            Rise<span>Up</span>
          </strong>
          <p>Projeto acadêmico de plataforma de carreira em tecnologia.</p>
          <small>Squad 14 - Residência Tecnológica</small>
        </footer>
      )}
    </div>
  )
}
