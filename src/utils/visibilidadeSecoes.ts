export function alternarVisibilidadeSecao(): void {

    const secaoTransacao = document.querySelector('.pagina-transacao') as HTMLElement;
    const secaoExtrato = document.querySelector('.pagina-extrato') as HTMLElement;
    const botaoExtrato = document.querySelector('.botao-extrato') as HTMLButtonElement;
    const botaoNovaTransacao = document.querySelector('.pagina-extrato .botao-nova-transacao') as HTMLButtonElement;
  
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