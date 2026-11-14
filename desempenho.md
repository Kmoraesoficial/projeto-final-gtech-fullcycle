---
### **Conteúdo do Relatório Gerado:**

1. **Objetivos e SLOs de Desempenho:**
   * Meta de Latência **p95 \\(< 200\text{ ms}\\)**.
   * Meta de Taxa de Falhas \\(< 1\%\\).
2. **Cenário de Teste:**
   * Simulação com 5 a 10 VUs (Usuários Virtuais) em rampa progressiva.
3. **Script Executável do k6:**
   * Código completo em JavaScript testando o endpoint `POST /emprestimos`.
4. **Resultados Obtidos e Validação:**
   * **Latência p95:** **\\(48.6\text{ ms}\\)** *(Aprovado ✅)*.
   * **Latência Média:** **\\(18.42\text{ ms}\\)**.
   * **Taxa de Falhas:** **\\(0.00\%\\)** *(Aprovado ✅)*.
   * **Vazão:** ~13 requisições por segundo.
---
