import { useState, useEffect } from 'react'
import { button as buttonStyles, Link, Image, Card, CardBody } from '@nextui-org/react'
import { title, subtitle, normal } from '../../components/primitives'
import { contentHome } from './contentHome'
import { DownloadIcon, GithubIcon } from '../../components/Icons'
import { siteConfig } from '../../config/dirConfit'
import PREVIEW_IMG from '/preview.webp'
import LK_IMG from '/lk.webp'
import CAT_IMG from '/cata.webp'
import PANDA_IMG from '/panda.webp'

function Home() {
    const [downloadUrl, setDownloadUrl] = useState('')

    useEffect(() => {
        async function fetchLatestRelease() {
            try {
                const response = await fetch(
                    'https://api.github.com/repos/pentsec/maddonsmanager/releases/latest'
                )
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

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="justify-center inline-block max-w-4xl text-center">
                <h1 className={title({ color: 'blue', size: 'lg' })}>
                    {contentHome.maddonsTitleWebPage}
                </h1>
                <p className={subtitle()}>
                    {contentHome.maddonsDescriptionWebpage}
                    <p></p>
                    <strong>
                        <img src={LK_IMG} alt="Lichking" className="inline w-12 h-6 m-2" />
                        <span className={normal({ color: 'blue' })}>Lichking 3.3.5</span>
                    </strong>
                    ,{' '}
                    <strong>
                        <img src={CAT_IMG} alt="Cataclysm" className="inline w-12 h-6 m-2" />
                        <span className={normal({ color: 'yellow' })}>Cataclysm 4.3.4</span>
                    </strong>
                    ,{' '}
                    <strong>
                        <img src={PANDA_IMG} alt="Pandarian" className="inline w-12 h-6 m-2" />
                        <span className={normal({ color: 'green' })}>Pandarian 5.4.8</span>
                    </strong>
                    .
                </p>
            </div>
            <div className="lg:m-5 animate-[levitate_13s_ease_infinite_1s_reverse]">
                <Image isZoomed isBlurred width={800} src={PREVIEW_IMG} alt="Maddons Preview" />
            </div>
            <div className="flex items-center justify-center gap-3">
                <Link
                    className={buttonStyles({
                        color: 'primary',
                        radius: 'full',
                        variant: 'shadow'
                    })}
                    onClick={() => window.open(downloadUrl, '_blank')}
                    underline
                    color="primary"
                    radius="full"
                    variant="shadow"
                    size="sm"
                >
                    <DownloadIcon size={20} />
                    Download it
                </Link>
                <Link
                    isExternal
                    className={buttonStyles({ variant: 'bordered', radius: 'full' })}
                    href={siteConfig.links.github}
                    underline
                    title="Last release from github page."
                    color="primary"
                    radius="full"
                    variant="shadow"
                    size="sm"
                >
                    <GithubIcon size={20} />
                    GitHub
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-4">
                {contentHome.cardTitles.map((card, index) => (
                    <Card
                        key={`${card.title}-${index}`}
                        isBlurred
                        className="bg-background/60 dark:bg-default-100/40 max-w-[300px]"
                        shadow="lg"
                    >
                        <CardBody className="w-full h-full " color="Primary">
                            <div>
                                <h3 className="z-10 flex items-center justify-start w-full gap-2 p-3 pb-0 text-lg subpixel-antialiased font-semibold shrink-0 rounded-t-large">
                                    <div className="flex items-center justify-center p-2 rounded-full text-primary-400 bg-primary-100/80">
                                        {card.icon}
                                    </div>{' '}
                                    {card.title}
                                </h3>
                                <div className="relative flex flex-col flex-auto w-full h-auto p-3 overflow-y-auto subpixel-antialiased text-left break-words place-content-inherit align-items-inherit">
                                    <p className="text-base font-normal text-default-500">
                                        {card.description}
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default Home
