const TAGS_REAIS = [
  'frontend',
  'front-end',
  'backend',
  'back-end',
  'javascript',
  'typescript',
  'react',
  'angular',
  'html',
  'css',
  'figma',
  'node',
  'java',
  'spring',
  'php',
  'go',
  'python',
  'sql',
  'mongodb',
  'docker',
  'linux',
  'aws',
  'azure',
  'cloud',
  'git',
  'qa',
  'testes',
  'cypress',
  'postman',
  'suporte',
  'redes',
  'windows',
  'api',
  'api-rest',
]

const PLACEHOLDERS = ['texto', 'textotexto', 'dd', 'sasas', 'sdsd', 'teste', 'lorem ipsum']

function texto(valor = '') {
  return String(valor || '').trim()
}

function textoNormalizado(valor = '') {
  return texto(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function lista(valor) {
  if (Array.isArray(valor)) return valor.map(texto).filter(Boolean)
  return texto(valor)
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function textoParecePlaceholder(valor) {
  const conteudo = textoNormalizado(valor)
  return !conteudo || PLACEHOLDERS.includes(conteudo) || conteudo.length < 8
}

export function analisarPerfilEmpresa(empresa = {}) {
  const avisos = []
  const especialidades = lista(empresa.especialidades)
  const stack = lista(empresa.stackDetalhes)
  const diferenciais = lista(empresa.beneficios)

  if (textoParecePlaceholder(empresa.nome)) avisos.push('complete o nome comercial da empresa')
  if (textoParecePlaceholder(empresa.descricaoCurta)) avisos.push('adicione uma descrição curta com o propósito da empresa')
  if (textoParecePlaceholder(empresa.descricao)) avisos.push('preencha o Sobre com produto, mercado e cultura')
  if (textoParecePlaceholder(empresa.tamanho)) avisos.push('informe o tamanho aproximado da empresa')
  if (textoParecePlaceholder(empresa.hub || empresa.localizacao || empresa.sede)) avisos.push('informe hub principal, sede ou localização')
  if (!especialidades.length) avisos.push('liste especialidades separadas por vírgula')
  if (!stack.length) avisos.push('adicione a stack em prática da empresa')
  if (!diferenciais.length) avisos.push('inclua diferenciais reais para candidatos')
  if (!empresa.logoUrl && !empresa.logo) avisos.push('adicione uma logo ou iniciais para o perfil')
  if ([empresa.descricao, empresa.descricaoCurta, empresa.beneficios, empresa.stackDetalhes].some((item) => PLACEHOLDERS.includes(textoNormalizado(item)))) {
    avisos.push('troque textos de teste por informações reais antes de receber candidatos')
  }

  return {
    incompleto: avisos.length > 0,
    avisos,
  }
}

export function analisarQualidadeVaga(vaga = {}) {
  const avisos = []
  const dicas = []
  let pontuacao = 0
  const titulo = texto(vaga.titulo)
  const descricao = texto(vaga.descricao)
  const requisitos = lista(vaga.requisitos)
  const atividades = lista(vaga.atividades)
  const tags = lista(vaga.tags)
  const nivel = textoNormalizado(vaga.nivel)
  const modalidade = textoNormalizado(vaga.modalidade)
  const requisitosTexto = textoNormalizado(requisitos.join(' '))
  const tagsNormalizadas = tags.map(textoNormalizado)
  if (titulo.length >= 12 && !['desenvolvedor', 'programador', 'vaga', 'dev'].includes(textoNormalizado(titulo))) pontuacao += 12
  else avisos.push('use um título mais específico, como Desenvolvedor Front-end Júnior ou Estágio em QA')

  if (descricao.length >= 80) pontuacao += 16
  else avisos.push('explique melhor contexto, time, produto e desafio da vaga')

  if (requisitos.length >= 2) pontuacao += 12
  else avisos.push('adicione pelo menos 2 requisitos realmente necessários')

  if (atividades.length >= 2) pontuacao += 12
  else avisos.push('liste pelo menos 2 atividades reais do dia a dia')

  if (texto(vaga.salario)) pontuacao += 12
  else avisos.push('considere informar uma faixa salarial para aumentar a confiança dos candidatos')

  if (texto(vaga.tipo)) pontuacao += 8
  else avisos.push('informe o tipo de contrato')

  if (texto(vaga.nivel)) pontuacao += 8
  else avisos.push('informe o nível da vaga')

  if (texto(vaga.modalidade)) pontuacao += 8
  else avisos.push('informe a modalidade de trabalho')

  if (!modalidade.includes('presencial') && !modalidade.includes('híbrido') && !modalidade.includes('hibrido')) pontuacao += 4
  else if (texto(vaga.localizacao)) pontuacao += 4
  else avisos.push('para vaga presencial ou híbrida, informe cidade e estado')

  if (tags.length >= 3) pontuacao += 8
  else avisos.push('adicione pelo menos 3 tecnologias ou competências para melhorar a compatibilidade')

  if (tagsNormalizadas.some((tag) => TAGS_REAIS.some((real) => tag.includes(real) || real.includes(tag)))) pontuacao += 8
  else dicas.push('prefira tags reais do dia a dia, como React, TypeScript, SQL, Docker, Git, QA ou Suporte')

  if ((nivel.includes('júnior') || nivel.includes('estágio')) && /(3\+|3 anos|4 anos|5 anos|sênior|senior)/i.test(requisitosTexto)) {
    avisos.push('para vaga Júnior ou Estágio, evite exigir 3+ anos de experiência')
  }

  return {
    pontuacao: Math.min(100, pontuacao),
    avisos,
    dicas,
  }
}
