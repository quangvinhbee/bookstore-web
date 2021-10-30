import { RegisterPage } from '../../components/admin/register/register-page'
import { NoneLayout } from '../../layouts/none-layout/none-layout'

export default function Page() {
    return <RegisterPage />
}
Page.Layout = NoneLayout
Page.LayoutProps = {
    title: 'Đăng kí',
}
