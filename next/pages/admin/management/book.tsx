import { AdminLayout } from '../../../layouts/admin-layout/admin-layout'
import { BooksPage } from '../../../components/admin/books/books-page'
import { BookProvider } from '../../../components/admin/books/providers/book-provider'

export default function Page() {
    return (
        <BookProvider>
            <BooksPage></BooksPage>
        </BookProvider>
    )
}

Page.Layout = AdminLayout
Page.LayoutProps = {
    title: 'Admin',
}
