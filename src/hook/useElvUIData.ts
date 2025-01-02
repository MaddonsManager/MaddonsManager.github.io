import { useState, useEffect } from 'react'

const elvUICache = {
    elvui: null
}

const useElvUIData = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const jsonUrl =
        'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI/ElvUI.json'

    const fetchElvUIWithContent = async (url) => {
        try {
            const response = await fetch(url)
            if (!response.ok) throw new Error(`Error fetching JSON: ${response.statusText}`)

            const jsonData = await response.json()

            const dataWithContent = await Promise.all(
                jsonData.map(async (item) => {
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
                            `Failed to fetch content for UUID ${item.uuid}: ${err.message}`
                        )
                        return { ...item, content: null, md: null }
                    }
                })
            )

            return dataWithContent
        } catch (err) {
            throw new Error(`Failed to load data: ${err.message}`)
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
                    console.log(`back`, elvuiData)
                }
                setIsLoading(false)
            } catch (err) {
                setError(err.message)
                setIsLoading(false)
            }
        }

        loadAllData()
    }, [])

    return { data, error, isLoading }
}

export default useElvUIData
