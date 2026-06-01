# Trilum Conecta

**Trilum Conecta** e uma plataforma front-end de orientacao de carreira em tecnologia. O MVP simula a jornada de alunos e empresas com cadastro, login local, recomendacoes, cursos, vagas, candidaturas, perfil profissional, certificados e geracao de curriculo.

> O projeto nao usa API externa de IA. O mentor e as recomendacoes funcionam por regras locais, dados mockados e informacoes salvas no navegador.

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

Este projeto sera publicado no **GitHub Pages**, sem Netlify, Vercel ou outro servico de deploy.

Antes de publicar:

```bash
npm run lint
npm run build
```

No repositorio do GitHub:

1. Entre em **Settings**.
2. Abra **Pages**.
3. Em **Build and deployment**, escolha **GitHub Actions** ou a branch/pasta configurada para Pages.
4. Garanta que a pasta publicada seja a build final gerada em `dist`.

Se usar uma action de GitHub Pages, o fluxo deve instalar dependencias, rodar `npm run build` e publicar `dist`.

## Dados e Persistencia

O MVP usa dados mockados e `localStorage`. Isso permite testar cadastro, login, progresso, certificados, empresas, vagas e candidaturas sem back-end.

Os dados ficam salvos no navegador usado no teste. Para reiniciar a demo, limpe o armazenamento local do site nas ferramentas do navegador.

## Observacoes

- As recomendacoes de cursos, trilhas e vagas são baseadas em regras manuais.
- As tags das vagas influenciam a compatibilidade com alunos.
- O curriculo exportado usa os dados atuais do perfil do aluno.
- Imagens foram otimizadas para manter o GitHub Pages mais leve dentro do possível para o MVP.
