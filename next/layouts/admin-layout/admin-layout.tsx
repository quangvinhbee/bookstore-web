import { NextSeo } from 'next-seo'
import { useEffect } from 'react'
import { HiOutlineExclamation } from 'react-icons/hi'
import { Card } from '../../components/shared/card/card'
import { NotFound } from '../../components/shared/not-found'
import { Spinner } from '../../components/shared/spinner'
import { useAuth } from '../../lib/providers/auth-provider'
import { ROLE } from '../../lib/type'
import { DefaultHead } from '../default-head'
import { Footer } from './components/footer'
import { Header } from './components/header'
import Sidebar from './components/sidebar'

export function AdminLayout({ ...props }) {
    const { user, redirectToLoginPage, userGetMe } = useAuth()
    useEffect(() => {
        if (user === undefined) {
            userGetMe()
        } else if (user === null) {
            console.log('redirectToLoginPage')
            redirectToLoginPage()
        }
    }, [user])
    if (user == undefined) return <Spinner />
    else
        return (
            <div className="w-full">
                <DefaultHead />
                <NextSeo defaultTitle={'ADMIN'} title={props.title ? props.title : ''} />
                <Header />
                <div className="flex pt-14 w-full relative min-h-screen">
                    <Sidebar />
                    <div className="flex-1 flex flex-col pl-60">
                        <div className="p-6 min-h-screen">
                            <Card>
                                {user?.role === ROLE.admin ? (
                                    props.children
                                ) : (
                                    <NotFound
                                        icon={<HiOutlineExclamation />}
                                        text="Không đủ quyền truy cập"
                                    />
                                )}
                            </Card>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        )
}
