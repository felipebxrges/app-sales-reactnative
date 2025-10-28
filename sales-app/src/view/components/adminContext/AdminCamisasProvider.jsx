import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../authProvider/AuthProvider';
import { useAdminController } from '../../../controller/AdminController';

const AdminCamisasContext = createContext();

export const useAdminCamisas = () => useContext(AdminCamisasContext);

export const AdminCamisasProvider = ({ children }) => {

    const { states, actions } = useAdminController();

    useEffect(() => {
        actions.carregarCamisas();
    }, []);

    return (
        <AdminCamisasContext.Provider
            value={{
                camisasDoAdmin: states.camisas,
                carregarCamisas: actions.carregarCamisas,
                adicionarCamisa: actions.cadastrarCamisa,
                atualizarCamisa: actions.atualizarCamisa,
                removerCamisa: actions.removerCamisa
            }}
        >
            {children}
        </AdminCamisasContext.Provider>
    );
};
