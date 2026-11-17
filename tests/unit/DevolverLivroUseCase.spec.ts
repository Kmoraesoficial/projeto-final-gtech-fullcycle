import { DevolverLivroUseCase } from '../../src/use-cases/DevolverLivroUseCase.js';
import { jest } from '@jest/globals';
import { Emprestimo } from '../../src/domain/Emprestimo.js';

describe('DevolverLivroUseCase', () => {
  it('deve realizar a devolução do livro e atualizar a disponibilidade', async () => {
    const emprestimoFake = new Emprestimo({
      id: 'emp-1',
      livroId: 'livro-1',
      usuarioId: 'user-1',
      dataEmprestimo: new Date(),
      dataDevolucaoPrevista: new Date(),
    });

    const mockLivroRepo = {
      buscarPorId: jest.fn(),
      atualizarStatus: jest.fn().mockResolvedValue(undefined),
    };

    const mockEmprestimoRepo = {
      salvar: jest.fn(),
      buscarPorId: jest.fn().mockResolvedValue(emprestimoFake),
      atualizar: jest.fn().mockResolvedValue(undefined),
      possuiPendencias: jest.fn(),
    };

    const useCase = new DevolverLivroUseCase(mockLivroRepo, mockEmprestimoRepo);
    await useCase.executar('emp-1');

    expect(emprestimoFake.devolvido).toBe(true);
    expect(mockEmprestimoRepo.atualizar).toHaveBeenCalledWith(emprestimoFake);
    expect(mockLivroRepo.atualizarStatus).toHaveBeenCalledWith('livro-1', true);
  });
});
