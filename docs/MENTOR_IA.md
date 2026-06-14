# Mentor IA local

O Mentor Inteligente é uma camada opcional de explicação textual para o RiseUp / Trilum Conecta.

> O motor de regras continua sendo a fonte de verdade das recomendações. A IA local apenas transforma o resultado em uma explicação mais humana e personalizada.

## O que ele faz

- Explica recomendações já calculadas de trilhas, cursos e vagas.
- Orienta melhorias no currículo.
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
VITE_IA_TIMEOUT_MS=8000
```

4. Inicie novamente o projeto.

Para desativar, remova a variável ou use:

```env
VITE_IA_LOCAL_HABILITADA=false
```

Por segurança, o serviço aceita somente endpoints locais em `localhost`, `127.0.0.1` ou `::1`. Não existe chave de API e nenhuma API paga é necessária.

O `gemma3:1b` é indicado para uma demonstração leve. Em computadores com mais memória, `gemma3:4b` tende a produzir explicações melhores; basta baixar o modelo e alterar `VITE_OLLAMA_MODELO`.

## Onde aparece

- Painel do aluno: visão geral, trilha principal e curso principal.
- Vagas: explicação da compatibilidade da vaga selecionada.
- Meu Currículo: orientação sobre campos preenchidos e faltantes.

## Proteções

- Contexto reduzido, sem senha, CPF, localStorage completo ou objetos internos desnecessários.
- Top 3 trilhas, top 5 cursos e top 3 vagas no máximo.
- Timeout configurável.
- Cache simples por usuário, cenário e contexto.
- Máximo de 4 frases.
- Limite de 600 caracteres para cards e 900 para currículo.
- Respostas vazias, técnicas, grandes ou que citem itens conhecidos fora do contexto são descartadas.

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
