import { createContext, useContext, useState } from "react";
import {UserController} from "../../../controller/UserController";

const AuthContext = createContext(null)

const useAuth = ()=>{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{

    const {states, actions} = UserController();

    return (
        <AuthContext.Provider value={{logado: states.logado, nome: states.nome ,login: actions.login}}>
            {children}
        </AuthContext.Provider>
    )
}

export {useAuth, AuthProvider}