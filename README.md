# Nível Escolhido: Projeto B

# API de Sistema de Biblioteca e Empréstimos

API RESTful desenvolvida como **Projeto Final** do curso **FullCycle - Engenharia de Software e IA Aplicada**. O sistema gerencia o fluxo principal de empréstimos e devoluções de livros 
em uma biblioteca, garantindo integridade de dados, regras de negócio isoladas, testes automatizados e observabilidade.

---

## 📋 Sumário
- [Arquitetura e Boas Práticas](#arquitetura-e-boas-práticas)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Pré-requisitos](#pré-requisitos)
- [Como Executar a Aplicação (1 Comando)](#como-executar-a-aplicação-1-comando)
- [Como Executar os Testes](#como-executar-os-testes)
- [Documentação Técnica](#documentação-técnica)
- [Contribuidores](#contribuidores)

---

## 🏗️ Arquitetura e Boas Práticas

O projeto segue os princípios de **Clean Architecture** e **SOLID**, garantindo que o núcleo do domínio esteja desacoplado de bancos de dados, frameworks ou detalhes de infraestrutura.

- **Domain-Driven Design (DDD)**: Entidades (`Livro`, `Emprestimo`) e Casos de Uso (`RealizarEmprestimoUseCase`, `DevolverLivroUseCase`) isolados.
- **Repository Pattern**: Abstração do acesso aos dados permitindo a substituição de ORMs ou bancos sem impactar a regra de negócio.
- **Design Pattern**: Repository e Factory Pattern justificados na [ADR-0001](docs/adr/0001-padrao-repositorio-e-banco.md).
- **Observabilidade**: Logs estruturados em formato JSON com propagação de `request_id`.

---

## 📁 Estrutura do Repositório

```text
.
├── docker-compose.yml
├── Dockerfile
├── README.md
├── CONTRIBUTORS.md
├── .env.example
├── package.json
├── tsconfig.json
├── docs/
│   ├── adr/
│   │   └── 0001-padrao-repositorio-e-banco.md
│   ├── openapi.yaml
│   ├── desempenho.md
│   └── ia.md
├── src/
│   ├── domain/
│   │   ├── Livro.ts
│   │   ├── Emprestimo.ts
│   │   └── repositories.ts
│   ├── use-cases/
│   │   ├── RealizarEmprestimoUseCase.ts
│   │   └── DevolverLivroUseCase.ts
│   └── infrastructure/
├── tests/
│   └── unit/
│       ├── RealizarEmprestimoUseCase.test.ts
│       └── DevolverLivroUseCase.test.ts
└── .github/
    └── workflows/
        └── ci.yml
```

---

## ⚙️ Pré-requisitos

- [Docker]([suspicious link removed]) e [Docker Compose]([suspicious link removed])
- [Node.js](https://nodejs.org/) (versão 20+ ou 22+) *[opcional para execução de testes localmente]*

---

## 🚀 Como Executar a Aplicação (1 Comando)

Toda a infraestrutura (API Node.js + Banco PostgreSQL) pode ser inicializada com **apenas 1 comando**:

```bash
docker compose up -d
```

A API estará disponível em `http://localhost:3000`.

Para encerrar os contêineres:
```bash
docker compose down
```

---

## 🧪 Como Executar os Testes

A suíte de testes unitários utiliza o **Node.js Test Runner** nativo e pode ser executada com:

```bash
npm test
```

Ou diretamente via Node.js:
```bash
node --test --experimental-strip-types 'tests/unit/*.test.ts'
```

Para rodar em modo contínuo (*watch mode*):
```bash
npm run test:watch
```

---

## 📄 Documentação Técnica

- **Decisões Arquiteturais**: [ADR-0001 - Padrão Repositório e Banco de Dados](docs/adr/0001-padrao-repositorio-e-banco.md)
- **Especificação OpenAPI / Swagger**: [openapi.yaml](docs/openapi.yaml)
- **Relatório de Desempenho (k6)**: [desempenho.md](docs/desempenho.md)
- **Declaração de Uso de IA**: [ia.md](docs/ia.md)

---

## 👥 Contribuidores

A divisão de responsabilidades detalhada está registrada no arquivo [`CONTRIBUTORS.md`](CONTRIBUTORS.md).

- **Karina Ferreira**: Domínio, Casos de Uso, Testes Unitários, ADR e Especificação OpenAPI.
- **Kevyn Ferreira**: Infraestrutura, Banco de Dados PostgreSQL, Docker Compose, CI/CD (GitHub Actions) e Testes de Carga (k6).
