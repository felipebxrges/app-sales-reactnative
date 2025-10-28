import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../authProvider/AuthProvider';

const CarrinhoContext = createContext();

const useCarrinho = () => {
    return useContext(CarrinhoContext)
}

const CarrinhoProvider = ({ children }) => {
    const { logado } = useAuth();

    const [carrinho, setCarrinho] = useState([])

    useEffect(() => {
        if(!logado) return;
        const fetchCarrinho = async () => {
            try {
                var data = await fetch('http://192.168.2.180:3000/itensCarrinho?carrinhoId=' + logado.id);

                if (data.status !== 200) {
                    throw new Error("Erro na requisição")
                }

                var json = await data.json();

                const camisasCompletas = await Promise.all(
                    json.map(async (item) => {
                        const resCamisa = await fetch(`http://192.168.2.180:3000/camisas/${item.camisaId}`);
                        const camisa = await resCamisa.json();
                        return { ...camisa, quantidade: item.quantidade, itemId: item.id };
                    })
                );

                setCarrinho(camisasCompletas);
            }
            catch (error) {
                console.log(error.message)
                setCarrinho([]);
            }
        }

        fetchCarrinho();
    }, [logado])

    const adicionarAoCarrinho = async (produto) => {
        await addItem(produto, setCarrinho, carrinho, logado);
    }

    const removerDoCarrinho = async (produto) => {
        await removeItem(produto, setCarrinho, carrinho, logado);
    }

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export { CarrinhoProvider, useCarrinho };

const addItem = async (produto, setCarrinho, carrinho, logado) => {
    let idItemJaExiste;
    let quantidadeAtual;

    const existe = carrinho.find((i) => i.id === produto.id);

    if (existe) {
        setCarrinho((prev) => {
            console.log(existe);

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
            var camisaExistenteFetch = await fetch(`http://192.168.2.180:3000/itensCarrinho?carrinhoId=${logado.id}&camisaId=${produto.id}`);
            var camisaExistenteJson = await camisaExistenteFetch.json();
            const itemId = camisaExistenteJson[0].id;

            await fetch(`http://192.168.2.180:3000/itensCarrinho/${itemId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantidade: quantidadeAtual + 1 })
            })
        } else {
            await fetch('http://192.168.2.180:3000/itensCarrinho', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    carrinhoId: logado.id,
                    camisaId: produto.id,
                    quantidade: 1
                }),
            });
        }
    } catch (err) {
        console.log('Erro ao adicionar', err);
    }
};

const removeItem = async (produtoId, setCarrinho, carrinho, logado) => {
    const existente = carrinho.find((i) => i.id === produtoId);
    var itemIdFetch = await fetch(`http://192.168.2.180:3000/itensCarrinho?carrinhoId=${logado.id}&camisaId=${produtoId}`);
    var itemIdJson = await itemIdFetch.json();
    const itemId = itemIdJson[0].id;

    if (!existente) return;

    if (existente.quantidade > 1) {
        try {
            const res = await fetch(`http://192.168.2.180:3000/itensCarrinho/${itemId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantidade: existente.quantidade - 1 }),
            });

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
            await fetch(`http://192.168.2.180:3000/itensCarrinho/${itemId}`, { method: "DELETE" });
            setCarrinho((prev) => prev.filter((i) => i.id !== existente.id));
        } catch (err) {
            console.log(err);
        }
    }
};