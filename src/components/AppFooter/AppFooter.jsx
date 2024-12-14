import { Link } from '@nextui-org/react'
import { siteConfig } from '@/config/dirConfit'

export default function AppFooter() {
    return (
        <footer className="bottom-0 left-0 right-0 p-2 dark:bg-black/80 text-default-500">
            <div className="mt-8 text-center">
                <h2 className="text-xl font-bold">Need Help?</h2>
                <p className="mt-2">
                    If you encounter any bugs or have questions, feel free to open an{' '}
                    <Link isExternal href={siteConfig.links.issues} showAnchorIcon>
                        issue
                    </Link>{' '}
                    or participate in a{' '}
                    <Link isExternal href={siteConfig.links.discussions} showAnchorIcon>
                        discussion
                    </Link>
                </p>
            </div>

            <div className="mt-8 text-center">
                <p>If you think this app is useful for you, please give it a star on GitHub! 🌟</p>
            </div>
            <div className="flex items-center justify-between w-full gap-2 p-4 px-4 py-3">
                <Link
                    isExternal
                    className="flex items-center gap-1 text-current"
                    href={siteConfig.links.personalGithub}
                    title="Maddons webpage"
                >
                    <span className="text-default-600">
                        © 2024 All rights reserved. Designed by
                    </span>
                    <p className="text-primary">PentSec</p>
                </Link>
            </div>
        </footer>
    )
}
