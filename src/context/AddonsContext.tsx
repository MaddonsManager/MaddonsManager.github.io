import { createContext, FC, ReactNode, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AddonsDataState } from '@/types'

const urls: { [key: string]: string } = {
    LichKing: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/LK/lichking.json',
    Cataclysm: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/Cata/cataclysm.json',
    Pandaria: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/Panda/pandaria.json'
}

interface AddonsContextValue {
    data: AddonsDataState
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

const fetchAddons = async (key: string) => {
    const response = await fetch(urls[key]).then((res) => res.json())
    return response
}

export const AddonsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const lichKingQuery = useQuery({
        queryKey: ['lichKing'],
        queryFn: () => fetchAddons('LichKing'),
        refetchOnWindowFocus: false
    })
    const cataclysmQuery = useQuery({
        queryKey: ['cataclysm'],
        queryFn: () => fetchAddons('Cataclysm'),
        refetchOnWindowFocus: false
    })
    const pandariaQuery = useQuery({
        queryKey: ['pandaria'],
        queryFn: () => fetchAddons('Pandaria'),
        refetchOnWindowFocus: false
    })

    const data: AddonsDataState = {
        LichKing: lichKingQuery.data || [],
        Cataclysm: cataclysmQuery.data || [],
        Pandaria: pandariaQuery.data || []
    }

    const isPending = lichKingQuery.isPending || cataclysmQuery.isPending || pandariaQuery.isPending

    const error = lichKingQuery.error || cataclysmQuery.error || pandariaQuery.error

    return (
        <AddonsContext.Provider
            value={{ data, isPending, error: error ? (error as Error).message : null }}
        >
            {children}
        </AddonsContext.Provider>
    )
}
