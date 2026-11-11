import { RealizarEmprestimoUseCase } from '../../src/use-cases/RealizarEmprestimoUseCase';

describe("RealizarEmprestimoUseCase", () => {
  it("deve realizar empréstimo de livro disponível com sucesso", async () => {
    const mockLivroRepo = {
      buscarPorId: jest.fn().mockResolvedValue({ id: "1", disponivel: true }),
      atualizarStatus: jest.fn().mockResolvedValue(undefined),
    };

    const mockEmprestimoRepo = {
      salvar: jest.fn().mockResolvedValue(undefined),
      buscarPorId: jest.fn(),
      atualizar: jest.fn().mockResolvedValue(undefined),
      possuiPendencias: jest.fn().mockResolvedValue(false),
    };


    const useCase = new RealizarEmprestimoUseCase(mockLivroRepo, mockEmprestimoRepo);
    const resultado = await useCase.executar("1", "user-123");

    expect(resultado).toHaveProperty("dataDevolucaoPrevista");
    expect(mockLivroRepo.atualizarStatus).toHaveBeenCalledWith("1", false);
    expect(mockEmprestimoRepo.salvar).toHaveBeenCalled();
  });

  it("não deve permitir empréstimo se o livro estiver indisponível", async () => {
    const mockLivroRepo = {
      buscarPorId: jest.fn().mockResolvedValue({ id: "1", disponivel: false }),
      atualizarStatus: jest.fn(),
    };

    const mockEmprestimoRepo = {
      salvar: jest.fn().mockResolvedValue(undefined),
      buscarPorId: jest.fn(),
      atualizar: jest.fn().mockResolvedValue(undefined),
      possuiPendencias: jest.fn().mockResolvedValue(false),
    };


    const useCase = new RealizarEmprestimoUseCase(mockLivroRepo, mockEmprestimoRepo);

    await expect(useCase.executar("1", "user-123")).rejects.toThrow("Livro indisponível para empréstimo.");
  });
});
