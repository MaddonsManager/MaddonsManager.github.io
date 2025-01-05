import ReactDOM from 'react-dom/client'
import { HashRouter as Router, useNavigate, useHref, useLocation } from 'react-router-dom'
import Layout from '@/Layout/Layout'
import { NextUIProvider } from '@nextui-org/react'
import { AddonsProvider, WeakAurasProvider, ElvUIProvider, BlogPostProvider } from '@/context'
import '@/assets/css/main.css'
import '/logo.png'
import '/apple-touch-icon.png'
import '/favicon-16x16.png'
import '/favicon-32x32.png'
import '/android-chrome-192x192.png'
import '/android-chrome-512x512.png'
import 'highlight.js/styles/github-dark.css'
import 'github-markdown-css/github-markdown.css'

const Maddons = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const isErrorRoute = location.pathname === '/404'

    return (
        <NextUIProvider navigate={navigate} useHref={useHref}>
            <AddonsProvider>
                <WeakAurasProvider>
                    <ElvUIProvider>
                        <BlogPostProvider>
                            <Layout isErrorRoute={isErrorRoute} />
                        </BlogPostProvider>
                    </ElvUIProvider>
                </WeakAurasProvider>
            </AddonsProvider>
        </NextUIProvider>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Router>
        <Maddons />
    </Router>
)
