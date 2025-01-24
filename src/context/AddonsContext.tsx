import { createContext, FC, ReactNode, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AddonsDataState } from '@/types'

// const jsonUrl =
//     'https://raw.githubusercontent.com/PentSec/MaddonsManager/refs/heads/main/API/Maddons.json'

const jsonUrl =
    'https://raw.githubusercontent.com/PentSec/MaddonsManager/refs/heads/main/API/Maddons.json'

interface AddonsContextValue {
    data: AddonsDataState[]
    isPending: boolean
    error: string | null
}

const AddonsContext = createContext<AddonsContextValue | undefined>(undefined)

export const useAddonsContext = (): AddonsContextValue => {
    const context = useContext(AddonsContext)
    if (!context) {
        throw new Error('useAddonsContext must be used inside an AddonsProvider')
    }
    return context
}

const fetchAddons = async (url: string) => {
    const response = await fetch(url)
    const jsonData = await response.json()
    return Promise.all(
        jsonData.map(async (item: AddonsDataState) => {
            const mdUrl = `https://raw.githubusercontent.com/PentSec/MaddonsManager/refs/heads/main/API/Addons/${item.file_name}/post.md`
            const logoUrl = `https://raw.githubusercontent.com/PentSec/MaddonsManager/refs/heads/main/API/Addons/${item.file_name}/${item.file_name}.webp`
            const zipUrl = `https://github.com/PentSec/MaddonsManager/raw/refs/heads/main/API/Addons/${item.file_name}/${item.file_name}.zip`

            return { ...item, md: mdUrl, logo: logoUrl, zip: zipUrl }
        })
    )
}

export const AddonsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isPending, error } = useQuery({
        queryKey: ['addons'],
        queryFn: () => fetchAddons(jsonUrl),
        refetchOnWindowFocus: false
    })

    return (
        <AddonsContext.Provider
            value={{
                data: data || [],
                isPending,
                error: error ? (error as Error).message : null
            }}
        >
            {children}
        </AddonsContext.Provider>
    )
}
