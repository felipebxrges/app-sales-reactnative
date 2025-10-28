import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../authProvider/AuthProvider';
import { useCarrinhoController } from '../../../controller/CarrinhoController';

const CarrinhoContext = createContext();

const useCarrinho = () => {
    return useContext(CarrinhoContext)
}

const CarrinhoProvider = ({ children }) => {
    const { states, actions } = useCarrinhoController();

    const { logado } = useAuth();

    useEffect(() => {
        actions.fetchCarrinho();
    }, [logado])

    return (
        <CarrinhoContext.Provider value={{ carrinho: states.carrinho, adicionarAoCarrinho: actions.adicionarAoCarrinho, removerDoCarrinho: actions.removerDoCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export { CarrinhoProvider, useCarrinho };