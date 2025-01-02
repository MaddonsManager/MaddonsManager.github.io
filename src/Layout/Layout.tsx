import { AppFooter, AppNavbar } from '@/components'
import AppRoutes from '@/Routes/Routes'

export default function Layout({
    isLoadingRoute,
    isErrorRoute
}: {
    isLoadingRoute: boolean
    isErrorRoute: boolean
}) {
    return (
        <main className="dark:text-foreground dark:bg-background relative flex-grow mx-auto m-0 p-0 min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-fixed dark:bg-maddons-bg bg-maddons-light">
            <div className="min-h-screen absolute top-0 left-0 right-0 bottom-0 dark:bg-custom-radial z-[1]"></div>
            <div className="relative z-[2] text-default-900 text-center">
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
        </main>
    )
}
