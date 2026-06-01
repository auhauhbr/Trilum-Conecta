export function duracaoParaMinutos(valor) {
  if (valor === undefined || valor === null || valor === '') return 0
  if (typeof valor === 'number') return Number.isFinite(valor) ? Math.max(0, Math.round(valor)) : 0

  const texto = String(valor)
    .toLowerCase()
    .replace(/\+/g, '')
    .replace(/minutos?/g, 'min')
    .trim()

  if (!texto) return 0

  const partesRelogio = texto.match(/^(\d{1,2})(?::(\d{1,2}))(?::(\d{1,2}))?$/)
  if (partesRelogio) {
    const primeiraParte = Number(partesRelogio[1])
    const segundaParte = Number(partesRelogio[2])
    const terceiraParte = partesRelogio[3] === undefined ? null : Number(partesRelogio[3])

    if (terceiraParte === null) {
      return primeiraParte + Math.ceil(segundaParte / 60)
    }

    return primeiraParte * 60 + segundaParte + Math.ceil(terceiraParte / 60)
  }

  const horas = Number(texto.match(/(\d+(?:[.,]\d+)?)\s*h/)?.[1]?.replace(',', '.') || 0)
  const minutosDepoisDasHoras = texto.match(/\d+(?:[.,]\d+)?\s*h\s*(\d{1,2})(?:\s*m|\s*min)?/)?.[1]
  const minutosDiretos = texto.match(/(\d+(?:[.,]\d+)?)\s*(?:m|min)\b/)?.[1]

  if (horas || minutosDepoisDasHoras || minutosDiretos) {
    return Math.round(horas * 60 + Number(minutosDepoisDasHoras || minutosDiretos || 0))
  }

  const numeroSolto = Number(texto.replace(',', '.'))
  return Number.isFinite(numeroSolto) ? Math.max(0, Math.round(numeroSolto)) : 0
}

export function minutosParaDuracao(minutos) {
  const total = Math.max(0, Math.round(Number(minutos) || 0))
  const horas = Math.floor(total / 60)
  const resto = total % 60

  if (!horas) return `${resto}m`
  if (!resto) return `${horas}h`

  return `${horas}h${String(resto).padStart(2, '0')}`
}

export function somarDuracoes(duracoes = []) {
  return duracoes.reduce((total, duracao) => total + duracaoParaMinutos(duracao), 0)
}

export function duracaoDoCurso(curso = {}) {
  if (Array.isArray(curso.aulas) && curso.aulas.length) {
    return somarDuracoes(curso.aulas.map((aula) => aula.duracao))
  }

  if (Array.isArray(curso.modulos) && curso.modulos.length) {
    return somarDuracoes(curso.modulos.flatMap((modulo) => modulo.aulas || []).map((aula) => aula.duracao))
  }

  return duracaoParaMinutos(curso.duracao)
}

export function duracaoDosCursos(cursos = []) {
  return somarDuracoes(cursos.map(duracaoDoCurso))
}
