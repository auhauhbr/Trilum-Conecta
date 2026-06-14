const PERFIS = {
  devops: {
    area: 'DevOps',
    titulo: 'Estudante de DevOps em formação',
    tecnologias: ['Linux', 'Docker', 'Cloud', 'CI/CD', 'Git/GitHub', 'HTTP/API REST', 'SQL'],
    resumo:
      'Estudante de tecnologia com foco em DevOps, Docker, Linux, Cloud e APIs. Busco minha primeira oportunidade para aplicar conhecimentos em infraestrutura, automação e deploy de aplicações.',
    objetivo:
      'Conquistar uma oportunidade em DevOps ou infraestrutura, aplicando conhecimentos em Linux, Docker, Cloud e automação.',
    titulos: ['Estudante de DevOps em formação', 'Desenvolvedor em transição para DevOps', 'Estudante de Cloud e Infraestrutura'],
  },
  frontend: {
    area: 'Front-end',
    titulo: 'Desenvolvedor Front-end em formação',
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'Git/GitHub', 'React'],
    resumo:
      'Estudante de tecnologia com foco em HTML, CSS, JavaScript e interfaces web. Busco minha primeira oportunidade para construir aplicações responsivas e acessíveis.',
    objetivo: 'Conquistar uma oportunidade em Front-end, aplicando conhecimentos em interfaces web e projetos responsivos.',
    titulos: ['Desenvolvedor Front-end em formação', 'Estudante de Front-end com foco em interfaces web'],
  },
  backend: {
    area: 'Back-end',
    titulo: 'Desenvolvedor Back-end em formação',
    tecnologias: ['APIs REST', 'SQL', 'Git/GitHub', 'Segurança'],
    resumo:
      'Estudante de tecnologia com foco em APIs, banco de dados e boas práticas de desenvolvimento. Busco minha primeira oportunidade para atuar na construção de sistemas e serviços.',
    objetivo: 'Conquistar uma oportunidade em Back-end, aplicando conhecimentos em APIs, banco de dados e desenvolvimento de serviços.',
    titulos: ['Desenvolvedor Back-end em formação', 'Estudante de Back-end com foco em APIs'],
  },
  dados: {
    area: 'Dados',
    titulo: 'Estudante de Dados em formação',
    tecnologias: ['Python', 'SQL', 'PostgreSQL', 'Power BI'],
    resumo:
      'Estudante de tecnologia com foco em Python, SQL, análise de dados e visualização. Busco minha primeira oportunidade para transformar dados em informações úteis para decisão.',
    objetivo: 'Conquistar uma oportunidade em Dados, aplicando conhecimentos em Python, SQL, análise e visualização.',
    titulos: ['Estudante de Dados em formação', 'Analista de Dados em formação'],
  },
  qa: {
    area: 'QA',
    titulo: 'Analista de QA em formação',
    tecnologias: ['Testes manuais', 'APIs REST', 'Cypress', 'Playwright', 'Git/GitHub'],
    resumo:
      'Estudante de tecnologia com foco em testes manuais, automação, APIs e qualidade de software. Busco minha primeira oportunidade para ajudar equipes a entregar sistemas mais confiáveis.',
    objetivo: 'Conquistar uma oportunidade em QA, aplicando conhecimentos em testes manuais, automação e APIs.',
    titulos: ['Analista de QA em formação', 'Estudante de Qualidade de Software'],
  },
}

const CAMPOS = {
  titulo: {
    titulo: 'Título profissional',
    resumo: 'O título profissional mostra como você quer ser visto. Use algo claro e alinhado à sua trilha.',
    detalhe: (perfil) => `Evite usar apenas o nome da área. Para seu perfil, uma opção clara é: “${perfil.titulo}”.`,
  },
  bio: {
    titulo: 'Resumo profissional',
    resumo: 'Seu resumo deve apresentar área, objetivo, tecnologias principais e a prática que você está construindo.',
    detalhe: (perfil) => `Você pode partir deste exemplo e ajustar com suas palavras: “${perfil.resumo}”`,
  },
  tecnologias: {
    titulo: 'Tecnologias do perfil',
    resumo: 'Destaque tecnologias coerentes com seu objetivo atual e que você realmente estuda ou pratica.',
    detalhe: (perfil) => `Para ${perfil.area}, comece por: ${perfil.tecnologias.join(', ')}. Evite misturar stacks sem relação apenas para aumentar a lista.`,
  },
  tecnologiasComNivel: {
    titulo: 'Tecnologias com nível',
    resumo: 'Informe seu nível com honestidade para mostrar evolução sem parecer genérico.',
    detalhe: (perfil) => `Use uma tecnologia por linha, por exemplo: ${perfil.tecnologias.slice(0, 4).map((item) => `${item} - estudando`).join('; ')}.`,
  },
  linkedin: {
    titulo: 'LinkedIn',
    resumo: 'Coloque o link do seu perfil do LinkedIn para recrutadores encontrarem sua trajetória.',
    detalhe: () => 'Use o endereço do seu perfil, por exemplo: https://linkedin.com/in/seu-nome',
  },
  github: {
    titulo: 'GitHub',
    resumo: 'Coloque o link do seu perfil no GitHub, não apenas o link de um projeto isolado.',
    detalhe: () => 'Use o endereço do seu perfil, por exemplo: https://github.com/seu-usuario. Seus projetos podem apontar para repositórios específicos.',
  },
  portfolio: {
    titulo: 'Portfólio',
    resumo: 'Seu portfólio pode ser um site simples que reúne projetos, tecnologias e formas de contato.',
    detalhe: () => 'Priorize poucos projetos bem explicados. Mostre objetivo, tecnologias, imagens e links para código ou demonstração.',
  },
  projetos: {
    titulo: 'Projetos pessoais',
    resumo: 'Para a primeira vaga, projetos são uma das evidências mais importantes da sua prática.',
    detalhe: () => 'Em cada projeto, informe nome, problema resolvido, tecnologias usadas, o que você construiu e um link do GitHub ou deploy.',
  },
  experiencias: {
    titulo: 'Experiências',
    resumo: 'Descreva experiências reais e destaque atividades que demonstram responsabilidade, comunicação ou prática técnica.',
    detalhe: () => 'Não invente experiência. Informe função, organização, período e atividades relevantes, mesmo que a experiência não seja de tecnologia.',
  },
  formacoes: {
    titulo: 'Formação',
    resumo: 'Informe curso, instituição, situação atual e período quando souber.',
    detalhe: () => 'Exemplo: Análise e Desenvolvimento de Sistemas - instituição - cursando - conclusão prevista em 2027.',
  },
  certificadosExternos: {
    titulo: 'Certificados externos',
    resumo: 'Use certificados para mostrar evolução, mas mantenha projetos como evidência principal da prática.',
    detalhe: () => 'Informe nome do curso, instituição, ano, carga horária e link quando existir.',
  },
  objetivoCurriculo: {
    titulo: 'Objetivo do currículo',
    resumo: 'O objetivo profissional deve dizer com clareza qual oportunidade você busca.',
    detalhe: (perfil) => `Uma base coerente com seu perfil é: “${perfil.objetivo}”`,
  },
  resumoCurriculo: {
    titulo: 'Resumo do currículo',
    resumo: 'O resumo do currículo é uma síntese curta do seu foco, tecnologias e projetos, não uma biografia longa.',
    detalhe: (perfil) => `Você pode adaptar este exemplo: “${perfil.resumo}”`,
  },
}

function perfilDaArea(respostasWizard = {}) {
  const area = String(respostasWizard.areaDesejada || respostasWizard.focoCarreira || '').toLowerCase()
  if (area.includes('devops') || area.includes('cloud')) return PERFIS.devops
  if (area.includes('front')) return PERFIS.frontend
  if (area.includes('back') || area.includes('api')) return PERFIS.backend
  if (area.includes('dado') || area.includes('data')) return PERFIS.dados
  if (area.includes('qa') || area.includes('teste')) return PERFIS.qa
  return {
    area: 'Tecnologia',
    titulo: 'Estudante de tecnologia em formação',
    tecnologias: ['Git/GitHub', 'Lógica de programação', 'Projetos'],
    resumo: 'Estudante de tecnologia em formação, construindo conhecimentos e projetos para conquistar a primeira oportunidade na área.',
    objetivo: 'Conquistar uma primeira oportunidade em tecnologia, aplicando estudos e projetos práticos.',
    titulos: ['Estudante de tecnologia em formação'],
  }
}

export function criarOrientacaoCampoMentor(campoFocado, respostasWizard = {}) {
  const campo = CAMPOS[campoFocado]
  if (!campo) return null
  const perfil = perfilDaArea(respostasWizard)

  return {
    id: `contexto-campo-${campoFocado}`,
    modo: campoFocado.toLowerCase().includes('curriculo') ? 'curriculo' : 'campo',
    pagina: 'perfil',
    secao: campoFocado,
    prioridade: 1,
    titulo: campo.titulo,
    resumo: campo.resumo,
    detalhe: campo.detalhe(perfil),
    exemplos:
      campoFocado === 'titulo'
        ? perfil.titulos || [perfil.titulo]
        : campoFocado === 'bio' || campoFocado === 'resumoCurriculo'
          ? [perfil.resumo]
          : campoFocado === 'objetivoCurriculo'
            ? [perfil.objetivo]
            : campoFocado === 'tecnologias'
              ? [perfil.tecnologias.join(', ')]
              : campoFocado === 'tecnologiasComNivel'
                ? [perfil.tecnologias.map((item) => `${item} - estudando`).join('\n')]
                : campoFocado === 'projetos'
                  ? ['Nome do projeto:\nTecnologias:\nO que faz:\nProblema que resolve:\nLink do GitHub:\nLink do deploy:']
                  : campoFocado === 'github'
                    ? ['https://github.com/seu-usuario']
                    : campoFocado === 'linkedin'
                      ? ['https://linkedin.com/in/seu-nome']
                : [],
    acao:
      campoFocado === 'titulo'
        ? { label: 'Usar sugestão', tipo: 'aplicar-campo', campo: 'titulo', valor: perfil.titulo }
        : campoFocado === 'bio'
          ? { label: 'Usar sugestão', tipo: 'aplicar-campo', campo: 'bio', valor: perfil.resumo }
          : campoFocado === 'resumoCurriculo'
            ? { label: 'Usar sugestão', tipo: 'aplicar-curriculo', campo: 'resumo', valor: perfil.resumo }
            : campoFocado === 'objetivoCurriculo'
              ? { label: 'Usar sugestão', tipo: 'aplicar-curriculo', campo: 'objetivo', valor: perfil.objetivo }
              : campoFocado === 'tecnologias'
                ? { label: 'Usar sugestão', tipo: 'aplicar-campo', campo: 'tecnologias', valor: perfil.tecnologias.join(', ') }
                : campoFocado === 'projetos'
                  ? {
                      label: 'Usar modelo',
                      tipo: 'aplicar-campo',
                      campo: 'projetos',
                      valor: 'Nome do projeto:\nTecnologias:\nO que faz:\nProblema que resolve:\nLink do GitHub:\nLink do deploy:',
                    }
                : null,
  }
}

export function analisarForcaPerfil({
  usuarioAtual = {},
  perfilProfissional = {},
  respostasWizard = {},
  curriculo = {},
} = {}) {
  let score = 0
  const pontosFortes = []
  const lacunas = []

  if (preenchido(respostasWizard.areaDesejada)) {
    score += 5
    pontosFortes.push('Área profissional definida')
  }
  if (preenchido(usuarioAtual.titulo) && String(usuarioAtual.titulo).length > 8) {
    score += 10
    pontosFortes.push('Título profissional preenchido')
  } else lacunas.push('Título profissional pouco claro')
  if (preenchido(usuarioAtual.bio) && String(usuarioAtual.bio).length >= 80) {
    score += 15
    pontosFortes.push('Resumo profissional consistente')
  } else lacunas.push('Resumo profissional vazio ou muito curto')
  if (preenchido(perfilProfissional.github)) score += 15
  else lacunas.push('GitHub não informado')
  if (preenchido(perfilProfissional.linkedin)) score += 10
  else lacunas.push('LinkedIn não informado')
  if (preenchido(perfilProfissional.portfolio)) score += 10
  else lacunas.push('Portfólio não informado')
  if (preenchido(perfilProfissional.projetos)) {
    score += 20
    pontosFortes.push('Projeto prático apresentado')
  } else lacunas.push('Nenhum projeto cadastrado')
  if (preenchido(usuarioAtual.tecnologias) || preenchido(perfilProfissional.tecnologiasComNivel)) score += 15
  else lacunas.push('Tecnologias ainda não evidenciadas')
  if (preenchido(curriculo.objetivo) && preenchido(curriculo.resumo || usuarioAtual.bio)) score += 15
  else lacunas.push('Currículo ainda precisa de objetivo e resumo')

  const proxima = analisarLacunasAluno({ usuarioAtual, perfilProfissional, curriculo })[0]
  return {
    score: Math.min(score, 100),
    nivel: score >= 80 ? 'forte para apresentar' : score >= 50 ? 'em preparação' : 'construindo a base',
    pontosFortes,
    lacunas,
    proximaMelhorAcao: proxima
      ? { titulo: proxima.resumo, motivo: proxima.detalhe, acao: proxima.acao }
      : { titulo: 'Revisar seu perfil', motivo: 'Seu perfil já possui uma boa base.', acao: { label: 'Revisar perfil', to: '#/aluno/perfil' } },
  }
}

export function criarOrientacaoPerfilPublico(contexto = {}) {
  const forca = analisarForcaPerfil(contexto)
  return {
    id: 'perfil-publico-forca',
    modo: 'perfil',
    titulo: 'Força do seu perfil profissional',
    resumo: `Seu perfil está ${forca.nivel}. ${forca.proximaMelhorAcao.titulo}`,
    detalhe: `Esta é a visão que empresas terão de você. Sua força atual é ${forca.score}%. ${
      forca.pontosFortes.length ? `Pontos fortes: ${forca.pontosFortes.slice(0, 3).join(', ')}.` : ''
    } ${forca.lacunas.length ? `Prioridades: ${forca.lacunas.slice(0, 3).join(', ')}.` : ''}`,
    sugestoes: forca.lacunas.slice(0, 5),
    acao: forca.proximaMelhorAcao.acao,
  }
}

function termosDoPerfil(perfil) {
  return perfil.tecnologias.map((item) => item.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
}

export function criarOrientacaoCatalogo({ busca = '', categoria = 'todas', tecnologia = 'todas', nivel = 'todos', total = 0, respostasWizard = {} } = {}) {
  const perfil = perfilDaArea(respostasWizard)
  const filtro = tecnologia !== 'todas' ? tecnologia : categoria !== 'todas' ? categoria : busca.trim()
  const filtrosAtivos = Boolean(busca.trim() || categoria !== 'todas' || tecnologia !== 'todas' || nivel !== 'todos')

  if (filtrosAtivos && total === 0) {
    return {
      id: 'contexto-catalogo-vazio',
      titulo: 'Ajuste sua busca',
      resumo: 'Não encontrei cursos com essa combinação. Tente limpar um filtro ou buscar uma tecnologia principal da sua trilha.',
      detalhe: `Para seu perfil de ${perfil.area}, tente buscar por ${perfil.tecnologias.slice(0, 5).join(', ')}.`,
    }
  }

  if (filtro) {
    const normalizado = filtro.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const alinhado = termosDoPerfil(perfil).some((termo) => termo.includes(normalizado) || normalizado.includes(termo))
    return {
      id: `contexto-catalogo-filtro-${normalizado}`,
      titulo: alinhado ? 'Filtro alinhado à sua jornada' : 'Exploração fora do foco principal',
      resumo: alinhado
        ? `Boa escolha. O filtro “${filtro}” está alinhado com sua jornada atual de ${perfil.area}.`
        : `Você pode explorar “${filtro}”, mas esse conteúdo não é prioridade para sua jornada atual de ${perfil.area}.`,
      detalhe: alinhado
        ? `Continue comparando nível e conteúdo antes de começar. Para não dispersar, escolha um curso por vez e conecte-o à sua trilha principal.`
        : `Use esse conteúdo como complemento ou exploração. Para avançar no objetivo atual, priorize ${perfil.tecnologias.slice(0, 5).join(', ')}.`,
    }
  }

  return null
}

function preenchido(valor) {
  if (Array.isArray(valor)) return valor.length > 0
  return Boolean(String(valor || '').trim())
}

function progressoIniciado(progresso = {}) {
  return Object.values(progresso || {}).some(Boolean)
}

export function analisarLacunasAluno({
  usuarioAtual = {},
  perfilProfissional = {},
  curriculo = {},
  progresso = {},
} = {}) {
  const lacunas = [
    !preenchido(usuarioAtual.titulo) && {
      id: 'titulo',
      gravidade: 2,
      resumo: 'Seu perfil ainda precisa de um título profissional claro.',
      detalhe: 'Um título alinhado à área ajuda empresas a entenderem rapidamente qual oportunidade você busca.',
      acao: { label: 'Editar perfil', to: '#/aluno/perfil' },
    },
    (!preenchido(usuarioAtual.bio) || String(usuarioAtual.bio).length < 60) && {
      id: 'bio',
      gravidade: 2,
      resumo: 'Seu resumo profissional pode explicar melhor seu foco e objetivo.',
      detalhe: 'Apresente sua área, tecnologias principais, objetivo e a prática que você está construindo.',
      acao: { label: 'Melhorar resumo', to: '#/aluno/perfil' },
    },
    !preenchido(perfilProfissional.github) && {
      id: 'github',
      gravidade: 3,
      resumo: 'Adicione o link do seu GitHub ao perfil para mostrar projetos e evolução prática.',
      detalhe: 'Seu perfil ainda não possui um link do GitHub. Para primeira vaga técnica, ele ajuda recrutadores a enxergarem evidências além dos cursos.',
      acao: { label: 'Adicionar GitHub', to: '#/aluno/perfil' },
    },
    !preenchido(perfilProfissional.linkedin) && {
      id: 'linkedin',
      gravidade: 1,
      resumo: 'Adicione o link do LinkedIn ao perfil para facilitar o contato profissional.',
      detalhe: 'Seu perfil ainda não possui um link do LinkedIn. Ele ajuda recrutadores a acompanharem sua trajetória.',
      acao: { label: 'Adicionar LinkedIn', to: '#/aluno/perfil' },
    },
    !preenchido(perfilProfissional.projetos) && {
      id: 'projetos',
      gravidade: 3,
      resumo: 'Adicione pelo menos um projeto prático ao seu perfil.',
      detalhe: 'Seu perfil ainda não apresenta projetos. Sem experiência formal, eles são a principal evidência de que você consegue aplicar o que estuda.',
      acao: { label: 'Adicionar projeto', to: '#/aluno/perfil' },
    },
    !preenchido(curriculo.objetivo) && {
      id: 'curriculo-objetivo',
      gravidade: 2,
      resumo: 'Seu currículo precisa de um objetivo profissional.',
      detalhe: 'O objetivo informa qual vaga você busca e ajuda a manter o restante do currículo coerente.',
      acao: { label: 'Revisar currículo', to: '#/aluno/perfil' },
    },
    !progressoIniciado(progresso) && {
      id: 'progresso',
      gravidade: 2,
      resumo: 'Comece o primeiro curso da sua jornada principal.',
      detalhe: 'Marcar aulas concluídas ajuda a transformar sua recomendação em progresso visível.',
      acao: { label: 'Ver cursos', to: '#/aluno/cursos' },
    },
  ].filter(Boolean)

  return lacunas.sort((a, b) => b.gravidade - a.gravidade)
}

export function calcularProntidaoCandidatura({
  usuarioAtual = {},
  perfilProfissional = {},
  curriculo = {},
  progresso = {},
} = {}) {
  let score = 0
  if (preenchido(usuarioAtual.titulo) && preenchido(usuarioAtual.bio)) score += 15
  if (preenchido(perfilProfissional.github)) score += 15
  if (preenchido(perfilProfissional.linkedin)) score += 10
  if (preenchido(perfilProfissional.projetos)) score += 20
  if (preenchido(curriculo.objetivo) && preenchido(curriculo.resumo || usuarioAtual.bio)) score += 15
  if (progressoIniciado(progresso)) score += 15
  if (preenchido(usuarioAtual.tecnologias) || preenchido(perfilProfissional.tecnologiasComNivel)) score += 10

  const lacunas = analisarLacunasAluno({ usuarioAtual, perfilProfissional, curriculo, progresso })
  return {
    score,
    nivel: score >= 80 ? 'pronto para avançar' : score >= 50 ? 'em preparação' : 'construindo a base',
    principaisLacunas: lacunas.slice(0, 3),
  }
}

export function calcularProximaMelhorAcao(contexto = {}) {
  const lacunas = analisarLacunasAluno(contexto)
  if (lacunas.length) {
    const lacuna = lacunas[0]
    return {
      tipo: 'perfil',
      prioridade: lacuna.gravidade,
      titulo: lacuna.resumo,
      motivo: lacuna.detalhe,
      acao: lacuna.acao,
    }
  }

  const curso = contexto.cursosRecomendados?.[0]
  if (curso) {
    return {
      tipo: 'curso',
      prioridade: 1,
      titulo: `Começar ${curso.titulo}`,
      motivo: curso.motivo || 'Este é o próximo passo prático priorizado para sua jornada.',
      acao: { label: 'Ver curso', to: `#/aluno/cursos/${curso.id}` },
    }
  }

  return {
    tipo: 'guia',
    prioridade: 1,
    titulo: 'Revisar sua jornada',
    motivo: 'Confira sua trilha principal e escolha um próximo passo prático.',
    acao: { label: 'Ver painel', to: '#/aluno/painel' },
  }
}

export function criarMissaoAtual({ usuarioAtual = {}, respostasWizard = {}, trilhasRecomendadas = [], cursosRecomendados = [], ...contexto } = {}) {
  const perfil = perfilDaArea(respostasWizard)
  const proxima = calcularProximaMelhorAcao({ usuarioAtual, respostasWizard, cursosRecomendados, ...contexto })
  const passos = [
    trilhasRecomendadas[0]?.titulo && `Avançar em ${trilhasRecomendadas[0].titulo}`,
    cursosRecomendados[0]?.titulo && `Concluir ${cursosRecomendados[0].titulo}`,
    ...analisarLacunasAluno({ usuarioAtual, respostasWizard, ...contexto }).slice(0, 3).map((lacuna) => lacuna.resumo),
  ].filter(Boolean)

  return {
    titulo: `Preparar ${usuarioAtual.nome?.split(' ')[0] || 'você'} para uma oportunidade em ${perfil.area}`,
    passos,
    proxima,
  }
}

export function criarOrientacaoPainel(contexto = {}) {
  const missao = criarMissaoAtual(contexto)
  const prontidao = calcularProntidaoCandidatura(contexto)
  const trilha = contexto.trilhasRecomendadas?.[0]
  const apoios = contexto.trilhasRecomendadas?.slice(1, 4).map((item) => item.titulo).join(', ')

  return {
    id: 'painel-proxima-melhor-acao',
    modo: 'missao',
    titulo: 'Sua próxima melhor ação',
    resumo: missao.proxima.titulo,
    detalhe: `${missao.proxima.motivo}\n\nSua missão atual é ${missao.titulo.toLowerCase()}. ${
      trilha ? `${trilha.titulo} é o centro da jornada${apoios ? `, com apoio de ${apoios}` : ''}.` : ''
    }\n\nProntidão para candidatura: ${prontidao.score}% (${prontidao.nivel}).`,
    sugestoes: missao.passos,
    acao: missao.proxima.acao,
  }
}

export function criarOrientacaoConteudo({ conteudo, respostasWizard = {}, trilhasRecomendadas = [], cursosRecomendados = [] } = {}) {
  if (!conteudo) return null
  const ehTrilha = conteudo.tipoConteudo === 'trilha'
  const principal = ehTrilha
    ? trilhasRecomendadas[0]?.id === conteudo.id
    : cursosRecomendados[0]?.id === conteudo.id
  const relacionado = ehTrilha
    ? trilhasRecomendadas.some((item) => item.id === conteudo.id)
    : cursosRecomendados.some((item) => item.id === conteudo.id)
  const perfil = perfilDaArea(respostasWizard)
  const primeiraAula = conteudo.modulos?.[0]?.aulas?.[0]

  return {
    id: `conteudo-${conteudo.id}`,
    modo: ehTrilha ? 'trilha' : 'curso',
    titulo: principal ? 'Seu caminho principal' : relacionado ? 'Conteúdo recomendado' : 'Conteúdo em exploração',
    resumo: principal
      ? `${conteudo.titulo} é uma prioridade da sua jornada atual.`
      : relacionado
        ? `${conteudo.titulo} apoia habilidades importantes para sua jornada de ${perfil.area}.`
        : `${conteudo.titulo} pode ser explorado, mas não substitui sua prioridade atual em ${perfil.area}.`,
    detalhe: ehTrilha
      ? `Siga a ordem proposta para não pular fundamentos. Os cursos principais formam a jornada; pré-requisitos e complementos reforçam lacunas específicas.`
      : `Conclua os módulos principais antes de trocar de tecnologia. Depois, volte à sua trilha para escolher o próximo passo coerente.`,
    acao: primeiraAula
      ? { label: principal || relacionado ? 'Começar conteúdo' : 'Explorar primeira aula', to: `#/aluno/cursos/${conteudo.id}/aula/${primeiraAula.id}` }
      : null,
  }
}
