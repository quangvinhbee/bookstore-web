import { LoginPage } from '../../components/admin/login/login-page'
import { NoneLayout } from '../../layouts/none-layout/none-layout'

export default function Page() {
    return <LoginPage />
}
Page.Layout = NoneLayout
Page.LayoutProps = {
    title: 'Đăng nhập',
}
