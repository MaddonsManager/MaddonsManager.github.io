import { createContext, useContext, FC, ReactNode } from 'react'
import { StringItems } from '@/types'
import { useQuery } from '@tanstack/react-query'

const jsonUrl = 'https://raw.githubusercontent.com/PentSec/API-MADDONS/main/API/ElvUI.json'
const baseUrl = 'https://raw.githubusercontent.com/PentSec/API-MADDONS/main/API/ElvUI'

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
        jsonData.map(async (item: StringItems) => {
            const txtUrl = `${baseUrl}/${item.expansion}/${item.file_name}/${item.file_name}.txt`
            const logoUrl = `${baseUrl}/${item.expansion}/${item.file_name}/${item.file_name}.webp`
            const mdUrl = `${baseUrl}/${item.expansion}/${item.file_name}/post.md`

            const [content] = await Promise.all([
                fetch(txtUrl).then((res) => (res.ok ? res.text() : null))
            ])

            return { ...item, content, logo: logoUrl, md: mdUrl }
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
