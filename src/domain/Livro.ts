export class Livro {
  constructor(
    public readonly id: string,
    public readonly titulo: string,
    public readonly autor: string,
    public disponivel: boolean = true
  ) {}

  mudarDisponibilidade(disponivel: boolean): void {
    this.disponivel = disponivel;
  }
}
