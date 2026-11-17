export class Emprestimo {
    id;
    livroId;
    usuarioId;
    dataEmprestimo;
    dataDevolucaoPrevista;
    dataDevolucaoEfetiva;
    devolvido;
    constructor(props) {
        this.id = props.id ?? Math.random().toString(36).substring(2, 9);
        this.livroId = props.livroId;
        this.usuarioId = props.usuarioId;
        this.dataEmprestimo = props.dataEmprestimo;
        this.dataDevolucaoPrevista = props.dataDevolucaoPrevista;
        this.dataDevolucaoEfetiva = props.dataDevolucaoEfetiva ?? null;
        this.devolvido = props.devolvido ?? false;
    }
    registrarDevolucao(data = new Date()) {
        this.devolvido = true;
        this.dataDevolucaoEfetiva = data;
    }
}
