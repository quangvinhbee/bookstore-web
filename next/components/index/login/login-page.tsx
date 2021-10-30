import { useEffect, useState } from 'react'
import { useAlert } from '../../../lib/providers/alert-provider'
import { useAuth } from '../../../lib/providers/auth-provider'
import { ROLE } from '../../../lib/type'
import { Button } from '../../shared/form/button'
import { Field } from '../../shared/form/field'
import { Form } from '../../shared/form/form'
import { Input } from '../../shared/form/input'
import { Spinner } from '../../shared/spinner'

export function LoginPage() {
    const { user, redirectToIndexPage } = useAuth()
    useEffect(() => {
        if (user) {
            redirectToIndexPage()
        }
    }, [user])
    if (user === undefined) return <Spinner />
    return (
        <div className="w-full h-full flex flex-1 items-center justify-center">
            <div className="bg-white min-w-lg rounded-xl shadow-lg px-8 py-16">
                <div className="w-full uppercase text-4xl font-semibold text-gray-600 pb-4 flex items-center justify-center">
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
    const login = async (data) => {
        await loginUserWithEmailAndPassword(data.email, data.password).catch((error) => {
            alert.error('Lỗi đăng nhập. ' + error.response.data.message)
        })
    }
    return (
        <Form
            onSubmit={(data) => {
                login(data)
            }}
        >
            <Field name="email" label="Email">
                <Input placeholder="Email" className="h-12 rounded-lg" />
            </Field>
            <Field name="password" label="Mật khẩu">
                <Input placeholder="Mật khẩu" type="password" className="h-12 rounded-lg" />
            </Field>
            <div className="flex items-center justify-between">
                <Button submit asyncLoading primary>
                    Đăng nhập
                </Button>
                <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                    href="#"
                >
                    Quên mật khẩu?
                </a>
            </div>
        </Form>
    )
}
