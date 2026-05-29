# Como publicar `@hyperboosters/hyperagents` no npm

Passo a passo prático. ~15 minutos.

## Pré-requisito

Você precisa de uma conta npmjs.com. Se não tem:

1. Abra https://www.npmjs.com/signup
2. Cria conta com e-mail (use raonibarbalho@gmail.com pra alinhar com o `package.json` `author`)
3. Confirma e-mail
4. Habilita 2FA (recomendado pra publicar — usa Google Authenticator ou similar)

## Criar a organização `@hyperboosters`

Pacotes com escopo `@xxx/yyy` precisam de organização no npm. Free pra packages públicos.

1. Loga em https://www.npmjs.com
2. Acessa https://www.npmjs.com/org/create
3. Nome da org: `hyperboosters`
4. Tipo: Free (Public packages)
5. Cria

Depois disso, `@hyperboosters/*` está reservado pra você.

## Login no CLI

No terminal:

```bash
npm login
```

Vai abrir browser pra OAuth. Confirma + 2FA. Verifique:

```bash
npm whoami
# Deve retornar seu username
```

## Publicar

```bash
cd /home/raonix/dev/agents-mcp

# Verificar build
npm run build

# Dry-run primeiro (não publica, só mostra o que iria)
npm publish --dry-run --access public

# Conferir conteúdo:
# - dist/agents.js, dist/agents.d.ts
# - dist/index.js, dist/index.d.ts
# - README.md
# - LICENSE
# - package.json
# Total ~8KB

# Publicar de verdade
npm publish --access public
```

Vai pedir 2FA. Confirma com código do app.

## Verificar publicação

```bash
# Aguarda ~30s pra propagação
npm view @hyperboosters/hyperagents

# Testa instalação em diretório limpo
mkdir /tmp/test-mcp && cd /tmp/test-mcp
npx -y @hyperboosters/hyperagents --help 2>&1 | head -5
```

Se rodar, está publicado e funcionando.

## Próximo: testar do "ponto de vista do cliente"

Em uma sessão Cursor/Claude Desktop limpa:

1. Adiciona ao config MCP:
```json
{
  "mcpServers": {
    "hyperboosters-agents": {
      "command": "npx",
      "args": ["-y", "@hyperboosters/hyperagents"]
    }
  }
}
```

2. Reinicia o cliente
3. Pede algo: "use HB_sales para escrever cold message"
4. Confirma resposta válida

Esse é o "moment of truth" — se funciona pra você como cliente novo, funciona pra qualquer dev no mundo.

## Versionamento

Toda mudança = bump version + republicar.

```bash
# Bug fix → patch
npm version patch && npm publish

# Nova feature → minor
npm version minor && npm publish

# Breaking change → major
npm version major && npm publish
```

`npm version` automaticamente cria commit + tag git.

## Se algo der errado

| Erro | Solução |
|---|---|
| `403 You must verify your email` | Confirma e-mail em npmjs.com |
| `403 Forbidden: @hyperboosters not found` | Cria org primeiro (link acima) |
| `EOTP One-time password required` | Adiciona `--otp=<code>` ao comando |
| `E409 conflict` | Versão já publicada. Bump version e tenta de novo |
| `ENEEDAUTH` | `npm login` de novo |
| Package fica "unpublished" | npm permite unpublish em 72h. Depois disso, só nova versão |

## Backup: nome alternativo (caso `@hyperboosters` não vingue)

Se a org `hyperboosters` estiver tomada (raro):

- `@hb-claw/agents` (mais técnico)
- `@hyperb/agents-mcp` (curto)
- `@raoni-hb/agents` (founder branding)

Edita `package.json` `name` antes de publicar.

## Pós-publicação

1. **GitHub repo** — `git remote add origin https://github.com/raonibarbalhox/agents-mcp` + push
2. **Badge no README** — adiciona shields.io: `![npm version](https://img.shields.io/npm/v/@hyperboosters/hyperagents)`
3. **Posts** — usa `LAUNCH_COPY.md` (LinkedIn + Twitter + Reddit)
4. **Monitora** — `npm view @hyperboosters/hyperagents` mostra downloads
