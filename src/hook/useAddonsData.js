import { useState, useEffect } from 'react'

// Caché en memoria
const addonsCache = {
    lich: null,
    cata: null,
    panda: null
}

const useAddonsData = () => {
    const [data, setData] = useState({
        lich: [],
        cata: [],
        panda: []
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const urls = {
        lich: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/LK/lichking.json',
        cata: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/Cata/cataclysm.json',
        panda: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/Panda/pandaria.json'
    }

    useEffect(() => {
        setIsLoading(true)
        setError(null)

        const fetchData = async () => {
            try {
                const [lichData, cataData, pandaData] = await Promise.all(
                    ['lich', 'cata', 'panda'].map(async (key) => {
                        // Revisar si ya está en caché
                        if (addonsCache[key]) return addonsCache[key]

                        // Si no está en caché, hacer fetch
                        const response = await fetch(urls[key])
                        if (!response.ok)
                            throw new Error(`Error fetching ${key}: ${response.statusText}`)

                        const jsonData = await response.json()

                        // Guardar en caché
                        addonsCache[key] = jsonData

                        return jsonData
                    })
                )

                setData({
                    lich: lichData,
                    cata: cataData,
                    panda: pandaData
                })
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return { data, isLoading, error }
}

export default useAddonsData
