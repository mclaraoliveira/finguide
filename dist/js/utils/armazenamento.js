export class Armazenamento {
    static chave = 'transacoes';
    static obterTransacoes() {
        const dados = localStorage.getItem(this.chave);
        return dados ? JSON.parse(dados) : [];
    }
    static salvarTransacoes(transacoes) {
        localStorage.setItem(this.chave, JSON.stringify(transacoes));
    }
}
