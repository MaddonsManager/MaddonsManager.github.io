import { useState, useEffect } from 'react'

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
                const [lichResponse, cataResponse, pandaResponse] = await Promise.all([
                    fetch(urls.lich).then((res) => {
                        if (!res.ok) throw new Error(`Error fetching LK: ${res.statusText}`)
                        return res.json()
                    }),
                    fetch(urls.cata).then((res) => {
                        if (!res.ok) throw new Error(`Error fetching Cata: ${res.statusText}`)
                        return res.json()
                    }),
                    fetch(urls.panda).then((res) => {
                        if (!res.ok) throw new Error(`Error fetching Panda: ${res.statusText}`)
                        return res.json()
                    })
                ])

                setData({
                    lich: lichResponse,
                    cata: cataResponse,
                    panda: pandaResponse
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
