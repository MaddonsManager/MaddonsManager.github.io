import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAddonsData from '@/hook/useAddonsData'

const DownloadAddon = () => {
    const { addonName } = useParams()
    const { data } = useAddonsData()
    const [addon, setAddon] = useState(null)

    useEffect(() => {
        if (data) {
            const allAddons = Object.values(data).flat()
            const foundAddon = allAddons.find((addon) => addon.name === addonName)
            setAddon(foundAddon)
        }
    }, [addonName, data])

    useEffect(() => {
        if (addon) {
            const downloadUrl = addon.githubRepo + '/archive/refs/heads/main.zip'
            console.log('Preparando para descargar desde:', downloadUrl)

            // Crear un enlace invisible y simular un clic para iniciar la descarga
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = `${addonName}.zip` // Nombre del archivo descargado
            link.click()
        }
    }, [addon])

    if (!addon) {
        return <p>El addon "{addonName}" no fue encontrado.</p>
    }

    return <p>Redirigiendo para descargar {addonName}...</p>
}

export default DownloadAddon
