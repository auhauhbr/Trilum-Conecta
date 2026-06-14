function valorBooleano(valor, padrao = false) {
  if (valor === undefined || valor === null || valor === '') return padrao
  return String(valor).toLowerCase() === 'true'
}

function valorNumero(valor, padrao) {
  const numero = Number(valor)
  return Number.isFinite(numero) && numero > 0 ? numero : padrao
}

export const configIA = {
  habilitada: valorBooleano(import.meta.env.VITE_IA_LOCAL_HABILITADA, false),
  provedor: 'ollama',
  endpoint: import.meta.env.VITE_OLLAMA_ENDPOINT || 'http://localhost:11434/api/chat',
  modelo: import.meta.env.VITE_OLLAMA_MODELO || 'gemma3:1b',
  timeoutMs: valorNumero(import.meta.env.VITE_IA_TIMEOUT_MS, 8000),
}
