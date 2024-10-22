import React, { useState } from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link
} from '@nextui-org/react'

import { DiscordIcon, GithubIcon, TwitterIcon } from '../Icons'
import { useLocation } from 'react-router-dom'
import MADDONS_LOGO from '../../assets/images/logo.svg'
import { siteConfig } from '../../config/dirConfit'

const AcmeLogo = () => <img src={MADDONS_LOGO} alt="Maddons logo" className="w-auto h-8" />

export default function AppNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const location = useLocation()

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
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
                        <AcmeLogo />
                        <p className="ml-0 font-bold uppercase text-inherit">addon Manager</p>
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
                                location.pathname === item.href ? 'text-primary font-medium' : ''
                            }`}
                        >
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden gap-2 lg:flex">
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
            <NavbarMenu>
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
