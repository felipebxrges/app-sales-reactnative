import React, { createContext, useState } from 'react';

const CarrinhoContext = createContext();

const useCarrinho = ()=>{
    return useContext(CarrinhoContext)
}

const CarrinhoProvider = ({children})=>{

    const [carrinho, setCarrinho] = useState([])

    const adicionarAoCarrinho = (produto)=>{
        setCarrinho([...carrinho, produto])
    }

    const removerDoCarrinho = (produto)=>{
        setCarrinho(carrinho.filter(p => p === produto))
    }

    return (
        <CarrinhoContext.Provider value={{carrinho, adicionarAoCarrinho, removerDoCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export default {CarrinhoProvider, useCarrinho};