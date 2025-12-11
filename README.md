# Cursos Backend

API REST para gerenciamento de cursos e autenticação de usuários.

## 🚀 Como Rodar

### Pré-requisitos
- Node.js 18+
- pnpm
- Docker (para PostgreSQL)

### Configuração

1. Clone o repositório e instale as dependências:
```bash
pnpm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:
```env
PORT=3333
DATABASE_URL=postgres://docker:docker@localhost:5432/cursos_db
JWT_SECRET=seu_secret_aqui
NODE_ENV=development
```

3. Inicie o banco de dados:
```bash
docker-compose up -d
```

4. Execute as migrations:
```bash
pnpm db:migrate
```

5. Inicie o servidor:
```bash
pnpm dev
```

A API estará disponível em `http://localhost:3333`

### Scripts Disponíveis

```bash
pnpm dev          # Desenvolvimento com hot-reload
pnpm build        # Build para produção
pnpm start        # Executa versão compilada
pnpm test         # Roda testes
pnpm test:watch   # Testes em watch mode
pnpm lint         # Lint e fix com Biome
pnpm db:generate  # Gera migrations
pnpm db:migrate   # Aplica migrations
pnpm db:studio    # Abre Drizzle Studio
```

## 🏗️ Arquitetura

### Decisões Técnicas

**Express vs Fastify/NestJS**: Optei pelo Express por sua flexibilidade para implementar arquitetura em camadas customizada. O Fastify, apesar de ser minha escolha atual em outros projetos, e o NestJS (mais opinado) não demonstrariam tão claramente minha forma de pensar e estruturar código.

> 💡 Há uma branch `nestjs-prisma-backup` com implementação em NestJS que foi descontinuada por esse motivo.

### Stack
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **ORM**: Drizzle ORM (type-safe, performático)
- **Database**: PostgreSQL 15
- **Validação**: Zod v4
- **Testes**: Vitest + Supertest
- **Auth**: JWT + Argon2
- **Lint/Format**: Biome

### Padrão de Camadas

```
Controller → Service → Repository → Database
```

- **Controller**: Recebe requests, chama service, retorna responses
- **Service**: Lógica de negócio e validações
- **Repository**: Acesso a dados (queries Drizzle)
- **Middleware**: Validação, autenticação, error handling

### Estrutura de Diretórios

```
src/
├── db/              # Configuração DB, schemas e migrations
├── lib/             # Wrappers de bibliotecas (JWT, crypt)
├── middlewares/     # Express middlewares
├── repositories/    # Camada de dados (classes)
├── routes/          # Módulos organizados por domínio
│   ├── auth/
│   └── courses/
├── types/           # Type definitions customizados
└── utils/           # Helpers e utilitários
```

## 📝 Observações de Desenvolvimento

### Convenções
- **Commits**: Conventional Commits (feat, fix, refactor, etc.)
- **Code Style**: Sem ponto e vírgula, path aliases `@/*`
- **Database**: snake_case nas colunas, camelCase no código
- **IDs**: UUIDv7 para melhor ordenação temporal

### Segurança
- Senhas com hash Argon2
- JWT em cookies httpOnly
- Validação em todas as entradas

### Testes
- Factories para dados realistas (Faker PT-BR)
- Database de teste isolado (cursos_db_test)
- Ambiente carregado via dotenv-cli

## 🤖 Auxílio de IA

A IA (Warp AI + GitHub Copilot) auxiliou significativamente em:

- **Criação de commits**: Seguindo padrão Conventional Commits
- **Desenvolvimento de testes**: Redução de trabalho repetitivo
- **Documentação**: Este README
- **Boilerplate**: Aceleração em código repetitivo

O Copilot foi especialmente útil em factories, testes e estruturas CRUD similares.

## 📚 Endpoints

### Auth
- `POST /auth/register` - Criar usuário
- `POST /auth/login` - Login
- `GET /auth/me` - Dados do usuário (protegida)

### Courses
- `GET /courses` - Listar cursos
- `GET /courses/total` - Total de cursos
- `GET /courses/:id` - Buscar curso
- `POST /courses` - Criar curso (protegida)
- `PUT /courses/:id` - Atualizar curso (protegida)
- `DELETE /courses/:id` - Deletar curso (protegida)

## 📦 Branches

- `dev` - Desenvolvimento principal (Express + Drizzle)
- `express-drizzle-backup` - Backup da implementação Express
- `nestjs-prisma-backup` - Implementação NestJS descontinuada
