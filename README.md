# Trilum Conecta

**Trilum Conecta** e uma plataforma front-end de orientacao de carreira em tecnologia. O MVP simula a jornada de alunos e empresas com cadastro, login local, recomendacoes, cursos, vagas, candidaturas, perfil profissional, certificados e geracao de curriculo.

> O projeto nao usa API externa de IA. O mentor, as validacoes e as recomendacoes funcionam por regras locais, dados mockados e informacoes salvas no navegador.

## Acesso da Demo

Versao publicada no GitHub Pages:

```txt
https://jeffersonsantoskn.github.io/Riseup---Projeto-Front/#/
```

Use o link com `#/`, pois o projeto usa `HashRouter` para funcionar corretamente no GitHub Pages.

## Funcionalidades

- Landing page institucional com apresentacao da plataforma, equipe e mentor contextual.
- Cadastro e login local para aluno e empresa.
- Validacao guiada por mentor em login/cadastro.
- Wizard do aluno para personalizar trilhas, cursos e vagas.
- Catalogo de cursos, trilhas, modulos e aulas.
- Registro local de progresso por usuario.
- Certificados Trilum para cursos concluidos.
- Perfil publico do aluno com tecnologias, idiomas, formacao, projetos, experiencias e anexos de certificados externos.
- Gerador de curriculo inteligente com preview, copiar texto e exportacao em PDF.
- Area da empresa com perfil institucional, criacao de vagas, gerenciamento, preview da vaga e lista de candidatos.
- Empresas e vagas mockadas, incluindo Avanade, Microsoft e Apple.
- Visualizacao de empresa na vaga com logo, capa, descricao e dados institucionais.
- Exportacao do curriculo atualizado do candidato pela empresa.
- Mentor da empresa com dicas sobre perfil, vagas, tags, compatibilidade e candidatos.
- Mentor compactavel: ao fechar, ele vira um botao flutuante e pode ser reaberto sem atualizar a pagina.

## Roteiro Rapido de Teste

### Aluno

1. Acesse a landing page.
2. Entre em **Cadastrar** e crie uma conta de aluno.
3. Observe o mentor de validacao nos campos obrigatorios e na senha.
4. Complete o wizard para receber recomendacoes.
5. Acesse cursos e trilhas recomendadas.
6. Abra uma vaga e confira a aba **Vaga** e a aba **Empresa**.
7. Edite o perfil publico do aluno.
8. Abra **Meu Curriculo**, confira o preview e teste copiar texto/exportar PDF.

### Empresa

1. Crie ou acesse uma conta de empresa.
2. Confira o aviso do mentor para completar o perfil.
3. Edite o perfil institucional da empresa.
4. Crie uma vaga e confirme que ela aparece no painel/listagem.
5. Abra a lista de candidatos.
6. Clique em um candidato e teste a exportacao do curriculo atualizado.

## Tecnologias

- React
- Vite
- React Router
- JavaScript
- CSS
- LocalStorage
- Lucide React
- Tabler Icons / React Icons quando aplicavel

## Como Rodar Localmente

Pre-requisitos:

- Node.js
- npm

Instale as dependencias:

```bash
npm i
```

Rode em desenvolvimento:

```bash
npm run dev
```

Acesse a URL exibida no terminal, normalmente:

```txt
http://localhost:5173
```

## Scripts

```bash
npm run dev
```

Inicia o ambiente local.

```bash
npm run lint
```

Executa a verificacao de lint.

```bash
npm run build
```

Gera a versao final na pasta `dist`.

```bash
npm run preview
```

Abre uma previa local da build.

## Publicacao no GitHub Pages

A publicacao e feita pelos desenvolvedores do projeto. Depois do deploy, o avaliador/mentor acessa apenas o link final da plataforma no GitHub Pages.

Antes de publicar:

```bash
npm run lint
npm run build
```

Configuracao usada:

- `vite.config.js` com `base: '/Riseup---Projeto-Front/'`.
- `HashRouter` no React para evitar tela branca ao recarregar rotas no GitHub Pages.
- GitHub Actions publicando a pasta `dist`.
- `public/.nojekyll` para evitar processamento pelo Jekyll.

## Dados e Persistencia

O MVP usa dados mockados e `localStorage`. Isso permite testar cadastro, login, progresso, certificados, empresas, vagas e candidaturas sem back-end.

Os dados ficam salvos no navegador usado no teste. Para reiniciar a demo, limpe o armazenamento local do site nas ferramentas do navegador.

## Observacoes Para Avaliacao

- As recomendacoes de cursos, trilhas e vagas sao baseadas em regras manuais.
- As tags das vagas influenciam a compatibilidade com alunos.
- O curriculo exportado usa os dados atuais do perfil do aluno.
- A primeira abertura no GitHub Pages pode demorar alguns segundos para carregar imagens maiores do mentor.
- O projeto e um MVP front-end; dados criados durante o teste ficam apenas no navegador.
