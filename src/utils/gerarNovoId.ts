import { Armazenamento } from './armazenamento.js';
import { Transacao } from '../types/transacao.js';

export function gerarNovoId(): number {
  const transacoes: Transacao[] = Armazenamento.obterTransacoes();
  return transacoes.length === 0 ? 1 : Math.max(...transacoes.map(t => t.id)) + 1;
}
