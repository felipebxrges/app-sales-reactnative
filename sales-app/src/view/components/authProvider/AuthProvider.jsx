import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

const useAuth = ()=>{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{

    const [logado, setLogado] = useState(null)
    const [nome, setNome] = useState("")

    const login = async (login, senha)=>{
        try{
            var data = await fetch(`http://192.168.2.180:3000/users?login=${login}&senha=${senha}`);

            if(data.status !== 200){
                throw new Error("Erro na requisição")
            }

            var json = await data.json();

            console.log(json[0]);
            

            if(json.length === 0){
                throw new Error("Usuário não encontrado")
            }

            setLogado(json[0])
            setNome(json[0].nome)
            return true
        }
        catch(error){
            console.log(error.message)
            setLogado(null)
            setNome(null)
            return false
        }
      }


    return (
        <AuthContext.Provider value={{logado, nome ,login}}>
            {children}
        </AuthContext.Provider>
    )

}

export {useAuth, AuthProvider}