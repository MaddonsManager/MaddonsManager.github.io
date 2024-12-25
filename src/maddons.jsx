import ReactDOM from 'react-dom/client'
import '@/assets/css/tailwind.css'
import AppRoutes from '@/Routes/Routes'
import { AppNavbar, AppFooter } from '@/components'
import { BrowserRouter as Router, useNavigate, useHref, useLocation } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import '/logo.png'
import '/apple-touch-icon.png'
import '/favicon-16x16.png'
import '/favicon-32x32.png'
import '/android-chrome-192x192.png'
import '/android-chrome-512x512.png'
import { useTheme } from '@nextui-org/use-theme'
import 'highlight.js/styles/github-dark.css'
import 'github-markdown-css/github-markdown.css'

const Maddons = () => {
    const { theme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const isLoadingRoute = location.pathname === '/'
    const isErrorRoute = location.pathname === '/404'

    return (
        <NextUIProvider theme={theme} navigate={navigate} useHref={useHref}>
            <main className="dark:text-foreground dark:bg-background relative flex-grow mx-auto m-0 p-0 min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed dark:bg-maddons-bg bg-maddons-light">
                <div className="">
                    <div className="min-h-screen absolute top-0 left-0 right-0 bottom-0 dark:bg-custom-radial z-[1]"></div>
                    <div className="relative z-[2] text-white text-center">
                        <header className="flex flex-row flex-nowrap items-center h-[var(--navbar-height)] px-0 justify-center sticky top-0 z-40 bg-transparent w-full gap-4">
                            {!isLoadingRoute && <AppNavbar />}
                        </header>
                        <main className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                            <AppRoutes />
                        </main>
                        <footer className="bottom-0 left-0 right-0 p-2 dark:bg-black/80 text-default-500 shadow-2xl bg-default-100/80">
                            {!isErrorRoute && <AppFooter />}
                        </footer>
                    </div>
                </div>
            </main>
        </NextUIProvider>
    )
}

const AppWrapper = () => {
    return (
        <Router>
            <Maddons />
        </Router>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppWrapper />)
