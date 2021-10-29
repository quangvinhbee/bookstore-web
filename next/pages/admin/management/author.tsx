import { AuthorsPage } from '../../../components/admin/authors/authors-page'
import { AuthorProvider } from '../../../components/admin/authors/providers/author-provider'
import { AdminLayout } from '../../../layouts/admin-layout/admin-layout'

export default function Page() {
    return (
        <AuthorProvider>
            <AuthorsPage></AuthorsPage>
        </AuthorProvider>
    )
}

Page.Layout = AdminLayout
Page.LayoutProps = {
    title: 'Admin',
}
