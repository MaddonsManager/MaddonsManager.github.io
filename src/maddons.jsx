import ReactDOM from 'react-dom/client'
import './assets/css/tailwind.css'
import AppRoutes from './routes/routes'
import AppNavbar from './components/AppNavbar/AppNavbar'
import { BrowserRouter as Router, useNavigate, useHref, useLocation } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import AppFooter from './components/AppFooter/AppFooter'

const Maddons = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const isLoadingRoute = location.pathname === '/'

    return (
        <NextUIProvider navigate={navigate} useHref={useHref}>
            <main className="relative flex-grow mx-auto dark text-foreground">
                <div className="center-gradient"></div>
                {!isLoadingRoute && <AppNavbar />}
                <div className="content">
                    <AppRoutes />
                    {!isLoadingRoute && <AppFooter />}
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
