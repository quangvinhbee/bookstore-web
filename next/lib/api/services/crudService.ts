import { callAPI } from '..'

export interface Pagination {
    limit?: number
    offset?: number
    page?: number
    total?: number
}
export interface GetListData<T> {
    data: T[]
    total: number
    pagination: Pagination
}
export interface BaseModel {
    id?: string
    updatedAt?: string
    createdAt?: string
    [x: string]: any
}

export interface QueryInput {
    data?: any
    filter?: any
    query?: {
        limit?: number
        page?: number
    }
}

export abstract class CrudService<T extends BaseModel> {
    abstract apiName: string
    abstract displayName: string
    getOne = async (id: String): Promise<any> => {
        return await callAPI({
            method: 'POST',
            url: `/api/v1/getOne${this.apiName}`,
            body: {
                id: id,
            },
        })
    }
    getAll = async ({ ...props }: QueryInput): Promise<any> => {
        return await callAPI({
            method: 'POST',
            url: `/api/v1/getAll${this.apiName}`,
            body: { ...props },
        })
    }
    create = async (data?: T): Promise<any> => {
        return await callAPI({
            method: 'POST',
            url: `/api/v1/admin/create${this.apiName}`,
            body: data,
        })
    }
    deleteOne = async (id: String): Promise<any> => {
        return await callAPI({
            method: 'POST',
            url: `/api/v1/admin/deleteOne${this.apiName}`,
            body: { id: id },
        })
    }
    updateOne = async (data?: T): Promise<any> => {
        return await callAPI({
            method: 'POST',
            url: `/api/v1/admin/updateOne${this.apiName}`,
            body: data,
        })
    }
}
