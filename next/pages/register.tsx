import { RegisterPage } from '../components/index/register/register-page'
import { DefaultLayout } from '../layouts/default-layout/default-layout'
import { NoneLayout } from '../layouts/none-layout/none-layout'

export default function Page() {
    return <RegisterPage />
}
Page.Layout = NoneLayout
Page.LayoutProps = {
    title: 'Đăng kí',
}
