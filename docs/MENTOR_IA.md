# Mentor IA local

O Mentor Inteligente é uma camada opcional de explicação textual para o RiseUp / Trilum Conecta.

> O motor de regras continua sendo a fonte de verdade das recomendações. A IA local apenas transforma o resultado em uma explicação mais humana e personalizada.

## O que ele faz

- Explica recomendações já calculadas de trilhas, cursos e vagas.
- Orienta melhorias no perfil, currículo, projetos práticos e candidaturas.
- Melhora textos de vagas e do perfil institucional da empresa.
- Redige resumos cautelosos para dossiês e feedbacks revisáveis.
- Melhora textos orientativos ligados ao radar de prontidão.
- Usa somente um resumo necessário do perfil e dos itens recomendados.
- Nunca altera perfil, currículo, candidatura, vaga ou recomendação.
- Nunca inventa ou adiciona itens ao resultado do recomendador.

## Funcionamento sem IA

A IA local vem desativada por padrão. Nesse modo, os botões do mentor usam dicas padrão construídas com os motivos e dados já existentes no sistema.

Se o Ollama estiver ativado, mas não responder, exceder o tempo limite ou retornar uma resposta inválida, o sistema usa automaticamente o mesmo fallback. A apresentação continua funcionando normalmente em outro computador.

## Ativar com Ollama

1. Instale o [Ollama](https://ollama.com/).
2. Baixe um modelo local:

```bash
ollama pull gemma3:1b
```

3. Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_IA_LOCAL_HABILITADA=true
VITE_OLLAMA_ENDPOINT=http://localhost:11434/api/chat
VITE_OLLAMA_MODELO=gemma3:1b
VITE_IA_TIMEOUT_MS=30000
```

4. Inicie novamente o projeto.

Para desativar, remova a variável ou use:

```env
VITE_IA_LOCAL_HABILITADA=false
```

Por segurança, o serviço aceita somente endpoints locais em `localhost`, `127.0.0.1` ou `::1`. Não existe chave de API e nenhuma API paga é necessária.

O `gemma3:1b` é indicado para uma demonstração leve. Em computadores com mais memória, `gemma3:4b` tende a produzir explicações melhores; basta baixar o modelo e alterar `VITE_OLLAMA_MODELO`.

## Onde aparece

- Mentor do aluno: painel, trilhas, cursos, vagas, perfil, currículo e candidaturas.
- Projetos práticos e radar: melhoria opcional de textos orientativos.
- Retorno de candidatura: orientação cuidadosa baseada no status e no feedback público.
- Mentor da empresa: perfil institucional, criação e gerenciamento de vagas e candidatos.
- Melhoria de vaga e perfil da empresa: sugestão revisável antes de aplicar.
- Dossiê e feedback assistido: redação mais clara sem alterar score, listas ou decisão humana.

## Uso no deploy público

O deploy publicado sempre funciona com regras e fallbacks, mesmo sem Ollama. O workflow do GitHub Pages gera a versão pública com `VITE_IA_LOCAL_HABILITADA=true`, permitindo que o navegador tente usar o Ollama instalado no computador de quem acessa.

Cada visitante que quiser receber textos gerados pelo modelo precisa ter o Ollama instalado, o `gemma3:1b` baixado e o serviço local executando. Como a chamada parte do navegador aberto no domínio público, também pode ser necessário autorizar `https://auhauhbr.github.io` na configuração local do Ollama. Sem isso, a central usa fallback automaticamente e nenhuma tela quebra.

Para autorizar permanentemente o deploy no Windows, execute uma vez e reinicie o Ollama:

```powershell
setx OLLAMA_ORIGINS "https://auhauhbr.github.io"
```

Depois, confirme que o modelo está disponível:

```powershell
ollama pull gemma3:1b
```

Sem essa autorização local, o deploy continua funcionando, mas apresenta os textos de fallback.

## Proteções

- Uma central compartilhada em `src/servicos/centralIA.js` controla habilitação, endpoint local, timeout, fallback e validação.
- A IA apoia somente textos e explicações. Ela nunca decide recomendações, pontuações, candidaturas ou status.
- Nenhuma sugestão é salva, publicada, aprovada ou rejeitada automaticamente.
- Contexto reduzido, sem senha, CPF, localStorage completo ou objetos internos desnecessários.
- Top 3 trilhas, top 5 cursos e top 3 vagas no máximo.
- Timeout configurável.
- Cache simples por usuário, cenário e contexto.
- Máximo de 4 frases.
- Limite de 600 caracteres para cards e 900 para currículo.
- Respostas vazias, técnicas, grandes ou que citem itens conhecidos fora do contexto são descartadas.

## Central de segurança

Os recursos do mentor do aluno e da empresa usam a mesma infraestrutura segura. Cada recurso ainda possui validações próprias para impedir invenções, como cursos fora do contexto, tecnologias não informadas, benefícios inexistentes ou decisões sobre candidatos.

Toda execução produz internamente uma origem (`ia` ou `fallback`). Essa informação serve para controle do sistema; a interface continua apresentando apenas a orientação do mentor, sem expor detalhes técnicos.

## Teste manual

Sem Ollama:

1. Mantenha `VITE_IA_LOCAL_HABILITADA=false`.
2. Abra painel, vaga e currículo.
3. Clique em **Gerar dica inteligente**.
4. Confirme que uma dica padrão aparece sem erro técnico.

Com Ollama:

1. Ative as variáveis e garanta que o modelo está disponível.
2. Gere dicas nas mesmas telas.
3. Confira se o texto comenta apenas itens presentes no contexto.
4. Pare o Ollama e confirme que o fallback continua funcionando.
