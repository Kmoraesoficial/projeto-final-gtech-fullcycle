export class Livro {
    id;
    titulo;
    autor;
    disponivel;
    constructor(id, titulo, autor, disponivel = true) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.disponivel = disponivel;
    }
    mudarDisponibilidade(disponivel) {
        this.disponivel = disponivel;
    }
}
