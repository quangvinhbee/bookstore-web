import '../styles/style.scss'
import { Fragment } from 'react'
import { DefaultSeo } from 'next-seo'
import config from 'next/config'
import { AuthProvider } from '../lib/providers/auth-provider'
import { AlertProvider } from '../lib/providers/alert-provider'
import { ToastProvider } from '../lib/providers/toast-provider'
import { CartProvider } from '../lib/providers/cart-provider'

function MyApp({ Component, pageProps }) {
    const Layout = Component.Layout ? Component.Layout : Fragment
    const layoutProps = Component.LayoutProps ? Component.LayoutProps : {}
    const {
        publicRuntimeConfig: {
            seo: { title, siteName },
        },
    } = config()
    return (
        <>
            <DefaultSeo titleTemplate="%s" defaultTitle={title} />
            <ToastProvider>
                <AlertProvider>
                    <AuthProvider>
                        <CartProvider>
                            <Layout {...layoutProps}>
                                <Component {...pageProps} />
                            </Layout>
                        </CartProvider>
                    </AuthProvider>
                </AlertProvider>
            </ToastProvider>
        </>
    )
}

export default MyApp
