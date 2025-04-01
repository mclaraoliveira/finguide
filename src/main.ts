import { GerenciadorDeTransacoes } from "./components/gerenciadorDeTransacoes";
import { Interface } from "./components/interface";

document.addEventListener('DOMContentLoaded', () => {
    Interface.atualizarTabela();
    Interface.atualizarSaldo();

    const botaoAdicionar = document.querySelector('.btn-roxo:first-of-type');
    if (botaoAdicionar) {
        botaoAdicionar.addEventListener('click', () => {
            const tipo = (document.getElementById('tipoDeTransicao') as HTMLSelectElement)?.value as 'compra' | 'venda';
            const mercadoria = (document.getElementById('mercadoria') as HTMLInputElement)?.value;
            const quantidade = Number((document.getElementById('quantidade') as HTMLInputElement)?.value);
            const valor = Number((document.getElementById('valor') as HTMLInputElement)?.value.replace('R$ ', '').replace(',', '.'));

            if (!mercadoria || isNaN(quantidade) || isNaN(valor)) {
                alert('Preencha todos os campos corretamente!');
                return;
            }

            GerenciadorDeTransacoes.adicionarTransacao(tipo, mercadoria, quantidade, valor);
        });
    } else {
        console.error("O botão de adicionar transação não foi encontrado.");
    }

    const linkLimpar = document.querySelector('.link-light');
    if (linkLimpar) {
        linkLimpar.addEventListener('click', (event) => {
            event.preventDefault();
            (document.getElementById('mercadoria') as HTMLInputElement).value = '';
            (document.getElementById('quantidade') as HTMLInputElement).value = '';
            (document.getElementById('valor') as HTMLInputElement).value = '';
        });
    } else {
        console.error("O link de limpar campos não foi encontrado.");
    }
});
