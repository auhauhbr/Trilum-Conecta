import { cursos } from '../dados/cursos'
import { trilhas } from '../dados/trilhas'

export const tecnologiasPorAreaMentor = {
  devops: {
    rotulo: 'DevOps',
    principais: ['docker-cloud', 'docker', 'linux', 'cloud', 'aws', 'ci-cd', 'devops'],
    complementares: ['api', 'api-rest', 'http', 'seguranca', 'sql', 'git-github'],
    fora: ['react', 'angular', 'java', 'spring', 'java-spring', 'csharp', 'php'],
  },
  frontend: {
    rotulo: 'Front-end',
    principais: ['html', 'css', 'javascript', 'typescript', 'react', 'angular', 'nextjs'],
    complementares: ['tailwind', 'design-system', 'api-rest', 'git-github'],
    fora: ['java', 'spring', 'java-spring', 'csharp', 'php'],
  },
  backendNode: {
    rotulo: 'Back-end Node',
    principais: ['node', 'javascript', 'typescript', 'api-rest', 'mongodb', 'sql'],
    complementares: ['docker-cloud', 'git-github', 'seguranca', 'testes-unitarios', 'arquitetura-software'],
    fora: ['java', 'spring', 'java-spring', 'csharp', 'angular'],
  },
  backendJava: {
    rotulo: 'Back-end Java',
    principais: ['java', 'java-spring', 'api-rest', 'sql'],
    complementares: ['testes-unitarios', 'design-patterns', 'arquitetura-software', 'docker-cloud', 'mensageria'],
    fora: ['csharp', 'php'],
  },
  backendCsharp: {
    rotulo: 'Back-end C#/.NET',
    principais: ['csharp', 'dotnet', 'api-rest', 'sql', 'postgresql'],
    complementares: ['docker-cloud', 'seguranca', 'design-patterns', 'arquitetura-software'],
    fora: ['java', 'spring', 'java-spring', 'php'],
  },
  backendPython: {
    rotulo: 'Back-end Python',
    principais: ['python', 'fastapi', 'api-rest', 'sql', 'postgresql'],
    complementares: ['docker-cloud', 'seguranca'],
    fora: ['java', 'spring', 'java-spring', 'csharp', 'php'],
  },
  dados: {
    rotulo: 'Dados',
    principais: ['python', 'sql', 'postgresql', 'power-bi', 'dados'],
    complementares: ['mongodb'],
    fora: ['react', 'angular', 'java', 'spring', 'java-spring'],
  },
  qa: {
    rotulo: 'QA',
    principais: ['qa', 'api-rest', 'testes-api', 'cypress', 'playwright'],
    complementares: ['git-github', 'ci-cd', 'docker-cloud', 'seguranca'],
    fora: [],
  },
  suporte: {
    rotulo: 'Suporte',
    principais: ['informatica', 'windows', 'linux', 'redes', 'seguranca'],
    complementares: ['cloud', 'ingles'],
    fora: [],
  },
  explorando: {
    rotulo: 'exploração inicial',
    principais: ['informatica', 'logica', 'git-github', 'html', 'css', 'javascript'],
    complementares: ['ingles', 'carreira'],
    fora: [],
  },
}

function lista(valor) {
  if (Array.isArray(valor)) return valor.map((item) => String(item).trim().toLowerCase()).filter(Boolean)
  return String(valor || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
}

export function detectarAreaMentor(respostas = {}) {
  const area = String(respostas.areaDesejada || '').toLowerCase()
  const linguagem = String(respostas.linguagem || '').toLowerCase()
  const tecnologia = String(respostas.tecnologiaInteresse || '').toLowerCase()

  if (area.includes('devops') || area.includes('cloud')) return 'devops'
  if (area.includes('front')) return 'frontend'
  if (area.includes('dado')) return 'dados'
  if (area.includes('qa') || area.includes('teste')) return 'qa'
  if (area.includes('suporte')) return 'suporte'
  if (area.includes('back')) {
    if (linguagem.includes('java') || tecnologia.includes('java-spring')) return 'backendJava'
    if (linguagem.includes('csharp') || tecnologia.includes('dotnet')) return 'backendCsharp'
    if (linguagem.includes('python') || tecnologia.includes('fastapi')) return 'backendPython'
    return 'backendNode'
  }
  return 'explorando'
}

function tokensConteudo(conteudo = {}) {
  return new Set(
    [
      conteudo.id,
      conteudo.tecnologia,
      conteudo.categoria,
      conteudo.familia,
      ...lista(conteudo.tags),
      ...lista(conteudo.tecnologias),
      conteudo.titulo,
    ]
      .filter(Boolean)
      .flatMap((item) => String(item).toLowerCase().split(/[^a-z0-9#+.-]+/))
      .filter(Boolean),
  )
}

function possui(tokens, termos = []) {
  return termos.some((termo) => {
    const alvo = termo.toLowerCase()
    return [...tokens].some(
      (token) => token === alvo || token.startsWith(`${alvo}-`) || alvo.startsWith(`${token}-`),
    )
  })
}

function trilhasDoCurso(cursoId) {
  return trilhas.filter(
    (trilha) =>
      trilha.cursoIds?.includes(cursoId) ||
      trilha.preRequisitos?.includes(cursoId) ||
      trilha.complementos?.includes(cursoId) ||
      cursos.find((curso) => curso.id === cursoId)?.trilhaIds?.includes(trilha.id),
  )
}

function papelNaTrilha(cursoId, trilha) {
  if (!trilha) return ''
  if (trilha.preRequisitos?.includes(cursoId)) return 'pre-requisito'
  if (trilha.cursoIds?.includes(cursoId)) return 'principal'
  if (trilha.complementos?.includes(cursoId)) return 'complementar'
  return ''
}

function rotuloPapel(papel) {
  const rotulos = {
    principal: 'Conteúdo principal',
    'complementar-forte': 'Complementar importante',
    complementar: 'Conteúdo complementar',
    'pre-requisito': 'Base necessária',
    revisao: 'Conteúdo de revisão',
    exploratorio: 'Conteúdo exploratório',
    'fora-do-foco': 'Fora do foco atual',
    carreira: 'Empregabilidade e carreira',
  }
  return rotulos[papel] || 'Conteúdo em contexto'
}

function roadmapDoConteudo(conteudo) {
  const modulos = conteudo.modulos?.map((modulo) => modulo.titulo).filter(Boolean) || []
  if (modulos.length) return modulos.slice(0, 6)
  return conteudo.aulas?.map((aula) => aula.titulo).filter(Boolean).slice(0, 6) || []
}

function duvidasDoConteudo({ papel, area, trilhaRelacionada, proximoCurso }) {
  return [
    {
      pergunta: 'Por que esse conteúdo foi recomendado?',
      resposta:
        papel === 'principal'
          ? `Ele desenvolve uma habilidade central para sua jornada em ${area.rotulo}.`
          : `Ele foi comparado com sua jornada em ${area.rotulo} e classificado como ${rotuloPapel(papel).toLowerCase()}.`,
    },
    {
      pergunta: 'Como isso ajuda na minha trilha?',
      resposta: trilhaRelacionada
        ? `Este conteúdo se conecta à trilha ${trilhaRelacionada.titulo} como ${rotuloPapel(papel).toLowerCase()}.`
        : `Ele não está ligado diretamente a uma trilha priorizada agora; use a classificação para decidir quanto tempo investir.`,
    },
    {
      pergunta: 'O que estudar depois?',
      resposta: proximoCurso
        ? `Depois, avance para ${proximoCurso.titulo}, respeitando a ordem da trilha.`
        : `Depois, volte à sua trilha principal e escolha o próximo curso recomendado.`,
    },
    {
      pergunta: 'Posso pular esse conteúdo?',
      resposta:
        papel === 'pre-requisito' || papel === 'principal'
          ? 'Não é o ideal. Ele sustenta conteúdos posteriores e pular agora pode criar lacunas.'
          : 'Pode, desde que você mantenha a trilha principal em primeiro lugar e volte quando essa habilidade fizer falta.',
    },
  ]
}

export function calcularAlinhamentoConteudo({
  cursoAtual,
  trilhaAtual,
  respostasWizard = {},
  trilhasRecomendadas = [],
  cursosRecomendados = [],
} = {}) {
  const areaId = detectarAreaMentor(respostasWizard)
  const area = tecnologiasPorAreaMentor[areaId]
  const tokens = tokensConteudo(cursoAtual)
  const recomendadaIds = new Set(trilhasRecomendadas.map((item) => item.id))
  const trilhasRelacionadas = trilhasDoCurso(cursoAtual.id)
  const trilhaRelacionada =
    trilhasRelacionadas.find((trilha) => trilha.id === trilhaAtual?.id) ||
    trilhasRelacionadas.find((trilha) => recomendadaIds.has(trilha.id)) ||
    trilhasRelacionadas[0]
  const papelTrilha = papelNaTrilha(cursoAtual.id, trilhaRelacionada)
  const trilhaPriorizada = Boolean(trilhaRelacionada && recomendadaIds.has(trilhaRelacionada.id))
  const recomendado = cursosRecomendados.some((curso) => curso.id === cursoAtual.id)
  const carreira = possui(tokens, ['carreira', 'linkedin', 'portfolio', 'ingles', 'oratoria', 'entrevista'])
  const principalArea = possui(tokens, area.principais)
  const complementarArea = possui(tokens, area.complementares)
  const foraArea = possui(tokens, area.fora)
  let pontos = recomendado ? 45 : 0
  if (trilhaPriorizada) pontos += 35
  if (trilhaPriorizada && papelTrilha === 'principal') pontos += 25
  if (trilhaPriorizada && papelTrilha === 'pre-requisito') pontos += 22
  if (trilhaPriorizada && papelTrilha === 'complementar') pontos += 15
  if (principalArea) pontos += 35
  if (complementarArea) pontos += 20
  if (foraArea && !principalArea) pontos -= 30
  if (carreira) pontos = Math.max(pontos, 45)
  if (foraArea && !principalArea) pontos = Math.min(pontos, 30)

  let papel = 'exploratorio'
  if (carreira) papel = 'carreira'
  else if (foraArea && !principalArea) papel = 'fora-do-foco'
  else if (trilhaPriorizada && papelTrilha === 'pre-requisito') papel = 'pre-requisito'
  else if ((trilhaPriorizada && papelTrilha === 'principal') || principalArea) papel = 'principal'
  else if ((trilhaPriorizada && papelTrilha === 'complementar' && complementarArea) || (recomendado && complementarArea)) papel = 'complementar-forte'
  else if ((trilhaPriorizada && papelTrilha === 'complementar') || complementarArea) papel = 'complementar'

  return {
    areaId,
    area,
    papel,
    alinhamento: pontos >= 70 ? 'Alto' : pontos >= 35 ? 'Médio' : 'Baixo',
    prioridade: pontos >= 70 ? 'Alta' : pontos >= 35 ? 'Média' : 'Baixa',
    trilhaRelacionada,
    motivos: [
      recomendado && 'Está entre seus cursos recomendados.',
      trilhaRelacionada && recomendadaIds.has(trilhaRelacionada.id) && `Faz parte da trilha recomendada ${trilhaRelacionada.titulo}.`,
      principalArea && `Trabalha tecnologias centrais para ${area.rotulo}.`,
      complementarArea && `Fortalece habilidades complementares para ${area.rotulo}.`,
      foraArea && !principalArea && `Pertence a uma stack fora do seu foco atual em ${area.rotulo}.`,
    ].filter(Boolean),
  }
}

export function analisarConteudoNoContexto({
  cursoAtual,
  trilhaAtual,
  origem = 'catalogo',
  respostasWizard = {},
  trilhasRecomendadas = [],
  cursosRecomendados = [],
  progresso = 0,
} = {}) {
  const analise = calcularAlinhamentoConteudo({
    cursoAtual,
    trilhaAtual,
    respostasWizard,
    trilhasRecomendadas,
    cursosRecomendados,
  })
  const trilha = analise.trilhaRelacionada
  const papel = analise.papel
  const indiceNaTrilha = trilha?.cursoIds?.indexOf(cursoAtual.id) ?? -1
  const proximoCursoId = indiceNaTrilha >= 0 ? trilha.cursoIds?.[indiceNaTrilha + 1] : null
  const proximoCurso = cursos.find((curso) => curso.id === proximoCursoId)
  const roadmap = roadmapDoConteudo(cursoAtual)
  const resumoPorPapel = {
    principal: `${cursoAtual.titulo} é um conteúdo central para sua jornada em ${analise.area.rotulo}.`,
    'complementar-forte': `${cursoAtual.titulo} é um complemento importante para sua jornada em ${analise.area.rotulo}.`,
    complementar: `${cursoAtual.titulo} é útil como complemento, mas não substitui sua prioridade principal.`,
    'pre-requisito': `${cursoAtual.titulo} funciona como base para sua jornada e evita dificuldades nos próximos conteúdos.`,
    carreira: `${cursoAtual.titulo} fortalece sua apresentação profissional, mas não substitui prática técnica.`,
    exploratorio: `${cursoAtual.titulo} pode ser explorado, mas não substitui sua prioridade atual em ${analise.area.rotulo}.`,
    'fora-do-foco': `${cursoAtual.titulo} não parece prioridade para seu perfil atual em ${analise.area.rotulo}.`,
  }
  const origemTexto =
    origem === 'trilha' && trilha
      ? `Você abriu este curso dentro da trilha ${trilha.titulo}.`
      : `Você abriu este curso pelo catálogo. Ele foi comparado com seu perfil e suas recomendações atuais.`
  const duvidasRapidas = duvidasDoConteudo({ papel, area: analise.area, trilhaRelacionada: trilha, proximoCurso })
  const primeiraAula = cursoAtual.modulos?.[0]?.aulas?.[0]

  return {
    id: `curso-contexto-${cursoAtual.id}`,
    modo: 'curso',
    titulo: 'Curso em contexto',
    resumo: resumoPorPapel[papel],
    detalhe: `${rotuloPapel(papel)} para ${analise.area.rotulo}. ${analise.motivos.join(' ')} ${origemTexto}`,
    blocos: [
      { titulo: 'Veredito', valor: `${rotuloPapel(papel)} para ${analise.area.rotulo}` },
      { titulo: 'Alinhamento com seu perfil', valor: analise.alinhamento },
      { titulo: 'Prioridade', valor: analise.prioridade },
      {
        titulo: 'Como se conecta à sua jornada',
        valor: trilha
          ? `Este curso entra na trilha ${trilha.titulo} como ${rotuloPapel(papel).toLowerCase()}.`
          : `Este curso não está ligado diretamente a uma trilha priorizada no momento.`,
      },
    ],
    sugestoes: roadmap.length ? roadmap : ['Entenda os fundamentos', 'Pratique os conceitos principais', 'Aplique em um projeto pequeno'],
    duvidasRapidas,
    acao: primeiraAula
      ? { label: progresso ? 'Continuar conteúdo' : 'Começar conteúdo', to: `#/aluno/cursos/${cursoAtual.id}/aula/${primeiraAula.id}` }
      : null,
    acoesLinks: [
      trilha && { label: 'Ver trilha relacionada', to: `#/aluno/cursos/${trilha.id}` },
      proximoCurso && { label: 'Ver próximo curso', to: `#/aluno/cursos/${proximoCurso.id}` },
    ].filter(Boolean),
  }
}

export function analisarTrilhaNoContexto({ trilhaAtual, respostasWizard = {}, trilhasRecomendadas = [], progresso = 0 } = {}) {
  const areaId = detectarAreaMentor(respostasWizard)
  const area = tecnologiasPorAreaMentor[areaId]
  const indice = trilhasRecomendadas.findIndex((trilha) => trilha.id === trilhaAtual.id)
  const principal = indice === 0
  const recomendada = indice > 0
  const familiaAlinhada = String(trilhaAtual.familia || '').includes(areaId.replace('backend', 'backend-').toLowerCase()) ||
    (areaId === 'frontend' && String(trilhaAtual.familia || '').includes('frontend')) ||
    (areaId === 'dados' && String(trilhaAtual.familia || '').includes('dados')) ||
    (areaId === 'devops' && String(trilhaAtual.familia || '').includes('devops')) ||
    (areaId === 'qa' && String(trilhaAtual.familia || '').includes('qa'))
  const papel = principal ? 'trilha principal' : recomendada ? 'trilha complementar' : familiaAlinhada ? 'trilha de apoio' : 'trilha exploratória'
  const cursosPrincipais = trilhaAtual.cursoIds?.map((id) => cursos.find((curso) => curso.id === id)?.titulo).filter(Boolean) || []
  const preRequisitos = trilhaAtual.preRequisitos?.map((id) => cursos.find((curso) => curso.id === id)?.titulo).filter(Boolean) || []
  const complementos = trilhaAtual.complementos?.map((id) => cursos.find((curso) => curso.id === id)?.titulo).filter(Boolean) || []
  const primeiraAula = trilhaAtual.modulos?.[0]?.aulas?.[0]

  return {
    id: `trilha-contexto-${trilhaAtual.id}`,
    modo: 'trilha',
    titulo: 'Trilha em contexto',
    resumo: principal
      ? `Essa é sua trilha principal. Siga a ordem proposta para construir base, prática e aplicação profissional.`
      : recomendada
        ? `Essa trilha funciona como apoio para sua jornada principal em ${area.rotulo}.`
        : familiaAlinhada
          ? `Essa trilha reforça sua jornada em ${area.rotulo}, mas não substitui sua trilha principal.`
          : `Essa trilha pode ser explorada, mas não é prioridade para seu objetivo atual em ${area.rotulo}.`,
    detalhe: `${trilhaAtual.titulo} foi classificada como ${papel}. A trilha é o caminho completo; cada curso desenvolve uma habilidade específica dentro dessa jornada.`,
    blocos: [
      { titulo: 'Papel da trilha', valor: papel },
      { titulo: 'Área atual', valor: area.rotulo },
      { titulo: 'Progresso', valor: `${progresso}%` },
    ],
    sugestoes: [...preRequisitos.map((item) => `Base: ${item}`), ...cursosPrincipais.map((item) => `Principal: ${item}`), ...complementos.slice(0, 2).map((item) => `Complemento: ${item}`)].slice(0, 8),
    duvidasRapidas: [
      { pergunta: 'Preciso seguir a ordem?', resposta: 'Sim, principalmente nos cursos principais. Pré-requisitos evitam lacunas e complementos podem entrar conforme sua necessidade.' },
      { pergunta: 'Posso fazer outro curso junto?', resposta: 'Pode, mas mantenha apenas um curso principal ativo e use complementos para reforçar dúvidas específicas.' },
      { pergunta: 'O que vem depois da trilha?', resposta: 'Depois, aplique as habilidades em um projeto e compare seu perfil com vagas relacionadas à área.' },
    ],
    acao: primeiraAula ? { label: progresso ? 'Continuar trilha' : 'Começar trilha', to: `#/aluno/cursos/${trilhaAtual.id}/aula/${primeiraAula.id}` } : null,
  }
}
