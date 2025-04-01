import { GerenciadorDeTransacoes } from "./components/gerenciadorDeTransacoes.js";
import { Interface } from "./components/interface.js";
document.addEventListener('DOMContentLoaded', () => {
    Interface.atualizarTabela();
    Interface.atualizarSaldo();
    const botaoAdicionar = document.querySelector('.btn-roxo:first-of-type');
    if (botaoAdicionar) {
        botaoAdicionar.addEventListener('click', () => {
            const tipo = document.getElementById('tipoDeTransicao')?.value;
            const mercadoria = document.getElementById('mercadoria')?.value;
            const quantidade = Number(document.getElementById('quantidade')?.value);
            const valor = Number(document.getElementById('valor')?.value.replace('R$ ', '').replace(',', '.'));
            if (!mercadoria || isNaN(quantidade) || isNaN(valor)) {
                alert('Preencha todos os campos corretamente!');
                return;
            }
            GerenciadorDeTransacoes.adicionarTransacao(tipo, mercadoria, quantidade, valor);
        });
    }
    else {
        console.error("O botão de adicionar transação não foi encontrado.");
    }
    const linkLimpar = document.querySelector('.link-light');
    if (linkLimpar) {
        linkLimpar.addEventListener('click', (event) => {
            event.preventDefault();
            document.getElementById('mercadoria').value = '';
            document.getElementById('quantidade').value = '';
            document.getElementById('valor').value = '';
        });
    }
    else {
        console.error("O link de limpar campos não foi encontrado.");
    }
});
