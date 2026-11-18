import { FastifyInstance } from 'fastify';
// 1. Importe o adaptador e o driver do pg
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { PrismaClient } from '../../../generated/prisma/client.js';
import { PrismaLivroRepository } from '../../repositories/PrismaLivroRepository.js';
import { PrismaEmprestimoRepository } from '../../repositories/PrismaEmprestimoRepository.js';
import { RealizarEmprestimoUseCase } from '../../../use-cases/RealizarEmprestimoUseCase.js';

export async function routes(app: FastifyInstance) {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  const livroRepo = new PrismaLivroRepository(prisma);
  const emprestimoRepo = new PrismaEmprestimoRepository(prisma);
  const realizarEmprestimoUseCase = new RealizarEmprestimoUseCase(livroRepo, emprestimoRepo);

  app.get('/livros', async (request, reply) => {
    const livros = await prisma.livro.findMany();
    return reply.send(livros);
  });

  app.post('/emprestimos', async (request, reply) => {
    const { livroId, usuarioId } = request.body as { livroId: string, usuarioId: string };

    try {
      const emprestimo = await realizarEmprestimoUseCase.executar(livroId, usuarioId);
      return reply.status(201).send(emprestimo);
    } catch (error: any) {
      return reply.status(400).send({ error: error.message });
    }
  });
}