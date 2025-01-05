import { createContext, useContext, FC, ReactNode } from 'react'
import { StringItems } from '@/types'
import { useQuery } from '@tanstack/react-query'

const jsonUrl = 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI/ElvUI.json'

interface ElvUIContextValue {
    data: StringItems[]
    isPending: boolean
    error: string | null
}

const ElvUIContext = createContext<ElvUIContextValue | undefined>(undefined)

export const useElvUIContext = (): ElvUIContextValue => {
    const context = useContext(ElvUIContext)
    if (!context) {
        throw new Error('useElvUIContext must be used inside an ElvUIProvider')
    }
    return context
}

const fetchElvUIWithContent = async (url: string): Promise<StringItems[]> => {
    try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Error fetching JSON: ${response.statusText}`)

        const jsonData: StringItems[] = await response.json()

        const dataWithContent = await Promise.all(
            jsonData.map(async (item: any): Promise<any> => {
                try {
                    const txtResponse = await fetch(
                        `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI/${item.uuid}/${item.uuid}.txt`
                    )
                    const logo = `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI/${item.uuid}/${item.logo}`
                    const markdown = await fetch(
                        `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI/${item.uuid}/${item.uuid}.md`
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

export const ElvUIProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isPending, error } = useQuery({
        queryKey: ['elvUI'],
        queryFn: () => fetchElvUIWithContent(jsonUrl),
        refetchOnWindowFocus: false
    })

    return (
        <ElvUIContext.Provider
            value={{ data: data || [], isPending, error: error?.message || null }}
        >
            {children}
        </ElvUIContext.Provider>
    )
}
