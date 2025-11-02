const BASE_URL = 'http://192.168.2.197:3000/camisas';

export const CamisaRepository = {
    async getCamisas() {
        return await fetch(BASE_URL);
    },

    async getCamisasWhenIsAdmin(logado) {
        return await fetch(`${BASE_URL}?idAdmin_ne=${logado.id}`);
    },

    async getCamisaById(id) {
        return await fetch(`${BASE_URL}/${id}`);
    },

    async getCamisasDoAdmin(idAdmin) {
        return await fetch(`${BASE_URL}?idAdmin=${idAdmin}`);
    },

    async CadastrarCamisa(camisa) {
        return await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(camisa),
        });
    },

    async AtualizarCamisa(camisaAtualizada) {
        return await fetch(`${BASE_URL}/${camisaAtualizada.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(camisaAtualizada),
        });
    },

    async RemoverCamisa(id) {
        return await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
    }
}