import { CircleChevronDownIcon } from '@/assets/Icons'
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    NavbarContent,
    NavbarItem
} from '@heroui/react'

export default function Macros({ items }: { items: { label: string; href: string }[] }) {
    return (
        <NavbarContent className="hidden sm:flex" justify="center">
            <Dropdown className="bg-inputs mt-3">
                <NavbarItem>
                    <DropdownTrigger>
                        <Link
                            showAnchorIcon
                            href="#"
                            color="foreground"
                            anchorIcon={<CircleChevronDownIcon className="w-4 h-4 ml-1" />}
                        >
                            Macros
                        </Link>
                    </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu aria-label="Macros" className="w-auto">
                    {items.map((item, index) => (
                        <DropdownItem
                            key={index}
                            description={`${item.label} variety `}
                            href={item.href}
                        >
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
    )
}
