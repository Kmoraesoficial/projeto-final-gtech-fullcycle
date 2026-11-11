markdown
# ADR 0001: Adoção do Repository Pattern e PostgreSQL

* **Status**: Aprovado
* **Data**: 2026-11-07

### Contexto
O sistema necessita de persistência confiável para gerenciar dados de livros, usuários e empréstimos, além de permitir o isolamento das regras de negócio em relação ao banco de dados subjacente.

## Decisão
Decidimos utilizar o **PostgreSQL** como banco de dados relacional e o **Repository Pattern** para abstrair a camada de acesso a dados.

## Justificativa
1. **PostgreSQL**: Oferece consistência ACID nativa e suporte a transações para evitar inconsistências nos empréstimos simultâneos de livros.
2. **Repository Pattern**: Permite criar dublês de testes (*mocks/fakes*) para rodar testes unitários ultra-rápidos sem subir o banco de dados real.

## Alternativa Descartada
* **SQLite / Acesso direto via SQL inline**: Descartado por dificultar o desacoplamento de código e por apresentar limitações na gestão concorrente de transações de empréstimos.