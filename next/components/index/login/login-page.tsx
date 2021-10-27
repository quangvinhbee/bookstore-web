import { useEffect, useState } from 'react'
import { useAlert } from '../../../lib/providers/alert-provider'
import { useAuth } from '../../../lib/providers/auth-provider'
import { ROLE } from '../../../lib/type'
import { Button } from '../../shared/form/button'
import { Input } from '../../shared/form/input'

export function LoginPage() {
    const { user, redirectToAdminPage } = useAuth()
    useEffect(() => {
        if (user) {
            if (user.role == ROLE.admin) redirectToAdminPage()
        }
    }, [user])
    return (
        <div className="w-full h-full flex flex-1 items-center justify-center">
            <div className="bg-white min-w-lg min-h-lg rounded-xl shadow-lg">
                <div className="w-full uppercase text-4xl font-semibold text-gray-600 py-8 flex items-center justify-center">
                    Đăng nhập
                </div>
                <FormLogin />
            </div>
        </div>
    )
}
export function FormLogin() {
    const { loginUserWithEmailAndPassword } = useAuth()
    const alert = useAlert()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const login = async () => {
        await loginUserWithEmailAndPassword(user.email, user.password).catch((error) => {
            alert.error('Lỗi đăng nhập. ' + error.response.data.message)
        })
    }
    return (
        <form className="px-8 pt-6 pb-8 mb-4">
            <Input
                name="Email"
                placeholder="Email"
                onChange={(data) => {
                    setUser({ ...user, email: data })
                }}
            />
            <Input
                name="Mật khẩu"
                placeholder="Mật khẩu"
                type="password"
                onChange={(data) => {
                    setUser({ ...user, password: data })
                }}
            />
            <div className="flex items-center justify-between">
                <Button
                    asyncLoading
                    primary
                    onClick={async () => {
                        await login()
                    }}
                >
                    Đăng nhập
                </Button>
                <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="#"
                >
                    Quên mật khẩu?
                </a>
            </div>
        </form>
    )
}
