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

                    var camisa = new Camisa(camisaJson.id, camisaJson.nome, camisaJson.preco, camisaJson.imagem, camisaJson.idAdmin);

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

    const adicionarAoCarrinho = async (produto, setCarrinho, carrinho) => {
        let idItemJaExiste;
        let quantidadeAtual;

        const existe = carrinho.find((i) => i.camisa.id === produto.id);

        if (existe) {
            setCarrinho((prev) => {
                idItemJaExiste = existe.id;
                quantidadeAtual = existe.quantidade;
                return prev.map((i) =>
                    i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
                );
            });
        } else {
            setCarrinho((prev) => [...prev, { ...produto, quantidade: 1 }]);
        }

        try {
            if (idItemJaExiste) {
                const res = await CarrinhoRepository.AtualizaQuantidadeItemNoCarrinho(idItemJaExiste, quantidadeAtual + 1);
                
                if (!res.ok) throw new Error("Erro ao atualizar quantidade");
            } else {
                const res = await CarrinhoRepository.AdicionaItemAoCarrinho(logado.id, produto.id);
                
                if (!res.ok) throw new Error("Erro ao adicionar item");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removerDoCarrinho = async (produtoId, setCarrinho, carrinho) => {
        const existente = carrinho.find((i) => i.id === produtoId);

        if (!existente) return;

        if (existente.quantidade > 1) {
            try {
                const res = await CarrinhoRepository.AtualizaQuantidadeItemCarrinho(existente.id, existente.quantidade - 1);

                if (!res.ok) throw new Error("Erro ao atualizar quantidade");

                setCarrinho((prev) =>
                    prev.map((i) =>
                        i.id === existente.id
                            ? { ...i, quantidade: i.quantidade - 1 }
                            : i
                    )
                );
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