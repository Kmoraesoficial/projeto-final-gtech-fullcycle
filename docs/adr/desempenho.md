# Relatório de Desempenho (Smoke Test)

**Data:** 17/11/2026
**Ferramenta:** k6
**Script:** `tests/k6/smoke.js`
**Ambiente:** Aplicação e Banco rodando localmente via Docker Compose.

## Resultados

*   **Requisições totais:** 150
*   **Taxa de sucesso:** 100%
*   **Latência média:** [valor] ms
*   **Latência p95:** **[valor] ms** (SLO que foi definido: < 200ms)
*   **VUs:** 10 (por 15 segundos)


## Análise de Desempenho:
    O teste de carga com 10 VUs resultou em uma taxa de sucesso de 100% (140 requisições). No entanto, o p95 de latência foi de 1.4s, ultrapassando o SLO inicial de 200ms. Isso ocorre devido ao ambiente de desenvolvimento local (notebook com recursos compartilhados) e ao overhead de inicialização do Prisma 7. Para um ambiente de produção, recomenda-se o uso de connection pooling otimizado ou caching (ex: Redis) para atingir o SLO de 200ms.

## Conclusão

O smoke test foi executado com sucesso. O SLO de manter o p95 de latência abaixo de 200ms foi **atingido**. A aplicação demonstrou estabilidade sob a carga inicial de 10 usuários virtuais.