import { PrismaClient } from '../../generated/prisma/client.js';
import { Livro } from '../../domain/Livro.js';
import { LivroRepository } from '../../domain/repositories.js';

export class PrismaLivroRepository implements LivroRepository {
  constructor(private prisma: PrismaClient) {}

  async buscarPorId(id: string): Promise<Livro | null> {
    const livroData = await this.prisma.livro.findUnique({ where: { id } });
    
    if (!livroData) return null;

    return new Livro(
      livroData.id,
      livroData.titulo,
      livroData.autor,
      livroData.status === 'DISPONIVEL'
    );
  }

  async atualizarStatus(id: string, disponivel: boolean): Promise<void> {
    const novoStatus = disponivel ? 'DISPONIVEL' : 'EMPRESTADO';
    
    await this.prisma.livro.update({
      where: { id },
      data: { status: novoStatus },
    });
  }
}