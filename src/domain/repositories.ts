import { Livro } from './Livro';
import { Emprestimo } from './Emprestimo';

export interface LivroRepository {
  buscarPorId(id: string): Promise<Livro | null>;
  atualizarStatus(id: string, disponivel: boolean): Promise<void>;
}

export interface EmprestimoRepository {
  salvar(emprestimo: Emprestimo): Promise<void>;
  buscarPorId(id: string): Promise<Emprestimo | null>; // ← Adicionado
  atualizar(emprestimo: Emprestimo): Promise<void>;    // ← Adicionado
  possuiPendencias(usuarioId: string): Promise<boolean>;
}