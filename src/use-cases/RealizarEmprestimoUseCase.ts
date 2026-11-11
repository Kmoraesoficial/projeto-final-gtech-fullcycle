import { Emprestimo } from '../domain/Emprestimo';
import { Livro } from '../domain/Livro';
import { LivroRepository, EmprestimoRepository } from '../domain/repositories';


export class RealizarEmprestimoUseCase {
  constructor(
    private livroRepo: LivroRepository,
    private emprestimoRepo: EmprestimoRepository
  ) {}

  async executar(livroId: string, usuarioId: string): Promise<Emprestimo> {
    const livro = await this.livroRepo.buscarPorId(livroId);

    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    if (!livro.disponivel) {
      throw new Error("Livro indisponível para empréstimo.");
    }

    const temPendencias = await this.emprestimoRepo.possuiPendencias(usuarioId);
    if (temPendencias) {
      throw new Error("Usuário possui empréstimos pendentes ou em atraso.");
    }

    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataDevolucao.getDate() + 14);

    const emprestimo = new Emprestimo({
      livroId,
      usuarioId,
      dataEmprestimo: new Date(),
      dataDevolucaoPrevista: dataDevolucao
    });

    await this.livroRepo.atualizarStatus(livroId, false);
    await this.emprestimoRepo.salvar(emprestimo);

    return emprestimo;
  }
}
