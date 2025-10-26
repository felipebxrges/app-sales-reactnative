export default class Carrinho {
  constructor(id, usuario) {
    this.id = id;
    this.usuario = usuario; 
    this.itens = []; 
  }

  adicionarItem(camisa) {
    const itemExistente = this.itens.find(i => i.camisa.id === camisa.id);
    if (itemExistente) {
      itemExistente.incrementar();
    } else {
      const novoItem = new ItemCarrinho(this.itens.length + 1, this.id, camisa, 1);
      this.itens.push(novoItem);
    }
  }

  removerItem(camisaId) {
    this.itens = this.itens.filter(i => i.camisa.id !== camisaId);
  }

  atualizarQuantidade(camisaId, quantidade) {
    const item = this.itens.find(i => i.camisa.id === camisaId);
    if (item) item.quantidade = quantidade;
  }

  calcularTotal() {
    return this.itens.reduce((acc, item) => acc + item.getTotal(), 0);
  }
}
