import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

const useAuth = ()=>{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{

    const [logado, setLogado] = useState(null)
    const [nome, setNome] = useState("felipe")

    const login = (email, senha)=>{
        if (email == '' && senha == ''){
            setLogado({nome: '', saldo: 1500, tipo: ''})
            return true
        }
        if (email == '' && senha == ''){
            setLogado({nome: '', saldo: 500, tipo: ''})
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