export class DevolverLivroUseCase {
    livroRepo;
    emprestimoRepo;
    constructor(livroRepo, emprestimoRepo) {
        this.livroRepo = livroRepo;
        this.emprestimoRepo = emprestimoRepo;
    }
    async executar(emprestimoId) {
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
