import { Armazenamento } from '../utils/armazenamento.js';
import { Interface } from './interface.js';
export class GerenciadorDeTransacoes {
    static transacoes = Armazenamento.obterTransacoes();
    static adicionarTransacao(tipo, mercadoria, quantidade, valor) {
        const novaTransacao = {
            id: Date.now(),
            tipo,
            mercadoria,
            quantidade,
            valor: tipo === 'compra' ? -valor : valor,
        };
        this.transacoes.push(novaTransacao);
        Armazenamento.salvarTransacoes(this.transacoes);
        Interface.atualizarTabela();
        Interface.atualizarSaldo();
    }
    static excluirTransacao(id) {
        this.transacoes = this.transacoes.filter(t => t.id !== id);
        Armazenamento.salvarTransacoes(this.transacoes);
        Interface.atualizarTabela();
        Interface.atualizarSaldo();
    }
    static obterTransacoes() {
        return this.transacoes;
    }
}
