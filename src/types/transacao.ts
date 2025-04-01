export interface Transacao {
    id: number;
    tipo: 'compra' | 'venda';
    mercadoria: string;
    quantidade: number;
    valor: number;
}