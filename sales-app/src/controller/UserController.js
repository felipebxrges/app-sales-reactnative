import User from "../model/user";
import { useState } from "react";

export const UserController = () => {
    const [logado, setLogado] = useState(null)
    const [nome, setNome] = useState("")

const login = async (login, senha)=>{
        try{
            var data = await fetch(`http://192.168.2.197:3000/users?login=${login}&senha=${senha}`);

            if(data.status !== 200){
                throw new Error("Erro na requisição")
            }

            var json = await data.json();

            if(json.length === 0){
                throw new Error("Usuário não encontrado")
            }

            var user = new User(json[0].id, json[0].nome, json[0].email, json[0].senha, json[0].saldo, json[0].admin, json[0].image);
            console.log(user.image);
            

            setLogado(user)
            setNome(user.nome)            
            return true
        }
        catch(error){
            console.log(error.message)
            setLogado(null)
            setNome(null)
            return false
        }
      }

    return {
        states: {logado, nome},
        actions: {login}
    }
}

