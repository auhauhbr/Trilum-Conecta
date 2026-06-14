import { configIA } from '../config/ia'
import { gerarFeedbackCandidatoFallback, validarFeedbackCandidato } from './analiseCandidaturaEmpresa'
import { listaEmpresa, normalizarTextoEmpresa } from './empresaInteligencia'

const SYSTEM_PROMPT = `Você é um assistente de recrutamento da plataforma Trilum Conecta.
Ajude a empresa a melhorar uma vaga de tecnologia usando apenas os dados fornecidos.
Não invente salário, benefícios, modalidade, localização, tecnologias ou requisitos.
Não prometa contratação, publique ou salve a vaga.
Se a vaga for Júnior, evite exigências exageradas.
Organize os textos com clareza e responda em português brasileiro.
Retorne somente JSON válido com titulo, descricao, requisitos, atividades, tags e observacoes.`

const SYSTEM_PROMPT_PERFIL = `Você é um assistente de recrutamento da plataforma Trilum Conecta.
Ajude uma empresa a melhorar seu perfil público para atrair candidatos usando apenas os dados fornecidos.
Não invente benefícios, certificações, clientes, prêmios, localidades, links ou número de funcionários.
Não prometa contratação, altere ou salve o perfil.
Transforme textos soltos em uma apresentação clara, profissional e confiável.
Preserve setor, especialidades, tecnologias e diferenciais já informados.
Responda em português brasileiro.
Retorne somente JSON válido com descricaoCurta, descricaoEmpresa, especialidades, stackPratica, diferenciais e observacoes.`

const SYSTEM_PROMPT_CANDIDATURA = `Você é um assistente de recrutamento da plataforma Trilum Conecta.
Ajude uma empresa a interpretar a compatibilidade entre uma pessoa candidata e uma vaga usando apenas os dados fornecidos.
Não invente experiências, tecnologias, projetos, certificados ou cursos.
Não aprove, rejeite ou tome decisão final.
Não use linguagem discriminatória, ofensiva ou absoluta.
Não diga que a empresa deve contratar.
A classificação e as listas calculadas pelo sistema não devem ser alteradas.
Use linguagem cuidadosa, profissional e em português brasileiro.
Retorne somente JSON válido.`

const MODELOS = {
  frontend: {
    titulo: 'Desenvolvedor Front-end',
    descricao: 'atuar na criação e evolução de interfaces web claras, responsivas e acessíveis, colaborando com produto, design e desenvolvimento',
    requisitos: ['HTML, CSS e JavaScript', 'Noções de interfaces responsivas', 'Git/GitHub', 'Consumo de APIs REST', 'Boa comunicação e vontade de aprender'],
    atividades: ['Desenvolver e evoluir interfaces responsivas', 'Integrar interfaces com APIs REST', 'Corrigir bugs e apoiar melhorias de usabilidade', 'Participar de revisões de código', 'Colaborar com produto, design e desenvolvimento'],
    tags: ['frontend', 'javascript', 'api-rest', 'git'],
  },
  'backend-java': {
    titulo: 'Desenvolvedor Back-end Java',
    descricao: 'atuar na construção e evolução de serviços back-end, APIs e integrações, colaborando na entrega de soluções confiáveis',
    requisitos: ['Fundamentos de Java', 'Noções de APIs REST', 'Conhecimentos de banco de dados e SQL', 'Git/GitHub', 'Boa comunicação e vontade de aprender'],
    atividades: ['Desenvolver e manter serviços back-end', 'Criar e integrar APIs REST', 'Apoiar consultas e persistência de dados', 'Corrigir bugs e participar de revisões de código'],
    tags: ['java', 'backend', 'api-rest', 'sql', 'git'],
  },
  'backend-node': {
    titulo: 'Desenvolvedor Back-end Node.js',
    descricao: 'atuar na construção e evolução de serviços e APIs com JavaScript, colaborando na entrega de integrações confiáveis',
    requisitos: ['JavaScript', 'Noções de Node.js e APIs REST', 'Conhecimentos de banco de dados', 'Git/GitHub', 'Boa comunicação e vontade de aprender'],
    atividades: ['Desenvolver e manter serviços back-end', 'Criar e integrar APIs REST', 'Apoiar persistência de dados', 'Corrigir bugs e participar de revisões de código'],
    tags: ['node.js', 'javascript', 'backend', 'api-rest', 'git'],
  },
  'backend-dotnet': {
    titulo: 'Desenvolvedor Back-end C#/.NET',
    descricao: 'atuar na construção e evolução de serviços e APIs no ecossistema .NET, colaborando na entrega de soluções confiáveis',
    requisitos: ['Fundamentos de C# e .NET', 'Noções de APIs REST', 'Conhecimentos de banco de dados e SQL', 'Git/GitHub', 'Boa comunicação e vontade de aprender'],
    atividades: ['Desenvolver e manter serviços back-end', 'Criar e integrar APIs REST', 'Apoiar persistência de dados', 'Corrigir bugs e participar de revisões de código'],
    tags: ['csharp', 'dotnet', 'backend', 'api-rest', 'sql'],
  },
  devops: {
    titulo: 'Profissional de DevOps',
    descricao: 'atuar no apoio à automação, publicação e acompanhamento de aplicações, colaborando para tornar as entregas mais confiáveis',
    requisitos: ['Fundamentos de Linux', 'Noções de Git/GitHub', 'Conhecimentos de containers e automação', 'Boa comunicação e vontade de aprender'],
    atividades: ['Apoiar automações e pipelines de entrega', 'Acompanhar ambientes e aplicações', 'Documentar rotinas operacionais', 'Colaborar com desenvolvimento e infraestrutura'],
    tags: ['devops', 'linux', 'docker', 'git', 'ci-cd'],
  },
  qa: {
    titulo: 'Analista de QA',
    descricao: 'atuar na validação de funcionalidades e na melhoria contínua da qualidade do produto junto ao time de desenvolvimento',
    requisitos: ['Fundamentos de testes de software', 'Noções de testes de APIs', 'Organização e atenção aos detalhes', 'Boa comunicação e vontade de aprender'],
    atividades: ['Planejar e executar cenários de teste', 'Registrar evidências e defeitos', 'Validar correções', 'Colaborar com produto e desenvolvimento'],
    tags: ['qa', 'testes', 'api-rest', 'qualidade'],
  },
  dados: {
    titulo: 'Analista de Dados',
    descricao: 'atuar na organização, análise e visualização de dados para apoiar decisões e melhorias do negócio',
    requisitos: ['Fundamentos de análise de dados', 'Conhecimentos de SQL', 'Organização e atenção aos detalhes', 'Boa comunicação e vontade de aprender'],
    atividades: ['Preparar e analisar dados', 'Criar consultas e indicadores', 'Apoiar relatórios e dashboards', 'Comunicar descobertas ao time'],
    tags: ['dados', 'sql', 'dashboard', 'analise-de-dados'],
  },
  suporte: {
    titulo: 'Analista de Suporte Técnico',
    descricao: 'atuar no atendimento e resolução de dúvidas técnicas, colaborando para uma boa experiência das pessoas usuárias',
    requisitos: ['Fundamentos de informática e sistemas', 'Organização para registrar atendimentos', 'Boa comunicação e vontade de aprender'],
    atividades: ['Atender e registrar solicitações', 'Investigar problemas técnicos', 'Orientar pessoas usuárias', 'Documentar soluções recorrentes'],
    tags: ['suporte', 'atendimento', 'infraestrutura'],
  },
}

function texto(valor = '', limite = 2000) {
  return String(valor || '').trim().slice(0, limite)
}

function linhas(valor) {
  return listaEmpresa(valor).slice(0, 12)
}

function endpointEhLocal(endpoint) {
  try {
    return ['localhost', '127.0.0.1', '[::1]'].includes(new URL(endpoint).hostname)
  } catch {
    return false
  }
}

function familiaDaVaga(vaga = {}) {
  const contexto = normalizarTextoEmpresa([vaga.titulo, vaga.descricao, ...linhas(vaga.requisitos), ...linhas(vaga.atividades), ...linhas(vaga.tags)].join(' '))
  if (/devops|cloud|docker|linux|ci.?cd|infraestrutura/.test(contexto)) return 'devops'
  if (/qualidade|testes|tester|qa|cypress|playwright/.test(contexto)) return 'qa'
  if (/dados|data|power bi|dashboard|analise/.test(contexto)) return 'dados'
  if (/suporte|help desk|service desk|atendimento/.test(contexto)) return 'suporte'
  if (/c#|csharp|\.net|dotnet/.test(contexto)) return 'backend-dotnet'
  if (/java|spring/.test(contexto)) return 'backend-java'
  if (/node|nodejs|node\.js/.test(contexto)) return 'backend-node'
  return 'frontend'
}

function removerExigenciaExagerada(itens = [], nivel = '') {
  if (!/j[uú]nior|est[aá]gio|trainee/i.test(nivel)) return itens
  return itens.map((item) => /(?:3\+|3 anos|4 anos|5 anos|s[eê]nior|especialista)/i.test(item)
    ? 'Experiência acadêmica, projetos pessoais ou conhecimento prático relacionado à vaga'
    : item)
}

function tituloEhGenerico(valor = '') {
  return !texto(valor)
    || /^(dev|vaga|desenvolvedor|programador)$/i.test(texto(valor))
    || /^(dev|vaga)\s*[-–—:]/i.test(texto(valor))
}

function tagsCoerentes(vaga, modelo) {
  const atuais = linhas(vaga.tags).map((tag) => normalizarTextoEmpresa(tag).replace(/\s+/g, '-'))
  return [...new Set([...atuais, ...modelo.tags])].filter(Boolean).slice(0, 10)
}

export function gerarVagaFallback({ vaga = {}, empresa = {}, analiseAtual = {} } = {}) {
  const modelo = MODELOS[familiaDaVaga(vaga)]
  const tituloAtual = texto(vaga.titulo, 100)
  const tituloGenerico = tituloEhGenerico(tituloAtual)
  const requisitosAtuais = removerExigenciaExagerada(linhas(vaga.requisitos), vaga.nivel)
  const atividadesAtuais = linhas(vaga.atividades)
  const nomeEmpresa = texto(empresa.nome || empresa.nomeOficial, 80)
  const descricaoAtual = texto(vaga.descricao, 900)
  const tecnologiasAtuais = linhas(vaga.tags).slice(0, 4)
  const observacoes = []

  if (!texto(vaga.salario)) observacoes.push('Considere informar uma faixa salarial para aumentar a confiança dos candidatos.')
  if (analiseAtual.alertas?.some((item) => /requisitos pedem experi[eê]ncia avan[cç]ada/i.test(item))) {
    observacoes.push('A exigência de experiência foi ajustada para ficar coerente com uma vaga de nível inicial.')
  }
  observacoes.push(analiseAtual.pontuacao >= 85
    ? 'A vaga já está forte; a sugestão preserva o conteúdo e faz apenas ajustes leves.'
    : 'Revise a sugestão e adapte o texto à realidade do time antes de publicar.')

  return {
    titulo: tituloGenerico ? `${modelo.titulo}${vaga.nivel ? ` ${vaga.nivel}` : ''}` : tituloAtual,
    descricao: descricaoAtual.length >= 120
      ? descricaoAtual
      : `${nomeEmpresa ? `Na ${nomeEmpresa}, buscamos` : 'Buscamos'} uma pessoa para ${modelo.descricao}${tecnologiasAtuais.length ? `, utilizando ${tecnologiasAtuais.join(', ')}` : ''}. A oportunidade valoriza aprendizado contínuo, colaboração e entregas com clareza.`,
    requisitos: [...new Set([...requisitosAtuais, ...modelo.requisitos])].slice(0, 7).join('\n'),
    atividades: [...new Set([...atividadesAtuais, ...modelo.atividades])].slice(0, 6).join('\n'),
    tags: tagsCoerentes(vaga, modelo),
    observacoes,
    origem: 'fallback',
  }
}

function extrairJson(valor = '') {
  const limpo = String(valor).replace(/```(?:json)?|```/gi, '').trim()
  const inicio = limpo.indexOf('{')
  const fim = limpo.lastIndexOf('}')
  if (inicio < 0 || fim <= inicio) return null
  try {
    return JSON.parse(limpo.slice(inicio, fim + 1))
  } catch {
    return null
  }
}

function normalizarSugestao(sugestao = {}) {
  return {
    titulo: texto(sugestao.titulo, 100),
    descricao: texto(sugestao.descricao, 900),
    requisitos: linhas(sugestao.requisitos).join('\n').slice(0, 1200),
    atividades: linhas(sugestao.atividades).join('\n').slice(0, 1200),
    tags: linhas(sugestao.tags).map((tag) => normalizarTextoEmpresa(tag).replace(/\s+/g, '-')).slice(0, 10),
    observacoes: linhas(sugestao.observacoes).slice(0, 6),
    origem: 'ia',
  }
}

export function validarSugestaoVagaIA(sugestao, vaga = {}) {
  if (!sugestao || typeof sugestao !== 'object') return false
  const valor = normalizarSugestao(sugestao)
  if (!valor.titulo || !valor.descricao || !valor.requisitos || !valor.atividades) return false
  if (tituloEhGenerico(vaga.titulo) && tituloEhGenerico(valor.titulo)) return false
  if (linhas(valor.requisitos).length < 3 || linhas(valor.atividades).length < 2 || valor.tags.length < 2) return false
  const conteudo = normalizarTextoEmpresa([valor.titulo, valor.descricao, valor.requisitos, valor.atividades, ...valor.tags].join(' '))
  if (/ollama|modelo de linguagem|como ia|inteligencia artificial/.test(conteudo)) return false
  if (/r\$\s*\d|salario de|beneficios incluem|oferecemos vale|plano de saude/.test(conteudo)) return false
  if (!texto(vaga.localizacao) && /localizada em|escritorio em|sede em/.test(conteudo)) return false
  const tagsOriginais = linhas(vaga.tags).map(normalizarTextoEmpresa)
  if (tagsOriginais.some((tag) => !conteudo.includes(tag))) return false
  const tagsPermitidas = tagsCoerentes(vaga, MODELOS[familiaDaVaga(vaga)]).map(normalizarTextoEmpresa)
  if (valor.tags.some((tag) => !tagsPermitidas.includes(normalizarTextoEmpresa(tag)))) return false
  return true
}

async function chamarOllama(prompt, systemPrompt = SYSTEM_PROMPT) {
  if (!configIA.habilitada || configIA.provedor !== 'ollama' || !endpointEhLocal(configIA.endpoint)) return null
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), configIA.timeoutMs)
  try {
    const resposta = await fetch(configIA.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: configIA.modelo,
        stream: false,
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }],
        options: { temperature: 0.25, num_predict: 900 },
        format: 'json',
      }),
    })
    if (!resposta.ok) return null
    const dados = await resposta.json()
    return extrairJson(dados?.message?.content)
  } catch (erro) {
    if (import.meta.env.DEV && configIA.habilitada) console.warn('Mentor da empresa indisponível; usando sugestão padrão.', erro)
    return null
  } finally {
    window.clearTimeout(timeout)
  }
}

export async function melhorarVagaComIA({ vaga = {}, empresa = {}, analiseAtual = {} } = {}) {
  const fallback = gerarVagaFallback({ vaga, empresa, analiseAtual })
  const contextoSeguro = {
    empresa: { nome: texto(empresa.nome || empresa.nomeOficial, 80), setor: texto(empresa.setor, 80), descricaoCurta: texto(empresa.descricaoCurta, 180) },
    vaga: {
      titulo: texto(vaga.titulo, 120),
      descricao: texto(vaga.descricao, 1000),
      requisitos: linhas(vaga.requisitos),
      atividades: linhas(vaga.atividades),
      nivel: texto(vaga.nivel, 40),
      tags: linhas(vaga.tags),
    },
    diagnostico: { erros: analiseAtual.erros || [], alertas: analiseAtual.alertas || [], sugestoes: analiseAtual.sugestoes || [] },
  }
  const resposta = await chamarOllama(`Melhore somente os textos da vaga abaixo. Preserve tecnologias e fatos informados.
Não inclua salário, benefícios, modalidade ou localização nos textos.
Se algo não foi informado, registre apenas uma observação para a empresa revisar.
Contexto: ${JSON.stringify(contextoSeguro)}`)
  return validarSugestaoVagaIA(resposta, vaga) ? normalizarSugestao(resposta) : fallback
}

export function gerarSugestaoDescricaoVaga(contexto) {
  return melhorarVagaComIA(contexto).then((sugestao) => sugestao.descricao)
}

export function gerarSugestaoRequisitosVaga(contexto) {
  return melhorarVagaComIA(contexto).then((sugestao) => sugestao.requisitos)
}

export function gerarSugestaoAtividadesVaga(contexto) {
  return melhorarVagaComIA(contexto).then((sugestao) => sugestao.atividades)
}

export function sugerirTagsVaga(contexto) {
  return melhorarVagaComIA(contexto).then((sugestao) => sugestao.tags)
}

function fraseLista(itens = []) {
  return itens.filter(Boolean).join(', ')
}

function contextoEmpresa(empresa = {}) {
  return normalizarTextoEmpresa([
    empresa.nome,
    empresa.nomeOficial,
    empresa.setor,
    empresa.descricaoCurta,
    empresa.descricao,
    ...linhas(empresa.especialidades),
    ...linhas(empresa.stackDetalhes),
    ...linhas(empresa.beneficios),
  ].join(' '))
}

function especialidadesFallback(empresa = {}) {
  const existentes = linhas(empresa.especialidades)
  if (existentes.length) return existentes.slice(0, 8)
  const contexto = contextoEmpresa(empresa)
  const candidatas = [
    [/cloud|azure|aws|kubernetes|serverless/, 'Cloud'],
    [/inteligencia artificial|ia generativa|machine learning|copilot/, 'Inteligência Artificial'],
    [/dados|data|sql|dashboard/, 'Dados'],
    [/react|frontend|front-end|interfaces|web/, 'Desenvolvimento Web'],
    [/\.net|c#|java|node|backend|back-end|api/, 'Engenharia de Software'],
    [/seguranca|privacidade|security/, 'Segurança'],
    [/ux|design|figma|acessibilidade/, 'UX e Design'],
    [/automacao|rpa|devops|ci.?cd/, 'Automação'],
    [/suporte|atendimento|service desk/, 'Suporte Técnico'],
  ]
  const encontradas = candidatas.filter(([padrao]) => padrao.test(contexto)).map(([, rotulo]) => rotulo)
  return encontradas.length ? encontradas.slice(0, 6) : ['Soluções Digitais', 'Desenvolvimento de Software', 'Tecnologia']
}

function stackFallback(empresa = {}) {
  const stack = linhas(empresa.stackDetalhes)
  if (!stack.length) {
    return 'Desenvolvimento & Produto: tecnologias utilizadas na construção e evolução de soluções digitais.\nColaboração: versionamento, documentação e práticas de trabalho em equipe.'
  }
  if (stack.some((item) => item.includes(':'))) return stack.join('\n')

  const grupos = {
    'Software Engineering': [],
    'Cloud & Infra': [],
    'Dados & IA': [],
    'Produto & Design': [],
    Ferramentas: [],
  }
  stack.forEach((item) => {
    const valor = normalizarTextoEmpresa(item)
    if (/azure|aws|cloud|docker|kubernetes|linux|serverless|devops|ci.?cd/.test(valor)) grupos['Cloud & Infra'].push(item)
    else if (/python|sql|dados|data|power bi|machine learning|ia|copilot/.test(valor)) grupos['Dados & IA'].push(item)
    else if (/figma|design|ux|ui|produto/.test(valor)) grupos['Produto & Design'].push(item)
    else if (/react|typescript|javascript|node|java|\.net|c#|php|api|swift/.test(valor)) grupos['Software Engineering'].push(item)
    else grupos.Ferramentas.push(item)
  })
  return Object.entries(grupos).filter(([, itens]) => itens.length).map(([grupo, itens]) => `${grupo}: ${fraseLista(itens)}.`).join('\n')
}

export function gerarPerfilEmpresaFallback({ empresa = {}, analisePerfil = {} } = {}) {
  const nome = texto(empresa.nome || empresa.nomeOficial, 80) || 'Nossa empresa'
  const setor = texto(empresa.setor, 100)
  const especialidades = especialidadesFallback(empresa)
  const stack = linhas(empresa.stackDetalhes)
  const diferenciais = linhas(empresa.beneficios)
  const descricaoAtual = texto(empresa.descricao, 1400)
  const curtaAtual = texto(empresa.descricaoCurta, 220)
  const observacoes = []

  if (!curtaAtual) observacoes.push('Foi criada uma descrição curta para comunicar o propósito da empresa com mais rapidez.')
  if (!descricaoAtual) observacoes.push('Foi criada uma base institucional que deve ser revisada com a história e a cultura reais da empresa.')
  if (!stack.length) observacoes.push('A stack precisa ser revisada com as tecnologias realmente usadas no dia a dia.')
  if (!diferenciais.length) observacoes.push('Inclua apenas diferenciais que a empresa realmente oferece aos candidatos.')
  if (analisePerfil.score >= 85) observacoes.push('O perfil já está forte; a sugestão preserva os dados e faz apenas ajustes de comunicação.')

  return {
    descricaoCurta: curtaAtual || `${nome} cria soluções digitais com tecnologia, colaboração e foco em impacto para pessoas e negócios.`,
    descricaoEmpresa: descricaoAtual.length >= 140
      ? descricaoAtual
      : `${nome} é uma empresa${setor ? ` do setor de ${setor}` : ' de tecnologia'} focada em soluções digitais, desenvolvimento e inovação. Atua com times multidisciplinares para construir produtos e serviços que geram valor, usando competências como ${fraseLista(especialidades.slice(0, 4))}.`,
    especialidades,
    stackPratica: stackFallback(empresa),
    diferenciais: diferenciais.length
      ? diferenciais.join('\n')
      : 'Cultura de colaboração e aprendizado contínuo.\nContato com projetos práticos e tecnologias usadas pelo mercado.',
    observacoes,
    origem: 'fallback',
  }
}

function normalizarSugestaoPerfil(sugestao = {}) {
  return {
    descricaoCurta: texto(sugestao.descricaoCurta, 240),
    descricaoEmpresa: texto(sugestao.descricaoEmpresa, 1600),
    especialidades: linhas(sugestao.especialidades).slice(0, 10),
    stackPratica: linhas(sugestao.stackPratica).join('\n').slice(0, 1400),
    diferenciais: linhas(sugestao.diferenciais).join('\n').slice(0, 1200),
    observacoes: linhas(sugestao.observacoes).slice(0, 6),
    origem: 'ia',
  }
}

export function validarSugestaoPerfilEmpresaIA(sugestao, empresa = {}) {
  if (!sugestao || typeof sugestao !== 'object') return false
  const valor = normalizarSugestaoPerfil(sugestao)
  if (!valor.descricaoCurta || !valor.descricaoEmpresa || valor.especialidades.length < 2 || !valor.stackPratica || !valor.diferenciais) return false
  const conteudo = normalizarTextoEmpresa([
    valor.descricaoCurta,
    valor.descricaoEmpresa,
    ...valor.especialidades,
    valor.stackPratica,
    valor.diferenciais,
  ].join(' '))
  if (/ollama|modelo de linguagem|como ia|inteligencia artificial|chave de api/.test(conteudo)) return false
  if (/https?:\/\/|www\.|linkedin\.com|instagram\.com/.test(conteudo)) return false
  if (/premiada|premio|certificada|certificacao garantida|clientes como|atende clientes como/.test(conteudo)) return false
  if (/\d[\d.,]*\s*(funcionarios|colaboradores|pessoas no time)/.test(conteudo)) return false
  if (!texto(empresa.localizacao) && /sede em|localizada em|presenca em/.test(conteudo)) return false

  const especialidadesOriginais = linhas(empresa.especialidades).map(normalizarTextoEmpresa)
  if (especialidadesOriginais.length && especialidadesOriginais.some((item) => !conteudo.includes(item))) return false
  if (!linhas(empresa.beneficios).length && /plano de saude|vale refeicao|vale alimentacao|bonus|plr|home office|trabalho remoto|certificacoes pagas/.test(conteudo)) return false
  return true
}

export async function melhorarPerfilEmpresaComIA({ empresa = {}, analisePerfil = {} } = {}) {
  const fallback = gerarPerfilEmpresaFallback({ empresa, analisePerfil })
  const contextoSeguro = {
    empresa: {
      nome: texto(empresa.nome || empresa.nomeOficial, 100),
      setor: texto(empresa.setor, 100),
      descricaoCurta: texto(empresa.descricaoCurta, 300),
      descricaoEmpresa: texto(empresa.descricao, 1800),
      especialidades: linhas(empresa.especialidades),
      stackPratica: linhas(empresa.stackDetalhes),
      diferenciais: linhas(empresa.beneficios),
    },
    diagnostico: {
      score: analisePerfil.score,
      lacunas: analisePerfil.lacunas || [],
      pontosFortes: analisePerfil.pontosFortes || [],
    },
  }
  const resposta = await chamarOllama(`Melhore apenas os textos públicos do perfil abaixo.
Preserve todos os fatos, tecnologias, especialidades e diferenciais informados.
Não inclua links, localidades, tamanho, clientes, certificações ou benefícios que não estejam no contexto.
Se faltar informação, registre uma observação para a empresa revisar.
Contexto: ${JSON.stringify(contextoSeguro)}`, SYSTEM_PROMPT_PERFIL)
  return validarSugestaoPerfilEmpresaIA(resposta, empresa) ? normalizarSugestaoPerfil(resposta) : fallback
}

export function gerarDescricaoCurtaEmpresa(contexto) {
  return melhorarPerfilEmpresaComIA(contexto).then((sugestao) => sugestao.descricaoCurta)
}

export function gerarDescricaoCompletaEmpresa(contexto) {
  return melhorarPerfilEmpresaComIA(contexto).then((sugestao) => sugestao.descricaoEmpresa)
}

export function organizarStackEmpresa(contexto) {
  return melhorarPerfilEmpresaComIA(contexto).then((sugestao) => sugestao.stackPratica)
}

export function melhorarDiferenciaisEmpresa(contexto) {
  return melhorarPerfilEmpresaComIA(contexto).then((sugestao) => sugestao.diferenciais)
}

export function sugerirEspecialidadesEmpresa(contexto) {
  return melhorarPerfilEmpresaComIA(contexto).then((sugestao) => sugestao.especialidades)
}

export function validarRespostaDossieIA(resposta) {
  if (!resposta || typeof resposta !== 'object') return false
  const resumo = texto(resposta.resumo, 700)
  const recomendacaoInterna = texto(resposta.recomendacaoInterna, 700)
  const conteudo = normalizarTextoEmpresa(`${resumo} ${recomendacaoInterna}`)
  if (resumo.length < 60 || recomendacaoInterna.length < 60) return false
  if (/ollama|api|modelo de linguagem|como ia|inteligencia artificial/.test(conteudo)) return false
  if (/contrate|aprove|rejeite|candidato ruim|nao serve|incapaz/.test(conteudo)) return false
  return true
}

export async function resumirDossieCandidatoComIA({ candidato = {}, vaga = {}, empresa = {}, analiseCompatibilidade = {} } = {}) {
  const fallback = {
    resumo: analiseCompatibilidade.resumo || '',
    recomendacaoInterna: analiseCompatibilidade.recomendacaoInterna || analiseCompatibilidade.recomendacao || '',
    origem: 'fallback',
  }
  const contextoSeguro = {
    candidato: {
      primeiroNome: texto(candidato.nome, 80).split(' ')[0],
      cargo: texto(candidato.cargo, 100),
      tecnologias: linhas(candidato.tecnologias),
      cursos: linhas(candidato.cursos).slice(0, 8),
    },
    vaga: {
      titulo: texto(vaga.titulo, 120),
      nivel: texto(vaga.nivel, 40),
      modalidade: texto(vaga.modalidade, 40),
      tecnologias: linhas(vaga.tags),
    },
    empresa: { nome: texto(empresa.nome || empresa.nomeOficial, 100) },
    analiseCalculada: {
      nivel: analiseCompatibilidade.nivel,
      compatibilidades: analiseCompatibilidade.compatibilidades || [],
      lacunas: analiseCompatibilidade.lacunas || [],
      evidencias: analiseCompatibilidade.evidencias || [],
      riscos: analiseCompatibilidade.riscos || [],
    },
  }
  const resposta = await chamarOllama(`Redija um resumo objetivo e uma recomendação interna cautelosa para o dossiê.
Não altere a classificação nem as listas calculadas.
Retorne JSON com resumo e recomendacaoInterna.
Contexto: ${JSON.stringify(contextoSeguro)}`, SYSTEM_PROMPT_CANDIDATURA)
  return validarRespostaDossieIA(resposta)
    ? { resumo: texto(resposta.resumo, 700), recomendacaoInterna: texto(resposta.recomendacaoInterna, 700), origem: 'ia' }
    : fallback
}

export async function gerarFeedbackCandidatoComIA({ candidato = {}, vaga = {}, status = 'rejeitado', motivo = '', analiseCompatibilidade = {} } = {}) {
  const fallback = gerarFeedbackCandidatoFallback({ candidato, vaga, status, motivo, analiseCompatibilidade })
  const contextoSeguro = {
    candidato: { primeiroNome: texto(candidato.nome, 80).split(' ')[0] },
    vaga: { titulo: texto(vaga.titulo, 120) },
    status: texto(status, 40),
    motivoInterno: texto(motivo, 180),
    compatibilidades: (analiseCompatibilidade.compatibilidades || []).slice(0, 5),
    lacunas: (analiseCompatibilidade.lacunas || []).slice(0, 5),
  }
  const resposta = await chamarOllama(`Crie um feedback curto, educado e revisável para a pessoa candidata.
Não exponha score, não prometa contratação e não mencione dados internos.
Retorne JSON com feedback.
Contexto: ${JSON.stringify(contextoSeguro)}`, SYSTEM_PROMPT_CANDIDATURA)
  const feedback = texto(resposta?.feedback, 900)
  return validarFeedbackCandidato(feedback) ? feedback : fallback
}
