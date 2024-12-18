import { useState, useEffect } from 'react'

const useElvUIData = () => {
    const [data, setData] = useState({
        lich: [],
        cata: [],
        panda: []
    })
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const urls = {
        lich: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI_LK/ElvUI.json',
        cata: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI_Cata/ElvUI.json',
        panda: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/ElvUI_Panda/ElvUI.json'
    }

    const fetchElvUIWithContent = async (jsonUrl, folderPath) => {
        try {
            const response = await fetch(jsonUrl)
            if (!response.ok) throw new Error(`Error fetching JSON: ${response.statusText}`)

            const jsonData = await response.json()

            const dataWithContent = await Promise.all(
                jsonData.map(async (item) => {
                    try {
                        const txtResponse = await fetch(
                            `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/${folderPath}/UI/${item.uuid}.txt`
                        )

                        const content = txtResponse.ok ? await txtResponse.text() : null
                        return { ...item, content }
                    } catch (err) {
                        console.warn(
                            `Failed to fetch content for UUID ${item.uuid}: ${err.message}`
                        )
                        return { ...item, content: null }
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
                const [lichResponse, cataResponse, pandaResponse] = await Promise.all([
                    fetchElvUIWithContent(urls.lich, 'ElvUI_LK'),
                    fetchElvUIWithContent(urls.cata, 'ElvUI_Cata'),
                    fetchElvUIWithContent(urls.panda, 'ElvUI_Panda')
                ])

                setData({
                    lich: lichResponse,
                    cata: cataResponse,
                    panda: pandaResponse
                })
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
