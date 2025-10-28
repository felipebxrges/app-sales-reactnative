
export const CarrinhoRepository = {
    async GetItensDoCarrinho(carrinhoId) {
        return await fetch(`http://192.168.2.180:3000/itensCarrinho?carrinhoId=${carrinhoId}`);
    },

    async GetItemDoCarrinho(carrinhoId, camisaId) {
        return await fetch(`http://192.168.2.180:3000/itensCarrinho?carrinhoId=${carrinhoId}&camisaId=${camisaId}`);
    },

    async AtualizaQuantidadeItemCarrinho(itemId, novaQuantidade) {
        return await fetch(`http://192.168.2.180:3000/itensCarrinho/${itemId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantidade: novaQuantidade })
        })
    },

    async AdicionaItemAoCarrinho(idCarrinho, idCamisa) {
        return await fetch('http://192.168.2.180:3000/itensCarrinho', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                carrinhoId: idCarrinho,
                camisaId: idCamisa,
                quantidade: 1
            })
        })
    },

    async RemoveItemDoCarrinho(itemId) {
        await fetch(`http://192.168.2.180:3000/itensCarrinho/${itemId}`, { method: "DELETE" })
    }
}