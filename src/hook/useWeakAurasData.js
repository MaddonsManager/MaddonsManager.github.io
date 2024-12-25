import { useState, useEffect } from 'react'

const weakAurasCache = {
    lich: null,
    cata: null,
    panda: null
}

const useWeakAurasData = () => {
    const [data, setData] = useState({
        lich: [],
        cata: [],
        panda: []
    })
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const urls = {
        lich: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras_LK/WeakAuras.json',
        cata: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras_Cata/WeakAuras.json',
        panda: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras_Panda/Weakauras.json'
    }

    const fetchWeakAurasWithContent = async (jsonUrl, folderPath) => {
        try {
            const response = await fetch(jsonUrl)
            if (!response.ok) throw new Error(`Error fetching JSON: ${response.statusText}`)

            const jsonData = await response.json()

            const dataWithContent = await Promise.all(
                jsonData.map(async (item) => {
                    try {
                        const txtResponse = await fetch(
                            `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/${folderPath}/WA/${item.uuid}.txt`
                        )
                        const logo = `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/${folderPath}/logo/${item.uuid}.webp`

                        const content = txtResponse.ok ? await txtResponse.text() : null
                        return { ...item, content, logo }
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
                const [lkData, cataData, pandaData] = await Promise.all(
                    ['lich', 'cata', 'panda'].map(async (key) => {
                        if (weakAurasCache[key]) return weakAurasCache[key]

                        const folderPath =
                            key === 'lich'
                                ? 'WeakAuras_LK'
                                : key === 'cata'
                                ? 'WeakAuras_Cata'
                                : 'WeakAuras_Panda'

                        const jsonData = await fetchWeakAurasWithContent(urls[key], folderPath)

                        weakAurasCache[key] = jsonData

                        return jsonData
                    })
                )

                setData({
                    lich: lkData,
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

export default useWeakAurasData
