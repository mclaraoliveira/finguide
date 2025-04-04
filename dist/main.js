import { alternarVisibilidadeSecao } from './js/utils/visibilidadeSecoes.js';
import { configurarGestaoTransacoes } from './js/components/gerenciarTransacoes.js';
document.addEventListener('DOMContentLoaded', () => {
    alternarVisibilidadeSecao();
    configurarGestaoTransacoes();
});
