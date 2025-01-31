import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAddonsContext } from '@/context/AddonsContext'
import { Snippet, Link } from '@heroui/react'
import { AddonsData } from '@/types'

const DownloadAddon = () => {
    const { data } = useAddonsContext()
    const { addonName } = useParams<{ addonName: string }>()
    const [addon, setAddon] = useState<AddonsData | null>(null)

    useEffect(() => {
        if (data) {
            const allAddons = Object.values(data).flat()
            const foundAddon = allAddons.find((addon) => addon.title === addonName)

            if (foundAddon) {
                setAddon(foundAddon)
                const downloadUrl = `${foundAddon.zip}`
                window.location.href = downloadUrl
            }
        }
    }, [data, addonName])

    if (!addon) return <p>Loading.. or This addon is not available for download.</p>

    return (
        <div className="flex flex-shrink gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2">
            <span>
                Downloading Addon {addonName}... Click this if you are not redirected.{' '}
                <Link href={addon.zip} isExternal showAnchorIcon>
                    Click here
                </Link>{' '}
                or copy this link <Snippet>{addon.zip}</Snippet>
            </span>
        </div>
    )
}

export default DownloadAddon
