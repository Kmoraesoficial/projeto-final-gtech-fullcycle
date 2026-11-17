import { Livro } from '../../domain/Livro.js';
export class PrismaLivroRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async buscarPorId(id) {
        const livroData = await this.prisma.livro.findUnique({ where: { id } });
        if (!livroData)
            return null;
        return new Livro(livroData.id, livroData.titulo, livroData.autor, livroData.status === 'DISPONIVEL');
    }
    async atualizarStatus(id, disponivel) {
        const novoStatus = disponivel ? 'DISPONIVEL' : 'EMPRESTADO';
        await this.prisma.livro.update({
            where: { id },
            data: { status: novoStatus },
        });
    }
}
