import { createContext, useContext } from 'react'
import { callAPI } from '../../../../lib/api'
import { User, UserService } from '../../../../lib/api/services/userService'

export const UserContext = createContext<{
    createUser?: (data: User) => Promise<any>
    updateUser?: (data: User) => Promise<any>
}>({})

export function UserProvider(props) {
    const createUser = async (data: User) => {
        return await UserService.createUser(data)
    }
    const updateUser = async (data: User) => {
        return await UserService.updateOne(data)
    }
    return (
        <UserContext.Provider value={{ createUser, updateUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
