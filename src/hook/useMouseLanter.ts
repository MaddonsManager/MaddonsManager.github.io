import { useEffect, useRef } from 'react'

export const useLightEffect = () => {
    const lightRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let lastMouseX = 0
        let lastMouseY = 0

        const handleMouseMove = (e: MouseEvent) => {
            lastMouseX = e.clientX
            lastMouseY = e.clientY

            if (lightRef.current) {
                lightRef.current.style.left = `${lastMouseX}px`
                lightRef.current.style.top = `${lastMouseY + window.scrollY}px`
            }
        }

        const handleScroll = () => {
            if (lightRef.current) {
                lightRef.current.style.top = `${lastMouseY + window.scrollY}px`
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return lightRef
}
