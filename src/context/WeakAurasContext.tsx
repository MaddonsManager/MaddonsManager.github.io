import { createContext, FC, ReactNode, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { StringItems } from '@/types'

const jsonUrl =
    'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras/WeakAuras.json'

interface WeakAurasContextValue {
    data: StringItems[]
    isPending: boolean
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

const fetchWeakAurasWithContent = async (url: string): Promise<StringItems[]> => {
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

export const WeakAurasProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isPending, error } = useQuery({
        queryKey: ['weakAuras'],
        queryFn: () => fetchWeakAurasWithContent(jsonUrl),
        refetchOnWindowFocus: false
    })

    return (
        <WeakAurasContext.Provider
            value={{ data: data || [], isPending, error: error?.message || null }}
        >
            {children}
        </WeakAurasContext.Provider>
    )
}
