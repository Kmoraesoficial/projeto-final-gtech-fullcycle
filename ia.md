# Declaração do Uso de Inteligência Artificial (IA)

**Projeto:** Sistema de Biblioteca e Empréstimos (Projeto B)  
**Integrantes:** Karina Ferreira e Kevyn Ferreira  
**Data:** 13/11/2026  

---

## 1. Visão Geral e Política de Uso

Em conformidade com as diretrizes e critérios de avaliação do curso **FullCycle - Engenharia de Software e IA Aplicada**, o uso de ferramentas de Inteligência Artificial Generativa (LLMs)
foi adotado como assistente de desenvolvimento, aceleração de escrita de código, geração de suítes de teste e documentação técnica.

Todo o código, arquitetura e documentação gerados com auxílio de IA foram rigorosamente revisados, adaptados e validados por execução de testes automatizados e depuração manual pela dupla.

---

## 2. Registro de Prompts e Aplicação Prática

### 🔹 Prompt 1: Modelagem do Domínio e Clean Architecture
* **Responsável:** Karina Morais  
* **Objetivo:** Estruturar as entidades do domínio e separar regras de negócio de frameworks externos.  
* **Prompt Utilizado:**
  > *"Como estruturar o modelo de domínio para uma API de Empréstimo de Biblioteca em TypeScript aplicando Clean Architecture e SOLID, separando casos de uso de entidades e
  contratos de repositórios?"*
* **Resultado & Adaptação:** Criação das entidades `Livro` e `Emprestimo`, das interfaces `LivroRepository` e `EmprestimoRepository` em `src/domain/repositories.ts`, e do isolamento
  dos casos de uso `RealizarEmprestimoUseCase` e `DevolverLivroUseCase`.

---

### 🔹 Prompt 2: Suíte de Testes Unitários Nativa
* **Responsável:** Karina Moraes  
* **Objetivo:** Escrever testes unitários cobrindo o fluxo de empréstimos e exceções.  
* **Prompt Utilizado:**
  > *"Escreva os testes unitários em TypeScript utilizando o test runner nativo do Node.js (`node:test`) com dublês de teste (mocks) para os casos de uso
   `RealizarEmprestimoUseCase` e `DevolverLivroUseCase`, validando regras de prazo de 14 dias, livro indisponível e pendências do usuário."*
* **Resultado & Adaptação:** Criação dos arquivos `tests/unit/RealizarEmprestimoUseCase.test.ts` e `tests/unit/DevolverLivroUseCase.test.ts`, alcançando 100% de aprovação
  nos cenários de negócio.

---

### 🔹 Prompt 3: Conteinerização em 1 Comando com Docker Compose
* **Responsável:** Kevyn  
* **Objetivo:** Configurar o ambiente isolado com PostgreSQL e API.  
* **Prompt Utilizado:**
  > *"Elabore um arquivo `docker-compose.yml` para subir a aplicação Node.js e um banco PostgreSQL 15 alpine na mesma rede interna,
   garantindo inicialização via healthcheck com 1 comando."*
* **Resultado & Adaptação:** Criação do `docker-compose.yml` e `Dockerfile`, garantindo a execução via `docker compose up -d`.

---

### 🔹 Prompt 4: Documentação Técnica (ADR e OpenAPI)
* **Responsável:** Karina Ferreira / Kevyn  
* **Objetivo:** Padronizar a documentação técnica exigida na rubrica.  
* **Prompt Utilizado:**
  > *"Gere a especificação OpenAPI 3.0 dos endpoints de empréstimo e devolução, e elabore a estrutura de uma ADR (Architecture Decision Record)
  justificando a escolha do PostgreSQL e do Repository Pattern em relação ao SQLite."*
* **Resultado & Adaptação:** Criação dos arquivos `docs/openapi.yaml` e `docs/adr/0001-padrao-repositorio-e-banco.md`.

---

### 🔹 Prompt 5: Teste de Carga e Performance com k6
* **Responsável:** Kevyn Ferreira
* **Objetivo:** Medir a latência p95 no fluxo principal.  
* **Prompt Utilizado:**
  > *"Escreva um script de smoke test em k6 para simular requisições de empréstimo e capturar a métrica de latência p95 em formato markdown para inclusão no documento de desempenho."*
* **Resultado & Adaptação:** Geração do script em `docs/desempenho.md`.

---

### 🔹 Prompt 6: Configuração do Prisma 7 (Mudanças de API e Driver Adapters)
* **Responsável:** Kevyn  
* **Objetivo:** Configurar o ORM Prisma na versão mais recente para conectar ao PostgreSQL.
* **Prompt Utilizado:**
  > *"Como configurar o Prisma Client na versão 7 para conectar ao PostgreSQL em um projeto ESM com TypeScript? Como resolver o erro de `driver adapter` e o erro de falta de `prisma.config.ts`?"*
* **Resultado & Adaptação:** Configuração do arquivo `prisma.config.ts`, geração do Client na pasta `src/generated` e implementação do adaptador `@prisma/adapter-pg` na instanciação do banco.

---

### 🔹 Prompt 7: Configuração do Jest com ES Modules (ESM) e TypeScript
* **Responsável:** Kevyn  
* **Objetivo:** Fazer os testes unitários e de integração rodarem sem conflitos de importação.
* **Prompt Utilizado:**
  > *"Como configurar o Jest em um projeto Node.js puramente ESM (com `"type": "module"` no package.json)? Como resolver o erro `ReferenceError: jest is not defined` e o erro de mapeamento de módulos no Supertest?"*
* **Resultado & Adaptação:** Configuração do `jest.config.cjs` com `ts-jest/presets/default-esm`, injeção de globais e ajuste do import do `@jest/globals` nos arquivos de teste.

---

### 🔹 Prompt 8: Otimização do Dockerfile para Prisma e Build
* **Responsável:** Kevyn  
* **Objetivo:** Resolver falhas de build da imagem Docker.
* **Prompt Utilizado:**
  > *"Como criar um Dockerfile multi-stage para uma aplicação Node.js com Prisma que precisa gerar os arquivos do Client durante o build e ignorar a falta da variável DATABASE_URL no momento da geração?"*
* **Resultado & Adaptação:** Criação do Dockerfile com a passagem de uma `DATABASE_URL` fictícia na etapa de build (`builder`) para que o Prisma pudesse gerar os tipos sem quebrar o CI/CD.

---

## 3. Validação e Responsabilidade

A dupla atesta que possui pleno conhecimento e domínio de todo o código e documentação presentes neste repositório. 
O assistente de IA foi utilizado como ferramenta de produtividade, mantendo a responsabilidade técnica e autoria final sob os integrantes do projeto.
