import { Award, BookOpen, Check, Clock3, Eye, FileText, Search, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Botao } from '../../../componentes/interface/Botao'
import { MentorEmpresaToast } from '../../../componentes/interface/MentorEmpresaToast'
import { useApp } from '../../../contextos/AppContext'
import { cursos } from '../../../dados/cursos'
import { trilhas } from '../../../dados/trilhas'
import { cursoComoConteudo } from '../../../servicos/conteudosCurso'
import { duracaoParaMinutos, minutosParaDuracao } from '../../../servicos/duracao'

function normalizarTexto(valor = '') {
  return String(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function encontrarCurso(nome) {
  const termo = normalizarTexto(nome)
  return cursos.find((curso) => {
    const titulo = normalizarTexto(curso.titulo)
    return titulo.includes(termo) || termo.includes(titulo) || normalizarTexto(curso.id) === termo
  })
}

function encontrarTrilha(nome) {
  const termo = normalizarTexto(nome)
  return trilhas.find((trilha) => {
    const titulo = normalizarTexto(trilha.titulo)
    return titulo.includes(termo) || termo.includes(titulo) || normalizarTexto(trilha.id) === termo
  })
}

function encontrarConteudoPorNome(nome) {
  const curso = encontrarCurso(nome)
  if (curso) return { tipo: 'curso', item: curso, conteudo: cursoComoConteudo(curso) }

  const trilha = encontrarTrilha(nome)
  if (trilha) return { tipo: 'trilha', item: trilha, conteudo: { ...trilha, tipoConteudo: 'trilha' } }

  return null
}

function nomeDoCurso(valor) {
  return encontrarConteudoPorNome(valor)?.conteudo?.titulo || valor
}

function iniciais(nome = '') {
  return nome
    .split(' ')
    .map((parte) => parte[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function cursosDoUsuario(usuario) {
  const concluidos = Array.isArray(usuario?.cursosConcluidos) ? usuario.cursosConcluidos : []
  const certificados = Array.isArray(usuario?.certificados) ? usuario.certificados : []
  const cursosUnicos = [...new Set([...concluidos, ...certificados])].filter(Boolean).map(nomeDoCurso)

  if (cursosUnicos.length) return cursosUnicos
  if (Array.isArray(usuario?.tecnologias) && usuario.tecnologias.length) {
    return ['Git e GitHub para Projetos', 'Carreira, Comunicação e Portfólio']
  }
  return ['Perfil recém-cadastrado']
}

function tecnologiasDoUsuario(usuario) {
  const respostas = usuario?.respostasWizard || {}
  const tecnologiasPerfil = Array.isArray(usuario?.tecnologias) ? usuario.tecnologias : []
  const tecnologiasCursos = cursosDoUsuario(usuario)
    .flatMap((nome) => {
      const conteudo = encontrarConteudoPorNome(nome)?.conteudo
      return conteudo?.tecnologias || [conteudo?.tecnologia]
    })
    .filter(Boolean)

  return [
    ...tecnologiasPerfil,
    respostas.linguagem,
    respostas.tecnologiaInteresse,
    respostas.areaDesejada,
    respostas.focoCarreira,
    ...tecnologiasCursos,
  ].filter(Boolean)
}

function aulasDoConteudo(conteudo) {
  return (conteudo?.modulos || []).flatMap((modulo) => modulo.aulas || [])
}

function duracaoDosModulos(modulos = []) {
  return modulos.flatMap((modulo) => modulo.aulas || []).reduce((total, aula) => total + duracaoParaMinutos(aula.duracao), 0)
}

function duracaoDoModulo(modulo) {
  return minutosParaDuracao(duracaoDosModulos([modulo]))
}

function professorDoConteudo(conteudo) {
  const professores = [
    conteudo?.professor,
    ...(conteudo?.modulos || []).map((modulo) => modulo.professor),
    ...aulasDoConteudo(conteudo).map((aula) => aula.professor),
  ].filter(Boolean)

  return [...new Set(professores)][0] || 'Professores parceiros'
}

function historicoDoCandidato(candidato = {}) {
  return [
    ...(Array.isArray(candidato.cursos) ? candidato.cursos : []),
    ...(Array.isArray(candidato.cursosConcluidos) ? candidato.cursosConcluidos : []),
    ...(Array.isArray(candidato.certificados) ? candidato.certificados : []),
  ]
}

function candidatoTemConteudo(candidato, titulo, nomeOriginal) {
  const tituloNormalizado = normalizarTexto(titulo)
  const originalNormalizado = normalizarTexto(nomeOriginal)

  return historicoDoCandidato(candidato).some((item) => {
    const nome = normalizarTexto(nomeDoCurso(item))
    const bruto = normalizarTexto(item)
    return nome === tituloNormalizado || bruto === originalNormalizado || nome.includes(tituloNormalizado)
  })
}

function certificadoDoCandidato(candidato, titulo, nomeOriginal) {
  const certificados = Array.isArray(candidato?.certificados) ? candidato.certificados : []
  const tituloNormalizado = normalizarTexto(titulo)
  const originalNormalizado = normalizarTexto(nomeOriginal)

  return certificados.some((item) => {
    const nome = normalizarTexto(nomeDoCurso(item))
    const bruto = normalizarTexto(item)
    return nome === tituloNormalizado || bruto === originalNormalizado || nome.includes(tituloNormalizado)
  })
}

function criarPreviewConteudo(nomeCurso, progressoCursos = {}, candidato = {}) {
  const encontrado = encontrarConteudoPorNome(nomeCurso)
  const conteudo = encontrado?.conteudo || {
    titulo: nomeCurso,
    duracao: '',
    modulos: [],
  }
  const modulos = conteudo.modulos || []
  const aulas = aulasDoConteudo(conteudo)
  const minutosPorAulas = duracaoDosModulos(modulos)
  const totalMinutos = minutosPorAulas || duracaoParaMinutos(conteudo.duracao)
  const minutosAssistidos = aulas.reduce(
    (total, aula) => total + (progressoCursos[aula.id] ? duracaoParaMinutos(aula.duracao) : 0),
    0,
  )
  const estaNoHistorico = candidatoTemConteudo(candidato, conteudo.titulo, nomeCurso)
  const minutosEstudados = minutosAssistidos || (estaNoHistorico ? totalMinutos : 0)
  const percentual = totalMinutos ? Math.min(100, Math.round((minutosEstudados / totalMinutos) * 100)) : 0

  return {
    tipo: encontrado?.tipo || 'conteudo',
    titulo: conteudo.titulo || nomeCurso,
    professor: professorDoConteudo(conteudo),
    duracao: minutosParaDuracao(totalMinutos),
    totalAulas: aulas.length,
    totalModulos: modulos.length,
    horasEstudadas: minutosParaDuracao(minutosEstudados),
    percentual,
    certificadoDisponivel: certificadoDoCandidato(candidato, conteudo.titulo, nomeCurso) || percentual >= 95,
    modulos,
  }
}

function horasEstudadasDoPerfil(candidato = {}, progressoCursos = {}) {
  const minutos = (candidato.cursos || []).reduce((total, nomeCurso) => {
    const preview = criarPreviewConteudo(nomeCurso, progressoCursos, candidato)
    return total + duracaoParaMinutos(preview.horasEstudadas)
  }, 0)

  return minutosParaDuracao(minutos)
}

function rotuloTecnologia(tecnologia) {
  const rotulos = {
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java',
    go: 'Go',
    react: 'React',
    node: 'Node.js',
    sql: 'SQL',
    'git-github': 'Git/GitHub',
    'docker-cloud': 'Docker/Cloud',
    informatica: 'Informática',
    logica: 'Lógica',
    qa: 'QA',
    carreira: 'Carreira',
    ingles: 'Inglês',
  }
  return rotulos[tecnologia] || tecnologia
}

function calcularTecnologiasEstudadas(progressoCursos = {}) {
  const mapa = new Map()

  function somar(tecnologia, pontos, total) {
    if (!tecnologia) return
    const atual = mapa.get(tecnologia) || { tecnologia, assistidas: 0, total: 0 }
    mapa.set(tecnologia, { ...atual, assistidas: atual.assistidas + pontos, total: atual.total + total })
  }

  trilhas.forEach((trilha) => {
    const aulas = trilha.modulos.flatMap((modulo) => modulo.aulas || [])
    const assistidas = aulas.filter((aula) => progressoCursos[aula.id]).length
    trilha.tecnologias?.forEach((tecnologia) => somar(tecnologia, assistidas, aulas.length))
  })

  cursos.forEach((curso) => {
    const conteudo = cursoComoConteudo(curso)
    const aulas = conteudo.modulos.flatMap((modulo) => modulo.aulas || [])
    const assistidas = aulas.filter((aula) => progressoCursos[aula.id]).length
    somar(curso.tecnologia, assistidas, aulas.length)
  })

  return [...mapa.values()]
    .map((item) => ({
      ...item,
      rotulo: rotuloTecnologia(item.tecnologia),
      percentual: item.total ? Math.round((item.assistidas / item.total) * 100) : 0,
    }))
    .filter((item) => item.percentual > 0)
    .sort((a, b) => b.percentual - a.percentual)
    .slice(0, 6)
}

function candidatoDaCandidatura(candidatura, usuario, progressoCursos) {
  const perfil = { ...(candidatura.perfilSnapshot || {}), ...(usuario || {}) }
  const progressoDoPerfil =
    perfil.progresso && typeof perfil.progresso === 'object'
      ? perfil.progresso
      : progressoCursos

  return {
    id: candidatura.id,
    vagaId: candidatura.vagaId,
    alunoId: candidatura.alunoId,
    nome: perfil.nome || 'Aluno Trilum Conecta',
    fotoUrl: perfil.fotoUrl,
    capaUrl: perfil.capaUrl,
    foto: perfil.foto,
    status: candidatura.status || 'Candidatura enviada',
    cargo: perfil.titulo || perfil.cargoAtual || 'Aluno em formação',
    localizacao: perfil.localizacao || 'Brasil',
    email: perfil.email || '',
    bio: perfil.bio || 'Pessoa candidata cadastrada na Trilum Conecta, com perfil editável pelo aluno.',
    perfilProfissional: perfil.perfilProfissional || {},
    curriculo: perfil.curriculo || {},
    cursos: cursosDoUsuario(perfil),
    cursosConcluidos: Array.isArray(perfil.cursosConcluidos) ? perfil.cursosConcluidos : [],
    certificados: Array.isArray(perfil.certificados) ? perfil.certificados : [],
    tecnologias: tecnologiasDoUsuario(perfil),
    tecnologiasEstudadas: calcularTecnologiasEstudadas(progressoDoPerfil),
    progressoCursos: progressoDoPerfil,
    atualizadoEm: candidatura.atualizadoEm,
    origem: 'candidatura',
  }
}

function linhasTexto(valor = '') {
  return String(valor || '')
    .split('\n')
    .map((linha) => linha.trim())
    .filter(Boolean)
}

function escaparHtml(valor = '') {
  return String(valor || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function textoOuPadrao(valor, padrao = '') {
  return String(valor || '').trim() || padrao
}

function normalizarLinhaTecnologiaCurriculo(item = '') {
  const texto = String(item || '').trim()
  if (!texto) return ''
  if (texto.includes(' - ') || texto.includes(' — ')) return texto
  return `${texto} - estudando`
}

function listaHtml(titulo, itens = []) {
  const filtrados = itens.map((item) => String(item || '').trim()).filter(Boolean)
  if (!filtrados.length) return ''

  return `
    <section class="resume-section">
      <h2>${escaparHtml(titulo)}</h2>
      <ul>${filtrados.map((item) => `<li>${escaparHtml(item)}</li>`).join('')}</ul>
    </section>
  `
}

function montarDadosCurriculoCandidato(candidato = {}) {
  const perfilProfissional = candidato.perfilProfissional || {}
  const curriculo = candidato.curriculo || {}
  const nome = textoOuPadrao(candidato.nome, 'Aluno Trilum Conecta')
  const titulo = textoOuPadrao(curriculo.titulo, candidato.cargo || 'Aluno em formação')
  const tecnologiasPerfil = linhasTexto(perfilProfissional.tecnologiasComNivel || curriculo.tecnologias)
  const tecnologiasFallback = Array.isArray(candidato.tecnologias) ? candidato.tecnologias : []
  const tecnologias = (tecnologiasPerfil.length ? tecnologiasPerfil : tecnologiasFallback)
    .map(normalizarLinhaTecnologiaCurriculo)
    .filter(Boolean)
  const certificadosExternosArquivos = Array.isArray(perfilProfissional.certificadosExternosArquivos)
    ? perfilProfissional.certificadosExternosArquivos
    : []

  return {
    nome,
    titulo,
    email: textoOuPadrao(curriculo.email, candidato.email),
    telefone: textoOuPadrao(curriculo.telefone, perfilProfissional.telefone),
    localizacao: textoOuPadrao(candidato.localizacao, 'Brasil'),
    linkedin: textoOuPadrao(curriculo.linkedin, perfilProfissional.linkedin),
    github: textoOuPadrao(curriculo.github, perfilProfissional.github),
    portfolio: textoOuPadrao(curriculo.portfolio, perfilProfissional.portfolio),
    fotoUrl: textoOuPadrao(curriculo.fotoUrl, candidato.fotoUrl),
    objetivo: textoOuPadrao(
      curriculo.objetivo,
      'Conquistar uma oportunidade em tecnologia, aplicando meus estudos e evoluindo com projetos reais.',
    ),
    resumo: textoOuPadrao(curriculo.resumo, candidato.bio),
    tecnologias,
    cursos: Array.isArray(candidato.cursos) ? candidato.cursos : [],
    certificadosTrilum: Array.isArray(candidato.certificados) ? candidato.certificados.map(nomeDoCurso) : [],
    idiomas: linhasTexto(perfilProfissional.idiomas || curriculo.idiomas),
    formacoes: linhasTexto(perfilProfissional.formacoes || curriculo.formacoes),
    projetos: linhasTexto(perfilProfissional.projetos || curriculo.projetos),
    experiencias: linhasTexto(perfilProfissional.experiencias || curriculo.experiencias),
    certificadosExternos: [
      ...linhasTexto(perfilProfissional.certificadosExternos || curriculo.certificadosExternos),
      ...certificadosExternosArquivos.map((anexo) => `Anexo: ${anexo.nome}`),
    ],
    competencias: linhasTexto(curriculo.competencias || perfilProfissional.competencias || 'Comunicação\nOrganização\nAprendizado contínuo'),
  }
}

function htmlCurriculoCandidato(candidato) {
  const dados = montarDadosCurriculoCandidato(candidato)
  const contatos = [
    dados.email && `E-mail: ${dados.email}`,
    dados.telefone && `Telefone: ${dados.telefone}`,
    dados.localizacao && `Local: ${dados.localizacao}`,
    dados.linkedin && `LinkedIn: ${dados.linkedin}`,
    dados.github && `GitHub: ${dados.github}`,
    dados.portfolio && `Portfolio: ${dados.portfolio}`,
  ].filter(Boolean)
  const formacao = dados.formacoes.length
    ? dados.formacoes
    : dados.cursos.length
      ? ['Formação em desenvolvimento pela Trilum Conecta', ...dados.cursos.map((curso) => `${curso} - curso Trilum`)]
      : ['Formação em desenvolvimento pela Trilum Conecta']

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Currículo - ${escaparHtml(dados.nome)}</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; background: #f3f4f6; color: #111827; font-family: Arial, Helvetica, sans-serif; }
    .resume { width: 210mm; min-height: 297mm; margin: 0 auto; padding: 20mm 18mm; background: #fff; }
    .resume-header { display: grid; grid-template-columns: 1fr 78mm; gap: 14mm; align-items: start; }
    .identity { display: grid; grid-template-columns: ${dados.fotoUrl ? '28mm 1fr' : '1fr'}; gap: 9mm; align-items: center; }
    .avatar { width: 28mm; height: 28mm; border: 2px solid #111827; border-radius: 50%; object-fit: cover; }
    h1 { margin: 0; font-size: 30pt; line-height: .95; text-transform: uppercase; letter-spacing: 0; }
    .title { margin: 7mm 0 0; max-width: 70mm; font-size: 11pt; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; }
    .contacts { display: grid; gap: 4mm; margin: 0; padding: 0; list-style: none; font-size: 9.6pt; font-weight: 700; overflow-wrap: anywhere; }
    .intro { margin: 13mm 0 0; font-size: 10.2pt; line-height: 1.55; }
    .intro strong { display: block; margin-top: 4mm; }
    .divider { border: 0; border-top: 1.6px solid #111827; margin: 12mm 0; }
    .resume-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18mm; }
    .resume-section { break-inside: avoid; margin-bottom: 10mm; }
    h2 { margin: 0 0 6mm; font-size: 18pt; line-height: 1; text-transform: uppercase; }
    ul { margin: 0; padding-left: 5mm; font-size: 10pt; line-height: 1.55; }
    li { margin-bottom: 2.6mm; }
    @media print {
      body { background: #fff; }
      .resume { margin: 0; box-shadow: none; }
    }
  </style>
</head>
<body>
  <main class="resume">
    <header class="resume-header">
      <div class="identity">
        ${dados.fotoUrl ? `<img class="avatar" src="${escaparHtml(dados.fotoUrl)}" alt="" />` : ''}
        <div>
          <h1>${escaparHtml(dados.nome)}</h1>
          <p class="title">${escaparHtml(dados.titulo)}</p>
        </div>
      </div>
      <ul class="contacts">${contatos.map((item) => `<li>${escaparHtml(item)}</li>`).join('')}</ul>
    </header>

    <section class="intro">
      <p>${escaparHtml(dados.resumo)}</p>
      <strong>${escaparHtml(dados.objetivo)}</strong>
    </section>

    <hr class="divider" />

    <div class="resume-grid">
      <div>
        ${listaHtml('Educação', formacao)}
        ${listaHtml('Projetos', dados.projetos)}
        ${listaHtml('Experiências', dados.experiencias)}
      </div>
      <div>
        ${listaHtml('Skills', [...dados.tecnologias, ...dados.competencias])}
        ${listaHtml('Idiomas', dados.idiomas)}
        ${listaHtml('Certificados', [...dados.certificadosTrilum.map((item) => `${item} - Curso Trilum`), ...dados.certificadosExternos])}
      </div>
    </div>
  </main>
  <script>
    window.addEventListener('load', () => {
      window.setTimeout(() => window.print(), 250)
    })
  </script>
</body>
</html>`
}

function exportarCurriculoCandidato(candidato) {
  const janela = window.open('', '_blank')
  if (!janela) return
  janela.document.open()
  janela.document.write(htmlCurriculoCandidato(candidato))
  janela.document.close()
}

function statusClasse(status = '') {
  const texto = normalizarTexto(status)
  if (texto.includes('reprov') || texto.includes('rejeit')) return 'status-chip status-encerrada'
  if (texto.includes('selecion') || texto.includes('apro')) return 'status-chip status-ativa'
  return 'status-chip status-analise'
}

function termosDaEmpresa(empresa) {
  return [
    ...(empresa?.especialidades || []),
    ...(empresa?.stackDetalhes || []),
    ...(empresa?.beneficios || []),
  ]
}

function textoDoCandidato(candidato) {
  return normalizarTexto([
    candidato.nome,
    candidato.cargo,
    candidato.bio,
    candidato.localizacao,
    ...(candidato.tecnologias || []),
    ...(candidato.cursos || []),
  ].join(' '))
}

function termosDeBuscaDaVaga(vaga, empresa) {
  return [...(vaga?.tags || []), vaga?.titulo, vaga?.descricao, ...termosDaEmpresa(empresa)]
    .flatMap((item) => String(item || '').split(/[,.;:()/-]|\s+/))
    .map((item) => item.trim())
    .filter((item) => item.length >= 3)
}

function combinaStack(texto, stack) {
  return normalizarTexto(stack)
    .split(/\s+/)
    .filter((termo) => termo.length >= 3)
    .some((termo) => texto.includes(termo))
}

function calcularCompatibilidade(candidato, vaga, empresa) {
  const texto = textoDoCandidato(candidato)
  const termos = termosDeBuscaDaVaga(vaga, empresa)
  const encontrados = [...new Set(termos.filter((termo) => texto.includes(normalizarTexto(termo))))]
  const tecnologiasDiretas = (vaga?.tags || []).filter((tag) => texto.includes(normalizarTexto(tag)))
  const pontos = new Set([...encontrados, ...tecnologiasDiretas]).size

  if (pontos >= 3) return { nivel: 'alta', rotulo: 'Alta compatibilidade', motivos: encontrados.slice(0, 4) }
  if (pontos >= 1) return { nivel: 'boa', rotulo: 'Boa compatibilidade', motivos: encontrados.slice(0, 3) }
  return { nivel: 'inicial', rotulo: 'Compatibilidade inicial', motivos: [] }
}

function stackOptions(vaga, empresa) {
  return [...new Set([...(vaga?.tags || []), ...(empresa?.especialidades || [])])]
    .map((item) => String(item).trim())
    .filter(Boolean)
    .slice(0, 12)
}

export function ListaCandidatos() {
  const { vagaId } = useParams()
  const { usuarioAtual, vagasEmpresa, candidatos, candidaturas, usuarios, atualizarStatusCandidato } = useApp()
  const [busca, setBusca] = useState('')
  const [filtroCompatibilidade, setFiltroCompatibilidade] = useState('todos')
  const [filtroStack, setFiltroStack] = useState('todos')
  const [perfilPreview, setPerfilPreview] = useState(null)
  const [cursoPreview, setCursoPreview] = useState(null)
  const [abaCursoPreview, setAbaCursoPreview] = useState('conteudo')
  const vaga = vagasEmpresa.find((item) => item.id === vagaId)
  const opcoesStack = stackOptions(vaga, usuarioAtual)

  const mockados = candidatos.filter((candidato) => candidato.vagaId === vagaId)
  const candidatosReais = candidaturas
    .filter((candidatura) => candidatura.vagaId === vagaId)
    .map((candidatura) =>
        candidatoDaCandidatura(
          candidatura,
          usuarios.find((usuario) => usuario.id === candidatura.alunoId),
          candidatura.perfilSnapshot?.progresso || {},
        ),
      )
  const candidatosDaVaga = [...mockados, ...candidatosReais].map((candidato) => ({
    ...candidato,
    compatibilidade: calcularCompatibilidade(candidato, vaga, usuarioAtual),
  }))

  const filtrados = candidatosDaVaga.filter((candidato) => {
    const texto = textoDoCandidato(candidato)
    const combinaBusca = texto.includes(normalizarTexto(busca))
    const combinaCompatibilidade =
      filtroCompatibilidade === 'todos' || candidato.compatibilidade.nivel === filtroCompatibilidade
    const passaStack = filtroStack === 'todos' || combinaStack(texto, filtroStack)

    return combinaBusca && combinaCompatibilidade && passaStack
  })

  function alterarStatus(candidato, status) {
    atualizarStatusCandidato(candidato.id, status)
    setPerfilPreview((atual) => (atual?.id === candidato.id ? { ...atual, status } : atual))
  }

  function abrirPerfil(candidato) {
    setPerfilPreview(candidato)
    setCursoPreview(null)
    setAbaCursoPreview('conteudo')
  }

  function fecharPerfil() {
    setPerfilPreview(null)
    setCursoPreview(null)
    setAbaCursoPreview('conteudo')
  }

  function abrirCursoPreview(nomeCurso) {
    if (!perfilPreview) return
    setCursoPreview(criarPreviewConteudo(nomeCurso, perfilPreview.progressoCursos || {}, perfilPreview))
    setAbaCursoPreview('conteudo')
  }

  return (
    <section className="pagina candidatos-page candidatos-udemy-page">
      <div className="empresa-candidatos-hero candidatos-udemy-hero">
        <span className="eyebrow">Visualizar candidatos</span>
        <h1>{vaga?.titulo || 'Vaga'}</h1>
        <p>{filtrados.length} candidato{filtrados.length === 1 ? '' : 's'} encontrado{filtrados.length === 1 ? '' : 's'} para avaliação.</p>
      </div>

      <div className="filtros candidatos-filtros candidatos-filtros-avancados">
        <label className="busca">
          <Search size={18} />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Filtrar por nome, curso, experiência ou tecnologia" />
        </label>
        <label className="candidato-select-filtro">
          <SlidersHorizontal size={17} />
          <select value={filtroCompatibilidade} onChange={(e) => setFiltroCompatibilidade(e.target.value)}>
            <option value="todos">Compatibilidade</option>
            <option value="alta">Alta compatibilidade</option>
            <option value="boa">Boa compatibilidade</option>
            <option value="inicial">Compatibilidade inicial</option>
          </select>
        </label>
        <label className="candidato-select-filtro">
          <SlidersHorizontal size={17} />
          <select value={filtroStack} onChange={(e) => setFiltroStack(e.target.value)}>
            <option value="todos">Stack</option>
            {opcoesStack.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="empresa-candidatos-lista candidatos-grid">
        {filtrados.map((candidato) => (
          <article className="empresa-candidato-row candidato-card-udemy" key={candidato.id}>
            <header>
              <span className={candidato.fotoUrl ? 'avatar candidato-avatar-img' : 'avatar'}>
                {candidato.fotoUrl ? <img src={candidato.fotoUrl} alt="" /> : candidato.foto || iniciais(candidato.nome)}
              </span>
              <div>
                <span className={statusClasse(candidato.status)}>{candidato.status}</span>
                <h3>{candidato.nome}</h3>
                <p>{candidato.cargo}</p>
              </div>
              <span className={`candidato-compatibilidade candidato-compatibilidade-${candidato.compatibilidade.nivel}`}>
                {candidato.compatibilidade.rotulo}
              </span>
            </header>

            <p className="candidato-bio">{candidato.bio}</p>

            <div className="candidato-card-section">
              <strong>Cursos realizados</strong>
              <div className="candidato-cursos-lista">
                {candidato.cursos.map((nomeCurso) => {
                  const conteudo = encontrarConteudoPorNome(nomeCurso)?.item
                  return (
                    <span className={conteudo?.thumbnailUrl ? 'curso-chip-mini com-thumb' : 'curso-chip-mini'} key={nomeCurso}>
                      {conteudo?.thumbnailUrl && <img src={conteudo.thumbnailUrl} alt="" />}
                      {nomeCurso}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className="candidato-card-section">
              <strong>Tecnologias</strong>
              <div className="candidato-tech-lista">
                {candidato.tecnologias.map((tecnologia) => (
                  <span key={tecnologia}>{tecnologia}</span>
                ))}
              </div>
            </div>

            <footer>
              <button type="button" onClick={() => abrirPerfil(candidato)}>
                <Eye size={18} /> Ver perfil
              </button>
              <button type="button" onClick={() => alterarStatus(candidato, 'Selecionado')}>
                <Check size={18} /> Aprovar
              </button>
              <button type="button" onClick={() => alterarStatus(candidato, 'Reprovado')}>
                <X size={18} /> Rejeitar
              </button>
            </footer>
          </article>
        ))}
      </div>

      {!filtrados.length && (
        <div className="vagas-empty">
          <h2>Nenhum candidato encontrado</h2>
          <p>Tente limpar os filtros ou aguarde novas candidaturas para esta vaga.</p>
        </div>
      )}

      {perfilPreview && (
        <div className="perfil-candidato-modal" role="dialog" aria-modal="true" aria-label="Perfil do candidato">
          <div className="perfil-candidato-backdrop" onClick={fecharPerfil} />
          <article className="perfil-candidato-card">
            <button type="button" className="perfil-candidato-fechar" onClick={fecharPerfil} aria-label="Fechar perfil">
              <X size={18} />
            </button>
            <div
              className="perfil-candidato-capa"
              style={perfilPreview.capaUrl ? { backgroundImage: `url("${perfilPreview.capaUrl}")` } : undefined}
            >
              <span className={perfilPreview.fotoUrl ? 'avatar avatar-grande candidato-avatar-img' : 'avatar avatar-grande'}>
                {perfilPreview.fotoUrl ? <img src={perfilPreview.fotoUrl} alt="" /> : perfilPreview.foto || iniciais(perfilPreview.nome)}
              </span>
            </div>
            <header className="perfil-candidato-identidade">
              <div>
                <span className={statusClasse(perfilPreview.status)}>{perfilPreview.status}</span>
                <h2>{perfilPreview.nome}</h2>
                <p>{perfilPreview.cargo}</p>
                <small>{perfilPreview.localizacao}</small>
              </div>
            </header>

            <section className="perfil-candidato-resumo-grid">
              <article>
                <strong>{perfilPreview.cursos.length}</strong>
                <span>Cursos no perfil</span>
              </article>
              <article>
                <strong>{horasEstudadasDoPerfil(perfilPreview, perfilPreview.progressoCursos || {})}</strong>
                <span>Horas estudadas</span>
              </article>
              <article>
                <strong>{perfilPreview.tecnologias.length}</strong>
                <span>Tecnologias no perfil</span>
              </article>
            </section>

            <section>
              <h3>Sobre</h3>
              <p>{perfilPreview.bio}</p>
            </section>

            <section>
              <h3>Cursos e certificados</h3>
              <div className="candidato-cursos-lista">
                {perfilPreview.cursos.map((nomeCurso) => {
                  const conteudo = encontrarConteudoPorNome(nomeCurso)?.item
                  return (
                    <button
                      className={conteudo?.thumbnailUrl ? 'curso-chip-mini curso-chip-botao com-thumb' : 'curso-chip-mini curso-chip-botao'}
                      key={nomeCurso}
                      type="button"
                      onClick={() => abrirCursoPreview(nomeCurso)}
                    >
                      {conteudo?.thumbnailUrl && <img src={conteudo.thumbnailUrl} alt="" />}
                      {nomeCurso}
                    </button>
                  )
                })}
              </div>
            </section>

            {cursoPreview && (
              <section className="perfil-candidato-curso-preview">
                <header className="curso-preview-header">
                  <div>
                    <span className="eyebrow">{cursoPreview.tipo === 'trilha' ? 'Trilha' : 'Curso'}</span>
                    <h3>{cursoPreview.titulo}</h3>
                    <p>Professor: {cursoPreview.professor}</p>
                  </div>
                  <button type="button" onClick={() => setCursoPreview(null)}>Fechar</button>
                </header>

                <div className="curso-preview-tabs" role="tablist" aria-label="Preview do conteúdo">
                  <button
                    type="button"
                    className={abaCursoPreview === 'conteudo' ? 'ativo' : ''}
                    onClick={() => setAbaCursoPreview('conteudo')}
                  >
                    <BookOpen size={16} /> Conteúdo
                  </button>
                  <button
                    type="button"
                    className={abaCursoPreview === 'certificado' ? 'ativo' : ''}
                    disabled={!cursoPreview.certificadoDisponivel}
                    onClick={() => setAbaCursoPreview('certificado')}
                  >
                    <Award size={16} /> Certificado
                  </button>
                </div>

                {abaCursoPreview === 'certificado' && cursoPreview.certificadoDisponivel ? (
                  <div className="certificado-preview-mini">
                    <span>Certificado Trilum Conecta</span>
                    <h4>{perfilPreview.nome}</h4>
                    <p>concluiu {cursoPreview.titulo}</p>
                    <small>{cursoPreview.duracao} de carga horária • {cursoPreview.professor}</small>
                  </div>
                ) : (
                  <>
                    <div className="curso-preview-stats">
                      <article>
                        <Clock3 size={18} />
                        <strong>{cursoPreview.duracao}</strong>
                        <span>Carga horária</span>
                      </article>
                      <article>
                        <BookOpen size={18} />
                        <strong>{cursoPreview.totalModulos} módulos</strong>
                        <span>{cursoPreview.totalAulas} aulas</span>
                      </article>
                      <article>
                        <Award size={18} />
                        <strong>{cursoPreview.horasEstudadas}</strong>
                        <span>{cursoPreview.percentual}% estudado</span>
                      </article>
                    </div>

                    <div className="curso-preview-modulos">
                      {cursoPreview.modulos.slice(0, 5).map((modulo) => (
                        <article key={modulo.id || modulo.titulo}>
                          <strong>{modulo.titulo}</strong>
                          <span>
                            {(modulo.aulas || []).length} aula{(modulo.aulas || []).length === 1 ? '' : 's'} • {duracaoDoModulo(modulo)}
                          </span>
                        </article>
                      ))}
                      {!cursoPreview.modulos.length && (
                        <p>Este conteúdo ainda não tem módulos detalhados no catálogo.</p>
                      )}
                    </div>
                  </>
                )}
              </section>
            )}

            <section className="perfil-candidato-aprendizado">
              <h3>Tecnologias estudadas</h3>
              {perfilPreview.tecnologiasEstudadas?.length ? (
                <div className="perfil-candidato-tech-bars">
                  {perfilPreview.tecnologiasEstudadas.map((item) => (
                    <div className="perfil-candidato-tech-row" key={item.tecnologia}>
                      <div>
                        <strong>{item.rotulo}</strong>
                        <small>{item.percentual}%</small>
                      </div>
                      <span>
                        <i style={{ width: `${item.percentual}%` }} />
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>As tecnologias estudadas aparecem aqui quando o candidato avança nos cursos da plataforma.</p>
              )}
            </section>

            <section>
              <h3>Tecnologias</h3>
              <div className="candidato-tech-lista">
                {perfilPreview.tecnologias.map((tecnologia) => (
                  <span key={tecnologia}>{tecnologia}</span>
                ))}
              </div>
            </section>

            <footer>
              <Botao variant="secondary" onClick={() => exportarCurriculoCandidato(perfilPreview)}>
                <FileText size={18} /> Exportar currículo
              </Botao>
              <Botao onClick={() => alterarStatus(perfilPreview, 'Selecionado')}>Aprovar candidato</Botao>
              <Botao variant="secondary" onClick={() => alterarStatus(perfilPreview, 'Reprovado')}>
                Rejeitar
              </Botao>
            </footer>
          </article>
        </div>
      )}
      <MentorEmpresaToast
        empresaAtual={usuarioAtual}
        tela="lista-candidatos"
        vagaAtual={vaga}
        candidatos={candidatos}
        candidaturas={candidaturas}
      />
    </section>
  )
}
