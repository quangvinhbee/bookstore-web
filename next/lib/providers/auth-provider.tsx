import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { setTokenAdmin, getTokenAdmin } from '../api/header'
import { ADMIN, ROLE, USER } from '../type'

export const AuthContext = createContext<{
    registerUser?: (displayName: string, email: string, password: string) => Promise<any>
    loginUserWithEmailAndPassword?: (email: string, password: string) => Promise<any>
    userGetMe?: () => Promise<any>
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

    const userGetMe = async () => {
        return await axios
            .post<{ response: USER }>('/api/v1/auth/userGetMe')
            .then((res) => {
                var { response } = res.data
                setUser(response)
            })
            .catch((err) => console.log(err))
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
        localStorage.setItem(PRE_LOGIN_PATHNAME, router.pathname)
        if (!user) router.replace('/login')
    }

    useEffect(() => {
        const tokenAdmin = getTokenAdmin()
        if (user == undefined && tokenAdmin) userGetMe()
    }, [])
    return (
        <AuthContext.Provider
            value={{
                registerUser,
                loginUserWithEmailAndPassword,
                redirectToAdminPage,
                redirectToLoginPage,
                userGetMe,
                user,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
