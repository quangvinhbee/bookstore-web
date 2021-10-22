import axios from 'axios'
import { createContext, useContext } from 'react'

export const AuthContext = createContext<{
    registerUser?: (displayName: string, email: string, password: string) => Promise<any>
    loginUserWithEmailAndPassword?: (email: string, password: string) => Promise<any>
}>({})

export function AuthProvider(props) {
    const registerUser = async (displayName: string, email: string, password: string) => {
        return await axios.post('/api/v1/auth/createUser', {
            displayName: displayName,
            email: email,
            password: password,
        })
    }
    const loginUserWithEmailAndPassword = async (email, password) => {
        return await axios.post('/api/v1/auth/loginUser', {
            email: email,
            password: password,
        })
    }
    return (
        <AuthContext.Provider value={{ registerUser, loginUserWithEmailAndPassword }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
