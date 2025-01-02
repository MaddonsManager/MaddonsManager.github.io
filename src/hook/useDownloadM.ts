import { useState, useEffect } from 'react'
const API_URL = 'https://api.github.com/repos/pentsec/maddonsmanager/releases/latest'

export default function useDownloadM() {
    const [downloadUrl, setDownloadUrl] = useState('')

    useEffect(() => {
        async function fetchLatestRelease() {
            try {
                const response = await fetch(API_URL)
                const data = await response.json()
                const asset = data.assets.find((a) => a.name.endsWith('.exe'))
                setDownloadUrl(asset ? asset.browser_download_url : '#')
            } catch (error) {
                console.error('Error fetching the latest release:', error)
                setDownloadUrl('#')
            }
        }

        fetchLatestRelease()
    }, [])

    const downloadFile = (url) => {
        if (url && url !== '#') {
            const a = document.createElement('a')
            a.href = url
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        } else {
            console.log('Invalid download URL')
        }
    }

    return { downloadUrl, downloadFile }
}
