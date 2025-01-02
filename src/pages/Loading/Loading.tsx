import React, { useState, useEffect } from 'react'
import { PropagateLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './loading.css'
import logo from '@/assets/images/logo.svg'

export default function Loading() {
    const navigate = useNavigate()
    const [message, setMessage] = useState('Smelting addons...')
    const [isExiting, setIsExiting] = useState(false)

    const messages = ['Smelting addons...', 'Checking for updates...', 'Starting services...']

    useEffect(() => {
        const messageInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * messages.length)
            setMessage(messages[randomIndex])
        }, 1500)

        const timer = setTimeout(() => {
            setIsExiting(true)
            setTimeout(() => navigate('/home', { replace: true }), 500)
        }, 2000)

        return () => {
            clearInterval(messageInterval)
            clearTimeout(timer)
        }
    }, [navigate])

    return (
        <>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isExiting ? 0 : 1 }}
                transition={{ duration: 1 }}
                className="Loading-addon"
            >
                <img src={logo} alt="logo" className="mb-4" />
                <PropagateLoader size={25} color={'#fff'} loading={true} className="mb-4" />

                <AnimatePresence mode="wait">
                    <motion.p
                        key={message}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="mt-2 text-white"
                    >
                        {message}
                    </motion.p>
                </AnimatePresence>
            </motion.div>
        </>
    )
}
