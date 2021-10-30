import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import { createContext, useContext, useEffect, useState } from 'react'
import { callAPI } from '../api'
import { setTokenAdmin, getTokenAdmin } from '../api/header'
import { ADMIN, ROLE, USER } from '../type'

export const AuthContext = createContext<{
    registerUser?: (displayName: string, email: string, password: string) => Promise<any>
    loginUserWithEmailAndPassword?: (email: string, password: string) => Promise<any>
    userGetMe?: () => Promise<any>
    adminGetMe?: () => Promise<any>
    redirectToAdminPage?: () => void
    redirectToLoginPage?: () => void
    redirectToAdminLoginPage?: () => void
    user?: USER
    admin?: USER
}>({})

export function AuthProvider(props) {
    const PRE_LOGIN_PATHNAME = 'PRE_LOGIN_PATHNAME'
    const router = useRouter()
    const [user, setUser] = useState<USER>(undefined)
    const [admin, setAdmin] = useState<USER>(undefined)

    console.log(admin)

    const registerUser = async (displayName: string, email: string, password: string) => {
        return await axios.post('/api/v1/auth/createUser', {
            displayName: displayName,
            email: email,
            password: password,
        })
    }

    const userGetMe = async () => {
        await callAPI({ method: 'GET', url: '/api/v1/auth/userGetMe' })
            .then((res) => {
                var { response } = res.data
                setUser(response)
            })
            .catch((err) => setUser(null))
    }

    const adminGetMe = async () => {
        await callAPI({ method: 'GET', url: '/api/v1/admin/adminGetMe' })
            .then((res) => {
                var { response } = res.data
                setAdmin(response)
            })
            .catch((err) => setAdmin(null))
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
                if (response.role == ROLE.admin) setAdmin(response)
                else setUser(response)
            })
    }

    const redirectToAdminPage = () => {
        const pathname = localStorage.getItem(PRE_LOGIN_PATHNAME)
        console.log('redirectToAdminPage')
        if (admin) {
            if (location.pathname == pathname) router.replace('/admin')
            else router.replace(pathname || '/admin')
        }
    }
    const redirectToAdminLoginPage = () => {
        localStorage.setItem(PRE_LOGIN_PATHNAME, router.pathname)
        if (!user) router.replace('/admin/login')
    }
    const redirectToLoginPage = () => {
        localStorage.setItem(PRE_LOGIN_PATHNAME, router.pathname)
        if (!user) router.replace('/login')
    }

    useEffect(() => {
        const tokenAdmin = getTokenAdmin()
        if (admin == undefined && tokenAdmin) adminGetMe()
    }, [])
    return (
        <AuthContext.Provider
            value={{
                registerUser,
                loginUserWithEmailAndPassword,
                redirectToAdminPage,
                redirectToAdminLoginPage,
                redirectToLoginPage,
                userGetMe,
                adminGetMe,
                user,
                admin,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
