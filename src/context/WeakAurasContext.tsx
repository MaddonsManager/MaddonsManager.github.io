import { useState, useEffect, createContext, useContext, FC, ReactNode } from 'react'
import { StringItems } from '@/types'

interface WeakAurasCache {
    weakauras: StringItems[] | null
}

const weakAurasCache: WeakAurasCache = {
    weakauras: null
}

interface WeakAurasContextValue {
    data: StringItems[]
    isLoading: boolean
    error: string | null
}

const WeakAurasContext = createContext<WeakAurasContextValue | undefined>(undefined)

export const useWeakAurasContext = (): WeakAurasContextValue => {
    const context = useContext(WeakAurasContext)
    if (!context) {
        throw new Error('useWeakAurasContext must be used inside an WeakAurasProvider')
    }
    return context
}

export const WeakAurasProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<StringItems[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const jsonUrl =
        'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras/WeakAuras.json'

    const fetchWeakAurasWithContent = async (url: string) => {
        try {
            const response = await fetch(url)
            if (!response.ok) throw new Error(`Error fetching JSON: ${response.statusText}`)

            const jsonData: StringItems[] = await response.json()

            const dataWithContent = await Promise.all(
                jsonData.map(async (item: any): Promise<any> => {
                    try {
                        const txtResponse = await fetch(
                            `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras/${item.uuid}/${item.uuid}.txt`
                        )
                        const logo = `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras/${item.uuid}/${item.logo}`
                        const markdown = await fetch(
                            `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras/${item.uuid}/${item.uuid}.md`
                        )

                        const content = txtResponse.ok ? await txtResponse.text() : null
                        const md = markdown.ok ? await markdown.text() : null
                        return { ...item, content, logo, md }
                    } catch (err) {
                        console.warn(
                            `Failed to fetch content for UUID ${item.uuid}: ${
                                err instanceof Error ? err.message : 'Unknown error'
                            }`
                        )
                        return { ...item, content: null, md: null }
                    }
                })
            )

            return dataWithContent
        } catch (err) {
            throw new Error(
                `Failed to load data: ${err instanceof Error ? err.message : 'Unknown error'}`
            )
        }
    }

    useEffect(() => {
        const loadAllData = async () => {
            setIsLoading(true)
            try {
                if (weakAurasCache.weakauras) {
                    setData(weakAurasCache.weakauras)
                } else {
                    const weakaurasData = await fetchWeakAurasWithContent(jsonUrl)
                    weakAurasCache.weakauras = weakaurasData
                    setData(weakaurasData)
                }
                setIsLoading(false)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                setIsLoading(false)
            }
        }

        loadAllData()
    }, [])

    return (
        <WeakAurasContext.Provider value={{ data, isLoading, error }}>
            {children}
        </WeakAurasContext.Provider>
    )
}
