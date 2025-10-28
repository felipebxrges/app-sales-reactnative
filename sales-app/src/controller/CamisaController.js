import { useCallback, useState } from 'react';
import { useAuth } from '../view/components/authProvider/AuthProvider';
import {CamisaRepository} from '../service/CamisaRepository';
import Camisa from '../model/camisa';

export const useCamisaController = () => {
    const [busca, setBusca] = useState('');
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [camisas, setCamisas] = useState([]);

    const { logado } = useAuth();

    const camisaRepository = CamisaRepository

    const carregarProdutos = useCallback(async () => {
        try {
            if (logado.admin)
                var data = await camisaRepository.getCamisasWhenIsAdmin(logado);
            else
                var data = await camisaRepository.getCamisas();

            if (data.status !== 200) {
                throw new Error("Erro na requisição")
            }

            var json = await data.json();

            const camisas = json.map(item =>
                new Camisa(item.id, item.nome, item.preco, item.imagem, item.idAdmin)
            );

            setCamisas(camisas);
        }
        catch (error) {
            console.log(error.message)
            setCamisas([]);
        }
    }, [logado]);

    return {
        states: {
            busca,
            produtoSelecionado,
            camisas},
        actions:{
            setBusca,
            setProdutoSelecionado,
            carregarProdutos
        }
    }
}