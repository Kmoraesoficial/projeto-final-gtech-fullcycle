# Contribuidores e Divisão de Responsabilidades

Este documento detalha a divisão de tarefas e as responsabilidades individuais de cada integrante do projeto, garantindo a transparência da contribuição técnica para a avaliação.

## 👩‍💻 Karina Ferreira
**Foco:** Domínio, Regras de Negócio, Testes Unitários e Documentação Base.

**Responsabilidades:**
- **Domínio e Entidades:** Modelagem das entidades `Livro` e `Emprestimo`, aplicando os princípios de Clean Architecture.
- **Contratos (Interfaces):** Criação das interfaces `LivroRepository` e `EmprestimoRepository` (Repository Pattern).
- **Casos de Uso:** Implementação das regras de negócio puras em `RealizarEmprestimoUseCase` e `DevolverLivroUseCase`.
- **Testes Unitários:** Escrita da suíte de testes unitários utilizando mocks, validando regras como prazo de devolução, indisponibilidade de livro e pendências.
- **Documentação Técnica:** Redação da ADR (`docs/adr/0001-padrao-repositorio-e-banco.md`) e da especificação OpenAPI (`docs/openapi.yaml`).
- **Declaração de IA:** Estruturação inicial do documento `docs/ia.md`.

## 👨‍💻 Kevyn Ferreira
**Foco:** Infraestrutura, API HTTP, Conteinerização, CI/CD e Performance.

**Responsabilidades:**
- **Repositórios Concretos (Infraestrutura):** Implementação das classes `PrismaLivroRepository` e `PrismaEmprestimoRepository` conectando as regras de domínio ao banco de dados PostgreSQL (utilizando Prisma ORM).
- **Camada HTTP:** Criação das rotas (`POST /emprestimos`, `POST /devolucoes`, `GET /livros`) e controllers utilizando o framework Fastify, realizando a Injeção de Dependência dos casos de uso.
- **Observabilidade:** Configuração de logs estruturados em JSON utilizando a biblioteca Pino.
- **Conteinerização:** Criação do `Dockerfile` multi-stage e do `docker-compose.yml` (com healthcheck do banco e da API), garantindo que todo o ambiente suba com 1 comando (`docker compose up -d`).
- **Testes de Integração:** Criação do teste HTTP ponta a ponta (`tests/integration/emprestimo.test.ts`) validando a persistência no banco de dados real.
- **CI/CD (GitHub Actions):** Configuração do pipeline (`ci.yml`) para rodar o Linter, os Testes Unitários e os Testes de Integração com serviço de PostgreSQL no runner do GitHub.
- **Teste de Carga:** Execução do script k6 e documentação do p95 de latência em `docs/desempenho.md`.