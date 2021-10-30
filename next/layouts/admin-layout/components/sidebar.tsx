import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { RiSettings3Line, RiUser2Line } from 'react-icons/ri'
import { GiOrganigram } from 'react-icons/gi'

import { Footer } from './footer'
import { Button } from '../../../components/shared/form/button'
import { Accordion } from '../../../components/shared/accordion/accordion'
import { HiBookOpen, HiMenu, HiPencilAlt, HiUser } from 'react-icons/hi'

interface PropsType extends ReactProps {}
export default function Sidebar({ ...props }: PropsType) {
    const [menus, setMenus] = useState<any[]>(SIDEBAR_MENUS_ADMIN)
    const router = useRouter()

    const toggleMenu = (index) => {
        menus[index].isOpen = !menus[index].isOpen
        setMenus([...menus])
    }

    useEffect(() => {
        menus?.forEach((menu) => {
            if (router.pathname.includes(menu.path)) menu.isOpen = true
        })
        setMenus([...menus])
    }, [])

    return (
        <>
            <div
                className="bg-white shadow w-60 fixed top-14 flex flex-col"
                style={{ height: 'calc(100vh - 56px)' }}
            >
                <div className="flex-1 v-scrollbar pt-6 pb-3">
                    {menus?.map((menu, index) => (
                        <div className="mb-2" key={index}>
                            <div className="flex py-2 px-4 group" onClick={() => toggleMenu(index)}>
                                <span className="flex-1 px-2 text-gray-700 font-semibold uppercase">
                                    {menu.title}
                                </span>
                            </div>
                            <Accordion isOpen={true}>
                                {menu?.submenus.map((submenu, index) => (
                                    <Button
                                        key={index}
                                        primary={router.pathname == submenu.path}
                                        className={`w-full pl-8 pr-0 justify-start font-normal rounded-none ${
                                            router.pathname.includes(submenu.path)
                                                ? ''
                                                : 'hover:bg-gray-100'
                                        }`}
                                        icon={submenu.icon}
                                        href={submenu.path}
                                        text={
                                            <div className="flex items-center">
                                                <span>{submenu.title}</span>
                                            </div>
                                        }
                                    ></Button>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export const SIDEBAR_MENUS_ADMIN = [
    {
        title: 'Quản trị',
        submenus: [
            {
                title: 'Tài khoản',
                path: '/admin/management/user',
                icon: <HiUser />,
            },

            {
                title: 'Sách',
                path: '/admin/management/book',
                icon: <HiBookOpen />,
            },
            {
                title: 'Tác giả',
                path: '/admin/management/author',
                icon: <HiPencilAlt />,
            },
            {
                title: 'Danh mục',
                path: '/admin/management/category',
                icon: <HiMenu />,
            },
        ],
    },
]
