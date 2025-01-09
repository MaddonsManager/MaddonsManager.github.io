import { useLocation } from 'react-router-dom'
import { title, subtitle } from '@/utils/primitives'
import { siteConfig } from '@/config/dirConfit'

interface HeaderProps {
    data: any[]
}

const Header = ({ data }: HeaderProps) => {
    const { pathname } = useLocation()

    const getPageLabel = () => {
        const allNavItems = [...siteConfig.navItems, ...siteConfig.navItemsAccord]
        return allNavItems.find((item) => item.href.toLowerCase() === pathname.toLowerCase())?.label
    }

    const pageTitle = getPageLabel()

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
