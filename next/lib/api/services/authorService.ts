import { BaseModel, CrudService } from './crudService'

export interface Author extends BaseModel {
    name?: string
    image?: string
    birthday?: string
    displayName?: string
    deathday?: string
}

export class AuthorRepository extends CrudService<Author> {
    apiName = 'Author'
    displayName = 'Tác giả'
}
export const AuthorService = new AuthorRepository()
