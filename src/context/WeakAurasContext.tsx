import { createContext, FC, ReactNode, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { StringItems } from '@/types'

const jsonUrl = 'https://raw.githubusercontent.com/PentSec/MaddonsManager/API/API/WeakAuras.json'
const baseUrl = 'https://raw.githubusercontent.com/PentSec/MaddonsManager/API/API/WeakAuras'

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
    const response = await fetch(url)
    const jsonData = await response.json()
    return Promise.all(
        jsonData.map(async (item: any) => {
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

export const WeakAurasProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isPending, error } = useQuery({
        queryKey: ['weakAuras'],
        queryFn: () => fetchWeakAurasWithContent(jsonUrl),
        refetchOnWindowFocus: false
    })

    return (
        <WeakAurasContext.Provider
            value={{ data: data || [], isPending, error: error ? (error as Error).message : null }}
        >
            {children}
        </WeakAurasContext.Provider>
    )
}
