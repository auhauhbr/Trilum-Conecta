/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'
import { empresas as empresasBase } from '../dados/empresas'
import { candidatosMock, vagas as vagasBase } from '../dados/vagas'
import { usuarios as usuariosBase } from '../dados/usuarios'
import { lerStorage, removerStorage, salvarStorage } from '../servicos/storage'

const AppContext = createContext(null)

const candidaturaInicial = [
  {
    id: 'cand-app-1',
    vagaId: 'vaga-1',
    alunoId: 'aluno-1',
    status: 'Em andamento',
    atualizadoEm: '2026-05-01 18:20',
  },
]

function normalizarLista(valor) {
  if (Array.isArray(valor)) return valor.filter(Boolean)
  return String(valor || '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizarTags(valor) {
  if (Array.isArray(valor)) return valor.map((tag) => String(tag).trim().toLowerCase()).filter(Boolean)
  return String(valor || '')
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
}

export function AppProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => lerStorage('usuarios', usuariosBase))
  const [empresas, setEmpresas] = useState(() => lerStorage('empresas', empresasBase))
  const [usuarioAtual, setUsuarioAtual] = useState(() => lerStorage('usuarioAtual', null))
  const [respostasWizard, setRespostasWizard] = useState(() => lerStorage('wizard', {}))
  const [progressoCursos, setProgressoCursos] = useState(() => lerStorage('progressoCursos', {}))
  const [candidaturas, setCandidaturas] = useState(() => lerStorage('candidaturas', candidaturaInicial))
  const [vagasEmpresa, setVagasEmpresa] = useState(() => lerStorage('vagasEmpresa', vagasBase))
  const [candidatos, setCandidatos] = useState(() => lerStorage('candidatos', candidatosMock))

  function persistir(chave, setter) {
    return (valorOuFn) => {
      setter((atual) => {
        const proximo = typeof valorOuFn === 'function' ? valorOuFn(atual) : valorOuFn
        salvarStorage(chave, proximo)
        return proximo
      })
    }
  }

  const setUsuariosPersistido = persistir('usuarios', setUsuarios)
  const setEmpresasPersistido = persistir('empresas', setEmpresas)
  const setRespostasPersistidas = persistir('wizard', setRespostasWizard)
  const setProgressoPersistido = persistir('progressoCursos', setProgressoCursos)
  const setCandidaturasPersistidas = persistir('candidaturas', setCandidaturas)
  const setVagasPersistidas = persistir('vagasEmpresa', setVagasEmpresa)
  const setCandidatosPersistidos = persistir('candidatos', setCandidatos)

  function login(email, senha) {
    const aluno = usuarios.find((item) => item.email === email && item.senha === senha)
    const empresa = empresas.find((item) => item.email === email && item.senha === senha)
    const conta = aluno || (empresa ? { ...empresa, tipo: 'empresa' } : null)

    if (!conta) {
      return { ok: false, mensagem: 'E-mail ou senha invalidos.' }
    }

    setUsuarioAtual(conta)
    salvarStorage('usuarioAtual', conta)
    return { ok: true, usuario: conta }
  }

  function logout() {
    setUsuarioAtual(null)
    removerStorage('usuarioAtual')
  }

  function cadastrarAluno(dados) {
    const novo = {
      id: `aluno-${Date.now()}`,
      tipo: 'aluno',
      foto: dados.nome
        .split(' ')
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase(),
      tecnologias: [],
      certificados: [],
      ...dados,
    }
    setUsuariosPersistido((lista) => [...lista, novo])
    setUsuarioAtual(novo)
    salvarStorage('usuarioAtual', novo)
    return novo
  }

  function cadastrarEmpresa(dados) {
    const nova = {
      id: `empresa-${Date.now()}`,
      tipo: 'empresa',
      logo: dados.nome
        .split(' ')
        .slice(0, 2)
        .map((parte) => parte[0])
        .join('')
        .toUpperCase(),
      capa:
        'linear-gradient(120deg, rgba(15, 23, 42, 0.95), rgba(20, 184, 166, 0.72))',
      descricao: dados.descricao || 'Empresa parceira da RiseUp em busca de talentos em formacao.',
      localizacao: dados.localizacao || 'Brasil',
      site: dados.site || 'https://riseup.dev',
      ...dados,
    }
    setEmpresasPersistido((lista) => [...lista, nova])
    setUsuarioAtual(nova)
    salvarStorage('usuarioAtual', nova)
    return nova
  }

  function salvarWizard(respostas) {
    setRespostasPersistidas(respostas)
  }

  function alternarAula(aulaId) {
    setProgressoPersistido((atual) => ({ ...atual, [aulaId]: !atual[aulaId] }))
  }

  function candidatar(vagaId) {
    setCandidaturasPersistidas((lista) => {
      if (lista.some((item) => item.vagaId === vagaId && item.alunoId === usuarioAtual?.id)) {
        return lista
      }
      return [
        ...lista,
        {
          id: `cand-${Date.now()}`,
          vagaId,
          alunoId: usuarioAtual?.id || 'aluno-demo',
          status: 'Candidatura enviada',
          atualizadoEm: new Date().toLocaleString('pt-BR'),
        },
      ]
    })
  }

  function cancelarCandidatura(vagaId) {
    setCandidaturasPersistidas((lista) =>
      lista.filter((item) => !(item.vagaId === vagaId && item.alunoId === usuarioAtual?.id)),
    )
  }

  function publicarVaga(dados) {
    const empresaId = usuarioAtual?.id || 'empresa-1'
    const nova = {
      id: `vaga-${Date.now()}`,
      empresaId,
      ...dados,
      status: 'ativa',
      publicadaEm: new Date().toISOString().slice(0, 10),
      candidatos: 0,
      tags: normalizarTags(dados.tags),
      requisitos: normalizarLista(dados.requisitos),
      atividades: normalizarLista(dados.atividades),
    }
    setVagasPersistidas((lista) => [nova, ...lista])
    return nova
  }

  function atualizarVaga(vagaId, dados) {
    const atualizada = {
      ...dados,
      tags: normalizarTags(dados.tags),
      requisitos: normalizarLista(dados.requisitos),
      atividades: normalizarLista(dados.atividades),
    }
    setVagasPersistidas((lista) =>
      lista.map((vaga) => (vaga.id === vagaId ? { ...vaga, ...atualizada } : vaga)),
    )
  }

  function atualizarStatusVaga(vagaId, status) {
    setVagasPersistidas((lista) => lista.map((vaga) => (vaga.id === vagaId ? { ...vaga, status } : vaga)))
  }

  function excluirVaga(vagaId) {
    setVagasPersistidas((lista) => lista.filter((vaga) => vaga.id !== vagaId))
  }

  function atualizarStatusCandidato(candidatoId, status) {
    setCandidatosPersistidos((lista) =>
      lista.map((candidato) => (candidato.id === candidatoId ? { ...candidato, status } : candidato)),
    )
  }

  function atualizarEmpresa(dados) {
    if (!usuarioAtual) return
    const atualizada = { ...usuarioAtual, ...dados }
    setUsuarioAtual(atualizada)
    salvarStorage('usuarioAtual', atualizada)
    setEmpresasPersistido((lista) => lista.map((empresa) => (empresa.id === atualizada.id ? atualizada : empresa)))
  }

  function atualizarAluno(dados) {
    if (!usuarioAtual) return
    const atualizado = { ...usuarioAtual, ...dados }
    setUsuarioAtual(atualizado)
    salvarStorage('usuarioAtual', atualizado)
    setUsuariosPersistido((lista) => lista.map((usuario) => (usuario.id === atualizado.id ? atualizado : usuario)))
  }

  const valor = {
    usuarios,
    empresas,
    usuarioAtual,
    respostasWizard,
    progressoCursos,
    candidaturas,
    vagasEmpresa,
    candidatos,
    login,
    logout,
    cadastrarAluno,
    cadastrarEmpresa,
    salvarWizard,
    alternarAula,
    candidatar,
    cancelarCandidatura,
    publicarVaga,
    atualizarVaga,
    atualizarStatusVaga,
    excluirVaga,
    atualizarStatusCandidato,
    atualizarAluno,
    atualizarEmpresa,
  }

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>
}

export function useApp() {
  const contexto = useContext(AppContext)
  if (!contexto) throw new Error('useApp deve ser usado dentro de AppProvider')
  return contexto
}
