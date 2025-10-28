import { useState } from "react";
import { useAuth } from "../view/components/authProvider/AuthProvider";
import { CamisaRepository } from "../service/CamisaRepository";
import Camisa from "../model/camisa";

export const useAdminController = () => {
    const [camisas, setCamisas] = useState([]);
    const { logado } = useAuth();

    const carregarCamisas = async () => {
        try {
            const response = await CamisaRepository.getCamisasDoAdmin(logado.id);

            if (!response.ok) throw new Error('Erro ao carregar camisas');

            const json = await response.json();

            const camisas = json.map(c => new Camisa(c.id, c.nome, c.preco, c.imagem, c.idAdmin));

            setCamisas(camisas);
        } catch (error) {
            console.log(error.message);
            setCamisas([]);
        }
    }

    const cadastrarCamisa = async (camisa) => {
        try {
            var res = await CamisaRepository.CadastrarCamisa(camisa);

            if (!res.ok) throw new Error('Erro ao cadastrar camisa');

            setCamisas(prev => [...prev, camisa]);
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const atualizarCamisa = async (camisaAtualizada) => {
        try {
            var res = await CamisaRepository.AtualizarCamisa(camisaAtualizada);

            if (!res.ok) throw new Error('Erro ao atualizar camisa');

            setCamisas(prev => prev.map(c => c.id === camisaAtualizada.id ? camisaAtualizada : c));
        }
        catch (error) {
            console.log(error.message);
        }
    }

    const removerCamisa = async (id) => {
        try {
            var res = await CamisaRepository.RemoverCamisa(id);

            if (!res.ok) throw new Error('Erro ao remover camisa');

            setCamisas(prev => prev.filter(c => c.id !== id));
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return {
        states: { camisas },
        actions: { setCamisas, carregarCamisas, cadastrarCamisa, atualizarCamisa, removerCamisa }
    }
}