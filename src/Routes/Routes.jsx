// src/Routes/Routes.jsx
import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Home, About, Loading, Addons, HowTo } from '@/pages'
import { RoutesNotFound } from '@/components'

const AppRoutes = React.memo(() => {
    return (
        <Routes>
            <Route exact path="/" element={<Loading />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/Addons" element={<Addons />} />
            <Route path="/howToUse" element={<HowTo />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="/404" element={<RoutesNotFound />} />
        </Routes>
    )
})

export default AppRoutes
