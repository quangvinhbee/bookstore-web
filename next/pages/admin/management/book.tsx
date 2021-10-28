import { AdminLayout } from '../../../layouts/admin-layout/admin-layout'
import { BooksPage } from '../../../components/admin/books/books-page'

export default function Page() {
    return <BooksPage></BooksPage>
}

Page.Layout = AdminLayout
Page.LayoutProps = {
    title: 'Admin',
}
