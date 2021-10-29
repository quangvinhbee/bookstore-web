import { BaseModel, CrudService } from './crudService'

export interface Book extends BaseModel {
    name?: string
    image?: string
}

export class BookRepository extends CrudService<Book> {
    apiName = 'Book'
    displayName = 'Sách'
}
export const BookService = new BookRepository()
