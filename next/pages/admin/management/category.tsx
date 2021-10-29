import { CategorysPage } from '../../../components/admin/categorys/category-page'
import { CategoryProvider } from '../../../components/admin/categorys/providers/category-provider'
import { AdminLayout } from '../../../layouts/admin-layout/admin-layout'

export default function Page() {
    return (
        <CategoryProvider>
            <CategorysPage></CategorysPage>
        </CategoryProvider>
    )
}

Page.Layout = AdminLayout
Page.LayoutProps = {
    title: 'Admin',
}
