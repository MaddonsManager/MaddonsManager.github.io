import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAddonsData from '@/hook/useAddonsData'
import { Snippet, Link } from '@nextui-org/react'
import { AddonsData } from '@/types'

const DownloadAddon = () => {
    const { data } = useAddonsData()
    const { addonName } = useParams<{ addonName: string }>()
    const [addon, setAddon] = useState<AddonsData | null>(null)

    useEffect(() => {
        if (data) {
            const allAddons = Object.values(data).flat()
            const foundAddon = allAddons.find((addon) => addon.name === addonName)

            if (foundAddon) {
                setAddon(foundAddon)
                const downloadUrl = `${foundAddon.githubRepo}/archive/refs/heads/main.zip`
                window.location.href = downloadUrl
            }
        }
    }, [data, addonName])

    if (!addon) return <p>Loading.. or This addon is not available for download.</p>

    return (
        <div className="flex flex-shrink gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2">
            <span>
                Downloading Addon {addonName}... Click this if you are not redirected.{' '}
                <Link href={addon.githubRepo} isExternal showAnchorIcon>
                    Click here
                </Link>{' '}
                or copy this link{' '}
                <Snippet>{`${addon.githubRepo}/archive/refs/heads/main.zip`}</Snippet>
            </span>
        </div>
    )
}

export default DownloadAddon
