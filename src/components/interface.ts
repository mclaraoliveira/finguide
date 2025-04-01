import { GerenciadorDeTransacoes } from './gerenciadorDeTransacoes';
import { Transacao } from '../types/transacao.js';

export class Interface {
    static atualizarTabela(): void {
        const tbody = document.querySelector('tbody');
        if (!tbody) return;
        tbody.innerHTML = '';
        
        GerenciadorDeTransacoes.obterTransacoes().forEach(transacao => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${transacao.tipo === 'compra' ? '-' : '+'}</td>
                <td>${transacao.mercadoria}</td>
                <td>${transacao.quantidade}</td>
                <td>R$ ${transacao.valor.toFixed(2)}</td>
                <td><i class="fa-regular fa-trash-can" data-id="${transacao.id}"></i></td>
            `;
            tbody.appendChild(tr);
        });
        
        document.querySelectorAll('.fa-trash-can').forEach(botao => {
            botao.addEventListener('click', (event) => {
                const id = Number((event.target as HTMLElement).getAttribute('data-id'));
                GerenciadorDeTransacoes.excluirTransacao(id);
            });
        });
    }

    static atualizarSaldo(): void {
        const saldoElemento = document.querySelector('.palavra-em-roxo:last-of-type');
        if (!saldoElemento) return;
        
        const total = GerenciadorDeTransacoes.obterTransacoes()
            .reduce((acc, transacao) => acc + transacao.valor, 0);
        
        saldoElemento.textContent = `R$ ${total.toFixed(2)}`;
    }
}
