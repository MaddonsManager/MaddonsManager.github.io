import { useState, useEffect } from 'react'
import { StringItems } from '@/types'

interface ElvUICache {
    elvui: StringItems[] | null
}

const elvUICache: ElvUICache = {
    elvui: null
}

const useElvUIData = (): { data: StringItems[]; error: string | null; isLoading: boolean } => {
    const [data, setData] = useState<StringItems[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const jsonUrl =
        'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI/ElvUI.json'

    const fetchElvUIWithContent = async (url: string) => {
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

    useEffect(() => {
        const loadAllData = async () => {
            setIsLoading(true)
            try {
                if (elvUICache.elvui) {
                    setData(elvUICache.elvui)
                } else {
                    const elvuiData = await fetchElvUIWithContent(jsonUrl)
                    elvUICache.elvui = elvuiData
                    setData(elvuiData)
                }
                setIsLoading(false)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
                setIsLoading(false)
            }
        }

        loadAllData()
    }, [])

    return { data, error, isLoading }
}

export default useElvUIData
