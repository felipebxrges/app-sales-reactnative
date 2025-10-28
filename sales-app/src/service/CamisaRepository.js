const BASE_URL = 'http://192.168.2.180:3000/camisas';

export const CamisaRepository = {
    async getCamisas() {
        return await fetch(BASE_URL);
    },

    async getCamisasWhenIsAdmin(logado){
        return await fetch(`${BASE_URL}?idAdmin_ne=${logado.id}`);
    },

    async getCamisaById(id) {
        return await fetch(`${BASE_URL}/${id}`);
    }
}