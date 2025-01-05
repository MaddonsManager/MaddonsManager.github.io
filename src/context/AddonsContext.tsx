import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { AddonsData, AddonsDataState } from '@/types'

interface AddonsCache {
    [key: string]: AddonsData[] | null
}

const addonsCache: AddonsCache = {
    LichKing: null,
    Cataclysm: null,
    Pandaria: null
}

const urls: { [key: string]: string } = {
    LichKing: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/LK/lichking.json',
    Cataclysm: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/Cata/cataclysm.json',
    Pandaria: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/Panda/pandaria.json'
}

interface AddonsContextValue {
    data: AddonsDataState
    isLoading: boolean
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

export const AddonsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<AddonsDataState>({
        LichKing: [],
        Cataclysm: [],
        Pandaria: []
    })
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            setError(null)

            try {
                const result = await Promise.all(
                    Object.keys(urls).map(async (key) => {
                        if (addonsCache[key]) {
                            return { key, data: addonsCache[key] }
                        }

                        const response = await fetch(urls[key])
                        if (!response.ok)
                            throw new Error(`Error fetching ${key}: ${response.statusText}`)

                        const jsonData = await response.json()
                        addonsCache[key] = jsonData
                        return { key, data: jsonData }
                    })
                )

                const newData = result.reduce((acc, { key, data }) => {
                    acc[key] = data as AddonsData[]
                    return acc
                }, {} as AddonsDataState)

                setData(newData)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return (
        <AddonsContext.Provider value={{ data, isLoading, error }}>
            {children}
        </AddonsContext.Provider>
    )
}
