# Guia de Commits - Conventional Commits

Este documento define o padrão de commits usado no projeto.

## Formato

```
<tipo>(escopo): descrição curta (até ~50 caracteres)

Descrição detalhada do que foi feito e por quê, com linhas
de no máximo ~72 caracteres. Explica o contexto e motivação
das mudanças de forma clara e objetiva.
```

## Tipos de Commit

### feat
**Nova funcionalidade ou feature**

Usado quando você adiciona algo novo ao projeto que aumenta suas capacidades.

```bash
feat(auth): implementa módulo de autenticação com login

Adiciona UserRepository para consultas ao banco, AuthService com lógica
de negócio (validação de credenciais e geração de token), AuthController
para handlers HTTP e schemas Zod para validação de entrada.

Integra cookie-parser e express.urlencoded() no app para suportar
requisições de autenticação. Exporta authRouter no index de rotas.
```

### fix
**Correção de bug**

Usado quando você corrige um problema ou comportamento incorreto.

```bash
fix(auth): corrige validação de email case-sensitive

Remove diferenciação de maiúsculas/minúsculas na validação de email
para evitar duplicatas como user@email.com e USER@EMAIL.COM.
```

### refactor
**Refatoração sem mudança de funcionalidade**

Reestruturação do código que não adiciona features nem corrige bugs.

```bash
refactor(lib): move libs/ para lib/ e melhora JWT

Renomeia diretório libs/ para lib/ (singular) por convenção. Adiciona
try-catch no verifyToken para retornar null em caso de erro ao invés
de lançar exceção. Atualiza imports no AuthService.
```

### chore
**Tarefas de manutenção**

Mudanças em configurações, builds, dependências, etc.

```bash
chore: adiciona scripts de build e execução de testes

Configura build para produção com tsc e tsc-alias para resolver path
aliases (@/*). Adiciona scripts 'start' para produção e 'test' para CI.
Define outDir no tsconfig.json para compilação em ./dist.
```

### test
**Adiciona ou modifica testes**

```bash
test: adiciona testes de integração para cursos e ajustes

Cria factory makeCourse para geração de dados de teste. Implementa
testes E2E para criar, listar, buscar, atualizar e deletar cursos.
Refatora makeUser para usar faker pt_BR diretamente e retornar primeira
entrada. Atualiza testes de auth para usar nova estrutura.
```

### docs
**Apenas documentação**

```bash
docs: adiciona arquivo COMMITS.md com guia de padrões

Documenta convenções de commits usando Conventional Commits para
padronizar mensagens de commit no projeto.
```

### style
**Formatação, sem mudança de lógica**

```bash
style: formata código seguindo padrão Biome

Remove pontos e vírgulas, ajusta indentação e aplica regras do Biome
em todo o código. Sem mudanças funcionais.
```

### perf
**Melhoria de performance**

```bash
perf(db): adiciona índice em users.email

Cria índice na coluna email da tabela users para otimizar queries de
login e registro. Reduz tempo de busca de O(n) para O(log n).
```

## Escopos Comuns

Use escopos para indicar qual parte do projeto foi afetada:

- `auth` - Autenticação/autorização
- `courses` - Módulo de cursos
- `users` - Módulo de usuários
- `db` - Banco de dados, migrations, schema
- `docker` - Docker e docker-compose
- `config` - Arquivos de configuração
- `core` - Funcionalidades centrais da aplicação
- `middleware` - Middlewares Express
- `lib` - Bibliotecas e utilitários
- `types` - Type definitions
- `repositories` - Camada de repositórios

## Regras de Agrupamento

### ✅ O que fazer

1. **Agrupar arquivos relacionados logicamente** (2-5 arquivos por commit idealmente)
2. **Commits com propósito único e claro**
3. **Separar por responsabilidade**:
   - Configurações/dependências juntas
   - Schema + migrations juntas
   - Service + controller + router juntos (módulo completo)
   - Testes separados da implementação principal
   - Refatorações separadas de novas features

### ❌ O que evitar

1. **Commits muito granulares** - Um arquivo por commit
2. **Commits muito grandes** - Todo o módulo sem organização
3. **Misturar responsabilidades** - Feature nova + refactor + fix no mesmo commit
4. **Mensagens genéricas** - "update", "fix", "changes"

## Exemplos Práticos

### ✅ Bom - Agrupa configuração relacionada

```bash
feat(auth): adiciona dependências para autenticação e segurança

Instala argon2 para hash de senhas, jsonwebtoken para autenticação JWT
e cookie-parser para gerenciamento de cookies. Adiciona JWT_SECRET como
variável obrigatória e corrige formatação do código seguindo padrão do
projeto (remoção de ponto e vírgula).

Arquivos: package.json, pnpm-lock.yaml, src/env.ts, drizzle.config.ts
```

### ✅ Bom - Módulo completo

```bash
feat(courses): implementa módulo completo de cursos

Cria CRUD de cursos com CourseController, CourseService, CourseRouter
e schemas Zod para validação. Implementa operações de criar, listar,
buscar por ID, atualizar e deletar. Adiciona rota /courses no app e
exporta router no index. Corrige ordem de imports no app.ts.

Arquivos: 
- src/routes/courses/course.router.ts
- src/routes/courses/course.schemas.ts
- src/routes/courses/course.controller.ts
- src/routes/courses/course.service.ts
- src/routes/index.ts
- src/app.ts
```

### ✅ Bom - Schema + Migration

```bash
feat(db): adiciona schema e migrations da tabela courses

Cria tabela courses com campos id (UUID), title, description, duration,
imageUrl, status (boolean default true) e timestamps. Gera migration
unificada resetando schemas anteriores. Adiciona .editorconfig para
padronização de formatação entre editores.

Arquivos:
- src/db/schema/courses.ts
- src/db/schema/index.ts
- src/db/migrations/0000_watery_penance.sql
- src/db/migrations/meta/
```

### ❌ Ruim - Muito genérico

```bash
update files

Updated some files
```

### ❌ Ruim - Muito granular

```bash
feat: adiciona CourseController

Cria arquivo CourseController.ts
```

```bash
feat: adiciona CourseService

Cria arquivo CourseService.ts
```

```bash
feat: adiciona CourseRouter

Cria arquivo CourseRouter.ts
```

_Estes 3 deveriam ser 1 commit: "feat(courses): implementa módulo completo"_

### ❌ Ruim - Mistura responsabilidades

```bash
feat: adiciona autenticação, refatora users e corrige bug no login

Implementa JWT, move arquivos, corrige senha...
```

_Deveria ser 3 commits separados: feat(auth), refactor(users), fix(auth)_

## Estrutura da Descrição

### Primeira linha (título)
- Máximo ~50 caracteres
- Minúscula após o tipo
- Sem ponto final
- Imperativo ("adiciona" não "adicionado")

### Corpo (opcional mas recomendado)
- Linhas de ~72 caracteres
- Explica O QUE e POR QUÊ (não como)
- Contexto sobre decisões tomadas
- Referências a issues se aplicável

### Exemplo completo

```bash
feat(middleware): implementa middleware de autenticação JWT

Cria authMiddleware para validar tokens JWT de cookies. Suporta modo
strictBlock (default: true) para bloquear requisições não autenticadas
ou permitir acesso com userId null. Adiciona userId ao Request para
uso nos controllers.

O modo strictBlock opcional permite rotas públicas que ainda podem
identificar usuário autenticado se presente, útil para features como
"favoritar se logado".
```

## Quando commitar

- **Commits frequentes** durante desenvolvimento de features grandes
- **Commit após cada etapa lógica** completa e funcional
- **Não comite código quebrado** - cada commit deve deixar o projeto funcional
- **Use branches** para features experimentais

## Ferramentas

### Verificar commits antes de push

```bash
git log --oneline -10
```

### Amend do último commit (se ainda não fez push)

```bash
git add arquivo-esquecido.ts
git commit --amend --no-edit
```

### Reescrever commits locais (avançado)

```bash
# Interativo - últimos 3 commits
git rebase -i HEAD~3
```

⚠️ **Nunca reescreva histórico público (já no origin)**

## Checklist antes do Commit

- [ ] As mudanças estão relacionadas logicamente?
- [ ] A mensagem descreve claramente o que e por quê?
- [ ] O tipo e escopo estão corretos?
- [ ] O código está funcionando?
- [ ] Não estou misturando refactor com feature?
- [ ] A mensagem segue o formato especificado?

## Referências

- [Conventional Commits](https://www.conventionalcommits.org/)
- [How to Write a Git Commit Message](https://chris.beams.io/posts/git-commit/)
