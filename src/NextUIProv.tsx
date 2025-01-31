import { useLightEffect } from '@/hook/useMouseLanter'
import { HeroUIProvider } from '@heroui/react'
import { ReactNode } from 'react'
import { useHref, useNavigate } from 'react-router-dom'

export function NextUIProv({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const lightRef = useLightEffect()

    return (
        <HeroUIProvider navigate={navigate} useHref={useHref} className="bg-backgrounds-main">
            <div className="dark:bg-backgrounds-main-shadows" />
            <div ref={lightRef} className="light-effect" />
            {children}
        </HeroUIProvider>
    )
}
