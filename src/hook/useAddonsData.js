import { useState, useEffect } from 'react'

const addonsCache = {
    LichKing: null,
    Cataclysm: null,
    Pandaria: null
}

const useAddonsData = () => {
    const [data, setData] = useState({
        LichKing: [],
        Cataclysm: [],
        Pandaria: []
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const urls = {
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
                            // Retorna los datos del caché si están disponibles
                            return { key, data: addonsCache[key] }
                        }

                        // Si no está en el caché, realiza la solicitud
                        const response = await fetch(urls[key])
                        if (!response.ok)
                            throw new Error(`Error fetching ${key}: ${response.statusText}`)

                        const jsonData = await response.json()

                        // Guarda los datos en el caché
                        addonsCache[key] = jsonData
                        return { key, data: jsonData }
                    })
                )

                // Combina los resultados en el estado
                const newData = result.reduce((acc, { key, data }) => {
                    acc[key] = data
                    return acc
                }, {})

                setData(newData)
                console.log(`newData`, newData)
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
