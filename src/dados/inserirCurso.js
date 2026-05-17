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
    trilhas: "php-backend",
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
            titulo: "Como funciona o PHP - Curso PHP Iniciante #02",
            duracao: "10:24",
            link: "https://www.youtube.com/watch?v=Eup6utTPe2U",
            descricao:
              "Entenda como o PHP roda no servidor e como ele se integra com paginas web.",
          },

          {
            titulo: "Como funciona o PHP - Curso PHP Iniciante #02",
            duracao: "10:24",
            link: "https://www.youtube.com/watch?v=Eup6utTPe2U",
            descricao:
              "Entenda como o PHP roda no servidor e como ele se integra com paginas web.",
          },
        ],
      },

      {
        titulo: "Modulo 2: Fundamentos e ambiente",
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
    id: 'curso-angular-19-pratica',

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
    nivel: 'Intermediário',

    // Duração total aproximada do curso.
    duracao: '6h37',

    // Nome do professor ou canal do YouTube.
    professor: 'Lucas Peixoto',

    // Link do vídeo principal ou primeiro vídeo da playlist.
    videoPrincipal: 'https://www.youtube.com/watch?v=35iyS8zCRfU&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=1&pp=iAQB',

    // Palavras-chave separadas por vírgula.
    tags: 'angular, frontend, typescript, javascript, testes, docker, deploy, ci-cd',

    // ID da trilha relacionada.
    // Exemplos: 'javascript-frontend', 'java-spring', 'node-backend'
    trilhas: 'angular-frontend,javascript-frontend',

    // Resumo maior do curso.
    descricao:
      'Acompanhe a construção completa de um Todo App com Angular 19, explorando na prática recursos modernos como Signals, testes com Jest, Dockerização e deploy com CI/CD.',

    // Frase curta de destaque.
    destaque: 'Angular direto ao ponto: do primeiro componente ao deploy em produção.',

    // Lista de módulos do curso.
    modulos: [
      {
        // Nome do módulo.
        titulo: 'Modulo 1: Fundamentos e Estrutura',

        // Resumo do módulo.
        descricao: 'Domine a base do Angular 19 configurando o projeto, organizando o layout e entendendo os novos recursos reativos.',

        // Lista de aulas desse módulo.
        aulas: [
          {
            // Nome da aula.
            titulo: 'O Projeto',

            // Duração da aula.
            duracao: '4:47',

            // Link normal do YouTube.
            link: 'https://www.youtube.com/watch?v=35iyS8zCRfU&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=1&pp=iAQB',

            // Resumo da aula.
            descricao: 'Visão geral do Todo App e das tecnologias que serão utilizadas.',
          },

          {
            // Nome da aula.
            titulo: 'Estruturando o layout',

            // Duração da aula.
            duracao: '21:01',

            // Link normal do YouTube.
            link: 'https://www.youtube.com/watch?v=khb92Mb14uY&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=2&pp=iAQB0gcJCQMLAYcqIYzv',

            // Resumo da aula.
            descricao: 'Criação da estrutura visual base da aplicação.',
          },
        ],
      },

      {
        // Nome do módulo.
        titulo: 'Modulo 2: Testes, Formulários e Qualidade',

        // Resumo do módulo.
        descricao: 'Aprenda a testar serviços, construir formulários reativos e elevar a experiência do usuário com boas práticas de UI/UX.',

        // Lista de aulas desse módulo.
        aulas: [
          {
            // Nome da aula.
            titulo: 'Jest e testando o TaskService – Parte 1',

            // Duração da aula.
            duracao: '32:09',

            // Link normal do YouTube.
            link: 'https://www.youtube.com/watch?v=qtvjR16DYhQ&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=6&pp=iAQB',

            // Resumo da aula.
            descricao: 'Visão geral do Todo App e das tecnologias que serão utilizadas.',
          },

          {
            // Nome da aula.
            titulo: 'Estruturando o layout',

            // Duração da aula.
            duracao: '21:01',

            // Link normal do YouTube.
            link: 'https://www.youtube.com/watch?v=khb92Mb14uY&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=2&pp=iAQB0gcJCQMLAYcqIYzv',

            // Resumo da aula.
            descricao: 'Criação da estrutura visual base da aplicação.',
          },
        ],
      },

      {
        // Nome do módulo.
        titulo: 'Modulo 3: Testes, Formulários e Qualidade',

        // Resumo do módulo.
        descricao: 'Aprenda a testar serviços, construir formulários reativos e elevar a experiência do usuário com boas práticas de UI/UX.',

        // Lista de aulas desse módulo.
        aulas: [
          {
            // Nome da aula.
            titulo: 'Jest e testando o TaskService – Parte 1',

            // Duração da aula.
            duracao: '32:09',

            // Link normal do YouTube.
            link: 'https://www.youtube.com/watch?v=qtvjR16DYhQ&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=6&pp=iAQB',

            // Resumo da aula.
            descricao: 'Visão geral do Todo App e das tecnologias que serão utilizadas.',
          },

          {
            // Nome da aula.
            titulo: 'Estruturando o layout',

            // Duração da aula.
            duracao: '21:01',

            // Link normal do YouTube.
            link: 'https://www.youtube.com/watch?v=khb92Mb14uY&list=PLAHPGKIfQVuIff8XNEhEN9-EJbwiQykCC&index=2&pp=iAQB0gcJCQMLAYcqIYzv',

            // Resumo da aula.
            descricao: 'Criação da estrutura visual base da aplicação.',
          },
        ],
      },

    ],
  },




];
