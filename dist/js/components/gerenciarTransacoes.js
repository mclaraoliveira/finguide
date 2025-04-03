import { Armazenamento } from '../utils/armazenamento.js';
import { formatarMoeda } from '../utils/formatarMoeda.js';
import { gerarNovoId } from '../utils/gerarnovoid.js';
import { validarNomeProduto, validarQuantidade, validarValor } from '../utils/validacoes.js';
// FUNÇÃO PRA SELECIONAR ELEMENTOS DO DOM
export function configurarGestaoTransacoes() {
    const formTransacao = document.querySelector('main');
    const selectTipo = document.querySelector('#tipoDeTransicao');
    const inputMercadoria = document.querySelector('#mercadoria');
    const inputQuantidade = document.querySelector('#quantidade');
    const inputValor = document.querySelector('#valor');
    const botaoAdicionar = document.querySelector('.botao-adicionar');
    const linkLimpar = document.querySelector('.limpar a');
    const tabelaCorpo = document.querySelector('tbody');
    const tabelaContainer = document.querySelector('.tabela-customizada');
    const totalElement = document.querySelector('tfoot td:nth-child(4)');
    const saldoElement = document.querySelector('.saldo h2:nth-child(2)');
    //   VALIDAÇÃO SE TUDO FOI ENCONTRADO NO DOM
    if (!formTransacao || !selectTipo || !inputMercadoria || !inputQuantidade || !inputValor || !botaoAdicionar || !linkLimpar || !tabelaCorpo || !tabelaContainer || !totalElement || !saldoElement) {
        console.error('Um ou mais elementos não foram encontrados no DOM.');
        return;
    }
    // FUNÇÃO PARA CARREGAR TRANSAÇÕES SALVAS
    const carregarTransacoes = () => {
        const transacoes = Armazenamento.obterTransacoes();
        tabelaCorpo.innerHTML = '';
        transacoes.forEach((transacao) => {
            const novaLinha = document.createElement('tr');
            novaLinha.dataset.id = transacao.id.toString();
            novaLinha.innerHTML = `
        <td>${transacao.tipo === 'compra' ? '-' : '+'}</td>
        <td>${transacao.mercadoria}</td>
        <td>${transacao.quantidade}</td>
        <td>${formatarMoeda(transacao.valor)}</td>
        <td class="d-none d-md-table-cell">
          <i class="fa-regular fa-trash-can botao-excluir"></i>
        </td>
      `;
            tabelaCorpo.appendChild(novaLinha);
        });
        atualizarTotais();
    };
    // FUNÇÃO PARA ATUALIZAR O TOTAL E O SALDO
    const atualizarTotais = () => {
        const transacoes = Armazenamento.obterTransacoes();
        let total = 0;
        transacoes.forEach((transacao) => {
            const valor = transacao.valor;
            total += transacao.tipo === 'compra' ? -valor : valor;
        });
        totalElement.textContent = formatarMoeda(total);
        saldoElement.textContent = formatarMoeda(total);
    };
    // FUNÇÃO PRA ADICIONAR TRANSAÇÃO
    const adicionarTransacao = (event) => {
        event.preventDefault();
        const tipo = selectTipo.value.toLowerCase();
        const mercadoria = inputMercadoria.value.trim();
        const quantidade = inputQuantidade.value;
        const valorStr = inputValor.value.replace('R$ ', '').replace(',', '.');
        // VALIDAÇÕES
        const erroNome = validarNomeProduto(mercadoria);
        const erroQuantidade = validarQuantidade(quantidade);
        const erroValor = validarValor(valorStr);
        if (erroNome || erroQuantidade || erroValor) {
            alert(erroNome || erroQuantidade || erroValor); // Exibe o primeiro erro encontrado
            return;
        }
        const novaTransacao = {
            id: gerarNovoId(),
            tipo,
            mercadoria,
            quantidade: parseInt(quantidade),
            valor: parseFloat(valorStr) * parseInt(quantidade),
        };
        const transacoes = Armazenamento.obterTransacoes();
        transacoes.push(novaTransacao);
        Armazenamento.salvarTransacoes(transacoes);
        carregarTransacoes();
        limparFormulario();
    };
    //   FUNÇÃO PRA EXCLUIR TRANSAÇÃO
    const excluirTransacao = (event) => {
        const alvo = event.target;
        if (alvo.classList.contains('botao-excluir')) {
            const linha = alvo.closest('tr');
            const id = parseInt(linha.dataset.id || '0');
            const transacoes = Armazenamento.obterTransacoes();
            const transacoesAtualizadas = transacoes.filter(t => t.id !== id);
            Armazenamento.salvarTransacoes(transacoesAtualizadas);
            carregarTransacoes();
        }
    };
    //   FUNÇÃO PRA LIMPAR FORMULÁRIO
    const limparFormulario = () => {
        selectTipo.value = 'Compra';
        inputMercadoria.value = '';
        inputQuantidade.value = '';
        inputValor.value = 'R$ 0,00';
    };
    // FUNÇÃO PRA FORMATAR O CAMPO DE VALOR
    const formatarCampoValor = () => {
        inputValor.addEventListener('input', () => {
            let valor = inputValor.value.replace(/\D/g, '');
            if (valor === '')
                valor = '0';
            const valorNumerico = parseFloat(valor) / 100;
            inputValor.value = formatarMoeda(valorNumerico);
        });
        inputValor.addEventListener('focus', () => {
            if (inputValor.value === 'R$ 0,00') {
                inputValor.value = '';
            }
        });
    };
    // EVENTOS
    botaoAdicionar.addEventListener('click', adicionarTransacao);
    linkLimpar.addEventListener('click', (event) => {
        event.preventDefault();
        limparFormulario();
    });
    tabelaCorpo.addEventListener('click', excluirTransacao);
    formatarCampoValor();
    carregarTransacoes();
}
