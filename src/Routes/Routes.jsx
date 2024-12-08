// src/Routes/Routes.jsx
import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/home/Home'
import About from '../pages/about/About'
import Loading from '../pages/loading/Loading'
import { RoutesNotFound } from '../components/RoutesNotFound/RoutesNotFound'

const AppRoutes = React.memo(() => {
    return (
        <Routes>
            <Route exact path="/" element={<Loading />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
            <Route path="/404" element={<RoutesNotFound />} />
        </Routes>
    )
})

export default AppRoutes
