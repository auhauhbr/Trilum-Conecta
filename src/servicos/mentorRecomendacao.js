const rotuloArea = {
  frontend: 'Front-end',
  backend: 'Back-end',
  dados: 'Dados',
  devops: 'DevOps e Cloud',
  qa: 'QA e Testes',
  'produto-suporte': 'Produto ou Suporte',
  'nao-sei': 'exploracao inicial',
}

const rotuloTecnologia = {
  angular: 'Angular',
  react: 'React',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  'java-spring': 'Spring Boot',
  node: 'Node.js',
  php: 'PHP',
  go: 'Go',
  sql: 'SQL',
  mongodb: 'MongoDB',
  'docker-cloud': 'Docker e Cloud',
  linux: 'Linux',
  qa: 'QA e Testes',
  seguranca: 'Seguranca',
  'api-rest': 'APIs REST',
  'git-github': 'Git e GitHub',
  nenhuma: 'sem tecnologia definida',
}

function normalizarTexto(valor = '') {
  return String(valor)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function primeiroNome(nome = '') {
  return String(nome).trim().split(' ')[0] || 'aluno'
}

function itemContemTecnologia(item = {}, tecnologia = '') {
  const alvo = normalizarTexto(tecnologia)
  if (!alvo || alvo === 'nenhuma') return true

  const texto = [
    item.id,
    item.titulo,
    item.descricao,
    item.categoria,
    item.area,
    item.tecnologia,
    ...(item.tags || []),
    ...(item.tecnologias || []),
    ...(item.trilhaIds || []),
  ]
    .filter(Boolean)
    .join(' ')

  const textoNormalizado = normalizarTexto(texto)
  if (textoNormalizado.includes(alvo)) return true

  const equivalencias = {
    'java-spring': ['java', 'spring'],
    angular: ['typescript', 'javascript'],
    react: ['javascript'],
    typescript: ['javascript'],
    'docker-cloud': ['docker', 'cloud', 'devops', 'linux'],
    'api-rest': ['api', 'http', 'rest'],
    qa: ['teste', 'testes', 'automacao'],
  }

  return (equivalencias[alvo] || []).some((termo) => textoNormalizado.includes(termo))
}

export function tecnologiaApareceNasRecomendacoes(tecnologia, trilhasRecomendadas = [], cursosRecomendados = []) {
  return [...trilhasRecomendadas, ...cursosRecomendados].slice(0, 8).some((item) => itemContemTecnologia(item, tecnologia))
}

function tituloTrilha(trilha) {
  return trilha?.titulo || 'sua primeira trilha'
}

function criarMensagem(id, texto, pose = 'left') {
  return { id, titulo: 'Mentor', texto, pose }
}

function mensagemTecnologiaAusente(tecnologia, respostas) {
  const tecnologiaRotulo = rotuloTecnologia[tecnologia] || tecnologia

  if (tecnologia === 'angular') {
    return `${tecnologiaRotulo} continua sendo o objetivo, mas ainda nao aparece no topo porque voce marcou que esta comecando. Primeiro vem HTML, CSS, JavaScript, logica e Git para o caminho ficar mais leve.`
  }

  if (tecnologia === 'java-spring') {
    return `${tecnologiaRotulo} depende de Java, APIs e banco de dados. Se ele nao apareceu primeiro, a plataforma esta preparando essa base antes de te colocar no Spring.`
  }

  if (tecnologia === 'docker-cloud') {
    return `${tecnologiaRotulo} funciona melhor quando voce ja tem algum projeto para publicar. Por isso Git, Linux e fundamentos podem aparecer antes.`
  }

  if (tecnologia === 'qa') {
    return 'Automacao de testes vem depois dos fundamentos de QA, Git e API. Assim voce entende o que esta testando antes de automatizar.'
  }

  if (respostas?.nivelTecnologia === 'quero-comecar') {
    return `${tecnologiaRotulo} nao foi ignorado. Ele pode aparecer depois que a base estiver firme, porque voce marcou que quer comecar do zero.`
  }

  return `${tecnologiaRotulo} foi considerado, mas as primeiras recomendacoes priorizam o que combina melhor com seu momento atual.`
}

export function criarMensagensMentor({
  usuarioAtual,
  respostasWizard = {},
  trilhasRecomendadas = [],
  cursosRecomendados = [],
} = {}) {
  const mensagens = []
  const nome = primeiroNome(usuarioAtual?.nome)
  const area = respostasWizard.areaDesejada || 'nao-sei'
  const tecnologia = respostasWizard.tecnologiaInteresse || respostasWizard.linguagem || 'nenhuma'
  const areaTexto = rotuloArea[area] || area
  const tecnologiaTexto = rotuloTecnologia[tecnologia] || tecnologia
  const trilhaPrincipal = trilhasRecomendadas[0]
  const cursoPrincipal = cursosRecomendados[0]
  const inicianteDigital = ['iniciante', 'basico'].includes(respostasWizard.informatica)
  const inicianteCodigo = !respostasWizard.programacao || respostasWizard.programacao === 'nenhum'
  const temGit = trilhasRecomendadas.some((trilha) => trilha.id === 'git-github')
  const temLogica = trilhasRecomendadas.some((trilha) => trilha.id === 'logica-algoritmos')
  const tecnologiaVisivel = tecnologiaApareceNasRecomendacoes(tecnologia, trilhasRecomendadas, cursosRecomendados)

  if (!Object.keys(respostasWizard).length) {
    return [
      criarMensagem(
        'sem-wizard',
        `${nome}, eu ainda não tenho respostas suas. Quando você responder o questionário, eu explico por que cada trilha aparece para você.`,
      ),
    ]
  }

  mensagens.push(
    criarMensagem(
      'saudação',
      `${nome}, eu li suas respostas e montei um caminho com calma. A ideia é mostrar o próximo passo sem te jogar em uma tecnologia difícil antes da hora.`,
    ),
  )

  mensagens.push(
    criarMensagem(
      'perfil',
      `Seu perfil aponta para ${areaTexto}${tecnologia && tecnologia !== 'nenhuma' ? ` com interesse em ${tecnologiaTexto}` : ''}. Por isso as recomendações misturam base, prática e carreira.`,
      'right',
    ),
  )

  if (trilhaPrincipal) {
    mensagens.push(
      criarMensagem(
        'trilhas',
        `${tituloTrilha(trilhaPrincipal)} aparece como prioridade porque combina melhor com seu momento agora. As trilhas estão ordenadas para você não pular etapas importantes.`,
      ),
    )
  }

  if (inicianteDigital || inicianteCodigo || temLogica || temGit) {
    const partes = []
    if (inicianteDigital) partes.push('Informática entra para dar autonomia no computador antes dos conteúdos mais técnicos')
    if (inicianteCodigo || temLogica) partes.push('Lógica aparece para fortalecer variáveis, condições, repetições e funções')
    if (temGit) partes.push('Git e GitHub entram porque ajudam no portfólio e no trabalho em equipe')

    mensagens.push(criarMensagem('base', `${partes.join('. ')}. Isso não atrasa sua meta; isso prepara o terreno.`))
  }

  if (tecnologia && tecnologia !== 'nenhuma' && !tecnologiaVisivel) {
    mensagens.push(criarMensagem('tecnologia', mensagemTecnologiaAusente(tecnologia, respostasWizard), 'right'))
  }

  if (area === 'dados' || respostasWizard.linguagem === 'python' || tecnologia === 'python') {
    mensagens.push(
      criarMensagem(
        'dados-python',
        'Seu caminho principal é Dados com Python. Se você marcou interesse em testes, QA entra como complemento, mas a base mais importante agora é Python, SQL e banco de dados.',
      ),
    )
  }

  if (area === 'devops' || tecnologia === 'docker-cloud') {
    mensagens.push(
      criarMensagem(
        'devops',
        'Como você escolheu Docker e Cloud, a prioridade é entender Git, Linux, containers, cloud, CI/CD e segurança. APIs entram como apoio para entender melhor o que será publicado.',
      ),
    )
  }

  if (area === 'qa' || respostasWizard.focoCarreira === 'testes') {
    mensagens.push(
      criarMensagem(
        'qa',
        'Como você escolheu QA ou testes, a trilha começa por fundamentos, Git e APIs. Automação vem depois, quando a base estiver mais firme.',
      ),
    )
  }

  if (tecnologia === 'java-spring' && ['projetos', 'avançar'].includes(respostasWizard.nivelTecnologia)) {
    mensagens.push(
      criarMensagem(
        'java-avançado',
        'Como você quer avançar em Spring Boot, podem aparecer conteúdos mais profissionais: APIs, SQL, testes, arquitetura, Docker e segurança.',
      ),
    )
  }

  if (cursoPrincipal) {
    mensagens.push(
      criarMensagem(
        'cursos',
        `Nos cursos, comece por ${cursoPrincipal.titulo}. Ele é um passo menor dentro da jornada e ajuda a transformar a trilha em prática.`,
        'right',
      ),
    )
  }

  mensagens.push(
    criarMensagem(
      'vagas',
      'As vagas usam seu perfil para mostrar oportunidades mais próximas do seu momento. Conforme você conclui trilhas e melhora o portfólio, seu perfil fica mais forte.',
    ),
  )

  if (respostasWizard.objetivo === 'primeira-vaga' || respostasWizard.objetivo === 'portfólio') {
    mensagens.push(
      criarMensagem(
        'carreira',
        'Como seu objetivo envolve vaga ou portfólio, também entram Git, LinkedIn, comunicação e projetos. Estudar é importante, mas mostrar o que você fez também conta muito.',
      ),
    )
  }

  mensagens.push(
    criarMensagem(
      'próximo-passo',
      'Meu conselho prático: escolha a primeira trilha, conclua o primeiro curso e marque seu progresso. Depois a recomendação fica cada vez mais clara.',
      'right',
    ),
  )

  return mensagens
}