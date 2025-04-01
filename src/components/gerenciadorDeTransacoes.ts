import { Transacao } from '../types/transacao.js';
import { Armazenamento } from '../utils/armazenamento.js';
import { Interface } from './interface.js'

export class GerenciadorDeTransacoes {
    private static transacoes: Transacao[] = Armazenamento.obterTransacoes();
    
    static adicionarTransacao(tipo: 'compra' | 'venda', mercadoria: string, quantidade: number, valor: number): void {
        const novaTransacao: Transacao = {
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

    static excluirTransacao(id: number): void {
        this.transacoes = this.transacoes.filter(t => t.id !== id);
        Armazenamento.salvarTransacoes(this.transacoes);
        Interface.atualizarTabela();
        Interface.atualizarSaldo();
    }

    static obterTransacoes(): Transacao[] {
        return this.transacoes;
    }
}