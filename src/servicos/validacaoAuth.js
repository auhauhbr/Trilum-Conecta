const dominiosPessoais = new Set([
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com',
  'icloud.com',
  'live.com',
  'bol.com.br',
  'uol.com.br',
])

export function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim())
}

export function emailCorporativoValido(email) {
  const normalizado = String(email || '').trim().toLowerCase()
  if (!emailValido(normalizado)) return false
  const dominio = normalizado.split('@')[1]
  return Boolean(dominio) && !dominiosPessoais.has(dominio)
}

export function requisitosSenha(senha = '') {
  return [
    {
      id: 'tamanho',
      ok: senha.length >= 8,
      mensagem: 'sua senha precisa de no mínimo 8 caracteres, aumente isso',
    },
    {
      id: 'maiuscula',
      ok: /[A-Z]/.test(senha),
      mensagem: 'adicione pelo menos uma letra maiúscula na senha',
    },
    {
      id: 'simbolo',
      ok: /[^A-Za-z0-9]/.test(senha),
      mensagem: 'coloque caracteres especiais na sua senha',
    },
    {
      id: 'numero',
      ok: /\d/.test(senha),
      mensagem: 'inclua pelo menos um número na senha',
    },
  ]
}

export function progressoSenha(senha = '') {
  return requisitosSenha(senha).filter((item) => item.ok).length
}

export function senhaValida(senha = '') {
  return requisitosSenha(senha).every((item) => item.ok)
}

export function mensagensSenha(senha = '') {
  if (!senha) return []
  return requisitosSenha(senha)
    .filter((item) => !item.ok)
    .map((item) => item.mensagem)
}

function apenasDigitos(valor) {
  return String(valor || '').replace(/\D/g, '')
}

export function formatarDataNascimento(valor) {
  const digitos = apenasDigitos(valor).slice(0, 8)
  if (digitos.length <= 2) return digitos
  if (digitos.length <= 3) return `${digitos.slice(0, 2)}/${digitos.slice(2)}`
  if (digitos.length <= 4) return `${digitos.slice(0, 2)}/${digitos.slice(2)}`
  return `${digitos.slice(0, 2)}/${digitos.slice(2, 4)}/${digitos.slice(4)}`
}

export function cpfValido(cpf) {
  const digitos = apenasDigitos(cpf)
  if (digitos.length !== 11 || /^(\d)\1+$/.test(digitos)) return false

  const calcular = (limite) => {
    let soma = 0
    for (let i = 0; i < limite; i += 1) soma += Number(digitos[i]) * (limite + 1 - i)
    const resto = (soma * 10) % 11
    return resto === 10 ? 0 : resto
  }

  return calcular(9) === Number(digitos[9]) && calcular(10) === Number(digitos[10])
}

export function cnpjValido(cnpj) {
  const digitos = apenasDigitos(cnpj)
  return digitos.length >= 14 && !/^(\d)\1+$/.test(digitos)
}

export function dataNascimentoValida(valor) {
  const texto = formatarDataNascimento(valor)
  const partes = texto.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!partes) return false

  const dia = Number(partes[1])
  const mes = Number(partes[2])
  const ano = Number(partes[3])
  const data = new Date(ano, mes - 1, dia)
  return data.getFullYear() === ano && data.getMonth() === mes - 1 && data.getDate() === dia
}

export function primeiroNome(nome) {
  return String(nome || '').trim().split(/\s+/)[0]
}
