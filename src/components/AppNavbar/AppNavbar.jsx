import { useState } from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Image,
    Chip
} from '@nextui-org/react'

import { DiscordIcon, GithubIcon, TwitterIcon } from '@/components/Icons'
import { useLocation } from 'react-router-dom'
import MADDONS_LOGO from '@/assets/images/logo.svg'
import { siteConfig } from '@/config/dirConfit'

export default function AppNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const location = useLocation()

    return (
        <Navbar
            size="sm"
            onMenuOpenChange={setIsMenuOpen}
            className=" w-auto min-w-[1080px] h-full rounded-full border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md"
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    className="sm:hidden"
                />
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <Link
                        color="foreground"
                        className="flex items-center justify-start"
                        href="/home"
                    >
                        <Image
                            src={MADDONS_LOGO}
                            alt="Maddons logo"
                            className="w-auto h-8 object-contain"
                        />
                        <p className="ml-0 mr-1 font-bold uppercase text-inherit">addon Manager</p>
                        <Chip color="primary" variant="flat" size="sm">
                            on Dev👩🏽‍💻
                        </Chip>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden gap-4 sm:flex" justify="center">
                {siteConfig.navItems.map((item, index) => (
                    <NavbarItem key={`${item.href}-${index}`}>
                        <Link
                            color={location.pathname === item.href ? 'primary' : 'foreground'}
                            href={item.href}
                            className={`${
                                location.pathname === item.href ? 'text-primary font-semibold' : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className=" gap-2 flex">
                    <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
                        <DiscordIcon className="text-default-500" />
                    </Link>
                    <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                        <TwitterIcon className="text-default-500" />
                    </Link>
                    <Link isExternal aria-label="Github" href={siteConfig.links.github}>
                        <GithubIcon className="text-default-500" />
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className="z-30 px-6 fixed flex inset-x-0 bottom-0 w-screen flex-col gap-2 overflow-y-auto top-[calc(var(--navbar-height)/2)] mx-auto mt-16 max-h-[40vh] max-w-[80vw] rounded-large border-small border-default-200/20 bg-background/60 py-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
                {siteConfig.navMenuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={location.pathname === item.href ? 'primary' : 'foreground'}
                            className={`${
                                location.pathname === item.href ? 'text-primary font-medium' : ''
                            }`}
                            href={item.href}
                            size="lg"
                        >
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}
