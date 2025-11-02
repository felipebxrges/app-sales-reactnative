import { useState } from "react";
import { useAuth } from "../view/components/authProvider/AuthProvider";
import { CarrinhoRepository } from "../service/CarrinhoRepository";
import { CamisaRepository } from "../service/CamisaRepository";
import Camisa from "../model/camisa";
import ItemCarrinho from "../model/itemcarrinho";

export const useCarrinhoController = () => {
    const [carrinho, setCarrinho] = useState([])

    const { logado } = useAuth();

    const fetchCarrinho = async () => {
        try {
            var data = await CarrinhoRepository.GetItensDoCarrinho(logado.id);

            if (data.status !== 200) {
                throw new Error("Erro na requisição")
            }

            var json = await data.json();

            const camisasCompletas = await Promise.all(
                json.map(async (item) => {
                    const resCamisa = await CamisaRepository.getCamisaById(item.camisaId);
                    const camisaJson = await resCamisa.json();

                    var camisa = new Camisa(camisaJson.id, camisaJson.nome, parseFloat(camisaJson.preco), camisaJson.imagem, camisaJson.idAdmin);

                    return new ItemCarrinho(item.id, logado.id, camisa, item.quantidade);
                })
            );

            setCarrinho(camisasCompletas);
        }
        catch (error) {
            console.log(error.message)
            setCarrinho([]);
        }
    }

    const adicionarAoCarrinho = async (produto) => {

        const existe = carrinho.find((i) => i.camisa.id === produto.id);

        if (existe) {

            existe.incrementar();
            setCarrinho([...carrinho]);

            try {
                const res = await CarrinhoRepository.AtualizaQuantidadeItemCarrinho(existe.id, existe.quantidade);
                if (!res.ok) throw new Error("Erro ao atualizar quantidade");
            } catch (err) {
                console.log(err);                
            }
        } else {
       
            try {
                const res = await CarrinhoRepository.AdicionaItemAoCarrinho(logado.id, produto.id);
                if (!res.ok) throw new Error("Erro ao adicionar item");
                const json = await res.json(); 

                const novoItem = new ItemCarrinho(json.id, logado.id, produto, 1);
                setCarrinho((prev) => [...prev, novoItem]);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const removerDoCarrinho = async (produtoId) => {
        const existente = carrinho.find((i) => i.id === produtoId);
        console.log(existente);
        if (!existente) return;

        if (existente.quantidade > 1) {
            try {
                existente.decrementar();
                setCarrinho([...carrinho]);

                const res = await CarrinhoRepository.AtualizaQuantidadeItemCarrinho(existente.id, existente.quantidade);

                if (!res.ok) throw new Error("Erro ao atualizar quantidade");

            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                var res = await CarrinhoRepository.RemoveItemDoCarrinho(existente.id);

                if (!res.ok) throw new Error("Erro ao remover item");

                setCarrinho((prev) => prev.filter((i) => i.id !== existente.id));
            } catch (err) {
                console.log(err);
            }
        }
    };

    return {
        states: { carrinho },
        actions: { setCarrinho, fetchCarrinho, adicionarAoCarrinho, removerDoCarrinho }
    }
}