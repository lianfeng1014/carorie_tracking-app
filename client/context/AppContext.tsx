import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import axiosInstance from "../services/axios";

interface UserType{
    c_limit_per_day: number
    p_limit_per_month: number
    role: number
}
interface IContext{
    jwtToken:string | null;
    isAuthorized: boolean;
    loading: boolean;
    user: UserType|null;
    generateJwtToken(): void,
    setJwtToken(v: string|null):void
    setUser(v: UserType|null):void
}

export const AppContext = createContext<Partial<IContext>>({})

interface AppContextProps{
    children: ReactNode
}
const AppContextProvider = ({children}:AppContextProps)=>{
    const [jwtToken, setJwtToken] = useState<string | null>(null)
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [user, setUser] = useState<UserType|null>(null)
    const [loading, setLoading] = useState(false)
    console.log("test")
    
    const generateJwtToken = ()=>{
        setLoading(true)
        axiosInstance.get(`/genratetoken`).then(({data})=>{
            console.log("token generated", data)
            // setJwtToken(data.token)
            localStorage.setItem("jwtToken", data.token)
            // localStorage.setItem("user", JSON.stringify(data.user))
            setUser(data.user)
            // setLoading(false)
        })
    }

    const value = {
        jwtToken,
        isAuthorized,
        loading,
        user,
        generateJwtToken,
        setJwtToken,
        setUser
    }

    return <AppContext.Provider value={value} >{children}</AppContext.Provider>
}

export default AppContextProvider