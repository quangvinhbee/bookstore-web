import { UserProvider } from '../../../components/admin/users/providers/user-provider'
import { UsersPage } from '../../../components/admin/users/users-page'
import { AdminLayout } from '../../../layouts/admin-layout/admin-layout'

export default function Page() {
    return (
        <UserProvider>
            <UsersPage />
        </UserProvider>
    )
}

Page.Layout = AdminLayout
Page.LayoutProps = {
    title: 'Admin',
}
