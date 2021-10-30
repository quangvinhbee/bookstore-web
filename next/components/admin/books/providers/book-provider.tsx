import { createContext, useContext } from 'react'
import { callAPI } from '../../../../lib/api'
import { Book, BookService } from '../../../../lib/api/services/bookService'

export const BookContext = createContext<{
    createBook?: (data: Book) => Promise<any>
    updateBook?: (data: Book) => Promise<any>
}>({})

export function BookProvider(props) {
    const createBook = async (data: Book) => {
        return await BookService.create(data)
    }
    const updateBook = async (data: Book) => {
        return await BookService.updateOne(data)
    }
    return (
        <BookContext.Provider value={{ createBook, updateBook }}>
            {props.children}
        </BookContext.Provider>
    )
}

export const useBook = () => useContext(BookContext)
