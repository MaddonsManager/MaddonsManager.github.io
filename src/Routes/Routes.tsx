import { DownloadAddon, RoutesNotFound } from '@/components'
import { useSEO } from '@/hook/useSEO'
import { Addons, ElvUI, Guides, Home, Notes, Post, WeakAuras } from '@/pages'
import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

const AppRoutes = () => {
    useSEO()
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.1 }}
            >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/Addons" element={<Addons />} />
                    <Route path="/download/:addonName" element={<DownloadAddon />} />
                    <Route path="/WeakAuras" element={<WeakAuras />} />
                    <Route path="/ElvUI" element={<ElvUI />} />
                    <Route path="/Guides" element={<Guides />} />
                    <Route path="/Post/:folder" element={<Post />} />
                    <Route path="/Notes/*" element={<Notes />} />
                    <Route path="/404" element={<RoutesNotFound />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
            </motion.div>
        </AnimatePresence>
    )
}

export default AppRoutes
