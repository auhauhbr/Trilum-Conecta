import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../componentes/layout/AppLayout'
import { useApp } from '../contextos/AppContext'
import { Login } from '../paginas/Autenticacao/Login'
import { CadastroAluno } from '../paginas/Autenticacao/CadastroAluno'
import { CadastroEmpresa } from '../paginas/Autenticacao/CadastroEmpresa'
import { Cursos } from '../paginas/Aluno/Cursos/Cursos'
import { DetalheCurso } from '../paginas/Aluno/DetalheCurso/DetalheCurso'
import { DetalheVaga } from '../paginas/Aluno/DetalheVaga/DetalheVaga'
import { PainelAluno } from '../paginas/Aluno/Painel/PainelAluno'
import { PerfilAluno } from '../paginas/Aluno/Perfil/PerfilAluno'
import { PlayerCurso } from '../paginas/Aluno/PlayerCurso/PlayerCurso'
import { Questionario } from '../paginas/Aluno/Questionario/Questionario'
import { VagasAluno } from '../paginas/Aluno/Vagas/VagasAluno'
import { CriarVaga } from '../paginas/Empresa/CriarVaga/CriarVaga'
import { GerenciarVagas } from '../paginas/Empresa/GerenciarVagas/GerenciarVagas'
import { ListaCandidatos } from '../paginas/Empresa/ListaCandidatos/ListaCandidatos'
import { PainelEmpresa } from '../paginas/Empresa/Painel/PainelEmpresa'
import { PerfilEmpresa } from '../paginas/Empresa/PerfilEmpresa/PerfilEmpresa'
import { LandingPage } from '../paginas/LandingPage/LandingPage'

function Protegida({ children, tipo }) {
  const { usuarioAtual } = useApp()

  if (!usuarioAtual) return <Navigate to="/entrar" replace />
  if (tipo && usuarioAtual.tipo !== tipo) return <Navigate to="/" replace />
  return children
}

export function Rotas() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="entrar" element={<Login />} />
        <Route path="cadastro/aluno" element={<CadastroAluno />} />
        <Route path="cadastro/empresa" element={<CadastroEmpresa />} />
      </Route>

      <Route
        path="aluno"
        element={
          <Protegida tipo="aluno">
            <AppLayout tipo="aluno" />
          </Protegida>
        }
      >
        <Route index element={<Navigate to="/aluno/painel" replace />} />
        <Route path="questionario" element={<Questionario />} />
        <Route path="painel" element={<PainelAluno />} />
        <Route path="cursos" element={<Cursos />} />
        <Route path="cursos/:trilhaId" element={<DetalheCurso />} />
        <Route path="cursos/:trilhaId/aula/:aulaId" element={<PlayerCurso />} />
        <Route path="vagas" element={<VagasAluno />} />
        <Route path="vagas/:vagaId" element={<DetalheVaga />} />
        <Route path="perfil" element={<PerfilAluno />} />
      </Route>

      <Route
        path="empresa"
        element={
          <Protegida tipo="empresa">
            <AppLayout tipo="empresa" />
          </Protegida>
        }
      >
        <Route index element={<Navigate to="/empresa/painel" replace />} />
        <Route path="painel" element={<PainelEmpresa />} />
        <Route path="criar-vaga" element={<CriarVaga />} />
        <Route path="gerenciar-vagas" element={<GerenciarVagas />} />
        <Route path="vagas/:vagaId/editar" element={<CriarVaga />} />
        <Route path="vagas/:vagaId/candidatos" element={<ListaCandidatos />} />
        <Route path="perfil" element={<PerfilEmpresa />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
