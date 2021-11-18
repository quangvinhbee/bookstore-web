import { HomePage } from '../components/index/home/home-page'
import { HomeProvider } from '../components/index/home/providers/home-provider'
import { DefaultLayout } from '../layouts/default-layout/default-layout'

export default function Page() {
    return (
        <HomeProvider>
            <HomePage />
        </HomeProvider>
    )
}
Page.Layout = DefaultLayout
Page.LayoutProps = {
    title: 'Cửa hàng sách',
}
