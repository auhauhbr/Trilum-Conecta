function textoNormalizado(valor = '') {
  return String(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function candidatosDaVaga(vagaId, candidatos = [], candidaturas = []) {
  return [
    ...candidatos.filter((candidato) => candidato.vagaId === vagaId),
    ...candidaturas.filter((candidatura) => candidatura.vagaId === vagaId),
  ]
}

export function contarCandidatosDaVaga(vagaId, candidatos = [], candidaturas = []) {
  return candidatosDaVaga(vagaId, candidatos, candidaturas).length
}

export function metricasCandidatosDaVaga(vagaId, candidatos = [], candidaturas = []) {
  const lista = candidatosDaVaga(vagaId, candidatos, candidaturas)
  const entrevistas = lista.filter((item) => textoNormalizado(item.status).includes('entrevista')).length
  const emAnalise = lista.filter((item) => {
    const status = textoNormalizado(item.status)
    return !status.includes('reprov') && !status.includes('rejeit') && !status.includes('selecion') && !status.includes('apro')
  }).length

  return {
    total: lista.length,
    emAnalise,
    entrevistas,
  }
}

export function contarCandidatosDasVagas(vagas = [], candidatos = [], candidaturas = []) {
  return vagas.reduce((total, vaga) => total + contarCandidatosDaVaga(vaga.id, candidatos, candidaturas), 0)
}
