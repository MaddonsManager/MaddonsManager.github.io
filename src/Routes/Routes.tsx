// src/Routes/Routes.jsx
import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Home, Notes, Loading, Addons, WeakAuras, ElvUI, Guides, Post } from '@/pages'
import { RoutesNotFound, DownloadAddon } from '@/components'

const AppRoutes = React.memo(() => {
    return (
        <Routes>
            <Route path="/" element={<Loading />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Addons" element={<Addons />} />
            <Route path="/download/:addonName" element={<DownloadAddon />} />1
            <Route path="/WeakAuras" element={<WeakAuras />} />
            <Route path="/ElvUI" element={<ElvUI />} />
            <Route path="/Guides" element={<Guides />} />
            <Route path="/Post/:folder" element={<Post />} />
            <Route path="/Notes/*" element={<Notes />} />
            <Route path="/404" element={<RoutesNotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    )
})

export default AppRoutes
