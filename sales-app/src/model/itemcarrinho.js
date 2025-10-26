export default class ItemCarrinho {
  constructor(id, carrinhoId, camisa, quantidade = 1) {
    this.id = id;
    this.carrinhoId = carrinhoId;
    this.camisa = camisa; 
    this.quantidade = quantidade;
  }

  incrementar() {
    this.quantidade += 1;
  }

  decrementar() {
    if (this.quantidade > 0) this.quantidade -= 1;
  }

  getTotal() {
    return this.camisa.preco * this.quantidade;
  }
}
