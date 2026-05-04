function normalizar(valor = '') {
  return String(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function textoDoItem(item = {}) {
  return normalizar(
    [
      item.titulo,
      item.descricao,
      item.categoria,
      item.area,
      item.nivel,
      item.tecnologia,
      item.tipo,
      item.modalidade,
      item.localizacao,
      item.local,
      item.cargo,
      item.status,
      item.empresa?.nome,
      ...(item.tags || []),
      ...(item.tecnologias || []),
    ]
      .filter(Boolean)
      .join(' '),
  )
}

function passaCampo(valorAtual, valorFiltro, valorTodos) {
  return valorFiltro === valorTodos ? true : valorAtual === valorFiltro
}

function dataDaVaga(dataTexto) {
  if (!dataTexto) return null

  const texto = String(dataTexto).trim()
  const dataIso = texto.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (dataIso) return new Date(Number(dataIso[1]), Number(dataIso[2]) - 1, Number(dataIso[3]))

  const dataBrasil = texto.match(/^(\d{2})[-/](\d{2})[-/](\d{4})/)
  if (dataBrasil) return new Date(Number(dataBrasil[3]), Number(dataBrasil[2]) - 1, Number(dataBrasil[1]))

  const data = new Date(texto)
  return Number.isNaN(data.getTime()) ? null : data
}

function diasDesde(data) {
  if (!data) return Infinity
  const hoje = new Date()
  const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
  const inicioData = new Date(data.getFullYear(), data.getMonth(), data.getDate())
  return Math.floor((inicioHoje - inicioData) / 86400000)
}

export function filtrarPorTextoEStatus(lista, termo = '', status = 'todos') {
  const busca = normalizar(String(termo).trim())

  return lista.filter((item) => {
    const passaTexto = busca ? textoDoItem(item).includes(busca) : true
    const passaStatus = status === 'todos' ? true : item.status === status
    return passaTexto && passaStatus
  })
}

export function filtrarTrilhas(lista, termo = '', categoria = 'todas', tecnologia = 'todas', nivel = 'todos') {
  const busca = normalizar(String(termo).trim())

  return lista.filter((trilha) => {
    const passaTexto = busca ? textoDoItem(trilha).includes(busca) : true
    const passaCategoria = passaCampo(trilha.categoria, categoria, 'todas')
    const passaTecnologia =
      tecnologia === 'todas'
        ? true
        : trilha.tecnologia === tecnologia || trilha.tecnologias?.includes(tecnologia) || trilha.tags?.includes(tecnologia)
    const passaNivel = passaCampo(trilha.nivel, nivel, 'todos')
    return passaTexto && passaCategoria && passaTecnologia && passaNivel
  })
}

export function filtrarCursos(lista, termo = '', categoria = 'todas', tecnologia = 'todas', nivel = 'todos') {
  const busca = normalizar(String(termo).trim())

  return lista.filter((curso) => {
    const passaTexto = busca ? textoDoItem(curso).includes(busca) : true
    const passaCategoria = passaCampo(curso.categoria, categoria, 'todas')
    const passaTecnologia = tecnologia === 'todas' ? true : curso.tecnologia === tecnologia || curso.tags?.includes(tecnologia)
    const passaNivel = passaCampo(curso.nivel, nivel, 'todos')
    return passaTexto && passaCategoria && passaTecnologia && passaNivel
  })
}

export function filtrarVagas(lista, filtros = {}) {
  const { termo = '', data = 'todas', modelo = 'todos', local = '', cargo = '', status = 'todos' } = filtros
  const busca = normalizar(String(termo).trim())
  const buscaLocal = normalizar(String(local).trim())
  const buscaCargo = normalizar(String(cargo).trim())

  return lista.filter((vaga) => {
    const texto = textoDoItem(vaga)
    const passaTexto = busca ? texto.includes(busca) : true
    const passaModelo = modelo === 'todos' ? true : vaga.modalidade === modelo
    const passaLocal = buscaLocal ? normalizar(vaga.localizacao || vaga.local || vaga.modalidade).includes(buscaLocal) : true
    const passaCargo = buscaCargo ? normalizar(vaga.titulo || vaga.cargo).includes(buscaCargo) : true
    const passaStatus = status === 'todos' ? true : vaga.status === status

    let passaData = true
    if (data !== 'todas') {
      const diferenca = diasDesde(dataDaVaga(vaga.publicadaEm))
      passaData = data === 'hoje' ? diferenca === 0 : diferenca >= 0 && diferenca <= Number(data)
    }

    return passaTexto && passaModelo && passaLocal && passaCargo && passaStatus && passaData
  })
}
