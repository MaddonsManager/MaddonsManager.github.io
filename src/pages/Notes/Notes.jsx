import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReleaseNotes from './ReleaseNotes'
import { title, subtitle } from '@/components'
import { releaseNotes } from '@/utils/releaseNotes'
import { Link } from '@nextui-org/react'

function Notes() {
    const location = useLocation()

    useEffect(() => {
        const version = location.hash.replace('#release-note-', '')
        if (version) {
            const element = document.getElementById(`release-note-${version}`)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [location])

    return (
        <section>
            <div className="justify-center inline-block max-w-4xl text-start">
                <h1 className={title({ color: 'blue', size: 'lg' })}>Release Notes</h1>
                <p className={subtitle()}>
                    Keep your Maddons Manager fresh with the newest updates! Since the{' '}
                    <Link
                        size="lg"
                        href={`/Notes#release-note-${
                            releaseNotes[releaseNotes.length - 1].version
                        }`}
                    >
                        first release
                    </Link>{' '}
                    till{' '}
                    <Link size="lg" href={`/Notes#release-note-${releaseNotes[0].version}`}>
                        {releaseNotes[0].version}
                    </Link>
                    , We are committed to continuous improvement in Maddons Manager. Thank you for
                    your constructive feedback! ❤️
                </p>
                <ReleaseNotes releaseNotes={releaseNotes} />
            </div>
        </section>
    )
}

export default Notes
