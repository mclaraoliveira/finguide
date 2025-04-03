export function alternarVisibilidadeSecao() {
    const secaoTransacao = document.querySelector('.pagina-transacao');
    const secaoExtrato = document.querySelector('.pagina-extrato');
    const botaoExtrato = document.querySelector('.botao-extrato');
    const botaoNovaTransacao = document.querySelector('.pagina-extrato .botao-nova-transacao');
    if (!secaoTransacao || !secaoExtrato || !botaoExtrato || !botaoNovaTransacao) {
        console.error('Um ou mais elementos não foram encontrados no DOM.');
        return;
    }
    const mostrarExtrato = () => {
        secaoTransacao.classList.remove('d-block');
        secaoTransacao.classList.add('d-none');
        secaoExtrato.classList.remove('d-none');
        secaoExtrato.classList.add('d-block');
    };
    const mostrarTransacao = () => {
        secaoExtrato.classList.remove('d-block');
        secaoExtrato.classList.add('d-none');
        secaoTransacao.classList.remove('d-none');
        secaoTransacao.classList.add('d-block');
    };
    botaoExtrato.addEventListener('click', mostrarExtrato);
    botaoNovaTransacao.addEventListener('click', mostrarTransacao);
}
