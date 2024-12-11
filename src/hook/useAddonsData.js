import { useState, useEffect } from 'react'

const useAddonsData = (version) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Mapear las URLs a las versiones
    const urls = {
        lich: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/LK/lichking.json',
        cata: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/Cata/cataclysm.json',
        panda: 'https://raw.githubusercontent.com/PentSec/wowAddonsAPI/main/Panda/pandaria.json'
    }

    useEffect(() => {
        // Resetear estados al cambiar de versión
        setData(null)
        setIsLoading(true)
        setError(null)

        // Validar si la versión existe
        const url = urls[version]
        if (!url) {
            setError('Versión inválida.')
            setIsLoading(false)
            return
        }

        // Obtener los datos desde la URL
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error al obtener los datos: ${response.statusText}`)
                }
                return response.json()
            })
            .then((jsonData) => {
                setData(jsonData)
                setIsLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setIsLoading(false)
            })
        console.log(`useAddonsData`, data)
    }, [version])

    return { data, isLoading, error }
}

export default useAddonsData
