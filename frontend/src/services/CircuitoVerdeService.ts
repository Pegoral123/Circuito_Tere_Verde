const API_URL = import.meta.env.VITE_API_URL;

export class CircuitoVerdeService {

    static async buscarNovidades() {
        console.log(`${API_URL}/novidades/`)
        const response = await fetch(`${API_URL}/novidades/`);
        if (!response.ok) {
            throw new Error("Erro ao buscar novidades");
        }

        return response.json();
    }

    static async buscarParques() {
        const response = await fetch(`${API_URL}/parques/`);

        if (!response.ok) {
            throw new Error("Erro ao buscar parques");
        }

        return response.json();
    }
    static async buscarEventos() {
        const response = await fetch(`${API_URL}/eventos`);

        if (!response.ok) {
        throw new Error("Erro ao buscar eventos");
        }

        return response.json();
    }
    static async buscarTrilhas() {
        const response = await fetch(`${API_URL}/trilhas`);

        if (!response.ok) {
        throw new Error("Erro ao buscar eventos");
        }

        return response.json();
    }
}