function limparTexto(texto = '') {
  return String(texto)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[()\\]/g, '')
}

function textoPdf(linha, x, y, tamanho = 14) {
  return `BT /F1 ${tamanho} Tf ${x} ${y} Td (${limparTexto(linha)}) Tj ET`
}

function criarPdf({ aluno, curso, professor, horas, plataforma = 'RiseUp' }) {
  const linhas = [
    textoPdf('CERTIFICADO DE CONCLUSAO', 150, 760, 22),
    textoPdf(`${plataforma} certifica que`, 190, 710, 14),
    textoPdf(aluno || 'Aluno RiseUp', 170, 680, 22),
    textoPdf('concluiu com aproveitamento o conteudo:', 145, 640, 14),
    textoPdf(curso, 90, 610, 18),
    textoPdf(`Professor responsavel: ${professor || 'Equipe RiseUp'}`, 90, 555, 13),
    textoPdf(`Carga horaria simulada: ${horas || 'Nao informada'}`, 90, 532, 13),
    textoPdf(`Emitido em: ${new Date().toLocaleDateString('pt-BR')}`, 90, 509, 13),
    textoPdf('Aviso importante:', 90, 455, 13),
    textoPdf('Este certificado faz parte de um projeto academico/faculdade.', 90, 432, 11),
    textoPdf('O curso e o certificado sao simulados e nao possuem valor real ou oficial.', 90, 414, 11),
    textoPdf('Plataforma RiseUp - Projeto Front-end', 185, 90, 11),
  ]

  const stream = linhas.join('\n')
  const objetos = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ]

  let pdf = '%PDF-1.4\n'
  const offsets = [0]
  objetos.forEach((objeto, indice) => {
    offsets.push(pdf.length)
    pdf += `${indice + 1} 0 obj\n${objeto}\nendobj\n`
  })

  const xrefOffset = pdf.length
  pdf += `xref\n0 ${objetos.length + 1}\n`
  pdf += '0000000000 65535 f \n'
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
  })
  pdf += `trailer\n<< /Size ${objetos.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

  return new Blob([pdf], { type: 'application/pdf' })
}

export function criarCertificadoPdfBlob({ aluno, curso, professor, horas, plataforma = 'RiseUp' }) {
  return criarPdf({ aluno, curso, professor, horas, plataforma })
}

export function baixarCertificadoPdf({ aluno, curso, professor, horas, plataforma = 'RiseUp' }) {
  const blob = criarPdf({ aluno, curso, professor, horas, plataforma })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `certificado-${limparTexto(curso).toLowerCase().replace(/\s+/g, '-')}.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
