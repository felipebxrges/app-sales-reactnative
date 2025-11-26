import User from "../model/user";
import { useState } from "react";

export const useUserController = () => {
    const [user, setUser] = useState(null);
    const [nome, setNome] = useState("");

    const login = async (login, senha) => {
        try {
            const response = await fetch(
                `http://192.168.2.197:3000/users?login=${login}&senha=${senha}`
            );

            if (!response.ok) {
                throw new Error("Erro na requisição");
            }

            const data = await response.json();

            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("Usuário não encontrado");
            }

            const foundUser = new User(
                data[0].id,
                data[0].nome,
                data[0].email,
                data[0].senha,
                data[0].saldo,
                data[0].admin,
                data[0].image
            );

            setUser(foundUser);
            setNome(foundUser.nome);

            return { success: true, user: foundUser };

        } catch (error) {
            console.log("Erro no login:", error.message);

            setUser(null);
            setNome("");

            return { success: false, error: error.message };
        }
    };

    return {
        states: { user, nome },
        actions: { login }
    };
};
