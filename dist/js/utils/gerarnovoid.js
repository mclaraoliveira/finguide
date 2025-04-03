import { Armazenamento } from './armazenamento.js';
export function gerarNovoId() {
    const transacoes = Armazenamento.obterTransacoes();
    return transacoes.length === 0 ? 1 : Math.max(...transacoes.map(t => t.id)) + 1;
}
