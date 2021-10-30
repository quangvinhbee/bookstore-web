import { Author } from './authorService'
import { Category } from './categoryService'
import { BaseModel, CrudService } from './crudService'

export interface Book extends BaseModel {
    name?: string
    image?: string
    author?: Author
    category?: Category
}

export class BookRepository extends CrudService<Book> {
    apiName = 'Book'
    displayName = 'Sách'
}
export const BookService = new BookRepository()
