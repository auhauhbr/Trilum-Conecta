import certificadoTemplate from '../ativos/imagens/certificado-template.png'

function limparTexto(texto = '') {
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E\s-]/g, '')
    .trim()
}

function dataURLparaBytes(dataURL) {
  const partes = String(dataURL).split(',')
  if (partes.length !== 2) {
    throw new Error('DataURL inválido')
  }

  const raw = atob(partes[1])
  const bytes = new Uint8Array(raw.length)

  for (let i = 0; i < raw.length; i += 1) {
    bytes[i] = raw.charCodeAt(i)
  }

  return bytes
}

function unirUint8Array(...arrays) {
  const tamanhoTotal = arrays.reduce((total, arr) => total + arr.length, 0)
  const resultado = new Uint8Array(tamanhoTotal)
  let deslocamento = 0

  arrays.forEach((arr) => {
    resultado.set(arr, deslocamento)
    deslocamento += arr.length
  })

  return resultado
}

export async function carregarImagem(src = certificadoTemplate) {
  return new Promise((resolve, reject) => {
    const imagem = new Image()
    imagem.crossOrigin = 'anonymous'
    imagem.onload = () => resolve(imagem)
    imagem.onerror = () => reject(new Error('Falha ao carregar imagem base do certificado'))
    imagem.src = src
  })
}

export function criarIdCertificado({ aluno = '', curso = '', data = new Date() }) {
  const dataInstancia = typeof data === 'string' ? new Date(data) : data
  const dataFormatada = dataInstancia.toISOString().slice(0, 10).replace(/-/g, '')
  const texto = `${aluno} ${curso}`
  const base = limparTexto(texto)
    .toUpperCase()
    .replace(/\s+/g, '-')
    .replace(/[^A-Z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return `RUP-${dataFormatada}-${base || 'CERTIFICADO'}`
}

export function quebrarTexto(ctx, texto, maxWidth) {
  const palavras = String(texto).split(' ').filter(Boolean)
  const linhas = []
  let linhaAtual = ''

  palavras.forEach((palavra) => {
    const teste = linhaAtual ? `${linhaAtual} ${palavra}` : palavra
    if (ctx.measureText(teste).width <= maxWidth || !linhaAtual) {
      linhaAtual = teste
    } else {
      linhas.push(linhaAtual)
      linhaAtual = palavra
    }
  })

  if (linhaAtual) {
    linhas.push(linhaAtual)
  }

  return linhas
}

export function textoAjustado(ctx, texto, maxWidth, fonte = 'Georgia', peso = '700', tamanhoInicial = 40, tamanhoMinimo = 18) {
  let tamanho = tamanhoInicial

  while (tamanho >= tamanhoMinimo) {
    ctx.font = `${peso} ${tamanho}px ${fonte}`
    const linhas = quebrarTexto(ctx, texto, maxWidth)
    const larguraMaior = linhas.reduce(
      (maior, linha) => Math.max(maior, ctx.measureText(linha).width),
      0,
    )

    if (larguraMaior <= maxWidth) {
      return { tamanho, linhas }
    }

    tamanho -= 2
  }

  ctx.font = `${peso} ${tamanhoMinimo}px ${fonte}`
  return {
    tamanho: tamanhoMinimo,
    linhas: quebrarTexto(ctx, texto, maxWidth),
  }
}

export function textoCentralizado(
  ctx,
  texto,
  x,
  y,
  maxWidth,
  fonte = 'Georgia',
  peso = '600',
  letraEspacamento = 0,
  tamanho = 28,
  lineHeight = 1.4,
) {
  ctx.font = `${peso} ${tamanho}px ${fonte}`
  const linhas = quebrarTexto(ctx, texto, maxWidth)
  const alturaTotal = linhas.length * tamanho * lineHeight
  let deslocamentoY = y - alturaTotal / 2 + tamanho * 0.4

  linhas.forEach((linha) => {
    const larguraLinha = ctx.measureText(linha).width + Math.max(0, linha.length - 1) * letraEspacamento
    let xBase = x - larguraLinha / 2

    if (letraEspacamento === 0) {
      ctx.fillText(linha, x, deslocamentoY)
    } else {
      for (let i = 0; i < linha.length; i += 1) {
        const letra = linha[i]
        ctx.fillText(letra, xBase, deslocamentoY)
        xBase += ctx.measureText(letra).width + letraEspacamento
      }
    }

    deslocamentoY += tamanho * lineHeight
  })

  return linhas
}

export async function criarCanvasCertificado({
  aluno = 'Aluno RiseUp',
  curso = 'Curso da plataforma',
  professor = 'Equipe RiseUp',
  horas = 'Carga horaria nao informada',
  plataforma = 'RiseUp',
  dataEmissao = new Date(),
}) {
  const imagem = await carregarImagem()
  const largura = imagem.naturalWidth || 2000
  const altura = imagem.naturalHeight || 1414

  const canvas = document.createElement('canvas')
  canvas.width = largura
  canvas.height = altura

  const ctx = canvas.getContext('2d')

  ctx.imageSmoothingEnabled = true
  ctx.drawImage(imagem, 0, 0, largura, altura)

  const nomeFormatado = String(aluno).trim() || 'Aluno RiseUp'
  const cursoFormatado = String(curso).trim() || 'Curso da plataforma'
  const cargaHoraria = horas || 'Carga horaria nao informada'
  const responsavel = professor || 'Equipe RiseUp'
  const data = new Date(dataEmissao).toLocaleDateString('pt-BR')
  const idCertificado = criarIdCertificado({
    aluno: nomeFormatado,
    curso: cursoFormatado,
    data: dataEmissao,
  })

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.strokeStyle = '#1b03a8'
  ctx.lineWidth = 5
  ctx.beginPath()
  ctx.moveTo(820, 1168)
  ctx.lineTo(1165, 1168)
  ctx.moveTo(1470, 1168)
  ctx.lineTo(1815, 1168)
  ctx.stroke()

  ctx.fillStyle = '#1b03a8'
  textoCentralizado(
    ctx,
    'Certificamos que',
    1320,
    560,
    1080,
    'Arial',
    '700',
    5,
    34,
    1.35,
  )

  const nomeAjustado = textoAjustado(
    ctx,
    nomeFormatado,
    1120,
    'Arial',
    '700',
    86,
    50,
  )

  ctx.fillStyle = '#1b03a8'
  ctx.font = `700 ${nomeAjustado.tamanho}px Arial`
  let yNomeAtual = 680 - (nomeAjustado.linhas.length * nomeAjustado.tamanho * 1.15) / 2
  nomeAjustado.linhas.forEach((linha) => {
    ctx.fillText(linha, 1320, yNomeAtual)
    yNomeAtual += nomeAjustado.tamanho * 1.15
  })

  ctx.fillStyle = '#27223d'
  textoCentralizado(
    ctx,
    'concluiu com aproveitamento',
    1320,
    790,
    1060,
    'Arial',
    '400',
    0,
    34,
    1.35,
  )

  const cursoAjustado = textoAjustado(
    ctx,
    cursoFormatado,
    1100,
    'Arial',
    '700',
    54,
    34,
  )

  ctx.fillStyle = '#1b03a8'
  ctx.font = `700 ${cursoAjustado.tamanho}px Arial`
  let yCursoAtual = 875 - (cursoAjustado.linhas.length * cursoAjustado.tamanho * 1.15) / 2
  cursoAjustado.linhas.forEach((linha) => {
    ctx.fillText(linha, 1320, yCursoAtual)
    yCursoAtual += cursoAjustado.tamanho * 1.15
  })

  ctx.fillStyle = '#27223d'
  textoCentralizado(
    ctx,
    `${plataforma} - ${cargaHoraria}`,
    1320,
    965,
    1060,
    'Arial',
    '400',
    0,
    28,
    1.35,
  )

  textoCentralizado(
    ctx,
    `Emitido em ${data} - ID ${idCertificado}`,
    1320,
    1025,
    1060,
    'Arial',
    '400',
    0,
    24,
    1.35,
  )

  ctx.fillStyle = '#1b03a8'
  textoCentralizado(
    ctx,
    responsavel,
    992,
    1225,
    520,
    'Arial',
    '700',
    2,
    22,
    1.35,
  )

  textoCentralizado(
    ctx,
    plataforma,
    1642,
    1225,
    520,
    'Arial',
    '700',
    2,
    22,
    1.35,
  )

  return canvas
}

export function criarPdfComImagem(canvas) {
  const imageDataUrl = canvas.toDataURL('image/jpeg', 0.92)
  const imageBytes = dataURLparaBytes(imageDataUrl)
  const encoder = new TextEncoder()

  const pageWidth = 842
  const pageHeight = 595

  const header = encoder.encode('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n')
  const bodyParts = []
  const offsets = []

  const catalog = encoder.encode('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')
  const pages = encoder.encode('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n')
  const page = encoder.encode(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << /Im0 4 0 R >> /ProcSet [/PDF /ImageC] >> /Contents 5 0 R >>\nendobj\n`,
  )
  const xObjectHeader = encoder.encode(
    `4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`,
  )
  const xObjectFooter = encoder.encode('\nendstream\nendobj\n')
  const pageContentHeader = encoder.encode(`5 0 obj\n<< /Length ${encoder.encode(`q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/Im0 Do\nQ\n`).length} >>\nstream\n`)
  const pageContentData = encoder.encode(`q\n${pageWidth} 0 0 ${pageHeight} 0 0 cm\n/Im0 Do\nQ\n`)
  const pageContentFooter = encoder.encode('\nendstream\nendobj\n')

  ;[catalog, pages, page].forEach((part) => {
    offsets.push(header.length + bodyParts.reduce((sum, item) => sum + item.length, 0))
    bodyParts.push(part)
  })

  offsets.push(header.length + bodyParts.reduce((sum, item) => sum + item.length, 0))
  bodyParts.push(xObjectHeader)
  bodyParts.push(imageBytes)
  bodyParts.push(xObjectFooter)

  offsets.push(header.length + bodyParts.reduce((sum, item) => sum + item.length, 0))
  bodyParts.push(pageContentHeader)
  bodyParts.push(pageContentData)
  bodyParts.push(pageContentFooter)

  const xrefOffset = header.length + bodyParts.reduce((sum, item) => sum + item.length, 0)
  const xrefHeader = encoder.encode(`xref\n0 ${offsets.length + 1}\n0000000000 65535 f \n`)
  const xrefEntries = offsets.map((value) => encoder.encode(`${String(value).padStart(10, '0')} 00000 n \n`))
  const trailer = encoder.encode(`trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`)

  const finalBytes = unirUint8Array(header, ...bodyParts, xrefHeader, ...xrefEntries, trailer)
  return new Blob([finalBytes], { type: 'application/pdf' })
}

export async function baixarCertificadoPdf(dados) {
  const canvas = await criarCanvasCertificado(dados)
  const blob = criarPdfComImagem(canvas)
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `certificado-${criarIdCertificado(dados)}.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(link.href)
}

export async function baixarCertificadoJpeg(dados) {
  const canvas = await criarCanvasCertificado(dados)
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.95))
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `certificado-${criarIdCertificado(dados)}.jpg`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(link.href)
}