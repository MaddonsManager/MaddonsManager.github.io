import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ReleaseNotes from './ReleaseNotes'
import { title, subtitle } from '@/utils/primitives'
import { appReleaseNotes } from '@/utils/appReleaseNotes'
import { webReleaseNotes } from '@/utils/webReleaseNotes'
import { SelectNotes } from '@/components'
import { Link } from '@nextui-org/react'

function Notes() {
    const location = useLocation()
    const [selectedNotes, setSelectedNotes] = useState<'app' | 'web'>('web')

    useEffect(() => {
        const version = location.hash.replace('#release-note-', '')
        if (version) {
            const element = document.getElementById(`release-note-${version}`)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [location])

    const currentReleaseNotes = selectedNotes === 'app' ? appReleaseNotes : webReleaseNotes

    return (
        <section>
            <div className="justify-center inline-block max-w-4xl text-start">
                <h1 className={title({ color: 'blue', size: 'lg' })}>Release Notes</h1>
                <p className={subtitle()}>
                    Keep your Maddons Manager fresh with the newest updates! Since the{' '}
                    <Link
                        size="lg"
                        href={`/Notes#release-note-${
                            currentReleaseNotes[currentReleaseNotes.length - 1].version
                        }`}
                    >
                        first release
                    </Link>{' '}
                    till{' '}
                    <Link size="lg" href={`/Notes#release-note-${currentReleaseNotes[0].version}`}>
                        {currentReleaseNotes[0].version}
                    </Link>
                    , We are committed to continuous improvement in Maddons Manager. Thank you for
                    your constructive feedback! ❤️
                </p>
                <SelectNotes selectedNotes={selectedNotes} setSelectedNotes={setSelectedNotes} />
                <ReleaseNotes
                    appReleaseNotes={appReleaseNotes}
                    webReleaseNotes={webReleaseNotes}
                    selectedNotes={selectedNotes}
                />
            </div>
        </section>
    )
}

export default Notes
