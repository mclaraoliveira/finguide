import { alternarVisibilidadeSecao } from './utils/visibilidadeSecoes.js';
import { configurarGestaoTransacoes } from './components/gerenciarTransacoes.js';
document.addEventListener('DOMContentLoaded', () => {
    alternarVisibilidadeSecao();
    configurarGestaoTransacoes();
});
