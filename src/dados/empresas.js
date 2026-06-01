import avanadeHero from '../ativos/imagens/avanade-baloes-hero.webp'
import avanadeLogo from '../ativos/imagens/avanade-logo.png'
import appleBackground from '../ativos/imagens/empresas/apple-background.webp'
import appleLogo from '../ativos/imagens/empresas/apple-logo.webp'
import microsoftBackground from '../ativos/imagens/empresas/microsoft-background.webp'
import microsoftLogo from '../ativos/imagens/empresas/microsoft-logo.webp'

export const empresas = [
  {
    id: 'empresa-1',
    nome: 'Avanade',
    nomeOficial: 'Avanade Brasil',
    logo: 'AV',
    logoUrl: avanadeLogo,
    capaUrl: avanadeHero,
    capa: '#f8fafc',
    descricao:
      'A Avanade é a consultoria líder em soluções digitais inovadoras no ecossistema Microsoft. Nascida da união entre Accenture e Microsoft, une tecnologia de ponta, visão de negócios e experiência humana para criar o que é relevante para o amanhã. No Brasil, atua como um dos principais pilares de transformação digital, entregando projetos que moldam o futuro de indústrias inteiras.',
    descricaoCurta:
      'Unimos tecnologia, inovação e talentos para criar soluções digitais com impacto real em empresas e pessoas.',
    setor: 'Consultoria de Tecnologia e Soluções Digitais',
    tamanho: '60.000+ funcionários no mundo',
    sede: 'São Paulo, SP (com hubs em Recife e Curitiba)',
    localizacao: 'Recife, PE',
    hub: 'Porto Digital - Bairro do Recife, Recife - PE',
    especialidades: [
      'Azure Enterprise',
      'IA Generativa e Copilot',
      'Modern Workplace',
      'Dynamics 365',
      'Power Platform',
      '.NET 8',
      'React',
      'TypeScript',
    ],
    stackDetalhes: [
      'Cloud & Infra: Azure em escala enterprise, Kubernetes e serverless.',
      'Inteligência Artificial: IA Generativa, Copilot e soluções com dados.',
      'Business Apps: Dynamics 365 e Power Platform para low-code.',
      'Software Engineering: .NET 8, React e TypeScript em produtos robustos.',
    ],
    beneficios: [
      'Certificações Microsoft com suporte e vouchers',
      'Projetos globais em squads internacionais',
      'Programas ativos de diversidade e inclusão',
      'Modelo híbrido ou remoto conforme o projeto',
    ],
    site: 'https://www.avanade.com/pt-br',
    instagram: 'https://www.instagram.com/avanadeinc/',
    linkedin: 'https://www.linkedin.com/company/avanade/?originalSubdomain=br',
    youtube: 'https://www.youtube.com/avanade',
  },
  {
    id: 'empresa-2',
    nome: 'Nova Jornada Digital',
    logo: 'NJ',
    capa: 'linear-gradient(120deg, rgba(15, 23, 42, 0.95), rgba(99, 102, 241, 0.76))',
    descricao:
      'Consultoria de produtos digitais com foco em inclusão, desenvolvimento web e squads multidisciplinares.',
    localizacao: 'Remoto',
    site: 'https://novajornada.dev',
  },
  {
    id: 'empresa-microsoft',
    nome: 'Microsoft Brasil',
    nomeOficial: 'Microsoft Informatica Ltda.',
    logo: 'MS',
    logoUrl: microsoftLogo,
    capaUrl: microsoftBackground,
    capa: 'linear-gradient(120deg, rgba(0, 78, 140, 0.96), rgba(0, 188, 242, 0.7))',
    descricaoCurta: 'Nossa missao e empoderar cada pessoa e cada organizacao no planeta a conquistar mais.',
    descricao:
      'Lider mundial em software, servicos, dispositivos e solucoes que ajudam pessoas e empresas a atingirem seu potencial pleno. Focada em transformacao digital atraves de nuvem inteligente e borda inteligente.',
    setor: 'Tecnologia e Software',
    tamanho: '220.000+ funcionarios no mundo',
    sede: 'Sao Paulo, SP',
    localizacao: 'Sao Paulo, SP',
    hub: 'Microsoft Reactor (Polo de Inovacao)',
    especialidades: ['Azure', 'Inteligencia Artificial', 'Windows', 'Xbox', 'Microsoft 365', 'LinkedIn'],
    stackDetalhes: [
      'Ecossistema .NET, C# e TypeScript em produtos corporativos.',
      'Python, Kubernetes e SQL Server em ambientes de dados e cloud.',
      'Azure, DevOps e seguranca em escala enterprise.',
    ],
    beneficios: [
      'Carreira global',
      'Vale-refeicao flexivel',
      'Plano de saude premium',
      'Auxilio Home Office',
      'Licenca parental estendida',
    ],
    site: 'https://www.microsoft.com/pt-br',
    linkedin: 'https://www.linkedin.com/company/microsoft/',
  },
  {
    id: 'empresa-apple',
    nome: 'Apple Brasil',
    nomeOficial: 'Apple Computer Brasil Ltda.',
    logo: 'AP',
    logoUrl: appleLogo,
    capaUrl: appleBackground,
    capa: 'linear-gradient(120deg, rgba(17, 24, 39, 0.96), rgba(120, 144, 156, 0.72))',
    descricaoCurta: 'Onde criadores constroem o futuro da tecnologia.',
    descricao:
      'A Apple revolucionou a tecnologia pessoal com o Macintosh e hoje lidera o mundo em inovacao com iPhone, iPad, Mac e Apple Watch, alem de sistemas operacionais e servicos como iCloud e Apple Music.',
    setor: 'Eletronicos e Software',
    tamanho: '160.000+ funcionarios no mundo',
    sede: 'Sao Paulo, SP',
    localizacao: 'Sao Paulo, SP',
    hub: 'Apple Academy (Inovacao e Educacao)',
    especialidades: ['iOS', 'macOS', 'Design de Hardware', 'Silicio Apple', 'UX', 'Privacidade'],
    stackDetalhes: [
      'Swift, SwiftUI e Objective-C em aplicativos nativos.',
      'C++, Core ML e Machine Learning para performance e inteligencia embarcada.',
      'Design, acessibilidade e privacidade como base da experiencia.',
    ],
    beneficios: [
      'Descontos em produtos',
      'Plano de acoes para funcionarios',
      'Academia no local',
      'Cultura de excelencia',
      'Seguro de vida',
    ],
    site: 'https://www.apple.com/br/',
    linkedin: 'https://www.linkedin.com/company/apple/',
  },
]
