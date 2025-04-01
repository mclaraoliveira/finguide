import { Transacao } from "../types/transacao.js";

export class Armazenamento {
    private static chave = 'transacoes';
    
    static obterTransacoes(): Transacao[] {
        const dados = localStorage.getItem(this.chave);
        return dados ? JSON.parse(dados) : [];
    }

    static salvarTransacoes(transacoes: Transacao[]): void {
        localStorage.setItem(this.chave, JSON.stringify(transacoes));
    }
}