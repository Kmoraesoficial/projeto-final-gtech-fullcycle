import { LivroRepository, EmprestimoRepository } from '../domain/repositories.js';

export class DevolverLivroUseCase {
  constructor(
    private livroRepo: LivroRepository,
    private emprestimoRepo: EmprestimoRepository
  ) {}

  async executar(emprestimoId: string): Promise<void> {
    const emprestimo = await this.emprestimoRepo.buscarPorId(emprestimoId);

    if (!emprestimo) {
      throw new Error("Empréstimo não encontrado.");
    }

    if (emprestimo.devolvido) {
      throw new Error("Este empréstimo já foi encerrado.");
    }

    emprestimo.registrarDevolucao(new Date());

    await this.emprestimoRepo.atualizar(emprestimo);
    await this.livroRepo.atualizarStatus(emprestimo.livroId, true);
  }
}
