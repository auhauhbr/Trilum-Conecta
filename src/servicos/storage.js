const prefixo = 'riseup:'

export function lerStorage(chave, valorInicial) {
  try {
    const valor = localStorage.getItem(`${prefixo}${chave}`)
    return valor ? JSON.parse(valor) : valorInicial
  } catch {
    return valorInicial
  }
}

export function salvarStorage(chave, valor) {
  localStorage.setItem(`${prefixo}${chave}`, JSON.stringify(valor))
}

export function removerStorage(chave) {
  localStorage.removeItem(`${prefixo}${chave}`)
}
