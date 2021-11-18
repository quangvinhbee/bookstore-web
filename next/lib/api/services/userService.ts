import { callAPI } from '..'
import { BaseModel, CrudService } from './crudService'

export const RoleOptions: Option[] = [
    {
        label: 'Admin',
        value: 'ADMIN',
        color: 'success',
    },
    {
        label: 'Người dùng',
        value: 'USER',
        color: 'orange',
    },
]

export interface User extends BaseModel {
    name?: string
    image?: string
    email?: string
    role?: 'ADMIN' | 'USER'
}

export class UserRepository extends CrudService<User> {
    apiName = 'User'
    displayName = 'Người dùng'
    createUser = async (data?: User): Promise<any> => {
        return await callAPI({
            method: 'POST',
            url: `/api/v1/auth/createUser`,
            body: data,
        })
    }
}
export const UserService = new UserRepository()
