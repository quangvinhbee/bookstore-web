import { FaSearch, FaShoppingCart } from 'react-icons/fa'
import { Button } from '../../../components/shared/form/button'
import { Input } from '../../../components/shared/form/input'

export function Header() {
    return (
        <div className="h-14 bg-white py-10 px-40 flex items-center justify-between shadow">
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
            <div className="">
                <Button icon={<FaShoppingCart />} iconClassName="text-2xl" />
            </div>
        </div>
    )
}
