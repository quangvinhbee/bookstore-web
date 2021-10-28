import { UsersPage } from '../../../components/admin/users/users-page'
import { AdminLayout } from '../../../layouts/admin-layout/admin-layout'

export default function Page() {
    return <UsersPage />
}

Page.Layout = AdminLayout
Page.LayoutProps = {
    title: 'Admin',
}
