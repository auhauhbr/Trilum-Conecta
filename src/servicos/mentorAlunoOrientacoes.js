function textoCurto(texto = '', limite = 330) {
  const limpo = String(texto).replace(/\s+/g, ' ').trim()
  if (limpo.length <= limite) return limpo

  const frases = limpo.match(/[^.!?]+[.!?]+/g) || []
  const resumo = frases.reduce((atual, frase) => {
    const candidato = `${atual} ${frase}`.trim()
    return candidato.length <= limite ? candidato : atual
  }, '')

  return resumo || limpo.slice(0, limite).replace(/\s+\S*$/, '').concat('.')
}

function orientacaoBase(mensagem = {}) {
  const texto = mensagem.texto || mensagem.msg || ''
  return {
    id: mensagem.id,
    pagina: mensagem.pagina,
    secao: mensagem.secao,
    prioridade: mensagem.prioridade || 5,
    titulo: mensagem.titulo || 'Orientação do mentor',
    resumo: textoCurto(texto),
    detalhe: mensagem.detalhe || texto,
    acao: mensagem.acao,
    cenarioId: mensagem.cenarioId,
  }
}

function detalheDaJornada(trilhas = []) {
  if (!trilhas.length) return ''
  const [principal, ...apoios] = trilhas
  const explicacoes = apoios
    .slice(0, 4)
    .map((trilha) => `${trilha.titulo}: ${trilha.motivo || trilha.destaque || 'apoia sua jornada principal'}`)
    .join(' ')

  return `${principal.titulo} é o centro da sua jornada porque combina melhor com seu perfil atual. ${
    explicacoes || 'As outras trilhas entram como apoio para você avançar sem misturar caminhos demais.'
  }`
}

export function criarOrientacoesMentorAluno({
  paginaAtual = 'pagina',
  mensagens = [],
  trilhasRecomendadas = [],
  cursosRecomendados = [],
} = {}) {
  const orientacoes = mensagens.filter(Boolean).map((mensagem) => ({ ...orientacaoBase(mensagem), pagina: paginaAtual }))
  const trilhaPrincipal = trilhasRecomendadas[0]
  const cursoPrincipal = cursosRecomendados[0]

  if (paginaAtual === 'painel' && trilhaPrincipal) {
    const orientacaoTrilhas = orientacoes.find((item) => item.id === 'trilhas')
    if (orientacaoTrilhas) {
      orientacaoTrilhas.titulo = 'Seu caminho principal e seus apoios'
      orientacaoTrilhas.resumo = textoCurto(
        `Seu caminho foi dividido entre ${trilhaPrincipal.titulo} e trilhas de apoio para você avançar sem misturar stacks.`,
      )
      orientacaoTrilhas.detalhe = detalheDaJornada(trilhasRecomendadas)
      orientacaoTrilhas.acao = { label: 'Ir para trilha principal', to: `#/aluno/cursos/${trilhaPrincipal.id}` }
      orientacaoTrilhas.cenarioId = 'trilha'
    }
  }

  if (paginaAtual === 'painel' && cursoPrincipal) {
    const orientacaoCursos = orientacoes.find((item) => item.id === 'cursos')
    if (orientacaoCursos) {
      orientacaoCursos.titulo = 'Seu próximo passo prático'
      orientacaoCursos.resumo = textoCurto(`${cursoPrincipal.titulo} transforma sua trilha principal em uma próxima ação prática.`)
      orientacaoCursos.detalhe =
        cursoPrincipal.motivo || `${cursoPrincipal.titulo} foi priorizado pelas regras da plataforma para seu momento atual.`
      orientacaoCursos.acao = { label: 'Ver curso recomendado', to: `#/aluno/cursos/${cursoPrincipal.id}` }
      orientacaoCursos.cenarioId = 'curso'
    }
  }

  return orientacoes
}
