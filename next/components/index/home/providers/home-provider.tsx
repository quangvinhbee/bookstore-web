import { createContext, useContext, useEffect, useState } from 'react'
import { Book, BookService } from '../../../../lib/api/services/bookService'
import { Pagination } from '../../../../lib/api/services/crudService'

export const HomeContext = createContext<{
    typeBook?: string
    setTypeBook?: any
    books?: Book[]
    pagination?: any
    setPagination?: any
}>({})

export function HomeProvider(props) {
    const [typeBook, setTypeBook] = useState<string>()
    const [books, setBooks] = useState<Book[]>()
    const [pagination, setPagination] = useState<Pagination>({ limit: 8, page: 1 })
    const loadBooks = async () => {
        await BookService.getAll({ query: { limit: pagination.limit, page: pagination.page } })
            .then((res) => {
                setBooks(res.data.response.results)
                setPagination({
                    limit: res.data.response.limit,
                    total: res.data.response.totalResults,
                    page: res.data.response.page,
                })
            })
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        loadBooks()
    }, [pagination.page])

    return (
        <HomeContext.Provider value={{ typeBook, setTypeBook, books, pagination, setPagination }}>
            {props.children}
        </HomeContext.Provider>
    )
}

export const useHome = () => useContext(HomeContext)
