import jeffersonSantosPerfil from '../ativos/imagens/jefferson-santos-perfil.jpg'
import macacoPhpCapa from '../ativos/imagens/macacophp.webp'
import rafaelSouzaPerfil from '../ativos/imagens/rafael-souza-perfil.webp'

export const vagas = [
  {
    id: 'vaga-1',
    empresaId: 'empresa-1',
    titulo: 'Desenvolvedor Front-end Júnior',
    nivel: 'Júnior',
    tipo: 'CLT',
    modalidade: 'Híbrido',
    localizacao: 'Recife, PE',
    salario: 'R$ 2.800 - R$ 3.600',
    status: 'ativa',
    publicadaEm: '2026-05-26',
    candidatos: 2,
    tags: ['react', 'typescript', 'frontend', 'fluent-ui', 'azure', 'acessibilidade'],
    descricao:
      'No time de Front-end da Avanade, seu desafio será transformar designs complexos em interfaces fluidas, acessíveis e performáticas dentro do ecossistema Microsoft.',
    requisitos: [
      'HTML5, CSS3, SASS ou Styled Components e JavaScript moderno',
      'Conhecimento em TypeScript para projetos de escala',
      'Noções sólidas de React e gerenciamento de estado',
      'Git/GitHub e familiaridade com ambientes de nuvem',
      'Boa comunicação para atuar com times multidisciplinares',
    ],
    atividades: [
      'Criar interfaces responsivas com React e Fluent UI',
      'Integrar APIs RESTful e fluxos de dados com Azure Functions',
      'Participar de code reviews e apoiar boas práticas de acessibilidade',
      'Atuar em squads globais usando metodologias ágeis e Azure DevOps',
    ],
  },
  {
    id: 'vaga-6',
    empresaId: 'empresa-1',
    titulo: 'Analista de Suporte Técnico Júnior',
    nivel: 'Júnior',
    tipo: 'CLT',
    modalidade: 'Presencial',
    localizacao: 'Recife, PE',
    salario: 'R$ 2.200 - R$ 2.900',
    status: 'ativa',
    publicadaEm: '2026-05-26',
    candidatos: 1,
    tags: ['suporte', 'microsoft-365', 'azure', 'redes', 'itil'],
    descricao:
      'Apoiar usuários internos e equipes de projeto em rotinas de suporte, ambientes Microsoft 365, chamados técnicos e documentação de soluções.',
    requisitos: [
      'Informática intermediária e boa comunicação com usuários',
      'Noções de Windows, redes e Microsoft 365',
      'Organização para registrar chamados e documentar soluções',
      'Interesse por Azure Fundamentals e boas práticas de atendimento',
      'Vontade de aprender com times técnicos em projetos reais',
    ],
    atividades: [
      'Atender chamados de primeiro nível e orientar usuários',
      'Apoiar configuração de acessos, estações e ferramentas Microsoft',
      'Documentar problemas recorrentes e soluções aplicadas',
      'Acompanhar a equipe em rotinas de suporte e melhoria contínua',
    ],
  },
  {
    id: 'vaga-7',
    empresaId: 'empresa-1',
    titulo: 'Desenvolvedor Back-end .NET Júnior',
    nivel: 'Júnior',
    tipo: 'CLT',
    modalidade: 'Remoto',
    localizacao: 'Brasil',
    salario: 'R$ 3.000 - R$ 4.200',
    status: 'encerrada',
    publicadaEm: '2026-04-02',
    candidatos: 0,
    tags: ['dotnet', 'csharp', 'azure', 'api-rest', 'sql'],
    descricao:
      'Vaga antiga para atuar em APIs e integrações no ecossistema Microsoft. Ela permanece no gerenciamento, mas não entra nas vagas recentes do painel.',
    requisitos: [
      'Noções de C#, .NET e APIs REST',
      'Conhecimento básico de SQL',
      'Interesse por Azure e boas práticas de versionamento',
    ],
    atividades: [
      'Apoiar a manutenção de APIs internas',
      'Documentar integrações e corrigir pequenos bugs',
      'Participar de rituais ágeis com o time de engenharia',
    ],
  },
  {
    id: 'vaga-microsoft-cloud-architect',
    empresaId: 'empresa-microsoft',
    titulo: 'Cloud Solutions Architect (Azure)',
    nivel: 'Senior',
    tipo: 'CLT',
    modalidade: 'Remoto',
    localizacao: 'Brasil',
    salario: 'R$ 18.000 - R$ 25.000',
    status: 'ativa',
    publicadaEm: '2026-05-30',
    candidatos: 0,
    tags: ['azure', 'cloud', 'arquitetura', 'devops', 'terraform'],
    descricao:
      'Desenhar arquiteturas escalaveis na nuvem Azure para grandes clientes enterprise, focando em seguranca e performance.',
    requisitos: [
      'Experiencia solida com Azure',
      'Conhecimento em Infrastructure as Code (IaC)',
      'Ingles fluente para reunioes globais',
    ],
    atividades: [
      'Definir arquiteturas cloud para clientes enterprise',
      'Apoiar decisoes de seguranca, performance e escalabilidade',
      'Conduzir discussoes tecnicas com squads locais e globais',
    ],
  },
  {
    id: 'vaga-microsoft-fullstack-dotnet-react',
    empresaId: 'empresa-microsoft',
    titulo: 'Desenvolvedor Full-Stack (.NET & React)',
    nivel: 'Pleno',
    tipo: 'CLT',
    modalidade: 'Hibrido',
    localizacao: 'Sao Paulo, SP',
    salario: 'R$ 9.500 - R$ 13.000',
    status: 'ativa',
    publicadaEm: '2026-05-29',
    candidatos: 0,
    tags: ['dotnet', 'csharp', 'react', 'typescript', 'sql-server'],
    descricao:
      'Atuar no desenvolvimento de ferramentas internas que utilizam o ecossistema Office 365 e integracoes com bancos de dados complexos.',
    requisitos: [
      'Dominio de C#',
      'Experiencia com React.js moderno',
      'Familiaridade com Azure DevOps',
    ],
    atividades: [
      'Desenvolver interfaces e APIs internas',
      'Integrar solucoes com Microsoft 365 e SQL Server',
      'Participar de code reviews e melhorias de arquitetura',
    ],
  },
  {
    id: 'vaga-microsoft-estagio-dados',
    empresaId: 'empresa-microsoft',
    titulo: 'Estagiario em Engenharia de Dados',
    nivel: 'Estagio',
    tipo: 'Estagio',
    modalidade: 'Hibrido',
    localizacao: 'Sao Paulo, SP',
    salario: 'R$ 2.400 - R$ 3.000',
    status: 'ativa',
    publicadaEm: '2026-05-28',
    candidatos: 0,
    tags: ['python', 'sql', 'power-bi', 'dados', 'azure-data-factory'],
    descricao:
      'Apoiar o time de dados na construcao de dashboards e tratamento de pipelines simples para analise de mercado.',
    requisitos: [
      'Cursando tecnologia ou engenharia',
      'Nocoes basicas de SQL e Python',
      'Curiosidade por IA',
    ],
    atividades: [
      'Apoiar a criacao de dashboards em Power BI',
      'Tratar bases de dados para analises internas',
      'Aprender boas praticas de pipelines em Azure Data Factory',
    ],
  },
  {
    id: 'vaga-apple-ios-swift',
    empresaId: 'empresa-apple',
    titulo: 'Desenvolvedor iOS (Swift)',
    nivel: 'Pleno',
    tipo: 'CLT',
    modalidade: 'Hibrido',
    localizacao: 'Jundiai ou Sao Paulo, SP',
    salario: 'R$ 11.000 - R$ 16.000',
    status: 'ativa',
    publicadaEm: '2026-05-27',
    candidatos: 0,
    tags: ['swift', 'swiftui', 'ios', 'mobile', 'clean-architecture'],
    descricao:
      'Criar experiencias incriveis para o ecossistema iOS, focando em animacoes fluidas, performance e seguranca total dos dados.',
    requisitos: [
      'Dominio de Swift',
      'Experiencia com SwiftUI',
      'Conhecimento profundo das diretrizes de design da Apple (HIG)',
    ],
    atividades: [
      'Construir telas nativas com SwiftUI',
      'Otimizar performance, acessibilidade e seguranca',
      'Trabalhar junto a design e produto em novas experiencias mobile',
    ],
  },
  {
    id: 'vaga-apple-designer-produto',
    empresaId: 'empresa-apple',
    titulo: 'Designer de Produto (UX/UI)',
    nivel: 'Senior',
    tipo: 'CLT',
    modalidade: 'Presencial',
    localizacao: 'Sao Paulo, SP',
    salario: 'R$ 13.500 - R$ 19.000',
    status: 'ativa',
    publicadaEm: '2026-05-26',
    candidatos: 0,
    tags: ['figma', 'ux', 'ui', 'design', 'prototipagem', 'acessibilidade'],
    descricao:
      'Liderar o design de novas funcionalidades para aplicativos nativos, garantindo simplicidade, consistencia e alto cuidado visual.',
    requisitos: [
      'Portfolio de alto nivel',
      'Experiencia com acessibilidade digital',
      'Visao critica de usabilidade',
    ],
    atividades: [
      'Criar fluxos, prototipos e especificacoes de produto',
      'Conduzir decisoes de UX com base em clareza e simplicidade',
      'Colaborar com engenharia em detalhes de interacao e acessibilidade',
    ],
  },
]

export function criarVagaDemoEmpresa(empresaId) {
  return {
    id: `vaga-demo-${empresaId}`,
    empresaId,
    titulo: 'Analista de Suporte Tecnico Junior',
    nivel: 'Junior',
    tipo: 'CLT',
    modalidade: 'Hibrido',
    localizacao: 'Recife, PE',
    salario: 'R$ 2.200 - R$ 3.000',
    status: 'ativa',
    publicadaEm: new Date().toISOString().slice(0, 10),
    candidatos: 2,
    tags: ['suporte', 'redes', 'microsoft-365', 'windows', 'linux'],
    descricao:
      'Vaga demo criada automaticamente para a empresa testar gerenciamento, edicao, candidatos, perfil e exportacao de curriculo.',
    requisitos: [
      'Boa comunicacao para atendimento a usuarios',
      'Nocoes de Windows, redes e Microsoft 365',
      'Organizacao para registrar chamados e documentar solucoes',
      'Interesse em aprender cloud e seguranca',
    ],
    atividades: [
      'Atender chamados de primeiro nivel',
      'Apoiar configuracao de acessos e estacoes',
      'Documentar problemas recorrentes',
      'Acompanhar melhorias no processo de suporte',
    ],
  }
}

function criarCandidatoDemoPorBase(vagaId, idBase, sufixo) {
  const base = candidatosMock.find((candidato) => candidato.id === idBase)
  return {
    ...base,
    id: `cand-demo-${sufixo}-${vagaId}`,
    vagaId,
    status: base?.status || 'Em andamento',
  }
}

export function criarCandidatosDemoEmpresa(vagaId) {
  return [
    criarCandidatoDemoPorBase(vagaId, 'cand-2', 'rafael'),
    criarCandidatoDemoPorBase(vagaId, 'cand-jefferson-avanade', 'jefferson'),
  ].filter((candidato) => candidato.nome)
}

export function criarCandidatoDemoEmpresa(vagaId) {
  return criarCandidatosDemoEmpresa(vagaId)[0]
}

export const candidatosMock = [
  {
    id: 'cand-1',
    vagaId: 'vaga-1',
    nome: 'Lucas Andrade',
    status: 'Em andamento',
    cargo: 'Aluno em transição para TI',
    localizacao: 'Recife, PE',
    bio: 'Estudante focado em front-end, acessibilidade e construção de interfaces com React.',
    cursos: ['Front-end com HTML, CSS e JavaScript', 'Git e GitHub para Projetos'],
    tecnologias: ['React', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 'cand-jefferson-avanade',
    vagaId: 'vaga-1',
    alunoId: 'aluno-1',
    nome: 'Jefferson Santos',
    status: 'Candidatura enviada',
    cargo: 'Estudante de tecnologia',
    localizacao: 'Recife, PE',
    email: 'jefferson@riseup.demo',
    foto: 'JS',
    fotoUrl: jeffersonSantosPerfil,
    capaUrl: macacoPhpCapa,
    bio:
      'Desenvolvedor Backend em transicao de carreira, focado na construcao de APIs robustas e escalaveis com Java e Spring Boot. Possui dominio solido nos fundamentos de HTTP e arquitetura REST, Clean Code e versionamento com Git/GitHub.',
    cursos: ['Front-end com HTML, CSS e JavaScript', 'Git e GitHub para Projetos', 'LinkedIn para Primeira Vaga'],
    cursosConcluidos: ['Front-end com HTML, CSS e JavaScript', 'Git e GitHub para Projetos'],
    certificados: ['Front-end com HTML, CSS e JavaScript', 'Git e GitHub para Projetos'],
    tecnologias: ['Java', 'Spring Boot', 'APIs REST', 'SQL', 'Git/GitHub', 'JavaScript'],
    perfilProfissional: {
      telefone: '81992844840',
      linkedin: 'https://www.linkedin.com/in/jefferson-santos-dev',
      github: 'https://github.com/jeffersonsantoskn',
      portfolio: 'https://jeffersonsantoskn.github.io',
      tecnologiasComNivel: 'Java - basico\nSpring Boot - estudando\nAPIs REST - basico\nSQL - basico\nGit/GitHub - intermediario\nJavaScript - basico',
      idiomas: 'Portugues - nativo\nIngles - basico',
      projetos:
        'API de cadastro de alunos - Java e Spring Boot - CRUD com boas praticas\nPortfolio pessoal - HTML, CSS e JavaScript - publicado no GitHub Pages\nSistema de vagas Trilum - React - simulacao de candidaturas e curriculos',
      formacoes: 'Analise e Desenvolvimento de Sistemas - UNIT - em andamento',
      experiencias:
        'Assistente administrativo - organizacao de documentos, atendimento e apoio operacional\nProjeto academico - desenvolvimento de API REST com Java e banco de dados',
      certificadosExternos: 'Curso em Video Python - 40h\nGit e GitHub para projetos - certificado externo',
      certificadosExternosArquivos: [
        { id: 'jefferson-cert-python', nome: 'certificado-python-jefferson.pdf', tipo: 'application/pdf', tamanho: 245760 },
      ],
    },
    curriculo: {
      fotoUrl: jeffersonSantosPerfil,
      titulo: 'Estudante de tecnologia',
      objetivo: 'Conquistar uma primeira oportunidade em TI, aplicando meus estudos e evoluindo com projetos reais.',
      competencias: 'Comunicacao\nOrganizacao\nAprendizado continuo\nResolucao de problemas',
    },
  },
  {
    id: 'cand-2',
    vagaId: 'vaga-6',
    nome: 'Rafael Souza',
    status: 'Em andamento',
    cargo: 'Técnico de suporte',
    localizacao: 'Recife, PE',
    bio: 'Experiência com atendimento de usuários, hardware, redes e documentação técnica.',
    cursos: ['Informática Essencial', 'Git e GitHub para Projetos'],
    tecnologias: ['Suporte', 'Redes', 'Windows', 'Microsoft 365'],
    ...{
    cargo: 'Tecnico de suporte',
    email: 'rafael.souza.demo@trilum.local',
    foto: 'RS',
    fotoUrl: rafaelSouzaPerfil,
    bio:
      'Tecnico de suporte com experiencia em atendimento a usuarios, diagnostico de hardware, redes, Microsoft 365 e documentacao tecnica. Busca crescer para suporte cloud e administracao de ambientes corporativos.',
    cursos: ['Informatica Essencial', 'Git e GitHub para Projetos', 'Linux para Iniciantes', 'Seguranca para Projetos Web'],
    cursosConcluidos: ['Informatica Essencial', 'Git e GitHub para Projetos'],
    certificados: ['Informatica Essencial', 'Git e GitHub para Projetos'],
    tecnologias: ['Suporte', 'Redes', 'Windows', 'Microsoft 365', 'Linux', 'Git/GitHub', 'Azure Fundamentals'],
    perfilProfissional: {
      telefone: '81988776655',
      linkedin: 'https://www.linkedin.com/in/rafael-souza-suporte',
      github: 'https://github.com/rafaelsouza-support',
      instagram: 'https://www.instagram.com/rafaelsouza.tech',
      portfolio: 'https://rafaelsouza-support.github.io',
      tecnologiasComNivel:
        'Suporte tecnico - intermediario\nRedes TCP/IP - basico\nWindows - intermediario\nMicrosoft 365 - basico\nLinux - basico\nGit/GitHub - basico\nAzure Fundamentals - estudando',
      idiomas: 'Portugues - nativo\nIngles - intermediario\nEspanhol - basico',
      projetos:
        'Inventario de chamados em planilha automatizada - Excel e Power Query - reducao de retrabalho\nLaboratorio domestico de redes - roteamento, DNS e documentacao de troubleshooting\nBase de conhecimento de suporte - artigos para problemas recorrentes de usuarios',
      formacoes:
        'Tecnico em Informatica - SENAC PE - 2024\nAnalise e Desenvolvimento de Sistemas - Faculdade ficticia Recife Tech - em andamento',
      experiencias:
        'Tecnico de suporte junior - HelpDesk Recife - 2024/2026 - atendimento N1, triagem de chamados e suporte Microsoft 365\nEstagio em infraestrutura - Recife Digital Lab - 2023/2024 - configuracao de estacoes, redes e documentacao',
      certificadosExternos:
        'Microsoft 365 Fundamentals - preparatorio\nCurso de Redes de Computadores - 40h\nLinux Essentials - curso livre',
      certificadosExternosArquivos: [
        { id: 'rafael-cert-redes', nome: 'certificado-redes-rafael.pdf', tipo: 'application/pdf', tamanho: 312000 },
        { id: 'rafael-cert-linux', nome: 'linux-essentials-rafael.pdf', tipo: 'application/pdf', tamanho: 286000 },
      ],
    },
    curriculo: {
      titulo: 'Tecnico de suporte junior',
      objetivo:
        'Atuar em suporte tecnico e infraestrutura, aplicando boas praticas de atendimento, documentacao e diagnostico para evoluir em ambientes cloud.',
      competencias: 'Comunicacao clara\nOrganizacao de chamados\nEmpatia com usuarios\nAprendizado continuo\nResolucao de problemas',
    },
    },
  },
]
