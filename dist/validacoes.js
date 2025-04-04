export function validarNomeProduto(nome) {
    const nomeLimpo = nome.trim();
    if (nomeLimpo.length === 0) {
        return 'O nome do produto não pode estar vazio.';
    }
    if (nomeLimpo.length > 35) {
        return 'O nome do produto deve ter no máximo 35 caracteres.';
    }
    return null;
}
export function validarQuantidade(quantidade) {
    const numero = parseInt(quantidade);
    if (isNaN(numero)) {
        return 'A quantidade deve ser um número.';
    }
    if (numero <= 0) {
        return 'A quantidade deve ser maior que zero.';
    }
    if (numero > 999) {
        return 'A quantidade máxima permitida é 999.';
    }
    return null;
}
export function validarValor(valor) {
    const valorNumerico = parseFloat(valor.replace('R$ ', '').replace(',', '.'));
    if (isNaN(valorNumerico)) {
        return 'O valor deve ser um número.';
    }
    if (valorNumerico <= 0) {
        return 'O valor deve ser maior que zero.';
    }
    return null;
}
