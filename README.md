# Mari Campos - Silencie

Website institucional do projeto Silencie da Mari Campos.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar servidor de produção
npm run start

# Executar linting
npm run lint
```

O servidor de desenvolvimento estará disponível em [http://localhost:3000](http://localhost:3000).

## Estrutura do Projeto

```
app/
├── layout.tsx    # Layout raiz com configuração de fontes
├── page.tsx      # Página inicial
└── globals.css   # Estilos globais com Tailwind
public/           # Assets estáticos
```

## Path Aliases

Use `@/*` para importar a partir da raiz do projeto.

```typescript
import { Component } from '@/components/Component'
```
