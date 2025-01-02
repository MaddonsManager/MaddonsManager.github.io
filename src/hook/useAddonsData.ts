import { useState, useEffect } from 'react'
import { AddonsData, AddonsDataState } from '@/types'
interface AddonsCache {
    [key: string]: AddonsData[] | null
}

const addonsCache: AddonsCache = {
    LichKing: null,
    Cataclysm: null,
    Pandaria: null
}

const useAddonsData = (): { data: AddonsDataState; error: string | null; isLoading: boolean } => {
    const [data, setData] = useState<AddonsDataState>({ LichKing: [], Cataclysm: [], Pandaria: [] })

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const urls: { [key: string]: string } = {
        LichKing: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/LK/lichking.json',
        Cataclysm:
            'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/Cata/cataclysm.json',
        Pandaria: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/Panda/pandaria.json'
    }

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

    return { data, isLoading, error }
}

export default useAddonsData
