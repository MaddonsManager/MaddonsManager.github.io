import { useState, useEffect } from 'react'

const weakAurasCache = {
    weakauras: null
}

const useWeakAurasData = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const jsonUrl =
        'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras/WeakAuras.json'

    const fetchWeakAurasWithContent = async (url) => {
        try {
            const response = await fetch(url)
            if (!response.ok) throw new Error(`Error fetching JSON: ${response.statusText}`)

            const jsonData = await response.json()

            const dataWithContent = await Promise.all(
                jsonData.map(async (item) => {
                    try {
                        const txtResponse = await fetch(
                            `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras/${item.uuid}/${item.uuid}.txt`
                        )
                        const logo = `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras/${item.uuid}/${item.logo}`
                        const markdown = `https://raw.githubusercontent.com/PentSec/wowAddonsAPI/develop/WeakAuras/${item.uuid}/${item.uuid}.md`

                        const content = txtResponse.ok ? await txtResponse.text() : null
                        return { ...item, content, logo, markdown }
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
                if (weakAurasCache.weakauras) {
                    setData(weakAurasCache.weakauras)
                } else {
                    const weakaurasData = await fetchWeakAurasWithContent(jsonUrl)
                    weakAurasCache.weakauras = weakaurasData
                    setData(weakaurasData)
                    console.log(data)
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

export default useWeakAurasData
