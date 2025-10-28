import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../authProvider/AuthProvider';

const AdminCamisasContext = createContext();

export const useAdminCamisas = () => useContext(AdminCamisasContext);

export const AdminCamisasProvider = ({ children }) => {
    const [camisas, setCamisas] = useState([]);
    const { logado } = useAuth();

    const carregarCamisas = async () => {
        try {
            const response = await fetch(`http://192.168.2.180:3000/camisas?idAdmin=${logado.id}`);
            if (!response.ok) throw new Error('Erro ao carregar camisas');
            const json = await response.json();
            setCamisas(json);
        } catch (error) {
            console.log(error.message);
            setCamisas([]);
        }
    };

    useEffect(() => {
        carregarCamisas();
    }, []);

    const adicionarCamisa = async (camisa) => {
        setCamisas(prev => [...prev, camisa]);

        await fetch('http://192.168.2.180:3000/camisas/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(camisa),
        });
    }

    const atualizarCamisa = async (camisaAtualizada) => {
        setCamisas(prev => prev.map(c => c.id === camisaAtualizada.id ? camisaAtualizada : c));

        await fetch('http://192.168.2.180:3000/camisas/' + camisaAtualizada.id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(camisaAtualizada),
        });
    }

    const removerCamisa = async (id) => {
        setCamisas(prev => prev.filter(c => c.id !== id));

        await fetch('http://192.168.2.180:3000/camisas/' + id, {
            method: 'DELETE',
        });
    }

    return (
        <AdminCamisasContext.Provider
            value={{
                camisasDoAdmin: camisas,
                carregarCamisas,
                adicionarCamisa,
                atualizarCamisa,
                removerCamisa
            }}
        >
            {children}
        </AdminCamisasContext.Provider>
    );
};
