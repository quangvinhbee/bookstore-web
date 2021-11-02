import { createContext, useContext, useEffect, useState } from 'react'
import { Book } from '../api/services/bookService'
import { useToast } from './toast-provider'

const STORAGE_CART = 'SHOP_CART'

export const CartContext = createContext<{
    addToCart?: (item: Book) => void
    cart?: any[]
    deleteFromCart?: (index: number) => void
}>({})

export function CartProvider(props) {
    let [cart, setCart] = useState<any>([])
    const toast = useToast()
    const loadCart = () => {
        const data = localStorage.getItem(STORAGE_CART)
        if (data) setCart(JSON.parse(data))
        else setCart([])
    }

    const addToCart = (item: Book) => {
        cart.push(item)
        localStorage.setItem(STORAGE_CART, JSON.stringify(cart))
        setCart([...cart])
        toast.success('Đã thêm vào giỏ hàng thành công')
    }
    const deleteFromCart = (index: number) => {
        cart.splice(index, 1)
        localStorage.setItem(STORAGE_CART, JSON.stringify(cart))
        setCart([...cart])
        toast.success('Cập nhật giỏ hàng thành công')
    }

    useEffect(() => {
        loadCart()
    }, [])
    return (
        <CartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
            {props.children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)
