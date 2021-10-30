import { createContext, useContext } from 'react'
import { callAPI } from '../../../../lib/api'
import { Author, AuthorService } from '../../../../lib/api/services/authorService'

export const AuthorContext = createContext<{
    createAuthor?: (data: Author) => Promise<any>
    updateAuthor?: (data: Author) => Promise<any>
}>({})

export function AuthorProvider(props) {
    const createAuthor = async (data: Author) => {
        return await AuthorService.create(data)
    }
    const updateAuthor = async (data: Author) => {
        return await AuthorService.updateOne(data)
    }
    return (
        <AuthorContext.Provider value={{ createAuthor, updateAuthor }}>
            {props.children}
        </AuthorContext.Provider>
    )
}

export const useAuthor = () => useContext(AuthorContext)
