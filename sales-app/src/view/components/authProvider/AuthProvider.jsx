import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

const useAuth = ()=>{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{

    const [logado, setLogado] = useState(null)
    const [nome, setNome] = useState("felipe")

    const login = (email, senha)=>{
        if (email == 'admin' && senha == 'admin1'){
            setLogado({nome: 'felipe admin', saldo: 1500, tipo: 'admin'})
            return true
        }
        if (email == 'user' && senha == 'user1'){
            setLogado({nome: 'felipe user', saldo: 500, tipo: 'user'})
            return true
        }
        setLogado(null)
        return false
      }


    return (
        <AuthContext.Provider value={{logado, nome ,login}}>
            {children}
        </AuthContext.Provider>
    )

}

export {useAuth, AuthProvider}