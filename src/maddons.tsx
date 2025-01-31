import '@/assets/css/main.css'
import { AddonsProvider, BlogPostProvider, ElvUIProvider, WeakAurasProvider } from '@/context'
import Layout from '@/Layout/Layout'
import { NextUIProv } from '@/NextUIProv'
import queryClient from '@/utils/QueryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/github-dark.css'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import '/android-chrome-192x192.png'
import '/android-chrome-512x512.png'
import '/apple-touch-icon.png'
import '/favicon-16x16.png'
import '/favicon-32x32.png'
import '/logo.png'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <HashRouter>
        <QueryClientProvider client={queryClient}>
            <NextUIProv>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Bounce}
                />
                <AddonsProvider>
                    <WeakAurasProvider>
                        <ElvUIProvider>
                            <BlogPostProvider>
                                <Layout />
                            </BlogPostProvider>
                        </ElvUIProvider>
                    </WeakAurasProvider>
                </AddonsProvider>
            </NextUIProv>
        </QueryClientProvider>
    </HashRouter>
)
