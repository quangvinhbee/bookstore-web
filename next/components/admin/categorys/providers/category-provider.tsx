import { createContext, useContext } from 'react'
import { callAPI } from '../../../../lib/api'
import { Category, CategoryService } from '../../../../lib/api/services/categoryService'

export const CategoryContext = createContext<{
    createCategory?: (data: Category) => Promise<any>
    updateCategory?: (data: Category) => Promise<any>
}>({})

export function CategoryProvider(props) {
    const createCategory = async (data: Category) => {
        return await CategoryService.create(data)
    }
    const updateCategory = async (data: Category) => {
        return await CategoryService.updateOne(data)
    }
    return (
        <CategoryContext.Provider value={{ createCategory, updateCategory }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export const useCategory = () => useContext(CategoryContext)
