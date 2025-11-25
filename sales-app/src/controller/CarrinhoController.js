import { useState } from "react";
import { useAuth } from "../view/components/authProvider/AuthProvider";
import { CarrinhoRepository } from "../service/CarrinhoRepository";
import { CamisaRepository } from "../service/CamisaRepository";
import Camisa from "../model/camisa";
import ItemCarrinho from "../model/itemcarrinho";

export const useCarrinhoController = () => {
    const [carrinho, setCarrinho] = useState([]);
    const { logado } = useAuth();

    const fetchCarrinho = async () => {
        try {
            const data = await CarrinhoRepository.GetItensDoCarrinho(logado.id);

            if (data.status !== 200) {
                throw new Error("Erro na requisição");
            }

            const json = await data.json();

            const camisasCompletas = await Promise.all(
                json.map(async (item) => {
                    const resCamisa = await CamisaRepository.getCamisaById(item.camisaId);
                    const camisaJson = await resCamisa.json();

                    const camisa = new Camisa(
                        camisaJson.id,
                        camisaJson.nome,
                        parseFloat(camisaJson.preco),
                        camisaJson.imagem,
                        camisaJson.idAdmin
                    );

                    return new ItemCarrinho(
                        item.id,
                        logado.id,
                        camisa,
                        item.quantidade
                    );
                })
            );

            setCarrinho(camisasCompletas);

        } catch (error) {
            console.log(error.message);
            setCarrinho([]);
        }
    };

    const atualizarQuantidade = async (item, novaQuantidade) => {
        try {
            const res = await CarrinhoRepository.AtualizaQuantidadeItemCarrinho(
                item.id,
                novaQuantidade
            );

            if (!res.ok) throw new Error("Erro ao atualizar quantidade");
        } catch (err) {
            console.log(err);
        }
    };

    const adicionarAoCarrinho = async (produto) => {
        const existente = carrinho.find(i => i.camisa.id === produto.id);

        if (existente) {
            existente.incrementar();
            setCarrinho([...carrinho]);
            await atualizarQuantidade(existente, existente.quantidade);
            return;
        }

        try {
            const res = await CarrinhoRepository.AdicionaItemAoCarrinho(
                logado.id,
                produto.id
            );

            if (!res.ok) throw new Error("Erro ao adicionar item");

            const json = await res.json();
            const novoItem = new ItemCarrinho(json.id, logado.id, produto, 1);

            setCarrinho(prev => [...prev, novoItem]);

        } catch (err) {
            console.log(err);
        }
    };

    const removerDoCarrinho = async (produtoId) => {
        const existente = carrinho.find(i => i.id === produtoId);
        if (!existente) return;

        if (existente.quantidade > 1) {
            existente.decrementar();
            setCarrinho([...carrinho]);
            await atualizarQuantidade(existente, existente.quantidade);
            return;
        }

        try {
            const res = await CarrinhoRepository.RemoveItemDoCarrinho(existente.id);

            if (!res.ok) throw new Error("Erro ao remover item");

            setCarrinho(prev => prev.filter(i => i.id !== existente.id));

        } catch (err) {
            console.log(err);
        }
    };

    return {
        states: { carrinho },
        actions: { setCarrinho, fetchCarrinho, adicionarAoCarrinho, removerDoCarrinho }
    };
};
