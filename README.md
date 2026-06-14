# Trilum Conecta

**Trilum Conecta** é uma plataforma front-end de orientação de carreira em tecnologia. O MVP simula a jornada de alunos e empresas com cadastro, login local, recomendações, cursos, vagas, candidaturas, perfil profissional, certificados e geração de currículo.

O projeto não usa API externa de IA. O mentor, as validações e as recomendações funcionam por regras locais, dados mockados e informações salvas no navegador.

## Acesso da Demo

Versão publicada no GitHub Pages:

[https://jeffersonsantoskn.github.io/Trilum-Conecta/#/](https://jeffersonsantoskn.github.io/Trilum-Conecta/#/)

> **Nota:** Use o link com `#/`, pois o projeto usa `HashRouter` para funcionar corretamente no GitHub Pages.

### Contas prontas para apresentação:

**Empresa Avanade**

* **E-mail:** avanade@riseup.demo
* **Senha:** Avanade@123

**Aluno Jefferson Santos**

* **E-mail:** jefferson@riseup.demo
* **Senha:** Jefferson@123

**Observação:** Jefferson Santos já aparece como candidato em uma vaga da Avanade, para permitir testar rapidamente a visualização de perfil e a exportação de currículo pelo lado da empresa.

## Funcionalidades

* **Landing page institucional** com apresentação da plataforma, equipe e mentor contextual.
* **Cadastro e login local** para aluno e empresa.
* **Validação guiada** por mentor em login/cadastro.
* **Wizard do aluno** para personalizar trilhas, cursos e vagas.
* **Catálogo** de cursos, trilhas, módulos e aulas.
* **Registro local** de progresso por usuário.
* **Certificados Trilum** para cursos concluídos.
* **Perfil público do aluno** com tecnologias, idiomas, formação, projetos, experiências e anexos de certificados externos.
* **Gerador de currículo inteligente** com preview, copiar texto e exportação em PDF.
* **Área da empresa** com perfil institucional, criação de vagas, gerenciamento, preview da vaga e lista de candidatos.
* **Empresas e vagas mockadas**, incluindo Avanade, Microsoft e Apple.
* **Visualização de empresa na vaga** com logo, capa, descrição e dados institucionais.
* **Exportação do currículo atualizado** do candidato pela empresa.
* **Mentor da empresa** com dicas sobre perfil, vagas, tags, compatibilidade e candidatos.
* **Mentor compactável:** ao fechar, ele vira um botão flutuante e pode ser reaberto sem atualizar a página.

## Roteiro Rápido de Teste

### Aluno

1. Acesse a landing page.
2. Entre em **Cadastrar** e crie uma conta de aluno.
3. Observe o mentor de validação nos campos obrigatórios e na senha.
4. Complete o wizard para receber recomendações.
5. Acesse cursos e trilhas recomendadas.
6. Abra uma vaga e confira a aba *Vaga* e a aba *Empresa*.
7. Edite o perfil público do aluno.
8. Abra **Meu Currículo**, confira o preview e teste copiar texto/exportar PDF.

### Empresa

1. Crie ou acesse uma conta de empresa.
2. Confira o aviso do mentor para completar o perfil.
3. Edite o perfil institucional da empresa.
4. Use a vaga demo criada automaticamente no cadastro ou crie uma nova vaga.
5. Abra a lista de candidatos da vaga demo.
6. Clique em *Rafael Souza* ou *Jefferson Santos* e teste a exportação do currículo atualizado.

> Ao cadastrar uma nova empresa, a plataforma cria automaticamente uma vaga demo editável e um candidato fictício com perfil completo. Isso permite testar o gerenciamento de vaga, ver o perfil do candidato, alterar o status e exportar o currículo sem precisar cadastrar um aluno antes.

## Tecnologias

* React
* Vite
* React Router
* JavaScript
* CSS
* LocalStorage
* Lucide React
* Tabler Icons / React Icons (quando aplicável)

## Como Rodar Localmente

**Pré-requisitos:**

* Node.js
* npm

Instale as dependências:

```bash
npm i
```

Rode em desenvolvimento:

```bash
npm run dev
```

Acesse a URL exibida no terminal, normalmente: `http://localhost:5173`

### Scripts

* `npm run dev`: Inicia o ambiente local.
* `npm run lint`: Executa a verificação de lint.
* `npm run build`: Gera a versão final na pasta `dist`.
* `npm run preview`: Abre uma prévia local da build.

## Publicação no GitHub Pages

A publicação é feita pelos desenvolvedores do projeto. Depois do deploy, o avaliador/mentor acessa apenas o link final da plataforma no GitHub Pages.

Antes de publicar:

```bash
npm run lint
npm run build
```

**Configuração usada:**

* `vite.config.js` com `base: '/Trilum-Conecta/'`.
* `HashRouter` no React para evitar tela branca ao recarregar rotas no GitHub Pages.
* GitHub Actions publicando a pasta `dist`.
* `public/.nojekyll` para evitar processamento pelo Jekyll.

## Dados e Persistência

O MVP usa dados mockados e `localStorage`. Isso permite testar cadastro, login, progresso, certificados, empresas, vagas e candidaturas sem back-end.

Os dados ficam salvos no navegador usado no teste. Para reiniciar a demo, limpe o armazenamento local do site nas ferramentas do navegador.

## Mentor IA local opcional

O projeto possui uma camada opcional de explicações personalizadas com Ollama local. O recomendador por regras continua decidindo cursos, trilhas e vagas; o mentor apenas explica os resultados e usa dicas padrão quando a IA local está desativada ou indisponível.

Veja configuração, proteções e testes em [docs/MENTOR_IA.md](docs/MENTOR_IA.md).

## Observações Para Avaliação

* As recomendações de cursos, trilhas e vagas são baseadas em regras manuais.
* As tags das vagas influenciam a compatibilidade com alunos.
* O currículo exportado usa os dados atuais do perfil do aluno.
* A primeira abertura no GitHub Pages pode demorar alguns segundos para carregar imagens maiores do mentor.
* O projeto é um MVP front-end; dados criados durante o teste ficam apenas no navegador.
