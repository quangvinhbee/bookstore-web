import { LoginPage } from '../components/index/login/login-page'
import { DefaultLayout } from '../layouts/default-layout/default-layout'
import { NoneLayout } from '../layouts/none-layout/none-layout'

export default function Page() {
    return <LoginPage />
}
Page.Layout = NoneLayout
Page.LayoutProps = {
    title: 'Đăng nhập',
}
