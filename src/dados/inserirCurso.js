//exemplo ABAIXO
export const inserirCurso = [

  {
    id: "curso-php-iniciante",
    titulo: "Curso de PHP para Iniciantes",
    categoria: "Back-end",
    tecnologia: "php",
    nivel: "Basico",
    duracao: "9h30",
    professor: "Gustavo Guanabara",
    videoPrincipal: "https://www.youtube.com/watch?v=F7KzJ7e6EAc",
    tags: "php, backend, web, html, formularios, servidor, banco-de-dados",
    trilhas: "php-backend,sql-banco-dados",
    descricao:
      "Aprenda os primeiros passos em PHP para criar sites dinamicos, configurar ambiente, trabalhar com variaveis, operadores, formularios, estruturas de controle, funcoes, strings, vetores e matrizes.",
    destaque: "Base pratica para criar paginas web dinamicas com PHP.",
    modulos: [
      {
        titulo: "Modulo 1: Fundamentos e ambiente",
        descricao:
          "Historia, funcionamento do PHP, instalacao e primeiros conceitos.",
        aulas: [
          {
            titulo: "Historia do PHP - Curso PHP Iniciante #01",
            duracao: "19:04",
            link: "https://www.youtube.com/watch?v=F7KzJ7e6EAc",
            descricao:
              "Conheca a origem do PHP, sua evolucao e por que ele se tornou importante para sites dinamicos.",
          },

          {
            titulo: "Como funciona o PHP - Curso PHP Iniciante #02",
            duracao: "10:24",
            link: "https://www.youtube.com/watch?v=Eup6utTPe2U",
            descricao:
              "Entenda como o PHP roda no servidor e como ele se integra com paginas web.",
          },

          {
            titulo: "Como Instalar o PHP - Curso de PHP Iniciante #03",
            duracao: "24:07",
            link: "https://www.youtube.com/embed/videoseries?list=PLHz_AreHm4dm4beCCCmW4xwpmLf6EHY9k&index=3",
            descricao: "Prepare o ambiente para comecar a programar em PHP.",
          },
        ],
      },
    ],
  },


  {
    // ID único do curso. Não pode repetir.
    // Use letras minúsculas e hífen.
    id: 'curso-angular-basico',

    // Nome que vai aparecer no card e na página do curso.
    titulo: 'Curso Angular 19 na prática',

    // Use uma categoria existente:
    // 'Fundamentos', 'Programação', 'Ferramentas', 'Front-end',
    // 'Back-end', 'Dados', 'DevOps', 'QA', 'Carreira', 'Soft skills'
    categoria: 'Front-end',

    // Tecnologia principal do curso.
    // Exemplos: 'javascript', 'react', 'node', 'java', 'python', 'sql',
    // 'git-github', 'docker-cloud', 'qa', 'carreira', 'ingles', 'logica'
    tecnologia: 'angular',

    // Nível do curso.
    // Exemplos: 'Iniciante', 'Basico', 'Intermediário'
    nivel: 'Intermediario',

    // Duração total aproximada do curso.
    duracao: '6h37',

    // Nome do professor ou canal do YouTube.
    professor: 'Lucas Peixoto',

    // Link do vídeo principal ou primeiro vídeo da playlist.
    videoPrincipal: 'https://www.youtube.com/watch?v=35iyS8zCRfU&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=1&pp=iAQB0gcJCQQLAYcqIYzv',

    // Palavras-chave separadas por vírgula.
    tags: 'angular, angular19, typescript, frontend, web-development, spa, single-page-application',

    // ID da trilha relacionada.
    // Exemplos: 'javascript-frontend', 'java-spring', 'node-backend'
    trilhas: 'angular-frontend,javascript-frontend',

    // Resumo maior do curso.
    descricao:
      'Desenvolva um Todo App completo utilizando Angular 19 na prática, explorando desde a estruturação do projeto até a implementação de funcionalidades reais. Aprenda conceitos modernos como Signals, Services, testes com Jest e integração com APIs, aplicados em um cenário real. Além disso, entenda práticas de mercado como Docker, CI/CD e deploy, levando sua aplicação do código à produção',

    // Frase curta de destaque.
    destaque: 'Domine Angular na prática e construa aplicações modernas do zero ao deploy',

    // Lista de módulos do curso.
    modulos: [
      {
        titulo: 'Módulo 1: Fundamentos e Estrutura do Projeto',
        descricao: 'Neste módulo você inicia o projeto Angular 19, estruturando o layout, entendendo conceitos como módulos e signals, além de iniciar a criação de serviços para a aplicação.',

        aulas: [
          {
            titulo: 'Curso Angular 19 na prática #00: O Projeto',
            duracao: '4:47',
            link: 'https://www.youtube.com/watch?v=35iyS8zCRfU&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=1&pp=iAQB',
            descricao: 'Apresentação do projeto e visão geral da aplicação que será construída.',
          },
          {
            titulo: 'Curso Angular 19 na prática #01: Estruturando o layout',
            duracao: '21:01',
            link: 'https://www.youtube.com/watch?v=khb92Mb14uY&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=2&pp=iAQB',
            descricao: 'Criação da estrutura visual inicial da aplicação.',
          },
          {
            titulo: 'Curso Angular 19 na prática #02: Modulo de categorias',
            duracao: '31:22',
            link: 'https://www.youtube.com/watch?v=xTj7oYxCZw4&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=3&pp=iAQB',
            descricao: 'Implementação do módulo de categorias e organização do projeto.',
          },
          {
            titulo: 'Curso Angular 19 na prática #03: O que é toSignal() ?',
            duracao: '6:26',
            link: 'https://www.youtube.com/watch?v=EDQqdLLIh34&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=4&pp=iAQB',
            descricao: 'Explicação sobre o uso de signals no Angular.',
          },
          {
            titulo: 'Curso Angular 19 na prática #04: Criando o TaskService para as operações com as tarefas',
            duracao: '25:49',
            link: 'https://www.youtube.com/watch?v=I4jtXdsHDEk&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=5&pp=iAQB',
            descricao: 'Criação do serviço responsável pelas operações das tarefas.',
          },
        ],
      },

      {
        titulo: 'Módulo 2: Testes, Formulários e Funcionalidades',
        descricao: 'Neste módulo você aprofunda em testes com Jest, inicialização da aplicação e criação de formulários com melhorias de UI/UX.',

        aulas: [
          {
            titulo: 'Curso Angular 19 na prática #05: Configurando o Jest e testando o TaskService | Parte 1',
            duracao: '32:09',
            link: 'https://www.youtube.com/watch?v=qtvjR16DYhQ&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=6&pp=iAQB',
            descricao: 'Configuração do Jest e início dos testes do serviço.',
          },
          {
            titulo: 'Curso Angular 19 na prática #06: Testando o TaskService | Parte 2',
            duracao: '37:32',
            link: 'https://www.youtube.com/watch?v=40aeqpezIPk&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=7&pp=iAQB',
            descricao: 'Continuação dos testes unitários do serviço.',
          },
          {
            titulo: 'Curso Angular 19 na prática #07: APP INITIALIZER do angular, a explicação que você precisa',
            duracao: '12:03',
            link: 'https://www.youtube.com/watch?v=2wYDBxI32As&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=8&pp=iAQB',
            descricao: 'Entendimento do ciclo de inicialização da aplicação.',
          },
          {
            titulo: 'Curso Angular 19 na prática #08: Formulário para adição de tarefa',
            duracao: '53:41',
            link: 'https://www.youtube.com/watch?v=_zt5XDxU73c&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=9&pp=iAQB',
            descricao: 'Criação do formulário para adicionar novas tarefas.',
          },
          {
            titulo: 'Curso Angular 19 na prática #09: Melhorando a UI/UX do formulário',
            duracao: '27:25',
            link: 'https://www.youtube.com/watch?v=bxXSuI8eYeg&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=10&pp=iAQB0gcJCQQLAYcqIYzv',
            descricao: 'Melhorias visuais e de usabilidade no formulário.',
          },
          {
            titulo: 'Curso Angular 19 na prática #10: Testes unitários do formulário de adição',
            duracao: '40:21',
            link: 'https://www.youtube.com/watch?v=_1hnjLfUh7w&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=11&pp=iAQB',
            descricao: 'Criação de testes unitários para o formulário.',
          },
        ],
      },

      {
        titulo: 'Módulo 3: Deploy, DevOps e Finalização',
        descricao: 'Neste módulo você aprende sobre dockerização, deploy, CI/CD e finaliza a aplicação com ajustes e novas funcionalidades.',

        aulas: [
          {
            titulo: 'Curso Angular 19 na prática #11: Dockerizando um projeto angular',
            duracao: '23:29',
            link: 'https://www.youtube.com/watch?v=dcoVBCfAlFk&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=12&pp=iAQB',
            descricao: 'Introdução à dockerização da aplicação.',
          },
          {
            titulo: 'Curso Angular 19 na prática #12: Dockerizando um projeto angular com Nginx',
            duracao: '17:02',
            link: 'https://www.youtube.com/watch?v=uFkTXQTxFOY&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=13&pp=iAQB',
            descricao: 'Configuração do Nginx com Docker.',
          },
          {
            titulo: 'Curso Angular 19 na prática #13: Ajustes nas configs de testes unitários',
            duracao: '5:11',
            link: 'https://www.youtube.com/watch?v=J-k4GQMeuT0&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=14&pp=iAQB0gcJCQQLAYcqIYzv',
            descricao: 'Ajustes finais nas configurações de testes.',
          },
          {
            titulo: 'Curso Angular 19 na prática #14: Atualizando a versão do projeto para angular 19',
            duracao: '12:48',
            link: 'https://www.youtube.com/watch?v=XI_tmTBs6g8&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=15&pp=iAQB',
            descricao: 'Atualização do projeto para a versão mais recente.',
          },
          {
            titulo: 'Curso Angular 19 na prática #15: Entendendo CI/CD com github actions e deploy na vercel',
            duracao: '29:39',
            link: 'https://www.youtube.com/watch?v=Fu1YtDGrUIc&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=16&pp=iAQB',
            descricao: 'Implementação de CI/CD e deploy automatizado.',
          },
          {
            titulo: 'Curso Angular 19 na prática #16: Listagem de tarefas [PARTE 1]',
            duracao: '17:03',
            link: 'https://www.youtube.com/watch?v=Le85CVP6Dc8&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=17&pp=iAQB',
            descricao: 'Implementação da listagem de tarefas na aplicação.',
          },
        ],
      },
    ]
  },  


  {
    // ID único do curso. Não pode repetir.
    // Use letras minúsculas e hífen.
    id: 'curso-estruturas-de-dados-basico',

    // Nome que vai aparecer no card e na página do curso.
    titulo: 'Curso Estruturas de Dados e Algoritmos',

    // Use uma categoria existente:
    // 'Fundamentos', 'Programação', 'Ferramentas', 'Front-end',
    // 'Back-end', 'Dados', 'DevOps', 'QA', 'Carreira', 'Soft skills'
    categoria: 'Programação',

    // Tecnologia principal do curso.
    // Exemplos: 'javascript', 'react', 'node', 'java', 'python', 'sql',
    // 'git-github', 'docker-cloud', 'qa', 'carreira', 'ingles', 'logica'
    tecnologia: 'estrutura-de-dados',

    // Nível do curso.
    // Exemplos: 'Iniciante', 'Basico', 'Intermediário'
    nivel: 'Intermediario',

    // Duração total aproximada do curso.
    duracao: '2h 03min',

    // Nome do professor ou canal do YouTube.
    professor: 'Fábio dos Reis da Bóson Treinamentos',

    // Link do vídeo principal ou primeiro vídeo da playlist.
    videoPrincipal: 'https://youtu.be/QRPbHdm05dk?list=PLucm8g_ezqNpHdoSlPrLMB1Ga8dBrNRsz',

    // Palavras-chave separadas por vírgula.
    tags: 'estrutura-de-dados, algoritmos, logica-de-programacao, ciencia-da-computacao',

    // ID da trilha relacionada.
    // Exemplos: 'javascript-frontend', 'java-spring', 'node-backend'
    trilhas:'logica-algoritmos,javascript-frontend,java-spring',

    // Resumo maior do curso.
    descricao:`Aprenda os principais conceitos de estruturas de dados e algoritmos, fundamentais para qualquer desenvolvedor.
    Entenda na prática como funcionam pilhas, filas, listas, algoritmos de ordenação e análise de complexidade com Big O.
    Desenvolva uma base sólida em lógica e desempenho para escrever códigos mais eficientes e preparados para o mercado.`,

    // Frase curta de destaque.
    destaque: 'Domine a base da programação e escreva algoritmos mais eficientes',

    // Lista de módulos do curso.                                                           
    modulos: [
      {
        titulo: 'Módulo 1: Fundamentos de Estruturas de Dados',
        descricao: 'Introdução aos conceitos básicos de estruturas de dados, entendendo como organizar e manipular informações em programação.',

        aulas: [
          {
            titulo: 'Estruturas de Dados - Apresentação do Curso',
            duracao: '3:14',
            link:'https://www.youtube.com/watch?v=QRPbHdm05dk&list=PLucm8g_ezqNpHdoSlPrLMB1Ga8dBrNRsz&index=1&pp=iAQB0gcJCQQLAYcqIYzv',
            descricao: 'Visão geral do curso e dos principais conceitos que serão abordados.',
          },
          {
            titulo: 'Estruturas de Dados - O que são Pilhas',
            duracao: '12:39',
            link:'https://www.youtube.com/watch?v=EocahNeZcn0&list=PLucm8g_ezqNpHdoSlPrLMB1Ga8dBrNRsz&index=2&pp=iAQB',
            descricao: 'Entenda o funcionamento das pilhas e sua aplicação na programação.',
          },
          {
            titulo: 'Listas, Pilhas e Filas em Estruturas de Dados - Qual a diferença?',
            duracao: '15:19',
            link:'https://www.youtube.com/watch?v=OwiHoj-mAi8&list=PLucm8g_ezqNpHdoSlPrLMB1Ga8dBrNRsz&index=3&pp=iAQB',
            descricao: 'Aprenda as diferenças entre listas, pilhas e filas e quando usar cada uma.',
          },
        ],
      },

      {
        titulo: 'Módulo 2: Algoritmos de Ordenação',
        descricao: 'Aprenda algoritmos fundamentais de ordenação e como organizar dados de forma eficiente.',

        aulas: [
          {
            titulo: 'Ordenação de Vetores com o método Selection Sort - Lógica de Programação',
            duracao: '13:24',
            link:'https://www.youtube.com/watch?v=N8iBOuoqtJE&list=PLucm8g_ezqNpHdoSlPrLMB1Ga8dBrNRsz&index=4&pp=iAQB',
            descricao: 'Implementação do algoritmo Selection Sort para ordenação de dados.',
          },
          {
            titulo: 'Algoritmo Bubble Sort para ordenação de arrays',
            duracao: '12:31',
            link:'https://www.youtube.com/watch?v=0zndsghQS6w&list=PLucm8g_ezqNpHdoSlPrLMB1Ga8dBrNRsz&index=5&pp=iAQB',
            descricao: 'Funcionamento e aplicação do algoritmo Bubble Sort.',
          },
          {
            titulo: 'Insertion Sort em Python Ordenação de Arrays por Inserção Implementação',
            duracao: '23:47',
            link:'https://www.youtube.com/watch?v=JTIpS1WlgXg&list=PLucm8g_ezqNpHdoSlPrLMB1Ga8dBrNRsz&index=6&pp=iAQB',
            descricao: 'Aprenda o algoritmo Insertion Sort com exemplo prático em Python.',
          },
        ],
      },

      {
        titulo: 'Módulo 3: Análise e Conceitos Avançados',
        descricao: 'Compreenda conceitos avançados como análise de desempenho, precedência de operadores e introdução a grafos.',

        aulas: [
          {
            titulo: 'O que é a Notação Big O em Algoritmos',
            duracao: '13:33',
            link:'https://www.youtube.com/watch?v=JpSDHpY4BKk&list=PLucm8g_ezqNpHdoSlPrLMB1Ga8dBrNRsz&index=7&pp=iAQB',
            descricao: 'Aprenda a medir a eficiência de algoritmos com Big O.',
          },
          {
            titulo: '8 exemplos de Associatividade e Precedência de Operadores em Programação',
            duracao: '14:54',
            link:'https://www.youtube.com/watch?v=dVXP8lAcE7M&list=PLucm8g_ezqNpHdoSlPrLMB1Ga8dBrNRsz&index=8&pp=iAQB',
            descricao: 'Entenda como operadores são avaliados em expressões.',
          },
          {
            titulo: 'O que é a Teoria dos Grafos - Introdução - 01',
            duracao: '14:01',
            link:'https://www.youtube.com/watch?v=5RfpEvyGNJY&list=PLucm8g_ezqNpHdoSlPrLMB1Ga8dBrNRsz&index=9&pp=iAQB',
            descricao: 'Introdução aos conceitos de grafos e suas aplicações.',
          },
        ],
      },
    ],
  },

  {
    // ID único do curso. Não pode repetir.
    // Use letras minúsculas e hífen.
    id: 'curso-logica-typescript',

    // Nome que vai aparecer no card e na página do curso.
    titulo: 'Lógica de Programação com TypeScript - 100 Exercícios',

    // Use uma categoria existente:
    // 'Fundamentos', 'Programação', 'Ferramentas', 'Front-end',
    // 'Back-end', 'Dados', 'DevOps', 'QA', 'Carreira', 'Soft skills'
    categoria: 'Programação',

    // Tecnologia principal do curso.
    // Exemplos: 'javascript', 'react', 'node', 'java', 'python', 'sql',
    // 'git-github', 'docker-cloud', 'qa', 'carreira', 'ingles', 'logica'
    tecnologia: 'typescript',

    // Nível do curso.
    // Exemplos: 'Iniciante', 'Basico', 'Intermediário'
    nivel: 'Basico',

    // Duração total aproximada do curso.
    duracao: '3h 40min',

    // Nome do professor ou canal do YouTube.
    professor: 'Dev. Odair Michael',

    // Link do vídeo principal ou primeiro vídeo da playlist.
    videoPrincipal: 'https://www.youtube.com/watch?v=2hIFewbdsEg&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=1',

    // Palavras-chave separadas por vírgula.
    tags: 'typescript, logica-de-programacao, algoritmos, programacao, exercicios, funcoes, arrays',

    // ID da trilha relacionada.
    // Exemplos: 'javascript-frontend', 'java-spring', 'node-backend'
    trilhas: 'logica-algoritmos,javascript-frontend,angular-frontend',

    // Resumo maior do curso.
    descricao:'Aprenda lógica de programação na prática utilizando TypeScript com exercícios progressivos, desenvolvendo habilidades como funções, estruturas de repetição, arrays e resolução de problemas para construir uma base sólida na programação.',

    // Frase curta de destaque.
    destaque:'Aprenda lógica na prática com exercícios reais usando TypeScript',

    // Lista de módulos do curso.
   modulos: [
      {
        titulo: 'Módulo 1: Preparação e Introdução ao TypeScript',
        descricao: 'Instale o ambiente de desenvolvimento e entenda os primeiros conceitos do TypeScript para iniciar sua jornada.',

        aulas: [
          {
            titulo: 'Como Baixar e Instalar o Visual Studio Code (VSCode) no Windows [Atualizado 2024] - Aula 02',
            duracao: '4:06',
            link: 'https://www.youtube.com/watch?v=2hIFewbdsEg&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=1&pp=iAQB',
            descricao: 'Instalação e configuração do VS Code para iniciar na programação.',
          },
          {
            titulo: 'TypeScript Tutorial 2025: Aprenda do ZERO passo a passo',
            duracao: '14:38',
            link: 'https://www.youtube.com/watch?v=WvPlUwj2n5k&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=2&pp=iAQB',
            descricao: 'Introdução ao TypeScript e seus conceitos básicos para começar a usar na prática.',
          },
        ],
      },

      {
        titulo: 'Módulo 2: Lógica de Programação - Fundamentos',
        descricao: 'Desenvolva a base da lógica de programação com exercícios progressivos utilizando TypeScript.',

        aulas: [
          {
            titulo: 'Lógica de Programação com TypeScript Curso Completo (100 Exercícios do Zero ao Avançado)',
            duracao: '9:01',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Primeiros exercícios de lógica para iniciar na prática.',
          },
          {
            titulo: 'Lógica de Programação com TypeScript Curso Completo (100 Exercícios do Zero ao Avançado)',
            duracao: '7:01',
            link: 'https://www.youtube.com/watch?v=I6WgY0l9Z0Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=4',
            descricao: 'Continuação dos exercícios básicos de lógica.',
          },
          {
            titulo: 'Lógica de Programação com TypeScript Curso Completo (100 Exercícios do Zero ao Avançado)',
            duracao: '9:25',
            link: 'https://www.youtube.com/watch?v=K7v1cG3X8G8&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=5',
            descricao: 'Prática com novos desafios de lógica.',
          },
          {
            titulo: 'Lógica de Programação com TypeScript Curso Completo (100 Exercícios do Zero ao Avançado)',
            duracao: '9:06',
            link: 'https://www.youtube.com/watch?v=7gP6Z9s1r7k&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=6',
            descricao: 'Exercícios para reforçar o raciocínio lógico.',
          },
          {
            titulo: 'Lógica de Programação com TypeScript Curso Completo (100 Exercícios do Zero ao Avançado)',
            duracao: '8:27',
            link: 'https://www.youtube.com/watch?v=8d2kzQXz5hA&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=7',
            descricao: 'Prática contínua com exercícios progressivos.',
          },
          {
            titulo: 'Lógica de Programação com TypeScript Curso Completo (100 Exercícios do Zero ao Avançado)',
            duracao: '8:42',
            link: 'https://www.youtube.com/watch?v=9pQzT2jYc0g&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=8',
            descricao: 'Fixação dos conceitos básicos de lógica.',
          },
        ],
      },

      {
        titulo: 'Módulo 3: Funções e Tipagem no TypeScript',
        descricao: 'Aprenda a criar funções, aplicar tipagem e resolver problemas com lógica.',

        aulas: [
          {
            titulo: 'Lógica de Programação com TypeScript: Função de Soma com Condição (100 exercícios)',
            duracao: '8:41',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Criação de função com condição.',
          },
          {
            titulo: 'Lógica de Programação com TypeScript: Função de Divisão com Tratamento de Erro',
            duracao: '10:07',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Tratamento de erro em funções.',
          },
          {
            titulo: 'Como tipar funções em TypeScript [Guia Prático com Type Alias]',
            duracao: '16:37',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Tipagem de funções no TypeScript.',
          },
          {
            titulo: 'Cálculo de área com TypeScript com Lógica de Programação',
            duracao: '14:58',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Aplicação de lógica em cálculos.',
          },
          {
            titulo: 'Lógica de Programação com TypeScript - Cálculo de perímetro',
            duracao: '13:22',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Cálculo de perímetro com lógica.',
          },
          {
            titulo: 'Curso de Lógica de Programação com TypeScript - 100 exercícios',
            duracao: '12:39',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Mais prática de lógica.',
          },
          {
            titulo: 'Curso de Lógica de Programação para BURROS (com TypeScript)',
            duracao: '17:12',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Explicação simplificada de lógica.',
          },
          {
            titulo: 'Função para converter metros e centímetros - Curso de Lógica de Programação com TypeScript',
            duracao: '14:50',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Conversão de unidades com funções.',
          },
        ],
      },

      {
        titulo: 'Módulo 4: Arrays e Estruturas de Repetição',
        descricao: 'Aprenda a trabalhar com arrays, laços de repetição e desafios práticos.',

        aulas: [
          {
            titulo: '[DESAFIO] Algoritmo para calcular materiais - Lógica de Programação com TypeScript',
            duracao: '23:49',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Desafio prático de lógica.',
          },
          {
            titulo: 'Curso Lógica com TypeScript - Exercício básico de Arrays',
            duracao: '14:50',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Introdução aos arrays.',
          },
          {
            titulo: 'Como Usar o FOR em ARRAYS (Lógica com TypeScript)',
            duracao: '24:09',
            link: 'https://www.youtube.com/watch?v=R6r9GxV8x6Q&list=PLa3uqHCcweTicGuLMh9ZS7l0uYOuiXr-b&index=3',
            descricao: 'Uso de loop FOR em arrays.',
          },
        ],
      },
    ],
  },  

  {
    // ID único do curso. Não pode repetir.
    // Use letras minúsculas e hífen.
    id: 'curso-mongodb-basico-avancado',

    // Nome que vai aparecer no card e na página do curso.
    titulo: 'MongoDB - Do básico ao avançado',

    // Use uma categoria existente:
    // 'Fundamentos', 'Programação', 'Ferramentas', 'Front-end',
    // 'Back-end', 'Dados', 'DevOps', 'QA', 'Carreira', 'Soft skills'
    categoria: 'Dados',

    // Tecnologia principal do curso.
    // Exemplos: 'javascript', 'react', 'node', 'java', 'python', 'sql',
    // 'git-github', 'docker-cloud', 'qa', 'carreira', 'ingles', 'logica'
    tecnologia: 'mongodb',

    // Nível do curso.
    // Exemplos: 'Iniciante', 'Basico', 'Intermediário'
    nivel: 'Basico',

    // Duração total aproximada do curso.
    duracao: '6h 57',

    // Nome do professor ou canal do YouTube.
    professor: 'DFILITTO',

    // Link do vídeo principal ou primeiro vídeo da playlist.
    videoPrincipal: 'https://www.youtube.com/watch?v=ykucnHrhLUU&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=1&pp=iAQB',

    // Palavras-chave separadas por vírgula.
    tags: 'mongodb, banco-de-dados, nosql, backend, nodejs, crud, database',

    // ID da trilha relacionada.
    // Exemplos: 'javascript-frontend', 'java-spring', 'node-backend'
    trilhas: 'sql-banco-dados,node-backend,java-spring,php-backend',

    // Resumo maior do curso.
    descricao:
      'Aprenda MongoDB do zero até a prática avançada, criando bancos de dados, realizando consultas, manipulando documentos e desenvolvendo aplicações com Node.js e PHP.',

    // Frase curta de destaque.
    destaque: 'Domine MongoDB e bancos NoSQL na prática',

    // Lista de módulos do curso.
    modulos: [
      {
        titulo: 'Módulo 1: Introdução e Primeiros Passos',
        descricao: 'Aprenda o que é MongoDB, instalação e primeiros comandos para criar e manipular bancos de dados.',

        aulas: [
          {
            titulo: 'Aprenda como trabalhar com o banco de dados não relacional MongoDB',
            duracao: '0:39',
            link: 'https://www.youtube.com/watch?v=ykucnHrhLUU&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=1&pp=iAQB',
            descricao: 'Visão geral sobre o MongoDB e bancos NoSQL.',
          },
          {
            titulo: 'MongoDB - 01 Como Instalar o Mongo DB',
            duracao: '8:17',
            link: 'https://www.youtube.com/watch?v=T5WsgB-qz1w&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=2&pp=iAQB0gcJCQYLAYcqIYzv',
            descricao: 'Instalação do MongoDB no ambiente.',
          },
          {
            titulo: 'MongoDB - 02 Criando meu primeiro banco de dados',
            duracao: '13:11',
            link: 'https://www.youtube.com/watch?v=vbVr1rsPHCU&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=3&pp=iAQB',
            descricao: 'Criação do primeiro banco de dados.',
          },
          {
            titulo: 'MongoDB - 03 Excluindo Bancos e coleções',
            duracao: '9:57',
            link: 'https://www.youtube.com/watch?v=QBid4n89xCQ&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=4&pp=iAQB0gcJCQYLAYcqIYzv',
            descricao: 'Remoção de bancos e coleções.',
          },
          {
            titulo: 'MongoDB - 04 Inserindo dados em uma coleção',
            duracao: '13:35',
            link: 'https://www.youtube.com/watch?v=dKhr8MVkZr4&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=5&pp=iAQB',
            descricao: 'Inserção de documentos',
          },
        ],
      },

      {
        titulo: 'Módulo 2: Consultas e Manipulação de Dados',
        descricao: 'Domine consultas, operadores, atualização e exclusão de dados no MongoDB.',

        aulas: [
          {
            titulo: 'MongoDB - 06 Executando consultas no mongoDB Compass',
            duracao: '19:33',
            link: 'https://www.youtube.com/watch?v=Tzutr9-GAV4&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=7&pp=iAQB',
            descricao: 'Consultas usando interface gráfica.',
          },
          {
            titulo: 'MongoDB - 07 Executando consultas no mongoDB Shell',
            duracao: '15:38',
            link: 'https://www.youtube.com/watch?v=ja3oGLjigyc&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=8&pp=iAQB',
            descricao: 'Consultas via terminal.',
          },
          {
            titulo: 'MongoDB - 08 Utilizando operadores nas Consultas',
            duracao: '16:17',
            link: 'https://www.youtube.com/watch?v=5Xdc22CsYuA&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=9&pp=iAQB0gcJCQYLAYcqIYzv',
            descricao: 'Uso de operadores nas queries.',
          },
          {
            titulo: 'MongoDB - 10 Atualizando dados/documentos de uma coleção',
            duracao: '19:41',
            link: 'https://www.youtube.com/watch?v=ht9rxVYFb-8&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=11&pp=iAQB',
            descricao: 'Atualização de dados.',
          },
          {
            titulo: 'MongoDB - 11 Excluindo dados/documentos de uma coleção',
            duracao: '6:38',
            link: 'https://www.youtube.com/watch?v=QrJo2S-BK0w&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=12&pp=iAQB',
            descricao: 'Exclusão de documentos.',
          },
          {
            titulo: 'MongoDB - 17 Como trabalhar com índices',
            duracao: '20:59',
            link: 'https://www.youtube.com/watch?v=X6syu_o_xcU&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=19&pp=iAQB',
            descricao: 'Melhoria de performance com índices.',
          },
        ],
      },

      {
        titulo: 'Módulo 3: Projetos e Integração com Aplicações',
        descricao: 'Aplique MongoDB em projetos reais com Node.js e PHP criando CRUD completo.',

        aulas: [
          {
            titulo: 'MongoDB - Construindo meu primeiro cluster e banco de dados no MongoDB Atlas',
            duracao: '22:23',
            link: 'https://www.youtube.com/watch?v=qW_NxiWKQak&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=17&pp=iAQB0gcJCQYLAYcqIYzv',
            descricao: 'Criação de cluster na nuvem.',
          },
          {
            titulo: 'MongoDB - Como criar uma CRUD básica em Node.js e JavaScript',
            duracao: '37:57',
            link: 'https://www.youtube.com/watch?v=PeUYgAzvOgE&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=20&pp=iAQB',
            descricao: 'CRUD com Node.js.',
          },
          {
            titulo: 'CRUD com MongoDB e Node.js - Estruturando o Sistema',
            duracao: '7:22',
            link: 'https://www.youtube.com/watch?v=oQgdKC5wCLo&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=21&pp=iAQB',
            descricao: 'Estrutura do projeto.',
          },
          {
            titulo: 'CRUD com MongoDB e Node.js - Conexão com o MongoDB',
            duracao: '12:35',
            link: 'https://www.youtube.com/watch?v=jK8hFAY6LsU&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=23&pp=iAQB',
            descricao: 'Conectando aplicação ao banco.',
          },
          {
            titulo: 'CRUD com MongoDB e Node.js - Listagem e funcionalidades',
            duracao: '14:09',
            link: 'https://www.youtube.com/watch?v=fpJbSaWeuf4&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=24&pp=iAQB',
            descricao: 'Listagem de dados.',
          },
          {
            titulo: 'MongoDB: Construindo uma CRUD em PHP',
            duracao: '1:08:30',
            link: 'https://www.youtube.com/watch?v=TXEZudz0s1E&list=PLfvOpw8k80WpKTtloa7fMbfPWL7D6X5cC&index=27&pp=iAQB',
            descricao: 'CRUD completo usando PHP.',
          },
        ],
      },
    ],
  },

  {
  id: 'curso-cypress-automacao-testes',

  titulo: 'Automação com Cypress: Do básico ao CI/CD',

  categoria: 'QA',

  tecnologia: 'qa',

  nivel: 'Basico',

  duracao: '3h 41',

  professor: 'thairam-michel  ',

  videoPrincipal: 'https://www.youtube.com/watch?v=VyiFjUloYM4&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=1&pp=iAQB',

  tags: 'cypress, testes, automacao, qa, e2e, frontend, testing',

  trilhas: 'qa-testes,devops-docker-cloud',

  descricao:
    'Aprenda automação de testes com Cypress desde a configuração inicial até integração com CI/CD, aplicando boas práticas como Page Objects, variáveis de ambiente e relatórios.',

  destaque: 'Domine automação de testes com Cypress na prática',

  modulos: [
    {
      titulo: 'Módulo 1: Introdução e Configuração do Cypress',
      descricao: 'Aprenda o que é o Cypress, como configurar o ambiente e executar seus primeiros testes.',

      aulas: [
        {
          titulo: 'Cypress: Introdução a ferramenta',
          duracao: '6:25',
          link: 'https://www.youtube.com/watch?v=VyiFjUloYM4&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=1&pp=iAQB',
          descricao: 'Visão geral da ferramenta Cypress.',
        },
        {
          titulo: 'Cypress: Como configurar projeto do Zero e escrever seus primeiros testes',
          duracao: '53:06',
          link: 'https://www.youtube.com/watch?v=c40gn-Sr5cA&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=2&pp=iAQB',
          descricao: 'Configuração inicial e primeiros testes.',
        },
        {
          titulo: 'Cypress: Modos de execução e npm scripts',
          duracao: '8:53',
          link: 'https://www.youtube.com/watch?v=lkQroSZI9R0&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=3&pp=iAQB',
          descricao: 'Execução dos testes e automação com scripts.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Boas Práticas e Estruturação de Testes',
      descricao: 'Melhore a qualidade dos testes utilizando boas práticas e organização de código.',

      aulas: [
        {
          titulo: 'Cypress: Como configurar relatórios',
          duracao: '19:15',
          link: 'https://www.youtube.com/watch?v=Tkb1H4Cemak&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=4&pp=iAQB',
          descricao: 'Geração de relatórios de testes.',
        },
        {
          titulo: 'Cypress: Utilizando Hooks para melhorar o código',
          duracao: '11:35',
          link: 'https://www.youtube.com/watch?v=32XfoESUj6c&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=5&pp=iAQB',
          descricao: 'Uso de hooks para organização.',
        },
        {
          titulo: 'Cypress: Como utilizar Page Objects',
          duracao: '56:26',
          link: 'https://www.youtube.com/watch?v=PJFjf7NVh6U&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=6&pp=iAQB',
          descricao: 'Aplicando padrão Page Object.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Ambientes, Segurança e CI/CD',
      descricao: 'Aprenda a rodar testes em diferentes ambientes e integrar com pipelines.',

      aulas: [
        {
          titulo: 'Cypress: Como executar os testes em diferentes ambientes',
          duracao: '11:59',
          link: 'https://www.youtube.com/watch?v=_emhrg2S36M&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=7&pp=iAQB',
          descricao: 'Execução em múltiplos ambientes.',
        },
        {
          titulo: 'Cypress: Como não versionar dados sensíveis',
          duracao: '11:57',
          link: 'https://www.youtube.com/watch?v=NL76G43txPg&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=8&pp=iAQB',
          descricao: 'Boas práticas de segurança.',
        },
        {
          titulo: 'Cypress com Github Actions',
          duracao: '11:51',
          link: 'https://www.youtube.com/watch?v=hL9wLCijrVA&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=9&pp=iAQB',
          descricao: 'Integração com CI usando GitHub.',
        },
        {
          titulo: 'Cypress com Gitlab CI',
          duracao: '8:22',
          link: 'https://www.youtube.com/watch?v=iynsolvc378&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=10&pp=iAQB',
          descricao: 'Integração com GitLab CI.',
        },
        {
          titulo: 'Cypress: Como utilizar Variáveis de ambiente',
          duracao: '21:24',
          link: 'https://www.youtube.com/watch?v=IS_6HkSp7A8&list=PLBHHiNoJsoNxnovuGjHsC0oZpN99PMhT9&index=11&pp=iAQB',
          descricao: 'Uso de variáveis de ambiente nos testes.',
        },
      ],
    },
  ],
},

{
  id: 'curso-aws-cloud-practitioner',

  titulo: 'AWS Certified Cloud Practitioner: Do zero à certificação',

  categoria: 'DevOps',

  tecnologia: 'docker-cloud',

  nivel: 'Iniciante',

  duracao: '14h 54',

  professor: 'Isaque Alcantara',

  videoPrincipal: 'https://www.youtube.com/watch?v=keHP-56Bifo&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=1&pp=iAQB',

  tags: 'aws, cloud, devops, certificacao, cloud-computing, infraestrutura',

  trilhas: 'devops-docker-cloud',

  descricao:
    'Aprenda os fundamentos da computação em nuvem com AWS e prepare-se para a certificação Cloud Practitioner, entendendo serviços, arquitetura, segurança e boas práticas.',

  destaque: 'Prepare-se para certificação AWS Cloud Practitioner',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos de Cloud e AWS',
      descricao: 'Introdução aos conceitos de computação em nuvem e visão geral da AWS.',

      aulas: [
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 1',
          duracao: '1:02:12',
          link: 'https://www.youtube.com/watch?v=keHP-56Bifo&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=1&pp=iAQB',
          descricao: 'Introdução à certificação e conceitos de cloud.',
        },
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 2',
          duracao: '1:30:52',
          link: 'https://www.youtube.com/watch?v=Yt5Wd7ZC3d4&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=2&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Modelos de serviço e conceitos básicos.',
        },
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 3',
          duracao: '43:03',
          link: 'https://www.youtube.com/watch?v=-GB_hvNf7sk&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=3&pp=iAQB',
          descricao: 'Infraestrutura global da AWS.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Serviços Principais da AWS',
      descricao: 'Conheça os principais serviços utilizados na AWS.',

      aulas: [
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 4',
          duracao: '54:40',
          link: 'https://www.youtube.com/watch?v=PPrvwuSHLLQ&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=4&pp=iAQB',
          descricao: 'Serviços de computação.',
        },
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 5',
          duracao: '1:21:31',
          link: 'https://www.youtube.com/watch?v=w_9KaO83Qfs&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=5&pp=iAQB',
          descricao: 'Serviços de armazenamento.',
        },
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 6',
          duracao: '1:27:02',
          link: 'https://www.youtube.com/watch?v=GFf2NDd0sTw&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=6&pp=iAQB',
          descricao: 'Banco de dados e serviços relacionados.',
        },
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 7',
          duracao: '1:12:37',
          link: 'https://www.youtube.com/watch?v=590i6PNQ6Do&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=7&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Redes e entrega de conteúdo.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Segurança, Custos e Boas Práticas',
      descricao: 'Aprenda sobre segurança, precificação e governança na AWS.',

      aulas: [
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 8',
          duracao: '1:48:20',
          link: 'https://www.youtube.com/watch?v=iWTxcljL1kc&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=8&pp=iAQB',
          descricao: 'Segurança na AWS.',
        },
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 9',
          duracao: '42:27',
          link: 'https://www.youtube.com/watch?v=_Fe11henGpY&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=9&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Gerenciamento de identidade e acesso.',
        },
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 10',
          duracao: '1:05:41',
          link: 'https://www.youtube.com/watch?v=EjQzn55ykCg&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=10&pp=iAQB',
          descricao: 'Modelos de cobrança e custos.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Revisão e Preparação para Certificação',
      descricao: 'Revisão dos conteúdos e preparação final para prova.',

      aulas: [
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula 11',
          duracao: '45:54',
          link: 'https://www.youtube.com/watch?v=0LFjtEEMnpI&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=11&pp=iAQB',
          descricao: 'Revisão geral dos conceitos.',
        },
        {
          titulo: 'AWS Certified Cloud Practitioner | Aula Final',
          duracao: '19:54',
          link: 'https://www.youtube.com/watch?v=fe52MlLAIKI&list=PLz3hnOImntAPoJZ2JAWtOzc34X1EI_ge7&index=12&pp=iAQB',
          descricao: 'Encerramento e preparação final.',
        },
      ],
    },
  ],
},

{
  id: 'curso-javascript-avancado-nodejs',

  titulo: 'JavaScript Avançado + Node.js (Level Up)',

  categoria: 'Back-end',

  tecnologia: 'node',

  nivel: 'Intermediario',

  duracao: '4h 30',

  professor: 'José de Assis',

  videoPrincipal: 'https://www.youtube.com/watch?v=S6ew1nLgLhM&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=1&pp=iAQB',

  tags: 'javascript, nodejs, npm, backend, poo, async, api, programacao',

  trilhas: 'node-backend,javascript-frontend',

  descricao:
    'Aprofunde seus conhecimentos em JavaScript moderno com Node.js, explorando sintaxe avançada, programação orientada a objetos, estruturas de dados e assincronismo.',

  destaque: 'Domine JavaScript moderno e Node.js na prática',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos do Node.js e Ambiente',
      descricao: 'Configuração do ambiente e ferramentas essenciais do Node.js.',

      aulas: [
        {
          titulo: 'Desenvolvimento profissional em JavaScript com Node.js',
          duracao: '6:37',
          link: 'https://www.youtube.com/watch?v=S6ew1nLgLhM&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=1&pp=iAQB',
          descricao: 'Introdução ao curso e ambiente Node.js.',
        },
        {
          titulo: 'NPM (gerenciador de pacotes) - package.json',
          duracao: '10:51',
          link: 'https://www.youtube.com/watch?v=2psKa1wJNcI&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=2&pp=iAQB',
          descricao: 'Gerenciamento de dependências com NPM.',
        },
        {
          titulo: 'Nodemon - Instalação e configuração',
          duracao: '10:37',
          link: 'https://www.youtube.com/watch?v=yxOdYtS0wfw&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=3&pp=iAQB',
          descricao: 'Automação de execução do servidor.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Sintaxe Moderna do JavaScript',
      descricao: 'Conceitos modernos da linguagem JavaScript.',

      aulas: [
        {
          titulo: 'Sintaxe moderna do JavaScript',
          duracao: '3:55',
          link: 'https://www.youtube.com/watch?v=vBdb7vlUaGU&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=4&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Introdução às novas features do JS.',
        },
        {
          titulo: 'Constantes e variáveis (var, let, const)',
          duracao: '10:40',
          link: 'https://www.youtube.com/watch?v=Nw4j8FzKlME&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=5&pp=iAQB',
          descricao: 'Diferenças e boas práticas.',
        },
        {
          titulo: 'Operadores (aritméticos, atribuição e lógicos)',
          duracao: '11:19',
          link: 'https://www.youtube.com/watch?v=hvpKoKB8mqU&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=6&pp=iAQB',
          descricao: 'Uso de operadores no JS.',
        },
        {
          titulo: 'Tipagem dinâmica',
          duracao: '14:52',
          link: 'https://www.youtube.com/watch?v=dmU_3YxpdhI&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=7&pp=iAQB',
          descricao: 'Como funciona a tipagem no JavaScript.',
        },
        {
          titulo: 'Estruturas de controle sem chaves',
          duracao: '9:22',
          link: 'https://www.youtube.com/watch?v=oXVhgMFMHCs&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=8&pp=iAQB',
          descricao: 'Simplificando o código.',
        },
        {
          titulo: 'Entrada de dados via terminal',
          duracao: '13:28',
          link: 'https://www.youtube.com/watch?v=-InfpbOf0C8&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=9&pp=iAQB',
          descricao: 'Interação com o usuário.',
        },
        {
          titulo: 'Arrow Functions',
          duracao: '10:42',
          link: 'https://www.youtube.com/watch?v=bV84h_R8jKo&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=10&pp=iAQB',
          descricao: 'Funções modernas no JavaScript.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Programação Orientada a Objetos',
      descricao: 'Aplicando conceitos de POO com JavaScript moderno.',

      aulas: [
        {
          titulo: 'POO - Abstração',
          duracao: '13:15',
          link: 'https://www.youtube.com/watch?v=ae9jnKg7vHc&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=11&pp=iAQB',
          descricao: 'Criação de objetos.',
        },
        {
          titulo: 'POO - Herança',
          duracao: '8:46',
          link: 'https://www.youtube.com/watch?v=0_S7BC_Diuw&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=12&pp=iAQB',
          descricao: 'Reutilização de código.',
        },
        {
          titulo: 'POO - Polimorfismo',
          duracao: '2:47',
          link: 'https://www.youtube.com/watch?v=Q-HLv4S5Ye0&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=13&pp=iAQB',
          descricao: 'Comportamentos diferentes.',
        },
        {
          titulo: 'POO - Encapsulamento',
          duracao: '8:39',
          link: 'https://www.youtube.com/watch?v=vTfGieXfulE&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=14&pp=iAQB',
          descricao: 'Proteção de dados.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Estruturas de Dados',
      descricao: 'Manipulação de arrays e objetos.',

      aulas: [
        {
          titulo: 'Estruturas de dados com objetos',
          duracao: '13:27',
          link: 'https://www.youtube.com/watch?v=54sNKiv1BZs&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=15&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Uso de objetos como estrutura.',
        },
        {
          titulo: 'Arrays (vetores e matrizes)',
          duracao: '8:31',
          link: 'https://www.youtube.com/watch?v=fPSqyGg4xFA&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=16&pp=iAQB',
          descricao: 'Conceitos básicos de arrays.',
        },
        {
          titulo: 'Jogo de cartas com array',
          duracao: '8:25',
          link: 'https://www.youtube.com/watch?v=o3-Fa7GPBVg&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=17&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Exemplo prático.',
        },
        {
          titulo: 'Manipulação de arrays',
          duracao: '15:41',
          link: 'https://www.youtube.com/watch?v=0qCe03_O8Zc&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=18&pp=iAQB',
          descricao: 'Métodos importantes.',
        },
        {
          titulo: 'for, forEach e map()',
          duracao: '10:42',
          link: 'https://www.youtube.com/watch?v=fBGqHPwSMVo&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=19&pp=iAQB',
          descricao: 'Percorrendo arrays.',
        },
        {
          titulo: 'Arrays e objetos combinados',
          duracao: '15:32',
          link: 'https://www.youtube.com/watch?v=MeEZSq1t3rY&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=20&pp=iAQB',
          descricao: 'Estruturas mais complexas.',
        },
      ],
    },

    {
      titulo: 'Módulo 5: Assincronismo e APIs',
      descricao: 'Trabalhando com código assíncrono no JavaScript.',

      aulas: [
        {
          titulo: 'Promises',
          duracao: '14:37',
          link: 'https://www.youtube.com/watch?v=fkNjKyIq7pQ&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=21&pp=iAQB',
          descricao: 'Introdução ao assincronismo.',
        },
        {
          titulo: 'Consumindo API com fetch',
          duracao: '7:59',
          link: 'https://www.youtube.com/watch?v=m9UdnOm26Gs&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=22&pp=iAQB',
          descricao: 'Requisições HTTP.',
        },
        {
          titulo: 'Async/Await',
          duracao: '8:09',
          link: 'https://www.youtube.com/watch?v=M3TVfZObotU&list=PLbEOwbQR9lqzioSn8cZb6VHEbqdsuSAQI&index=23&pp=iAQB',
          descricao: 'Sintaxe moderna para assincronismo.',
        },
      ],
    },
  ],
},

{
  id: 'curso-jwt-php',

  titulo: 'Autenticação JWT com PHP',

  categoria: 'Back-end',

  tecnologia: 'php',

  nivel: 'Intermediario',

  duracao: '55m',

  professor: 'AlexandreCardoso',

  videoPrincipal: 'https://www.youtube.com/watch?v=Wv02i0yNVVs&list=PLyugqHiq-SKc2qC6JYbjn5PsgIyKUATbI&index=1&pp=iAQB',

  tags: 'php, jwt, autenticacao, backend, api, seguranca, token',

  trilhas: 'php-backend,sql-banco-dados',

  descricao:
    'Aprenda a implementar autenticação utilizando JWT (Json Web Token) com PHP, criando tokens, validando acessos e protegendo rotas em aplicações web.',

  destaque: 'Implemente autenticação segura com JWT em PHP',

  modulos: [
    {
      titulo: 'Módulo 1: Estrutura e Criação do Token',
      descricao: 'Configuração do projeto e criação do JWT.',

      aulas: [
        {
          titulo: 'Autenticação com JWT com PHP #01 - Criando estrutura do back e frontend',
          duracao: '11:27',
          link: 'https://www.youtube.com/watch?v=Wv02i0yNVVs&list=PLyugqHiq-SKc2qC6JYbjn5PsgIyKUATbI&index=1&pp=iAQB',
          descricao: 'Estrutura inicial do projeto.',
        },
        {
          titulo: 'Autenticação JWT com PHP #02 - Criando o token',
          duracao: '22:52',
          link: 'https://www.youtube.com/watch?v=s9cbGWtEFCY&list=PLyugqHiq-SKc2qC6JYbjn5PsgIyKUATbI&index=2&pp=iAQB',
          descricao: 'Geração do token JWT.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Validação e Segurança',
      descricao: 'Validação e uso do token na aplicação.',

      aulas: [
        {
          titulo: 'Autenticação JWT com PHP #03 - Autenticando com o token',
          duracao: '12:45',
          link: 'https://www.youtube.com/watch?v=P4bAs4Mz6m4&list=PLyugqHiq-SKc2qC6JYbjn5PsgIyKUATbI&index=3&pp=iAQB',
          descricao: 'Validação do token JWT.',
        },
        {
          titulo: 'Autenticação JWT com PHP #04 - Atualizando o decode',
          duracao: '7:36',
          link: 'https://www.youtube.com/watch?v=s2wOHSuP1F4&list=PLyugqHiq-SKc2qC6JYbjn5PsgIyKUATbI&index=4&pp=iAQB',
          descricao: 'Decodificação e ajustes do token.',
        },
      ],
    },
  ],
},

{
  id: 'clean-code-boas-praticas',

  titulo: 'Boas práticas de desenvolvimento e Clean Code',

  categoria: 'Programação',

  tecnologia: 'logica',

  nivel: 'Intermediario',

  duracao: '2h 30',

  professor: 'Renato Augusto',

  videoPrincipal: 'https://www.youtube.com/watch?v=vFBUWtrzz48&list=PLNHxHgB-_LTtnyj453VPF7_CdYM4dpv_Z&index=1&pp=iAQB',

  tags: 'clean-code, boas-praticas, orientacao-a-objetos, qualidade-de-codigo, arquitetura',

  trilhas: 'logica-algoritmos,carreira-comunicacao',

  descricao:
    'Aprenda boas práticas de desenvolvimento de software, princípios de Clean Code, orientação a objetos e como escrever código mais limpo, organizado e sustentável.',

  destaque: 'Escreva código profissional e de alta qualidade',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos de Clean Code',
      descricao: 'Entenda problemas comuns e boas práticas no desenvolvimento.',

      aulas: [
        {
          titulo: 'Por que não usar FLOAT para dinheiro',
          duracao: '13:24',
          link: 'https://www.youtube.com/watch?v=vFBUWtrzz48&list=PLNHxHgB-_LTtnyj453VPF7_CdYM4dpv_Z&index=1&pp=iAQB',
          descricao: 'Problemas de precisão e como resolver corretamente.',
        },
        {
          titulo: 'Lei de Demeter',
          duracao: '16:55',
          link: 'https://www.youtube.com/watch?v=KXaPJhG9yCk&list=PLNHxHgB-_LTtnyj453VPF7_CdYM4dpv_Z&index=2&pp=iAQB',
          descricao: 'Reduzindo acoplamento entre classes.',
        },
        {
          titulo: 'Aumentando coesão de classes',
          duracao: '27:01',
          link: 'https://www.youtube.com/watch?v=_OKbQKjiKR8&list=PLNHxHgB-_LTtnyj453VPF7_CdYM4dpv_Z&index=3&pp=iAQB',
          descricao: 'Como deixar classes mais organizadas.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Boas práticas avançadas',
      descricao: 'Técnicas para melhorar qualidade e manutenção do código.',

      aulas: [
        {
          titulo: 'Eliminando o uso de ELSE',
          duracao: '25:02',
          link: 'https://www.youtube.com/watch?v=pW9Bb4PteWU&list=PLNHxHgB-_LTtnyj453VPF7_CdYM4dpv_Z&index=4&pp=iAQB',
          descricao: 'Estratégias para simplificar lógica.',
        },
        {
          titulo: 'Problemas com tipos primitivos',
          duracao: '28:30',
          link: 'https://www.youtube.com/watch?v=YGNH71KPIes&list=PLNHxHgB-_LTtnyj453VPF7_CdYM4dpv_Z&index=5&pp=iAQB',
          descricao: 'Como evitar fragilidade no código.',
        },
        {
          titulo: 'Evitar getters e setters',
          duracao: '21:25',
          link: 'https://www.youtube.com/watch?v=PXHqooNlkVM&list=PLNHxHgB-_LTtnyj453VPF7_CdYM4dpv_Z&index=6&pp=iAQB',
          descricao: 'Encapsulamento na prática.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Código profissional',
      descricao: 'Identificando problemas reais e melhorando seu código.',

      aulas: [
        {
          titulo: 'Sintomas de código ruim',
          duracao: '10:47',
          link: 'https://www.youtube.com/watch?v=S2mMFopw_ww&list=PLNHxHgB-_LTtnyj453VPF7_CdYM4dpv_Z&index=7&pp=iAQB',
          descricao: 'Como identificar código problemático.',
        },
        {
          titulo: 'Princípio YAGNI',
          duracao: '8:26',
          link: 'https://www.youtube.com/watch?v=wjtfJ9c4KdM&list=PLNHxHgB-_LTtnyj453VPF7_CdYM4dpv_Z&index=8&pp=iAQB',
          descricao: 'Evite complexidade desnecessária.',
        },
      ],
    },
  ],
},

{
  id: 'testes-api-rest-completo',

  titulo: 'Testes de API REST do zero ao avançado',

  categoria: 'QA',

  tecnologia: 'qa',

  nivel: 'Intermediario',

  duracao: '9h',

  professor: 'Julio de Lima',

  videoPrincipal: 'https://www.youtube.com/watch?v=VqVQ7vHY32o&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=1&pp=iAQB',

  tags: 'api, testes, qa, rest, postman, insomnia, restassured, automacao',

  trilhas: 'qa-testes,node-backend,java-spring,php-backend',

  descricao:
    'Aprenda testes de API REST do zero até estratégias avançadas, incluindo automação com RestAssured, uso de Postman, Insomnia e validações completas de APIs.',

  destaque: 'Domine testes de API e vire um QA completo',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos de API REST',
      descricao: 'Entenda o funcionamento das APIs e conceitos básicos.',

      aulas: [
        {
          titulo: 'Introdução aos Testes de API Rest',
          duracao: '12:43',
          link: 'https://www.youtube.com/watch?v=VqVQ7vHY32o&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=1&pp=iAQB',
          descricao: 'Visão geral sobre testes de API.',
        },
        {
          titulo: 'Introdução a APIs Rest',
          duracao: '15:38',
          link: 'https://www.youtube.com/watch?v=D6Ju-rzKMoQ&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=2&pp=iAQB',
          descricao: 'Conceitos fundamentais de APIs.',
        },
        {
          titulo: 'O que está por trás da API Rest',
          duracao: '33:16',
          link: 'https://www.youtube.com/watch?v=0z11DUsIxTo&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=3&pp=iAQB',
          descricao: 'Como APIs funcionam internamente.',
        },
        {
          titulo: 'Requests e Responses',
          duracao: '30:26',
          link: 'https://www.youtube.com/watch?v=sUk9pyThv-U&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=4&pp=iAQB',
          descricao: 'Entendendo comunicação cliente-servidor.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Testando APIs na prática',
      descricao: 'Ferramentas e execução de testes manuais.',

      aulas: [
        {
          titulo: 'Instalando API de teste',
          duracao: '31:48',
          link: 'https://www.youtube.com/watch?v=9qeH4mmAWY4&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=5&pp=iAQB',
          descricao: 'Preparando ambiente de testes.',
        },
        {
          titulo: 'Headers, Swagger e Verbos HTTP',
          duracao: '24:40',
          link: 'https://www.youtube.com/watch?v=9UINHif1FYw&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=6&pp=iAQB',
          descricao: 'Uso de métodos e documentação.',
        },
        {
          titulo: 'Autenticação e autorização',
          duracao: '20:26',
          link: 'https://www.youtube.com/watch?v=IVMccb2h9dw&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=7&pp=iAQB',
          descricao: 'Segurança em APIs.',
        },
        {
          titulo: 'Parâmetros em APIs (Header, Query, Path, Body)',
          duracao: '24:41',
          link: 'https://www.youtube.com/watch?v=xqj_QBCevnw&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=8&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Como enviar dados corretamente.',
        },
        {
          titulo: 'Testes com Insomnia',
          duracao: '27:46',
          link: 'https://www.youtube.com/watch?v=2O8FHmHKMfM&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=9&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Ferramenta para testes de API.',
        },
        {
          titulo: 'Testes com Postman',
          duracao: '27:49',
          link: 'https://www.youtube.com/watch?v=5S9mMBEtJK4&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=10&pp=iAQB',
          descricao: 'Ferramenta popular de testes.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Automação e estratégias',
      descricao: 'Testes automatizados e boas práticas.',

      aulas: [
        {
          titulo: 'Automação com RestAssured',
          duracao: '43:27',
          link: 'https://www.youtube.com/watch?v=kWdAhtcyxw8&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=11&pp=iAQB',
          descricao: 'Automatizando testes de API.',
        },
        {
          titulo: 'Estratégias de testes',
          duracao: '31:35',
          link: 'https://www.youtube.com/watch?v=sA-avXicmLs&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=12&pp=iAQB',
          descricao: 'Planejamento de testes.',
        },
        {
          titulo: 'Cobertura de testes',
          duracao: '12:05',
          link: 'https://www.youtube.com/watch?v=Qg_CSobBdEk&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=13&pp=iAQB',
          descricao: 'Como medir qualidade dos testes.',
        },
        {
          titulo: 'Testes funcionais',
          duracao: '24:03',
          link: 'https://www.youtube.com/watch?v=UbNwR07Id64&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=14&pp=iAQB',
          descricao: 'Validação de comportamento.',
        },
        {
          titulo: 'Testes de performance',
          duracao: '26:37',
          link: 'https://www.youtube.com/watch?v=Wjig_fVSL6w&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=15&pp=iAQB',
          descricao: 'Avaliação de desempenho.',
        },
        {
          titulo: 'Testes de compatibilidade',
          duracao: '18:08',
          link: 'https://www.youtube.com/watch?v=lHMErRSrkCo&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=16&pp=iAQB',
          descricao: 'Garantindo funcionamento em ambientes.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Técnicas avançadas',
      descricao: 'Técnicas modernas para QA profissional.',

      aulas: [
        {
          titulo: 'Criação de mocks',
          duracao: '21:06',
          link: 'https://www.youtube.com/watch?v=RN8qQ_you_o&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=17&pp=iAQB',
          descricao: 'Simulação de APIs.',
        },
        {
          titulo: 'Validação com JsonSchema',
          duracao: '14:26',
          link: 'https://www.youtube.com/watch?v=ky6z-AtQVL4&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=18&pp=iAQB',
          descricao: 'Validando estrutura de dados.',
        },
        {
          titulo: 'Leitura de logs',
          duracao: '11:25',
          link: 'https://www.youtube.com/watch?v=Hr1wBUUTW1Y&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=19&pp=iAQB',
          descricao: 'Analisando problemas.',
        },
        {
          titulo: 'Evoluindo em testes de API',
          duracao: '3:47',
          link: 'https://www.youtube.com/watch?v=HOMeq9hIaeE&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=20&pp=iAQB',
          descricao: 'Próximos passos na carreira.',
        },
        {
          titulo: 'Dicas para entrevistas',
          duracao: '20:36',
          link: 'https://www.youtube.com/watch?v=x_DpDTuNsL4&list=PLf8x7B3nFTl17WeEVj405tHlstiq1kNBX&index=21&pp=iAQB',
          descricao: 'Preparação para o mercado.',
        },
      ],
    },
  ],
},

{
  id: 'seguranca-software-owasp',

  titulo: 'Segurança de Software e OWASP Top 10',

  categoria: 'DevOps',

  tecnologia: 'seguranca',

  nivel: 'Intermediario',

  duracao: '3h',

  professor: 'pessonizando',

  videoPrincipal: 'https://www.youtube.com/watch?v=5x-eXStbzlM&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=13&pp=iAQB0gcJCQYLAYcqIYzv',

  tags: 'seguranca, owasp, vulnerabilidades, criptografia, autenticacao, backend, devsecops',

  trilhas: 'devops-docker-cloud,node-backend,java-spring,php-backend',

  descricao:
    'Aprenda os fundamentos de segurança de software, incluindo OWASP Top 10, vulnerabilidades comuns, autenticação, criptografia e boas práticas para proteger aplicações.',

  destaque: 'Proteja suas aplicações contra falhas e ataques reais',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos de Segurança',
      descricao: 'Conceitos essenciais de segurança de software.',

      aulas: [
        {
          titulo: 'O que é segurança em software',
          duracao: '9:47',
          link: 'https://www.youtube.com/watch?v=5x-eXStbzlM&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=13&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Introdução à segurança.',
        },
        {
          titulo: 'Por que precisamos de segurança',
          duracao: '13:45',
          link: 'https://www.youtube.com/watch?v=D1bXs-eHN9M&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=12&pp=iAQB',
          descricao: 'Importância da segurança.',
        },
        {
          titulo: 'Segurança funcional e não funcional',
          duracao: '7:56',
          link: 'https://www.youtube.com/watch?v=5x-eXStbzlM&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=13',
          descricao: 'Diferenças e conceitos.',
        },
        {
          titulo: 'Tríade CID (Confidencialidade, Integridade, Disponibilidade)',
          duracao: '10:59',
          link: 'https://www.youtube.com/watch?v=7c-nON1sVes&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=10&pp=iAQB',
          descricao: 'Base da segurança da informação.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: OWASP Top 10',
      descricao: 'Principais vulnerabilidades do mundo.',

      aulas: [
        {
          titulo: 'OWASP Top 10',
          duracao: '3:39',
          link: 'https://www.youtube.com/watch?v=K4nqTy75CkQ&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=9&pp=iAQB',
          descricao: 'Principais ameaças.',
        },
        {
          titulo: 'Quebra de controle de acesso',
          duracao: '14:22',
          link: 'https://www.youtube.com/watch?v=084ptOPTtRs&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=8&pp=iAQB',
          descricao: 'Falhas de autorização.',
        },
        {
          titulo: 'Falhas criptográficas',
          duracao: '22:42',
          link: 'https://www.youtube.com/watch?v=q_sbVYTJa4k&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=7&pp=iAQB',
          descricao: 'Problemas com criptografia.',
        },
        {
          titulo: 'Injeção de código',
          duracao: '14:35',
          link: 'https://www.youtube.com/watch?v=6YiRhRBn6m4&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=6&pp=iAQB',
          descricao: 'Ataques como SQL Injection.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Vulnerabilidades e falhas comuns',
      descricao: 'Problemas frequentes em aplicações.',

      aulas: [
        {
          titulo: 'Projeto de software inseguro',
          duracao: '23:35',
          link: 'https://www.youtube.com/watch?v=4fn3ZZFhz4M&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=5&pp=iAQB',
          descricao: 'Erros de arquitetura.',
        },
        {
          titulo: 'Configuração de segurança incorreta',
          duracao: '13:54',
          link: 'https://www.youtube.com/watch?v=VBTniKv4djo&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=4&pp=iAQB',
          descricao: 'Problemas de configuração.',
        },
        {
          titulo: 'Componentes desatualizados',
          duracao: '13:28',
          link: 'https://www.youtube.com/watch?v=rUU9TN_MABg&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=3&pp=iAQB',
          descricao: 'Dependências vulneráveis.',
        },
        {
          titulo: 'Falhas de identificação e autenticação',
          duracao: '20:35',
          link: 'https://www.youtube.com/watch?v=eTH3ZElqeF0&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=2&pp=iAQB',
          descricao: 'Problemas de login.',
        },
        {
          titulo: 'Falhas de integridade de dados',
          duracao: '13:47',
          link: 'https://www.youtube.com/watch?v=toTA8na9yqY&list=PLEqTHftpM91OZzAIOwMcAuQ4ciK1n4_Ll&index=1&pp=iAQB',
          descricao: 'Manipulação indevida de dados.',
        },
      ],
    },
  ],
},

{
  id: 'devops-cloud-ci-cd',

  titulo: 'DevOps, Cloud e CI/CD na prática',

  categoria: 'DevOps',

  tecnologia: 'docker-cloud',

  nivel: 'Intermediario',

  duracao: '12h',

  professor: 'Fernanda Kipper',

  videoPrincipal: 'https://www.youtube.com/watch?v=DdoncfOdru8&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=1&pp=iAQB',

  tags: 'devops, docker, aws, ci-cd, nginx, terraform, github-actions, cloud',

  trilhas: 'devops-docker-cloud,git-github',

  descricao:
    'Aprenda DevOps na prática com Docker, AWS, CI/CD, Nginx, Terraform e arquitetura de sistemas, construindo aplicações completas e realizando deploy em ambiente real.',

  destaque: 'Domine DevOps, Cloud e CI/CD em um único curso',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos de Docker',
      descricao: 'Introdução e uso de containers.',

      aulas: [
        {
          titulo: 'APRENDA DOCKER DO ZERO | TUTORIAL COMPLETO COM DEPLOY',
          duracao: '44:15',
          link: 'https://www.youtube.com/watch?v=DdoncfOdru8&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=1&pp=iAQB',
          descricao: 'Introdução ao Docker.',
        },
        {
          titulo: 'O que são containers Docker?',
          duracao: '0:39',
          link: 'https://www.youtube.com/watch?v=PR03-QAd1dU&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=16&pp=iAQB',
          descricao: 'Conceito de containers.',
        },
        {
          titulo: 'Aprenda Docker Compose',
          duracao: '14:14',
          link: 'https://www.youtube.com/watch?v=D_ha0g9yS2E&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=5&pp=iAQB',
          descricao: 'Orquestração com Docker Compose.',
        },
        {
          titulo: 'INTENSIVÃO DOCKER EM 2H',
          duracao: '1:44:07',
          link: 'https://www.youtube.com/watch?v=D_ha0g9yS2E&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=5&pp=iAQB',
          descricao: 'Aprofundamento em Docker.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Backend e Deploy',
      descricao: 'Construção e deploy de aplicações.',

      aulas: [
        {
          titulo: 'Criando BACKEND COMPLETO com Java Spring + AWS',
          duracao: '2:10:39',
          link: 'https://www.youtube.com/watch?v=d0KaNzAMVO4&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=2&pp=iAQB',
          descricao: 'Backend completo com cloud.',
        },
        {
          titulo: 'Deploy de aplicação Java Spring na AWS',
          duracao: '42:34',
          link: 'https://www.youtube.com/watch?v=bEkCdlrxF54&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=7&pp=iAQB',
          descricao: 'Publicação na AWS.',
        },
        {
          titulo: 'Criando aplicação Serverless com AWS Lambda',
          duracao: '37:03',
          link: 'https://www.youtube.com/watch?v=RCacN_-MKPc&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=8&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Arquitetura serverless.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Infraestrutura e DevOps',
      descricao: 'Ferramentas e práticas de infraestrutura.',

      aulas: [
        {
          titulo: 'Aprenda NGINX do zero',
          duracao: '51:07',
          link: 'https://www.youtube.com/watch?v=gd_cUmwzgEM&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=4&pp=iAQB',
          descricao: 'Servidor web e proxy.',
        },
        {
          titulo: 'Pipeline CI/CD com GitHub Actions',
          duracao: '1:31:33',
          link: 'https://www.youtube.com/watch?v=df_WMXk7JxE&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=10&pp=iAQB',
          descricao: 'Automação de deploy.',
        },
        {
          titulo: 'Infraestrutura com Terraform',
          duracao: '36:43',
          link: 'https://www.youtube.com/watch?v=BslJdgv_I2c&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=11&pp=iAQB',
          descricao: 'Infra como código.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Arquitetura e Escalabilidade',
      descricao: 'Conceitos avançados de sistemas.',

      aulas: [
        {
          titulo: 'API REST x GraphQL',
          duracao: '29:13',
          link: 'https://www.youtube.com/watch?v=VJHb-MONfi8&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=3&pp=iAQB',
          descricao: 'Comparação de arquiteturas.',
        },
        {
          titulo: 'Você não sabe arquitetura de software',
          duracao: '11:43',
          link: 'https://www.youtube.com/watch?v=SWgCLOW1bCE&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=9&pp=iAQB',
          descricao: 'Conceitos de arquitetura.',
        },
        {
          titulo: 'Aplicação escalável com Angular',
          duracao: '46:06',
          link: 'https://www.youtube.com/watch?v=o2_RBMABx4s&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=14&pp=iAQB',
          descricao: 'Escalabilidade no front.',
        },
        {
          titulo: 'O mínimo sobre System Design',
          duracao: '1:02:23',
          link: 'https://www.youtube.com/watch?v=yaNjUYg6yY0&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=17&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Base de design de sistemas.',
        },
      ],
    },

    {
      titulo: 'Módulo 5: Performance e mercado',
      descricao: 'Boas práticas e cenários reais.',

      aulas: [
        {
          titulo: 'O que é CDN',
          duracao: '9:26',
          link: 'https://www.youtube.com/watch?v=pOFToA0Upek&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=15&pp=iAQB',
          descricao: 'Performance de aplicações.',
        },
        {
          titulo: 'Onde hospedar sua aplicação',
          duracao: '46:17',
          link: 'https://www.youtube.com/watch?v=5qUvI58eFr8&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=13&pp=iAQB',
          descricao: 'Comparação de plataformas.',
        },
        {
          titulo: 'Desafio backend com AWS',
          duracao: '44:30',
          link: 'https://www.youtube.com/watch?v=rqOi8h1GDb8&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=12&pp=iAQB',
          descricao: 'Caso prático.',
        },
        {
          titulo: 'Incidente da Railway',
          duracao: '22:56',
          link: 'https://www.youtube.com/watch?v=Ry8UJPcDB6E&list=PLNCSWIsR6ADKdmgkzm4qluf5psqJ6i3JQ&index=18&pp=iAQB',
          descricao: 'Análise de falha real.',
        },
      ],
    },
  ],
},

{
  id: 'fundamentos-http-api-web',

  titulo: 'Fundamentos de HTTP e APIs Web',

  categoria: 'Fundamentos',

  tecnologia: 'api',

  nivel: 'Iniciante',

  duracao: '1h 10',

  professor: 'Mauro de Boni',

  videoPrincipal: 'https://www.youtube.com/watch?v=e5OS6EPnN3w&list=PLx6gdu4s3nkceYGr8i4H0necTuN_gx8H_&index=1&pp=iAQB',

  tags: 'http, api, web, rest, get, post, put, delete, backend, frontend',

  trilhas: 'node-backend,java-spring,php-backend,go-backend,qa-testes',

  descricao:
    'Aprenda como funciona o protocolo HTTP, os principais métodos utilizados em APIs e como realizar requisições na prática com ferramentas modernas.',

  destaque: 'Entenda como frontend e backend se comunicam na prática',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos do HTTP',
      descricao: 'Entenda o que é HTTP e como funciona a comunicação na web.',

      aulas: [
        {
          titulo: 'Protocolo HTTP: o que é e como funciona',
          duracao: '14:15',
          link: 'https://www.youtube.com/watch?v=e5OS6EPnN3w&list=PLx6gdu4s3nkceYGr8i4H0necTuN_gx8H_&index=1&pp=iAQB',
          descricao: 'Visão geral do protocolo HTTP.',
        },
        {
          titulo: 'HTTPie: guia básico',
          duracao: '9:41',
          link: 'https://www.youtube.com/watch?v=udca-FJma4g&list=PLx6gdu4s3nkceYGr8i4H0necTuN_gx8H_&index=2&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Ferramenta para testes HTTP.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Métodos HTTP',
      descricao: 'Aprenda os principais métodos usados em APIs.',

      aulas: [
        {
          titulo: 'Método GET na prática',
          duracao: '15:57',
          link: 'https://www.youtube.com/watch?v=CVq0TN1DqU0&list=PLx6gdu4s3nkceYGr8i4H0necTuN_gx8H_&index=3&pp=iAQB',
          descricao: 'Como buscar dados.',
        },
        {
          titulo: 'Método POST',
          duracao: '11:43',
          link: 'https://www.youtube.com/watch?v=v2yXdMnRORQ&list=PLx6gdu4s3nkceYGr8i4H0necTuN_gx8H_&index=5&pp=iAQB',
          descricao: 'Como enviar dados.',
        },
        {
          titulo: 'Métodos PUT e DELETE',
          duracao: '11:12',
          link: 'https://www.youtube.com/watch?v=dagGES1XBfg&list=PLx6gdu4s3nkceYGr8i4H0necTuN_gx8H_&index=6&pp=iAQB',
          descricao: 'Atualizar e deletar dados.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Conceitos Avançados',
      descricao: 'Conceitos importantes para APIs profissionais.',

      aulas: [
        {
          titulo: 'Idempotência no HTTP',
          duracao: '9:47',
          link: 'https://www.youtube.com/watch?v=-50uDb_hExw&list=PLx6gdu4s3nkceYGr8i4H0necTuN_gx8H_&index=4&pp=iAQB',
          descricao: 'Conceito essencial para APIs REST.',
        },
      ],
    },
  ],
},

{
  id: 'linux-para-iniciantes',

  titulo: 'Linux para Desenvolvedores (Curso em Vídeo)',

  categoria: 'Ferramentas',

  tecnologia: 'linux',

  nivel: 'Iniciante',

  duracao: '6h',

  professor: 'Gustavo Guanabara',

  videoPrincipal: 'https://www.youtube.com/watch?v=6nN2EglOqCM&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=1&pp=iAQB',

  tags: 'linux, terminal, bash, sistema-operacional, desenvolvedor, comandos',

  trilhas: 'devops-docker-cloud,git-github',

  descricao:
    'Aprenda Linux do zero com foco em desenvolvedores, explorando instalação, terminal, manipulação de arquivos e uso do sistema no dia a dia.',

  destaque: 'Domine o sistema operacional mais usado por desenvolvedores',

  modulos: [
    {
      titulo: 'Módulo 1: Introdução ao Linux',
      descricao: 'Entenda o que é Linux, sua origem e onde é utilizado.',

      aulas: [
        {
          titulo: 'Onde o Linux pode ser usado?',
          duracao: '31:51',
          link: 'https://www.youtube.com/watch?v=R_8l3xj3QEg&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=2&pp=iAQB',
          descricao: 'Aplicações do Linux no mercado.',
        },
        {
          titulo: 'História do Linux e software livre',
          duracao: '41:42',
          link: 'https://www.youtube.com/watch?v=qs_NZXmVUr0&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=3&pp=iAQB',
          descricao: 'Origem e conceito de software livre.',
        },
        {
          titulo: 'Licenças e liberdades',
          duracao: '33:47',
          link: 'https://www.youtube.com/watch?v=-cR-0Ggi3B4&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=4&pp=iAQB',
          descricao: 'Entenda as licenças open source.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Instalação e Ambiente',
      descricao: 'Instale e configure seu ambiente Linux.',

      aulas: [
        {
          titulo: 'Instalando Linux Mint',
          duracao: '31:24',
          link: 'https://www.youtube.com/watch?v=ZhLjvy23rrs&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=5&pp=iAQB',
          descricao: 'Instalação do sistema.',
        },
        {
          titulo: 'Criando pendrive bootável com Etcher',
          duracao: '24:49',
          link: 'https://www.youtube.com/watch?v=EgPxsHGxspA&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=6&pp=iAQB',
          descricao: 'Preparando instalação.',
        },
        {
          titulo: 'Conhecendo o ambiente Linux',
          duracao: '33:35',
          link: 'https://www.youtube.com/watch?v=7KsdRHwO2Sk&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=7&pp=iAQB',
          descricao: 'Interface e navegação.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Gerenciamento de Programas',
      descricao: 'Instale e gerencie programas no Linux.',

      aulas: [
        {
          titulo: 'Instalação básica de programas',
          duracao: '24:29',
          link: 'https://www.youtube.com/watch?v=L79u8csXwBU&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=8&pp=iAQB',
          descricao: 'Gerenciamento simples.',
        },
        {
          titulo: 'Instalação avançada de programas',
          duracao: '24:33',
          link: 'https://www.youtube.com/watch?v=HlbrYQqyXpg&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=9&pp=iAQB',
          descricao: 'Gerenciamento avançado.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Terminal e Arquivos',
      descricao: 'Domine o terminal e manipulação de arquivos.',

      aulas: [
        {
          titulo: 'Terminal no Linux - Introdução',
          duracao: '32:22',
          link: 'https://www.youtube.com/watch?v=mgs92GtkQCE&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=10&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Primeiros comandos.',
        },
        {
          titulo: 'Manipulando diretórios',
          duracao: '30:20',
          link: 'https://www.youtube.com/watch?v=kK6eBHSxAgA&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=11&pp=iAQB',
          descricao: 'Navegação no sistema.',
        },
        {
          titulo: 'Referência global do terminal',
          duracao: '30:29',
          link: 'https://www.youtube.com/watch?v=7XQ3Qt7EuWg&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=12&pp=iAQB',
          descricao: 'Comandos importantes.',
        },
        {
          titulo: 'Manipulação de arquivos',
          duracao: '33:12',
          link: 'https://www.youtube.com/watch?v=GEU0tmpjVfM&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=13&pp=iAQB',
          descricao: 'Arquivos e permissões.',
        },
        {
          titulo: 'Uso de dispositivos externos',
          duracao: '27:47',
          link: 'https://www.youtube.com/watch?v=Ntg1JfjEAd4&list=PLHz_AreHm4dlIXleu20uwPWFOSswqLYbV&index=14&pp=iAQB',
          descricao: 'Pendrives e HDs.',
        },
      ],
    },
  ],
},

{
  id: 'curso-rest-api-fundamentos',

  titulo: 'REST APIs: Fundamentos e Arquitetura',

  categoria: 'Back-end',

  tecnologia: 'api-rest',

  nivel: 'Basico',

  duracao: '3h',

  professor: 'Michel Oliveira',

  videoPrincipal: 'https://www.youtube.com/watch?v=P1Mm-gTi5i8&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=1&pp=iAQB',

  tags: 'api, rest, http, backend, web, arquitetura, api-rest',

  trilhas: 'node-backend,java-spring,php-backend,go-backend,qa-testes',

  descricao:
    'Aprenda os fundamentos das APIs REST, incluindo conceitos de HTTP, métodos, arquitetura, versionamento, autenticação e boas práticas para construção de APIs modernas.',

  destaque: 'Entenda APIs REST antes de sair codando',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos de APIs REST',
      descricao: 'Entenda o que são APIs REST e seus princípios arquiteturais.',

      aulas: [
        {
          titulo: 'REST APIs Básico - Introdução (Parte 1)',
          duracao: '1:38',
          link: 'https://www.youtube.com/watch?v=P1Mm-gTi5i8&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=1&pp=iAQB',
          descricao: 'Introdução às APIs REST.',
        },
        {
          titulo: 'REST APIs Básico - O que é (Parte 2)',
          duracao: '9:25',
          link: 'https://www.youtube.com/watch?v=_4PikzgWX24&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=2&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Definição de APIs REST.',
        },
        {
          titulo: 'REST APIs Básico - Por que? (Parte 3)',
          duracao: '4:05',
          link: 'https://www.youtube.com/watch?v=XX1800nlbxU&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=3&pp=iAQB',
          descricao: 'Importância das APIs.',
        },
        {
          titulo: 'REST APIs Básico - Princípios Arquiteturais (Parte 4)',
          duracao: '6:00',
          link: 'https://www.youtube.com/watch?v=KHcFYMtKVko&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=4&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Princípios REST.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Comunicação HTTP e Recursos',
      descricao: 'Aprenda como funciona a comunicação entre cliente e servidor.',

      aulas: [
        {
          titulo: 'REST APIs Básico - Recursos (Parte 5)',
          duracao: '12:33',
          link: 'https://www.youtube.com/watch?v=BkzfaIcbXVc&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=5&pp=iAQB',
          descricao: 'Conceito de recursos.',
        },
        {
          titulo: 'REST APIs Básico - Verbos (Parte 6)',
          duracao: '9:17',
          link: 'https://www.youtube.com/watch?v=fqGqlygkrcQ&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=6&pp=iAQB',
          descricao: 'GET, POST, PUT, DELETE.',
        },
        {
          titulo: 'REST APIs Básico - Códigos HTTP (Parte 7)',
          duracao: '10:53',
          link: 'https://www.youtube.com/watch?v=rxxC9FJukXg&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=7&pp=iAQB',
          descricao: 'Status HTTP.',
        },
        {
          titulo: 'REST APIs Básico - Fluxo da Requisição (Parte 8)',
          duracao: '2:41',
          link: 'https://www.youtube.com/watch?v=dIY6WUDlm1o&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=8&pp=iAQB',
          descricao: 'Fluxo de uma requisição.',
        },
        {
          titulo: 'REST APIs Básico - Requisições Assíncronas (Parte 9)',
          duracao: '6:05',
          link: 'https://www.youtube.com/watch?v=G4qUa3uftgY&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=9&pp=iAQB',
          descricao: 'Requisições async.',
        },
        {
          titulo: 'REST APIs Básico - Query Strings (Parte 10)',
          duracao: '6:18',
          link: 'https://www.youtube.com/watch?v=V0KqWy877Jg&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=10&pp=iAQB',
          descricao: 'Parâmetros em URL.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Boas práticas e Arquitetura',
      descricao: 'Aprenda práticas modernas para construção de APIs.',

      aulas: [
        {
          titulo: 'REST APIs Básico - Exercícios (Parte 11)',
          duracao: '8:49',
          link: 'https://www.youtube.com/watch?v=rmHVC2u4N1s&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=11&pp=iAQB',
          descricao: 'Exercícios práticos.',
        },
        {
          titulo: 'REST APIs Básico - HATEOAS (Parte 12)',
          duracao: '5:13',
          link: 'https://www.youtube.com/watch?v=m-XFJXipGqU&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=12&pp=iAQB',
          descricao: 'Navegação em APIs.',
        },
        {
          titulo: 'REST APIs Básico - Modelagem (Parte 13)',
          duracao: '12:01',
          link: 'https://www.youtube.com/watch?v=Fl7u3WZO9kk&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=13&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Modelagem de APIs.',
        },
        {
          titulo: 'REST APIs Básico - Contrato (Parte 14)',
          duracao: '3:39',
          link: 'https://www.youtube.com/watch?v=SXHVdP0LlPo&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=14&pp=iAQB',
          descricao: 'Contrato de API.',
        },
        {
          titulo: 'REST APIs Básico - Versionamento (Parte 15)',
          duracao: '7:47',
          link: 'https://www.youtube.com/watch?v=tdi3B6zZlr8&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=15&pp=iAQB',
          descricao: 'Versionamento.',
        },
        {
          titulo: 'REST APIs Básico - OpenID Connect e OAUTH2.0 (Parte 16)',
          duracao: '9:01',
          link: 'https://www.youtube.com/watch?v=tXaw3doMuBc&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=16&pp=iAQB',
          descricao: 'Autenticação moderna.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Projeto Prático',
      descricao: 'Veja uma API sendo construída na prática.',

      aulas: [
        {
          titulo: 'REST APIs Básico - Programando uma API em .NET Core',
          duracao: '1:07:18',
          link: 'https://www.youtube.com/watch?v=2jLLNWF6Vac&list=PL3B-OV5dZTqbaLi1f2UmXEWbcx9WyYaTX&index=17&pp=iAQB',
          descricao: 'Construção de API prática.',
        },
      ],
    },
  ],
},

{
  id: 'curso-seguranca-informacao-pratica',

  titulo: 'Segurança da Informação na Prática',

  categoria: 'Fundamentos',

  tecnologia: 'seguranca',

  nivel: 'Basico',

  duracao: '5h',

  professor: 'Alfredo Junior,',

  videoPrincipal: 'https://www.youtube.com/watch?v=gMQKilekm2g&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=1&pp=iAQB0gcJCQYLAYcqIYzv',

  tags: 'seguranca, cyber, phishing, malware, internet, protecao, fundamentos',

  trilhas: 'devops-docker-cloud,carreira-comunicacao',

  descricao:
    'Aprenda fundamentos de segurança da informação na prática, incluindo proteção contra golpes, phishing, malwares, ataques e boas práticas para navegar com segurança na internet.',

  destaque: 'Aprenda a se proteger na internet como um profissional',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos de Segurança',
      descricao: 'Entenda os conceitos básicos de segurança da informação.',

      aulas: [
        {
          titulo: 'Curso de Segurança da Informação - Como se Proteger',
          duracao: '5:30',
          link: 'https://www.youtube.com/watch?v=gMQKilekm2g&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=1&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Introdução à segurança.',
        },
        {
          titulo: 'Navegação Segura',
          duracao: '11:32',
          link: 'https://www.youtube.com/watch?v=oNuMZbnABqE&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=2&pp=iAQB',
          descricao: 'Boas práticas na internet.',
        },
        {
          titulo: 'Como evitar golpes na Internet',
          duracao: '13:59',
          link: 'https://www.youtube.com/watch?v=9sRm0PUQQV0&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=3&pp=iAQB',
          descricao: 'Prevenção contra golpes.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Ataques e Ameaças',
      descricao: 'Conheça os principais tipos de ataques.',

      aulas: [
        {
          titulo: 'O que é Phishing?',
          duracao: '11:07',
          link: 'https://www.youtube.com/watch?v=HuRHPHAJqZ8&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=4&pp=iAQB',
          descricao: 'Entendendo phishing.',
        },
        {
          titulo: 'Como se proteger de Phishing',
          duracao: '8:52',
          link: 'https://www.youtube.com/watch?v=5m572c4Sy7Q&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=5&pp=iAQB',
          descricao: 'Proteção contra phishing.',
        },
        {
          titulo: 'Como se proteger de Pharming e Spear Phishing',
          duracao: '13:43',
          link: 'https://www.youtube.com/watch?v=n6Zdi12XJr0&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=6&pp=iAQB',
          descricao: 'Ataques avançados.',
        },
        {
          titulo: 'Como se proteger de Ataques na Internet',
          duracao: '15:23',
          link: 'https://www.youtube.com/watch?v=yOFyIqIsScY&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=10&pp=iAQB',
          descricao: 'Visão geral de ataques.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Malwares e Proteção',
      descricao: 'Aprenda sobre vírus e softwares maliciosos.',

      aulas: [
        {
          titulo: 'Como se proteger de Códigos maliciosos',
          duracao: '11:11',
          link: 'https://www.youtube.com/watch?v=5ZU9xH-oX-4&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=16&pp=iAQB',
          descricao: 'Proteção contra malware.',
        },
        {
          titulo: 'Como se proteger de um vírus de computador',
          duracao: '15:44',
          link: 'https://www.youtube.com/watch?v=yhtWvFToPpo&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=17&pp=iAQB',
          descricao: 'Prevenção contra vírus.',
        },
        {
          titulo: 'Como são criados os vírus de computador',
          duracao: '16:03',
          link: 'https://www.youtube.com/watch?v=tO0Pur52h08&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=18&pp=iAQB',
          descricao: 'Funcionamento dos vírus.',
        },
        {
          titulo: 'Tabela Comparativa dos Malwares',
          duracao: '13:39',
          link: 'https://www.youtube.com/watch?v=lbX08O8p1mc&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=23&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Tipos de malware.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Proteção Avançada',
      descricao: 'Aprenda técnicas mais avançadas de proteção.',

      aulas: [
        {
          titulo: 'Como evitar ataque de força bruta',
          duracao: '17:41',
          link: 'https://www.youtube.com/watch?v=-FCE7POef-I&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=13&pp=iAQB',
          descricao: 'Proteção de acesso.',
        },
        {
          titulo: 'Como evitar ataques DoS e DDoS',
          duracao: '15:02',
          link: 'https://www.youtube.com/watch?v=NTBmwQ2gLhA&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=15&pp=iAQB',
          descricao: 'Proteção contra sobrecarga.',
        },
        {
          titulo: 'Como se proteger de Spywares',
          duracao: '11:36',
          link: 'https://www.youtube.com/watch?v=xP4GMOVrFzA&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=21&pp=iAQB',
          descricao: 'Proteção contra espionagem.',
        },
        {
          titulo: 'Resumo do Curso',
          duracao: '6:56',
          link: 'https://www.youtube.com/watch?v=NbLXj7L9P_M&list=PLAp37wMSBouB70jGTeT0JjW_LNC_JBHCo&index=26&pp=iAQB',
          descricao: 'Revisão geral.',
        },
      ],
    },
  ],
},

{
  id: 'curso-design-system-figma',

  titulo: 'Design System na prática com Figma',

  categoria: 'Front-end',

  tecnologia: 'design-system',

  nivel: 'Intermediario',

  duracao: '2h 30',

  professor: 'Caio Gonzalez',

  videoPrincipal: 'https://www.youtube.com/watch?v=ajqbXpFVaAw&list=PLIXMdhnnWhcRHni3lsROJ5RirS-Mas4-4&index=1&pp=iAQB',

  tags: 'design-system, figma, ui, ux, frontend, componentes, design',

  trilhas: 'javascript-frontend,react-frontend,angular-frontend',

  descricao:
    'Aprenda a criar e organizar um Design System completo utilizando Figma, explorando tipografia, cores, grids, componentes e boas práticas utilizadas por equipes profissionais.',

  destaque: 'Crie interfaces profissionais com Design System',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos de Design System',
      descricao: 'Entenda o que é um Design System e como ele funciona.',

      aulas: [
        {
          titulo: 'O que é Design System?',
          duracao: '8:37',
          link: 'https://www.youtube.com/watch?v=ajqbXpFVaAw&list=PLIXMdhnnWhcRHni3lsROJ5RirS-Mas4-4&index=1&pp=iAQB',
          descricao: 'Introdução ao Design System.',
        },
        {
          titulo: 'Design Atômico',
          duracao: '7:12',
          link: 'https://www.youtube.com/watch?v=GVLnurZ5dho&list=PLIXMdhnnWhcRHni3lsROJ5RirS-Mas4-4&index=5&pp=iAQB',
          descricao: 'Organização de componentes.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Estrutura e Layout',
      descricao: 'Aprenda a estruturar layouts e grids.',

      aulas: [
        {
          titulo: 'Espaçamento, Breakpoints e grids',
          duracao: '14:32',
          link: 'https://www.youtube.com/watch?v=_aEff40QB20&list=PLIXMdhnnWhcRHni3lsROJ5RirS-Mas4-4&index=2&pp=iAQB',
          descricao: 'Responsividade.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Estilo Visual',
      descricao: 'Crie identidade visual consistente.',

      aulas: [
        {
          titulo: 'Tipografia',
          duracao: '32:31',
          link: 'https://www.youtube.com/watch?v=K8yaN17HEK0&list=PLIXMdhnnWhcRHni3lsROJ5RirS-Mas4-4&index=3&pp=iAQB',
          descricao: 'Definição de fontes.',
        },
        {
          titulo: 'Paleta de cores',
          duracao: '36:57',
          link: 'https://www.youtube.com/watch?v=6fBaCrPIDpo&list=PLIXMdhnnWhcRHni3lsROJ5RirS-Mas4-4&index=4&pp=iAQB',
          descricao: 'Cores do sistema.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Componentes e Escalabilidade',
      descricao: 'Construa componentes reutilizáveis.',

      aulas: [
        {
          titulo: 'Criando botões no Figma',
          duracao: '16:26',
          link: 'https://www.youtube.com/watch?v=th-vmwLjj6Q&list=PLIXMdhnnWhcRHni3lsROJ5RirS-Mas4-4&index=6&pp=iAQB',
          descricao: 'Componentes básicos.',
        },
        {
          titulo: 'Componentes com slots',
          duracao: '21:22',
          link: 'https://www.youtube.com/watch?v=lBIOt4WGGJY&list=PLIXMdhnnWhcRHni3lsROJ5RirS-Mas4-4&index=7&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Componentes flexíveis.',
        },
        {
          titulo: 'Subcomponentes',
          duracao: '15:34',
          link: 'https://www.youtube.com/watch?v=P_BEj6V3ggA&list=PLIXMdhnnWhcRHni3lsROJ5RirS-Mas4-4&index=8&pp=iAQB',
          descricao: 'Escalabilidade.',
        },
      ],
    },
  ],
},

{
  id: 'curso-design-patterns-poo',

  titulo: 'Design Patterns na prática com POO',

  categoria: 'Programação',

  tecnologia: 'design-patterns',

  nivel: 'Intermediario',

  duracao: '3h 30',

  professor: 'Renato Augusto',

  videoPrincipal: 'https://www.youtube.com/watch?v=yZRd_EWUs1g&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=5&pp=iAQB',

  tags: 'design-patterns, solid, poo, clean-code, arquitetura, backend',

  trilhas: 'java-spring,php-backend,go-backend,node-backend',

  descricao:
    'Aprenda os principais Design Patterns (padrões de projeto) utilizados no mercado, como Strategy, Observer, Factory e Singleton, aplicando conceitos de orientação a objetos para criar sistemas mais organizados, flexíveis e escaláveis.',

  destaque: 'Aprenda a pensar como um desenvolvedor sênior',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos e Conceitos',
      descricao: 'Entenda a base dos Design Patterns e boas práticas.',

      aulas: [
        {
          titulo: 'SOLID, Clean Code e Design Patterns',
          duracao: '8:23',
          link: 'https://www.youtube.com/watch?v=yZRd_EWUs1g&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=5&pp=iAQB',
          descricao: 'Conceitos fundamentais.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Padrões Criacionais',
      descricao: 'Padrões para criação de objetos.',

      aulas: [
        {
          titulo: 'Simple Factory',
          duracao: '13:33',
          link: 'https://www.youtube.com/watch?v=3-ESljj0jgI&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=10&pp=iAQB',
          descricao: 'Criação simplificada de objetos.',
        },
        {
          titulo: 'Singleton',
          duracao: '21:52',
          link: 'https://www.youtube.com/watch?v=E8ey3HjSthg&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=2&pp=iAQB',
          descricao: 'Instância única.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Padrões Estruturais',
      descricao: 'Organização e composição de classes.',

      aulas: [
        {
          titulo: 'Adapter',
          duracao: '18:30',
          link: 'https://www.youtube.com/watch?v=Fg1kEjaaBrs&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=9&pp=iAQB',
          descricao: 'Compatibilidade entre interfaces.',
        },
        {
          titulo: 'Facade',
          duracao: '11:44',
          link: 'https://www.youtube.com/watch?v=4Aq9UHQ5f5Y&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=7&pp=iAQB',
          descricao: 'Simplificação de sistemas.',
        },
        {
          titulo: 'Decorator',
          duracao: '25:05',
          link: 'https://www.youtube.com/watch?v=7B60j9EGrrU&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=3&pp=iAQB',
          descricao: 'Extensão de funcionalidades.',
        },
        {
          titulo: 'Proxy',
          duracao: '19:15',
          link: 'https://www.youtube.com/watch?v=el1MtIPXTqo&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=1&pp=iAQB',
          descricao: 'Controle de acesso.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Padrões Comportamentais',
      descricao: 'Controle de comportamento e lógica.',

      aulas: [
        {
          titulo: 'Strategy',
          duracao: '22:13',
          link: 'https://www.youtube.com/watch?v=DzlXwgsc_AU&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=11&pp=iAQB',
          descricao: 'Troca de algoritmos.',
        },
        {
          titulo: 'Observer',
          duracao: '20:53',
          link: 'https://www.youtube.com/watch?v=mv9JxI85Ac8&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=6&pp=iAQB',
          descricao: 'Eventos e reatividade.',
        },
        {
          titulo: 'State',
          duracao: '25:57',
          link: 'https://www.youtube.com/watch?v=OrCgWzpNszk&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=8&pp=iAQB',
          descricao: 'Mudança de estados.',
        },
        {
          titulo: 'Template Method',
          duracao: '16:53',
          link: 'https://www.youtube.com/watch?v=j5fGTi8ObK4&list=PLNHxHgB-_LTt67szNmMsZwqBKq9jH4uKJ&index=4&pp=iAQB',
          descricao: 'Reuso de lógica.',
        },
      ],
    },
  ],
},

{
  id: 'curso-testes-unitarios-junit-mockito',

  titulo: 'Testes Unitários com JUnit e Mockito (Java)',

  categoria: 'Back-end',

  tecnologia: 'testes-unitarios',

  nivel: 'Intermediario',

  duracao: '6h',

  professor: 'Erudio Training',

  videoPrincipal: 'https://www.youtube.com/watch?v=yRNAnPBbdWk&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=2&pp=iAQB',

  tags: 'testes, junit, mockito, tdd, bdd, qualidade, backend, java',

  trilhas: 'java-spring,qa-testes',

  descricao:
    'Aprenda testes unitários do zero ao nível profissional utilizando JUnit 5 e Mockito. Entenda conceitos como pirâmide de testes, princípio FIRST, BDD, isolamento de código e mocks, garantindo qualidade e segurança no desenvolvimento de software.',

  destaque: 'Aprenda a testar código como um desenvolvedor profissional',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos de Testes',
      descricao: 'Entenda os conceitos essenciais de testes unitários.',

      aulas: [
        {
          titulo: 'O que são Testes Unitários',
          duracao: '9:58',
          link: 'https://www.youtube.com/watch?v=fdGn_PSUZP4&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=1&pp=iAQB',
          descricao: 'Introdução aos testes automatizados.',
        },
        {
          titulo: 'Por que implementar Testes Unitários',
          duracao: '3:37',
          link: 'https://www.youtube.com/watch?v=yRNAnPBbdWk&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=2&pp=iAQB',
          descricao: 'Importância e benefícios.',
        },
        {
          titulo: 'Princípio FIRST',
          duracao: '5:20',
          link: 'https://www.youtube.com/watch?v=yHZMHsv8wxE&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=3&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Boas práticas de testes.',
        },
        {
          titulo: 'Testando código em isolamento',
          duracao: '6:16',
          link: 'https://www.youtube.com/watch?v=UyNKC3ZWSsY&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=4&pp=iAQB',
          descricao: 'Isolamento de dependências.',
        },
        {
          titulo: 'Pirâmide de testes',
          duracao: '3:58',
          link: 'https://www.youtube.com/watch?v=yJjj8lP0Ex0&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=5&pp=iAQB',
          descricao: 'Estratégia de testes.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: JUnit 5 na prática',
      descricao: 'Criação de testes com JUnit.',

      aulas: [
        {
          titulo: 'O que é JUnit 5',
          duracao: '3:21',
          link: 'https://www.youtube.com/watch?v=fV_VJq8BOSc&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=6&pp=iAQB',
          descricao: 'Framework de testes.',
        },
        {
          titulo: 'JUnit e ferramentas de build',
          duracao: '2:50',
          link: 'https://www.youtube.com/watch?v=qrb2uMO4_O4&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=7&pp=iAQB',
          descricao: 'Integração com projetos.',
        },
        {
          titulo: 'Criando projeto Maven',
          duracao: '9:58',
          link: 'https://www.youtube.com/watch?v=L6yvNT-LIMk&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=8&pp=iAQB',
          descricao: 'Estrutura inicial.',
        },
        {
          titulo: 'Adicionando dependências',
          duracao: '6:18',
          link: 'https://www.youtube.com/watch?v=NJicGjL5-zQ&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=9&pp=iAQB',
          descricao: 'Configuração do ambiente.',
        },
        {
          titulo: 'Primeiro teste unitário',
          duracao: '3:42',
          link: 'https://www.youtube.com/watch?v=eldQ65uAgyg&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=10&pp=iAQB',
          descricao: 'Criando testes simples.',
        },
        {
                  
          titulo: 'Conhecendo as Assertions',
          duracao: '6:56',
          link: 'https://www.youtube.com/watch?v=z3v4UyqRYjE&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=12&pp=iAQB',
          descricao: 'Principais assertions do JUnit.',
        },
        {
          titulo: 'Assertion Messages',
          duracao: '3:42',
          link: 'https://www.youtube.com/watch?v=oLsfBgOVyvk&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=13&pp=iAQB',
          descricao: 'Mensagens de validação.',
        },
        {
          titulo: 'Outras Assertions',
          duracao: '3:42',
          link: 'https://www.youtube.com/watch?v=XjTRROAcNvk&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=14&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Mais formas de validação.',
        },
        {
          titulo: 'Lazy Assert Messages',
          duracao: '3:54',
          link: 'https://www.youtube.com/watch?v=zDEBpetg4Fo&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=15&pp=iAQB',
          descricao: 'Mensagens otimizadas.',
        },
                
        {
          titulo: 'Ciclo de vida dos testes',
          duracao: '9:57',
          link: 'https://www.youtube.com/watch?v=A77y0l-Her0&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=24&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Execução dos testes.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Boas práticas e BDD',
      descricao: 'Organização e padronização de testes.',

      aulas: [
        {
          titulo: 'BDD: Given / When / Then',
          duracao: '8:50',
          link: 'https://www.youtube.com/watch?v=7MB-hTI2KVU&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=20&pp=iAQB',
          descricao: 'Padronização de testes.',
        },
        {
          titulo: 'Nomenclatura de testes',
          duracao: '4:02',
          link: 'https://www.youtube.com/watch?v=Etk4gMEbubc&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=18&pp=iAQB',
          descricao: 'Boas práticas.',
        },
        {
          titulo: 'Annotation @DisplayName',
          duracao: '4:25',
          link: 'https://www.youtube.com/watch?v=2QeSF6YX9_U&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=19&pp=iAQB',
          descricao: 'Melhorando leitura.',
        },
        {
          titulo: 'Desabilitando testes',
          duracao: '2:50',
          link: 'https://www.youtube.com/watch?v=qqRfBCY8p3g&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=22&pp=iAQB',
          descricao: 'Controle de execução.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Mockito e Mocks',
      descricao: 'Testes avançados com simulação de dependências.',

      aulas: [
        {
          titulo: 'O que é Mockito',
          duracao: '3:06',
          link: 'https://www.youtube.com/watch?v=odJtE3WapdU&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=26&pp=iAQB',
          descricao: 'Framework de mocks.',
        },
        {
          titulo: 'Criando mocks',
          duracao: '7:00',
          link: 'https://www.youtube.com/watch?v=5V7rCWl9W80&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=30&pp=iAQB',
          descricao: 'Simulação de objetos.',
        },
        {
          titulo: 'Stubs e retornos',
          duracao: '12:24',
          link: 'https://www.youtube.com/watch?v=gkmkA_LoU_M&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=29&pp=iAQB',
          descricao: 'Controle de comportamento.',
        },
        {
          titulo: 'Mockando listas e exceções',
          duracao: '11:17',
          link: 'https://www.youtube.com/watch?v=odQW32w9sv8&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=32&pp=iAQB',
          descricao: 'Testes avançados.',
        },
        {
          titulo: 'Verificando chamadas (verify)',
          duracao: '11:29',
          link: 'https://www.youtube.com/watch?v=Ji2BTKqbTc0&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=36&pp=iAQB',
          descricao: 'Validação de execução.',
        },
      ],
    },

    {
      titulo: 'Módulo 5: Projeto prático',
      descricao: 'Aplicando tudo em um cenário real.',

      aulas: [
        {
          titulo: 'Minicurso completo de testes com JUnit',
          duracao: '1:24:53',
          link: 'https://www.youtube.com/watch?v=kVtxQhggyJI&list=PL18bbNo7xuh9ZmqYhETZuEDP_x3Z8ql2H&index=38&pp=iAQB',
          descricao: 'Projeto completo com testes.',
        },
      ],
    },
  ],
},

{
  id: 'curso-arquitetura-limpa-java',

  titulo: 'Arquitetura Limpa com Java (Clean Architecture)',

  categoria: 'Back-end',

  tecnologia: 'arquitetura-software',

  nivel: 'Intermediario',

  duracao: '9h',

  professor: 'Daniel Santos | Dev',

  videoPrincipal: 'https://www.youtube.com/watch?v=kImcxK3Hmu8&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=1&pp=iAQB',

  tags: 'arquitetura, clean-architecture, java, spring, backend, solid, boas-praticas',

  trilhas: 'java-spring',

  descricao:
    'Aprenda na prática os conceitos de Arquitetura Limpa (Clean Architecture) utilizando Java e Spring. Crie um projeto estruturado com separação de camadas, regras de negócio desacopladas e aplicação de boas práticas como SOLID e organização profissional de sistemas.',

  destaque: 'Aprenda a estruturar sistemas como um desenvolvedor profissional',

  modulos: [
    {
      titulo: 'Módulo 1: Introdução e Setup do Projeto',
      descricao: 'Apresentação da arquitetura e criação da base do projeto.',

      aulas: [
        {
          titulo: 'Aula 0 - Teoria e apresentação do projeto',
          duracao: '21:37',
          link: 'https://www.youtube.com/watch?v=kImcxK3Hmu8&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=1&pp=iAQB',
          descricao: 'Visão geral do curso e arquitetura.',
        },
        {
          titulo: 'Aula 1 - Criação do projeto e módulos',
          duracao: '15:48',
          link: 'https://www.youtube.com/watch?v=VKEyJOlfPcg&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=2&pp=iAQB',
          descricao: 'Estrutura inicial do sistema.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Domínio e Regras de Negócio',
      descricao: 'Construção da base do sistema.',

      aulas: [
        {
          titulo: 'Aula 2 - Criação das entidades e exceptions',
          duracao: '45:23',
          link: 'https://www.youtube.com/watch?v=ZF6tQrTklNk&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=3&pp=iAQB',
          descricao: 'Modelagem do domínio.',
        },
        {
          titulo: 'Aula 3 - Criação dos casos de uso',
          duracao: '26:11',
          link: 'https://www.youtube.com/watch?v=EmGRiLqO_UM&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=4&pp=iAQB',
          descricao: 'Definição das regras de negócio.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Implementação dos Casos de Uso',
      descricao: 'Desenvolvimento das regras de negócio.',

      aulas: [
        {
          titulo: 'Aula 4 - Implementação dos casos de uso (parte 1)',
          duracao: '29:35',
          link: 'https://www.youtube.com/watch?v=XQkckQfQKNc&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=5&pp=iAQB',
          descricao: 'Primeira parte da implementação.',
        },
        {
          titulo: 'Aula 5 - Implementação dos casos de uso (parte 2)',
          duracao: '51:33',
          link: 'https://www.youtube.com/watch?v=NMH3cBq6Bbk&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=6&pp=iAQB',
          descricao: 'Continuação da lógica.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Infraestrutura e Integração',
      descricao: 'Integração com Spring e banco de dados.',

      aulas: [
        {
          titulo: 'Aula 6 - Refatoração e configuração da aplicação',
          duracao: '43:38',
          link: 'https://www.youtube.com/watch?v=0hyPvStSoSA&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=7&pp=iAQB',
          descricao: 'Organização da aplicação.',
        },
        {
          titulo: 'Aula 7 - Migrations, entities e repositories',
          duracao: '43:10',
          link: 'https://www.youtube.com/watch?v=Gg0CJ1BVFG0&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=8&pp=iAQB',
          descricao: 'Persistência de dados.',
        },
      ],
    },

    {
      titulo: 'Módulo 5: APIs e Funcionalidades',
      descricao: 'Criação de endpoints e regras completas.',

      aulas: [
        {
          titulo: 'Aula 8 - Service/Controller e criação de usuário',
          duracao: '1:05:06',
          link: 'https://www.youtube.com/watch?v=74NfGqOcXXw&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=9&pp=iAQB',
          descricao: 'Primeiros endpoints.',
        },
        {
          titulo: 'Aula 9 - Busca e validações',
          duracao: '39:12',
          link: 'https://www.youtube.com/watch?v=eQOUmRgrcMY&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=10&pp=iAQB',
          descricao: 'Consultas e validações.',
        },
        {
          titulo: 'Aula 10 - Transações e transferências',
          duracao: '1:16:53',
          link: 'https://www.youtube.com/watch?v=JQo0eqWK-i0&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=11&pp=iAQB',
          descricao: 'Operações financeiras.',
        },
      ],
    },

    {
      titulo: 'Módulo 6: Refatoração e Tratamento de Erros',
      descricao: 'Melhorias finais e tratamento de exceções.',

      aulas: [
        {
          titulo: 'Aula 12 - Refatoração dos casos de uso',
          duracao: '44:59',
          link: 'https://www.youtube.com/watch?v=5VpP_ZaABpI&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=12&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Melhoria do código.',
        },
        {
          titulo: 'Aula 13 - Controller Advice e exceptions',
          duracao: '38:30',
          link: 'https://www.youtube.com/watch?v=LRtbX5fU8N4&list=PLUOqm1GRyVXaJG29--_tYtO8AkMChovx1&index=13&pp=iAQB',
          descricao: 'Tratamento global de erros.',
        },
      ],
    },
  ],
},

{
  id: 'curso-spring-boot-api-erudio',

  titulo: 'Spring Boot e APIs REST na prática com Java',

  categoria: 'Back-end',

  tecnologia: 'java-spring',

  nivel: 'Intermediario',

  duracao: '8h+',

  professor: 'Erudio Training',

  videoPrincipal: 'https://www.youtube.com/watch?v=9yQSemmZbsk&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=9&pp=iAQB',

  tags: 'java, spring-boot, api-rest, backend, mysql, jpa, http, rest',

  trilhas: 'java-spring,sql-banco-dados',

  descricao:
    'Aprenda a criar APIs REST completas com Java e Spring Boot, desde os fundamentos de REST e HTTP até a construção prática com banco de dados, validações, tratamento de erros e integração com MySQL.',

  destaque: 'Curso completo de API REST com Spring Boot do zero ao avançado',

  modulos: [
    {
      titulo: 'Módulo 1: Fundamentos de Web e REST',
      descricao: 'Base teórica para entender APIs e comunicação HTTP.',

      aulas: [
        {
          titulo: 'O que são WebServices',
          duracao: '6:29',
          link: 'https://www.youtube.com/watch?v=xvYFGlIhU5U&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=18&pp=iAQB',
          descricao: 'Introdução à integração entre sistemas.',
        },
        {
          titulo: 'SOAP vs REST',
          duracao: '6:47',
          link: 'https://www.youtube.com/watch?v=xOwmIRPm188&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=19&pp=iAQB',
          descricao: 'Comparação entre estilos de API.',
        },
        {
          titulo: 'O que é REST',
          duracao: '7:33',
          link: 'https://www.youtube.com/watch?v=p9mHArG7eUY&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=20&pp=iAQB',
          descricao: 'Entendendo o padrão REST.',
        },
        {
          titulo: 'Request e Response',
          duracao: '7:48',
          link: 'https://www.youtube.com/watch?v=Wj8-wh0MDzQ&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=21&pp=iAQB',
          descricao: 'Como funciona a comunicação HTTP.',
        },
        {
          titulo: 'Parâmetros em APIs (Path, Query, Header, Body)',
          duracao: '12:03',
          link: 'https://www.youtube.com/watch?v=IWQTIpIiqZU&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=22&pp=iAQB',
          descricao: 'Tipos de parâmetros.',
        },
        {
          titulo: 'HTTP Status Codes',
          duracao: '9:57',
          link: 'https://www.youtube.com/watch?v=XOOaJTrVCkA&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=23&pp=iAQB',
          descricao: 'Respostas das APIs.',
        },
        {
          titulo: 'Métodos HTTP (GET, POST, PUT, DELETE)',
          duracao: '10:16',
          link: 'https://www.youtube.com/watch?v=yzKcZNKmC1g&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=24&pp=iAQB',
          descricao: 'Operações principais.',
        },
        {
          titulo: 'Métodos HTTP avançados',
          duracao: '5:07',
          link: 'https://www.youtube.com/watch?v=f7734b78BTg&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=25&pp=iAQB',
          descricao: 'PATCH, OPTIONS e outros.',
        },
        {
          titulo: 'REST vs RESTful e maturidade',
          duracao: '7:33',
          link: 'https://www.youtube.com/watch?v=0KOiAtDDdXc&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=26&pp=iAQB',
          descricao: 'Boas práticas de APIs.',
        },
        {
          titulo: 'HATEOAS',
          duracao: '6:27',
          link: 'https://www.youtube.com/watch?v=G7HInSoWins&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=27&pp=iAQB',
          descricao: 'APIs inteligentes.',
        },
        {
          titulo: 'Swagger (OpenAPI)',
          duracao: '7:27',
          link: 'https://www.youtube.com/watch?v=7YauKdKS-ao&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=28&pp=iAQB',
          descricao: 'Documentação de APIs.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Preparação do Ambiente',
      descricao: 'Configuração para desenvolvimento com Spring.',

      aulas: [
        {
          titulo: 'Configuração de ambiente no Windows',
          duracao: '1:41:11',
          link: 'https://www.youtube.com/watch?v=M-0HxNoUeNE&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=12&pp=iAQB',
          descricao: 'Setup completo.',
        },
        {
          titulo: 'Configuração de ambiente no Linux',
          duracao: '59:00',
          link: 'https://www.youtube.com/watch?v=Wk5645fHrVU&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=13&pp=iAQB0gcJCQYLAYcqIYzv',
          descricao: 'Setup alternativo.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Criando API com Spring Boot',
      descricao: 'Construção prática da API.',

      aulas: [
        {
          titulo: 'Criando primeira API REST',
          duracao: '48:51',
          link: 'https://www.youtube.com/watch?v=aZnAwOmAcIA&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=1&pp=iAQB',
          descricao: 'Projeto inicial.',
        },
        {
          titulo: 'Path Params, validações e erros',
          duracao: '1:05:45',
          link: 'https://www.youtube.com/watch?v=xkCQuHcfHZU&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=2&pp=iAQB',
          descricao: 'Validação e tratamento.',
        },
        {
          titulo: 'POST, PUT, DELETE e JSON',
          duracao: '47:47',
          link: 'https://www.youtube.com/watch?v=WQfBLDZa3CM&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=3&pp=iAQB',
          descricao: 'Operações CRUD.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Banco de Dados',
      descricao: 'Integração com MySQL e JPA.',

      aulas: [
        {
          titulo: 'Conectando com MySQL (JPA)',
          duracao: '1:08:37',
          link: 'https://www.youtube.com/watch?v=PL9PUSEO5V4&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=4&pp=iAQB',
          descricao: 'Persistência de dados.',
        },
      ],
    },

    {
      titulo: 'Módulo 5: Logs e Debug',
      descricao: 'Monitoramento da aplicação.',

      aulas: [
        {
          titulo: 'Logging no Spring Boot',
          duracao: '34:51',
          link: 'https://www.youtube.com/watch?v=Ll11w5pCU8I&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=5&pp=iAQB',
          descricao: 'Logs e investigação de erros.',
        },
      ],
    },

    {
      titulo: 'Módulo 6: Conteúdos Extras',
      descricao: 'Complementos importantes.',

      aulas: [
        {
          titulo: 'Spring Framework vs Spring Boot',
          duracao: '16:47',
          link: 'https://www.youtube.com/watch?v=4AgcoVwbSH0&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=6&pp=iAQB',
          descricao: 'Diferenças importantes.',
        },
        {
          titulo: 'Dockerizando aplicação Spring Boot',
          duracao: '24:31',
          link: 'https://www.youtube.com/watch?v=d5DxGPK4pcs&list=PL18bbNo7xuh9aZnHEcio89seOQ0STlV8Y&index=11&pp=iAQB',
          descricao: 'Deploy com containers.',
        },
      ],
    },
  ],
},

{
  id: 'curso-mensageria-microservices',

  titulo: 'Mensageria e Filas em Microsserviços (RabbitMQ, Kafka, SQS)',

  categoria: 'Back-end',

  tecnologia: 'mensageria',

  nivel: 'Intermediario',

  duracao: '12h+',

  professor: 'Wesley Willians',

  videoPrincipal: 'https://www.youtube.com/watch?v=-KH5w-cUdhw&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=1&pp=iAQB',

  tags: 'mensageria, rabbitmq, kafka, sqs, microsservicos, filas, pubsub, backend',

  trilhas: 'java-spring,node-backend',

  descricao:
    'Aprenda mensageria e comunicação assíncrona em sistemas distribuídos utilizando RabbitMQ, Kafka, Redis Pub/Sub e Amazon SQS, aplicando conceitos modernos de microsserviços e arquitetura escalável.',

  destaque: 'Domine comunicação entre microsserviços com filas e eventos',

  modulos: [
    {
      titulo: 'Módulo 1: Introdução à Mensageria',
      descricao: 'Conceitos iniciais de comunicação assíncrona.',

      aulas: [
        {
          titulo: 'Mensageria Pub/Sub na prática com Redis',
          duracao: '36:08',
          link: 'https://www.youtube.com/watch?v=-KH5w-cUdhw&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=1&pp=iAQB',
          descricao: 'Introdução ao modelo Pub/Sub.',
        },
        {
          titulo: 'RabbitMQ e Apache Kafka',
          duracao: '11:20',
          link: 'https://www.youtube.com/watch?v=yL1BPIw2ihY&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=2&pp=iAQB',
          descricao: 'Visão geral das ferramentas.',
        },
      ],
    },

    {
      titulo: 'Módulo 2: Fundamentos do RabbitMQ',
      descricao: 'Base para uso de filas com RabbitMQ.',

      aulas: [
        {
          titulo: 'RabbitMQ: O mínimo para sua carreira decolar',
          duracao: '1:24:14',
          link: 'https://www.youtube.com/watch?v=YotzziZzKJo&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=3&pp=iAQB',
          descricao: 'Fundamentos essenciais.',
        },
        {
          titulo: 'Amazon SQS: Trabalhando com filas na AWS',
          duracao: '42:07',
          link: 'https://www.youtube.com/watch?v=3M4Vyf-AwPc&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=4&pp=iAQB',
          descricao: 'Introdução ao SQS.',
        },
        {
          titulo: 'Utilizando RabbitMQ em Microservices',
          duracao: '2:08:53',
          link: 'https://www.youtube.com/watch?v=yK1_cQaASJE&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=5&pp=iAQB',
          descricao: 'Uso em arquitetura real.',
        },
        {
          titulo: 'Intensivão Microsserviços - RabbitMQ',
          duracao: '1:33:35',
          link: 'https://www.youtube.com/watch?v=yL1BPIw2ihY&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=2&pp=iAQB',
          descricao: 'Aprofundamento prático.',
        },
        {
          titulo: 'RabbitMQ: Uma visão geral',
          duracao: '32:52',
          link: 'https://www.youtube.com/watch?v=FcF5iufd2P0&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=7&pp=iAQB',
          descricao: 'Revisão dos conceitos.',
        },
      ],
    },

    {
      titulo: 'Módulo 3: Aplicações práticas com RabbitMQ',
      descricao: 'Implementação em cenários reais.',

      aulas: [
        {
          titulo: 'Microsserviços usando filas com RabbitMQ na prática',
          duracao: '1:34:03',
          link: 'https://www.youtube.com/watch?v=NQv7C3CTd8U&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=8&pp=iAQB',
          descricao: 'Aplicação prática completa.',
        },
        {
          titulo: 'Aplicações Node.js com RabbitMQ',
          duracao: '18:24',
          link: 'https://www.youtube.com/watch?v=u3qGnyPy-pk&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=9&pp=iAQB',
          descricao: 'Integração com Node.js.',
        },
        {
          titulo: 'Comunicação e filas com RabbitMQ',
          duracao: '1:22:14',
          link: 'https://www.youtube.com/watch?v=iKTjtX5CfkA&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=10&pp=iAQB',
          descricao: 'Fluxo completo de comunicação.',
        },
      ],
    },

    {
      titulo: 'Módulo 4: Mensageria em Cloud e Alternativas',
      descricao: 'Outras soluções de mensageria.',

      aulas: [
        {
          titulo: 'AWS SQS Overview',
          duracao: '12:41',
          link: 'https://www.youtube.com/watch?v=XLFqtDBCFg0&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=11&pp=iAQB',
          descricao: 'Fila como serviço.',
        },
        {
          titulo: 'Mensageria com PostgreSQL',
          duracao: '1:14:58',
          link: 'https://www.youtube.com/watch?v=FF6Am0N6eq4&list=PLdEAbe-20JsmTp7hPN9-2gIV3eekzowu1&index=12&pp=iAQB',
          descricao: 'Alternativa usando banco de dados.',
        },
      ],
    },
  ],
},
]
