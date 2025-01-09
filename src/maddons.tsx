import ReactDOM from 'react-dom/client'
import { AddonsProvider, WeakAurasProvider, ElvUIProvider, BlogPostProvider } from '@/context'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '@/utils/QueryClient'
import { NextUIProv } from '@/NextUIProv'
import { BrowserRouter } from 'react-router-dom'

import '@/assets/css/main.css'
import '/logo.png'
import '/apple-touch-icon.png'
import '/favicon-16x16.png'
import '/favicon-32x32.png'
import '/android-chrome-192x192.png'
import '/android-chrome-512x512.png'
import 'highlight.js/styles/github-dark.css'
import 'github-markdown-css/github-markdown.css'
import Layout from '@/Layout/Layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <NextUIProv>
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
    </BrowserRouter>
)
