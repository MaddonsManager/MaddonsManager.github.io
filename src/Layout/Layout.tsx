import { Footer, Navbar } from '@/components'
import { useLocation } from 'react-router-dom'
import Content from '@/Routes/Routes'

export default function Layout() {
    const location = useLocation()
    const isErrorRoute = location.pathname === '/404'

    return (
        <div className="relative z-[2] grid min-h-[100vh] grid-rows-[auto_1fr_auto] w-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
                <Content />
            </main>
            <footer className="bottom-0 left-0 right-0 p-2 dark:bg-black/80 text-default-500 shadow-2xl bg-default-50/80 border-t-1 border-white/5 mt-8">
                {!isErrorRoute && <Footer />}
            </footer>
        </div>
    )
}
