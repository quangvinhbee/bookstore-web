import { useRef } from 'react'
import { FaRegTimesCircle, FaSearch, FaShoppingCart } from 'react-icons/fa'
import { Button } from '../../../components/shared/form/button'
import { Input } from '../../../components/shared/form/input'
import { Dropdown } from '../../../components/shared/popover/dropdown'
import { NumberPipe } from '../../../lib/pipes/number'
import { useCart } from '../../../lib/providers/cart-provider'

export function Header() {
    const ref = useRef()
    const { cart, deleteFromCart } = useCart()
    return (
        <>
            <div className="sticky top-0 z-50 h-14 bg-white py-10 px-40 flex items-center justify-between shadow-xl">
                <img src="/assets/logo.png" alt="" className="h-10" />
                <div className="flex items-center">
                    <Input
                        autoFocus
                        className="rounded-none rounded-l-sm min-w-lg border-none focus:outline-none group-hover:border-none"
                        inputClassName="bg-primary-light text-sm focus:bg-white text-gray-500 focus:outline-none focus:border-none"
                        placeholder="Nhập thứ bạn cần tìm vào đây"
                    />
                    <Button icon={<FaSearch />} primary className="rounded-none rounded-r-sm" />
                </div>
                <div className="relative" ref={ref}>
                    <Button icon={<FaShoppingCart />} iconClassName="text-2xl" />
                    {!!cart.length && (
                        <div className="absolute top-0 right-2 z-60 w-5 h-5 rounded-full bg-primary text-white text-xs font-semibold text-center flex items-center justify-center">
                            {cart.length}
                        </div>
                    )}
                </div>
            </div>
            <Dropdown reference={ref} arrow>
                {cart.map((item, index) => {
                    return (
                        <>
                            <Dropdown.Item>
                                <div className="flex items-center justify-between cursor-pointer transition-all duration-300 hover:bg-gray-50">
                                    <div className="flex items-center ">
                                        <img src={item.image} className="w-10 h-10" />
                                        <div className="flex flex-col justify-start items-start">
                                            <div className="text-sm font-bold text-gray-600 hover:text-primary text-ellipsis transition-all duration-100">
                                                {item.name}
                                            </div>
                                            <div className="text-xs text-gray-300">
                                                {NumberPipe(item.price, true)}
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        icon={<FaRegTimesCircle />}
                                        onClick={() => deleteFromCart(index)}
                                    />
                                </div>
                            </Dropdown.Item>
                        </>
                    )
                })}
            </Dropdown>
        </>
    )
}
