import { Livro } from './Livro.js';
import { Emprestimo } from './Emprestimo.js';

export interface LivroRepository {
  buscarPorId(id: string): Promise<Livro | null>;
  atualizarStatus(id: string, disponivel: boolean): Promise<void>;
}

export interface EmprestimoRepository {
  salvar(emprestimo: Emprestimo): Promise<void>;
  buscarPorId(id: string): Promise<Emprestimo | null>;
  atualizar(emprestimo: Emprestimo): Promise<void>;   
  possuiPendencias(usuarioId: string): Promise<boolean>;
}