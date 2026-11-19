import request from 'supertest';
import { PrismaClient } from '../../src/generated/prisma/client.js';
import { buildApp } from '../../src/infrastructure/repositories/http/app.js';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const app = buildApp();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

describe('Fluxo de Empréstimo (Integração)', () => {
  beforeAll(async () => {
    // Garante que o Fastify está 100% pronto antes do teste
    await app.ready();
    
    // Limpa o banco antes de começar
    await prisma.emprestimo.deleteMany();
    await prisma.livro.deleteMany();
  });

  afterAll(async () => {
    // Fecha o app, o prisma e o pool para o Jest não travar
    await app.close();
    await prisma.$disconnect();
    await pool.end();
  });

  it('deve realizar um empréstimo com sucesso', async () => {
    // 1. Cria um livro no banco
    const livro = await prisma.livro.create({
      data: {
        titulo: 'O Senhor dos Anéis',
        autor: 'J.R.R. Tolkien',
        status: 'DISPONIVEL',
      },
    });

    // 2. Chama a rota POST /emprestimos via HTTP (Supertest)
    const response = await request(app.server)
      .post('/emprestimos')
      .send({
        livroId: livro.id,
        usuarioId: 'usuario-teste-123',
      });

    // 3. Verifica se retornou 201 (Created)
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.livroId).toBe(livro.id);

    // 4. Verifica se o livro ficou como EMPRESTADO no banco
    const livroAtualizado = await prisma.livro.findUnique({
      where: { id: livro.id },
    });
    expect(livroAtualizado?.status).toBe('EMPRESTADO');

    // 5. Verifica se o empréstimo foi salvo no banco
    const emprestimoSalvo = await prisma.emprestimo.findFirst({
      where: { livroId: livro.id },
    });
    expect(emprestimoSalvo).not.toBeNull();
    expect(emprestimoSalvo?.status).toBe('ATIVO');
  }, 15000); // Aumenta o timeout para 15 segundos caso o banco esteja lento
});