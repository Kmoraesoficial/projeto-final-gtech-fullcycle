export interface EmprestimoProps {
  id?: string;
  livroId: string;
  usuarioId: string;
  dataEmprestimo: Date;
  dataDevolucaoPrevista: Date;
  dataDevolucaoEfetiva?: Date | null;
  devolvido?: boolean;
}

export class Emprestimo {
  public readonly id: string;
  public readonly livroId: string;
  public readonly usuarioId: string;
  public readonly dataEmprestimo: Date;
  public readonly dataDevolucaoPrevista: Date;
  public dataDevolucaoEfetiva: Date | null;
  public devolvido: boolean;

  constructor(props: EmprestimoProps) {
    this.id = props.id ?? Math.random().toString(36).substring(2, 9);
    this.livroId = props.livroId;
    this.usuarioId = props.usuarioId;
    this.dataEmprestimo = props.dataEmprestimo;
    this.dataDevolucaoPrevista = props.dataDevolucaoPrevista;
    this.dataDevolucaoEfetiva = props.dataDevolucaoEfetiva ?? null;
    this.devolvido = props.devolvido ?? false;
  }

  registrarDevolucao(data: Date = new Date()): void {
    this.devolvido = true;
    this.dataDevolucaoEfetiva = data;
  }
}
