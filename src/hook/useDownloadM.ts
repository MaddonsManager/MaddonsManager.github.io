import { useState, useEffect } from 'react'
const API_URL: string = 'https://api.github.com/repos/maddon/maddon-manager/releases/latest'
interface UseDownloadMReturn {
    downloadUrl: string
    downloadFile: (url: string) => void
}

export default function useDownloadM(): UseDownloadMReturn {
    const [downloadUrl, setDownloadUrl] = useState('')

    useEffect(() => {
        async function fetchLatestRelease() {
            try {
                const response = await fetch(API_URL)
                const data = await response.json()
                const asset = data.assets.find((a: any) => a.name.endsWith('.exe'))
                setDownloadUrl(asset ? asset.browser_download_url : '#')
            } catch (error) {
                console.error('Error fetching the latest release:', error)
                setDownloadUrl('#')
            }
        }

        fetchLatestRelease()
    }, [])

    const downloadFile = (url: string): void => {
        if (url && url !== '#') {
            const a = document.createElement('a')
            a.href = url
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        } else {
            console.error('Invalid download URL')
        }
    }

    return { downloadUrl, downloadFile }
}
