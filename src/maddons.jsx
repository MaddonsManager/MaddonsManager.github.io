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

const Maddons = () => {
    const { theme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const isLoadingRoute = location.pathname === '/'
    const isErrorRoute = location.pathname === '/404'

    return (
        <NextUIProvider theme={theme} navigate={navigate} useHref={useHref}>
            <main className="dark:text-foreground dark:bg-background relative flex-grow mx-auto m-0 p-0 min-h-screen items-center justify-center dark:bg-cover dark:bg-center dark:bg-no-repeat dark:bg-fixed dark:bg-maddons-bg">
                <div className="">
                    <div className="min-h-screen absolute top-0 left-0 right-0 bottom-0 dark:bg-custom-radial backdrop-blur-sm z-[1]"></div>
                    <div className="relative z-[2] text-white text-center">
                        <header className="flex flex-row flex-nowrap items-center h-[var(--navbar-height)] px-0 justify-center sticky top-0 z-40 bg-transparent w-full gap-4">
                            {!isLoadingRoute && <AppNavbar />}
                        </header>
                        <main>
                            <AppRoutes />
                        </main>
                        <footer className="bottom-0 left-0 right-0 p-2 dark:bg-black/80 text-default-500 shadow-2xl">
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
