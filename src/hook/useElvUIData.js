import { useState, useEffect } from 'react'

// Caché en memoria
const elvUICache = {
    lich: null,
    cata: null,
    panda: null
}

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
                const [lichData, cataData, pandaData] = await Promise.all(
                    ['lich', 'cata', 'panda'].map(async (key) => {
                        // Revisar si ya está en caché
                        if (elvUICache[key]) return elvUICache[key]

                        const folderPath =
                            key === 'lich'
                                ? 'ElvUI_LK'
                                : key === 'cata'
                                ? 'ElvUI_Cata'
                                : 'ElvUI_Panda'

                        const jsonData = await fetchElvUIWithContent(urls[key], folderPath)

                        // Guardar en caché
                        elvUICache[key] = jsonData

                        return jsonData
                    })
                )

                setData({
                    lich: lichData,
                    cata: cataData,
                    panda: pandaData
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
