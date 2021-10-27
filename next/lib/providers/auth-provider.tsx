import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import { createContext, useContext, useState } from 'react'
import { setTokenAdmin } from '../api/header'
import { ADMIN, ROLE, USER } from '../type'

export const AuthContext = createContext<{
    registerUser?: (displayName: string, email: string, password: string) => Promise<any>
    loginUserWithEmailAndPassword?: (email: string, password: string) => Promise<any>
    redirectToAdminPage?: () => void
    redirectToLoginPage?: () => void
    user?: USER
}>({})

export function AuthProvider(props) {
    const PRE_LOGIN_PATHNAME = 'PRE_LOGIN_PATHNAME'
    const router = useRouter()
    const [user, setUser] = useState<USER>(undefined)

    const registerUser = async (displayName: string, email: string, password: string) => {
        return await axios.post('/api/v1/auth/createUser', {
            displayName: displayName,
            email: email,
            password: password,
        })
    }

    const loginUserWithEmailAndPassword = async (email, password) => {
        return await axios
            .post<{ response: USER; tokens: any }>('/api/v1/auth/loginUser', {
                email: email,
                password: password,
            })
            .then((res) => {
                var { response, tokens } = res.data
                setTokenAdmin(tokens.access.token)
                setUser(response)
            })
    }

    const redirectToAdminPage = () => {
        const pathname = localStorage.getItem(PRE_LOGIN_PATHNAME)
        if (user?.role == ROLE.admin) {
            router.replace(pathname || '/admin')
        }
    }
    const redirectToLoginPage = () => {
        const pathname = localStorage.setItem(PRE_LOGIN_PATHNAME, router.pathname)
        if (!user) router.replace('/login')
    }
    return (
        <AuthContext.Provider
            value={{
                registerUser,
                loginUserWithEmailAndPassword,
                redirectToAdminPage,
                redirectToLoginPage,
                user,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
