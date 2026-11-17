import { Emprestimo } from '../../domain/Emprestimo.js';
export class PrismaEmprestimoRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async salvar(emprestimo) {
        await this.prisma.emprestimo.create({
            data: {
                id: emprestimo.id,
                livroId: emprestimo.livroId,
                dataEmprestimo: emprestimo.dataEmprestimo,
                usuarioId: emprestimo.usuarioId,
                dataDevolucaoPrevista: emprestimo.dataDevolucaoPrevista,
                dataDevolucao: emprestimo.dataDevolucaoEfetiva,
                status: emprestimo.devolvido ? 'DEVOLVIDO' : 'ATIVO',
            },
        });
    }
    async atualizar(emprestimo) {
        await this.prisma.emprestimo.update({
            where: { id: emprestimo.id },
            data: {
                dataDevolucao: emprestimo.dataDevolucaoEfetiva,
                status: emprestimo.devolvido ? 'DEVOLVIDO' : 'ATIVO',
            },
        });
    }
    async buscarPorId(id) {
        const emprestimoData = await this.prisma.emprestimo.findUnique({ where: { id } });
        if (!emprestimoData)
            return null;
        return new Emprestimo({
            id: emprestimoData.id,
            livroId: emprestimoData.livroId,
            usuarioId: emprestimoData.usuarioId,
            dataEmprestimo: emprestimoData.dataEmprestimo,
            dataDevolucaoPrevista: emprestimoData.dataDevolucaoPrevista,
            dataDevolucaoEfetiva: emprestimoData.dataDevolucao,
            devolvido: emprestimoData.status === 'DEVOLVIDO',
        });
    }
    async possuiPendencias(usuarioId) {
        
        const pendencia = await this.prisma.emprestimo.findFirst({
            where: {
                status: 'ATIVO',
                usuarioId: usuarioId,
            },
        });
        return pendencia !== null;
    }
}
