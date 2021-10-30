import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { useAlert } from '../../../lib/providers/alert-provider'
import { useAuth } from '../../../lib/providers/auth-provider'
import { ROLE } from '../../../lib/type'
import { Button } from '../../shared/form/button'
import { Input } from '../../shared/form/input'
import { Spinner } from '../../shared/spinner'

export function RegisterPage() {
    const { admin, redirectToAdminPage } = useAuth()
    useEffect(() => {
        if (admin) {
            redirectToAdminPage()
        }
    }, [admin])
    if (admin === undefined) return <Spinner />
    return (
        <div className="w-full h-full flex flex-1 items-center justify-center">
            <div className="bg-white min-w-lg min-h-lg rounded-xl shadow-lg my-8">
                <div className="w-full uppercase text-4xl font-semibold text-gray-600 py-8 flex items-center justify-center">
                    Đăng kí
                </div>
                <FormRegister />
            </div>
        </div>
    )
}
export function FormRegister() {
    const { registerUser } = useAuth()
    const alert = useAlert()
    const router = useRouter()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repassword: '',
    })
    const register = () => {
        if (user.password == user.repassword)
            registerUser(user.firstName + ' ' + user.firstName, user.email, user.password)
                .then((res) => {
                    alert.success('Đăng kí thành công').then(() => {
                        router.replace('/login')
                    })
                })
                .catch((error) => {
                    alert.error('Lỗi đăng kí. ' + error.response.data.error.message)
                })
        else alert.error('Mật khẩu không khớp')
    }
    return (
        <form className="px-8 pt-6 pb-8 mb-4">
            <div className="grid grid-cols-2 gap-x-4">
                <Input
                    name="Họ"
                    placeholder="Họ"
                    onChange={(data) => {
                        setUser({ ...user, firstName: data })
                    }}
                />
                <Input
                    name="Tên"
                    placeholder="Tên"
                    onChange={(data) => {
                        setUser({ ...user, lastName: data })
                    }}
                />
            </div>
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
            <Input
                name="Nhập lại mật khẩu"
                placeholder="Nhập lại mật khẩu"
                type="password"
                onChange={(data) => {
                    setUser({ ...user, repassword: data })
                }}
            />
            <div className="flex items-center justify-center">
                <Button
                    primary
                    onClick={() => {
                        register()
                    }}
                >
                    Đăng kí
                </Button>
            </div>
        </form>
    )
}
