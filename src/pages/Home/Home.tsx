import { DownloadIcon, GithubIcon } from '@/assets/Icons'
import { siteConfig } from '@/config/dirConfit'
import { normal, subtitle, title } from '@/utils/primitives'
import { button as buttonStyles, Card, CardBody, Image, Link } from '@heroui/react'
import { contentHome } from './contentHome'
import PREVIEW_IMG from '/preview.webp'

function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4">
            <div className="justify-center text-center">
                <h1 className={title({ color: 'blue', size: 'lg' })}>
                    {contentHome.maddonsTitleWebPage}
                </h1>
                <div className={subtitle()}>
                    <p>{contentHome.maddonsDescriptionWebpage}</p>
                    <strong>
                        <img src="/vanilla.webp" alt="Vanilla" className="inline w-12 h-6 m-2" />
                        <span className={normal({ color: 'brown' })}>Vanilla 1.12</span>
                    </strong>
                    ,{' '}
                    <strong>
                        <img
                            src="/tbc.webp"
                            alt="The burning crusade"
                            className="inline w-12 h-6 m-2"
                        />
                        <span className={normal({ color: 'darkgreen' })}>
                            Burning Crusade 2.4.3
                        </span>
                    </strong>
                    ,{' '}
                    <strong>
                        <img src="/lk.webp" alt="Lichking" className="inline w-12 h-6 m-2" />
                        <span className={normal({ color: 'blue' })}>Lichking 3.3.5</span>
                    </strong>
                    ,{' '}
                    <strong>
                        <img src="/cata.webp" alt="Cataclysm" className="inline w-12 h-6 m-2" />
                        <span className={normal({ color: 'yellow' })}>Cataclysm 4.3.4</span>
                    </strong>
                    ,{' '}
                    <strong>
                        <img src="/panda.webp" alt="Pandarian" className="inline w-12 h-6 m-2" />
                        <span className={normal({ color: 'green' })}>Pandarian 5.4.8</span>
                    </strong>
                    .
                </div>
            </div>
            <div className="lg:m-5 animate-levitate aspect-video">
                <Image isZoomed isBlurred width={800} src={PREVIEW_IMG} alt="Maddons Preview" />
            </div>
            <div className="flex items-center justify-center gap-3">
                <Link
                    className={buttonStyles({
                        color: 'primary',
                        radius: 'full',
                        variant: 'shadow'
                    })}
                    href="/Addons"
                    color="primary"
                    size="sm"
                >
                    <DownloadIcon size={20} width={20} height={20} />
                    Download
                </Link>
                <Link
                    isExternal
                    className={buttonStyles({ variant: 'bordered', radius: 'full' })}
                    href={siteConfig.links.github}
                    title="Last release from github page."
                    color="primary"
                    size="sm"
                >
                    <GithubIcon size={20} width={20} height={20} />
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
                        <CardBody className="w-full h-full">
                            <div>
                                <h3 className="z-10 flex items-center justify-start w-full gap-2 p-3 pb-0 text-lg subpixel-antialiased font-semibold shrink-0 rounded-t-large">
                                    <div className="flex items-center justify-center p-2 rounded-full text-primary-400 bg-primary-100/80">
                                        {card.icon}
                                    </div>{' '}
                                    {card.title}
                                </h3>
                                <div className="relative flex flex-col flex-auto w-full h-auto p-3 overflow-y-auto subpixel-antialiased text-left break-words place-content-inherit align-items-inherit">
                                    <p className="text-base font-normal prose text-default-500">
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
