import { useLocation } from 'react-router-dom'
import { title, subtitle } from '@/utils/primitives'
import { siteConfig } from '@/config/dirConfit'

interface HeaderProps {
    data: any[]
}

const Header = ({ data }: HeaderProps) => {
    const location = useLocation()

    const currentNavItem = siteConfig.navItems.find(
        (item) => item.href.toLowerCase() === location.pathname.toLowerCase()
    )

    const pageTitle = currentNavItem ? currentNavItem.label : 'Page'

    return (
        <>
            <h1 className={title({ color: 'blue', size: 'lg' })}>
                {data.length > 0
                    ? `${data.length} Private ${pageTitle}`
                    : `No ${pageTitle} available`}
            </h1>
            <p className={subtitle()}>{siteConfig.description}</p>
        </>
    )
}

export default Header
