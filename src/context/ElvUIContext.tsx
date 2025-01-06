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
    const response = await fetch(url)
    const jsonData = await response.json()
    return Promise.all(
        jsonData.map(async (item: any) => {
            const txtUrl = `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI/${item.uuid}/${item.uuid}.txt`
            const logoUrl = `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI/${item.uuid}/${item.logo}`
            const mdUrl = `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI/${item.uuid}/${item.uuid}.md`

            const [content, md] = await Promise.all([
                fetch(txtUrl).then((res) => {
                    if (!res.ok) throw new Error(`Failed to fetch txt for ${item.uuid}`)
                    return res.text()
                }),
                fetch(mdUrl).then((res) => {
                    if (!res.ok) throw new Error(`Failed to fetch md for ${item.uuid}`)
                    return res.text()
                })
            ])

            return { ...item, content, logo: logoUrl, md }
        })
    )
}

export const ElvUIProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isPending, error } = useQuery({
        queryKey: ['elvUI'],
        queryFn: () => fetchElvUIWithContent(jsonUrl),
        refetchOnWindowFocus: false
    })

    return (
        <ElvUIContext.Provider
            value={{
                data: data || [],
                isPending,
                error: error ? (error as Error).message : null
            }}
        >
            {children}
        </ElvUIContext.Provider>
    )
}
