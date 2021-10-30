import { BaseModel, CrudService } from './crudService'

export interface Category extends BaseModel {
    name?: string
    image?: string
    birthday?: string
    displayName?: string
    deathday?: string
}

export class CategoryRepository extends CrudService<Category> {
    apiName = 'Category'
    displayName = 'Danh mục'
}
export const CategoryService = new CategoryRepository()
