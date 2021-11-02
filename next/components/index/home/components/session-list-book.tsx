import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { RiArrowLeftSLine, RiArrowRightSLine, RiMoreFill } from 'react-icons/ri'
import { Book } from '../../../../lib/api/services/bookService'
import { NumberPipe } from '../../../../lib/pipes/number'
import { useCart } from '../../../../lib/providers/cart-provider'
import { Button } from '../../../shared/form/button'
import { PaginationComponent } from '../../../shared/pagination/pagination-component'
import { useHome } from '../providers/home-provider'

export function SessionListBok() {
    return (
        <div className="px-40 bg-white">
            <SelectTypeBook />
            <ListBook />
            <PaginationBooks />
        </div>
    )
}

export function PaginationBooks() {
    const { pagination, setPagination } = useHome()
    const defaultButtonClass =
        `border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:pointer-events-none ` +
        `hover:text-primary hover:border-primary hover:bg-gray-200 font-semibold rounded-full ` +
        `px-0.5 mx-0.5 min-w-9 h-9`
    return (
        <div className="pb-4 flex justify-end">
            <PaginationComponent
                limit={pagination.limit}
                total={pagination.total}
                page={pagination.page}
                onPageChange={(page) => setPagination({ ...pagination, page })}
                hasFirstLast={false}
                hasDots={true}
                visiblePageCount={8}
                prevButtonClass={`${defaultButtonClass}`}
                nextButtonClass={`${defaultButtonClass}`}
                firstButtonClass={`${defaultButtonClass}`}
                lastButtonClass={`${defaultButtonClass}`}
                pageButtonClass={`${defaultButtonClass}`}
                dotsButtonClass={`${defaultButtonClass}`}
                pageActiveButtonClass={`${defaultButtonClass
                    .replace('text-gray-700', 'text-white')
                    .replace('hover:text-primary', 'hover:text-white')
                    .replace('hover:bg-gray-200', '')} bg-primary border-primary`}
                prevButtonContent={
                    <i className="text-md sm:text-xl">
                        <RiArrowLeftSLine />
                    </i>
                }
                nextButtonContent={
                    <i className="text-md sm:text-xl">
                        <RiArrowRightSLine />
                    </i>
                }
                dotsButtonContent={
                    <i className="text-md sm:text-lg">
                        <RiMoreFill />
                    </i>
                }
            />
        </div>
    )
}

export function ListBook() {
    const { books } = useHome()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 gap-5">
            {books?.map((item) => (
                <ItemBook item={item} />
            ))}
        </div>
    )
}

export function ItemBook(item: Book) {
    const { addToCart } = useCart()
    return (
        <div
            className="p-4 cursor-pointer flex flex-col items-center justify-between max-w-xs transition-all duration-200 hover:shadow-lg"
            key={item.id}
        >
            <div className="">
                <img src={item.item.image} alt="" className="w-72 h-72 object-cover" />
                <div className="text-sm mt-4 w-full text-left">{item.item.name}</div>
            </div>
            <div className="flex items-center w-full text-left">
                <div className="flex pr-2">
                    {[0, 1, 2, 3, 4].map((index) => {
                        return (
                            <i className="text-sm text-primary" key={index}>
                                <FaStar />
                            </i>
                        )
                    })}
                </div>

                <div className="text-sm text-gray-400 border-l pl-2">Đã bán 1000+</div>
            </div>
            <div className="flex items-center justify-between w-full mt-4">
                <div className="text-lg text-left font-bold text-gray-600">
                    {NumberPipe(item.item.price, true)}
                </div>
                <Button
                    text={'Thêm giỏ hàng'}
                    small
                    primary
                    className=""
                    onClick={() => addToCart(item.item)}
                />
            </div>
        </div>
    )
}

export function SelectTypeBook() {
    const { typeBook, setTypeBook } = useHome()
    useEffect(() => {
        setTypeBook(TYPE_BOOK[0].type)
    }, [])
    return (
        <div className="flex items-center border-b">
            {TYPE_BOOK.map((item) => {
                return (
                    <div
                        className={`px-4 py-1 mt-4 m-2 rounded-2xl cursor-pointer transition-all duration-300
                          ${
                              typeBook === item.type
                                  ? 'bg-primary text-white shadow'
                                  : 'bg-gray-200 text-gray-600'
                          }
                        `}
                        onClick={() => setTypeBook(item.type)}
                        key={item.type}
                    >
                        {item.name}
                    </div>
                )
            })}
        </div>
    )
}

export const TYPE_BOOK = [
    {
        name: 'Phổ biến',
        type: 'POPULAR',
    },
    {
        name: 'Bán chạy',
        type: 'BESTSELLER',
    },
    {
        name: 'Hàng mới',
        type: 'NEW',
    },
]
