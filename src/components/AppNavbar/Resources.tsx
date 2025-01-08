import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    NavbarContent,
    NavbarItem,
    Link
} from '@nextui-org/react'
import { CircleChevronDownIcon } from '@/assets/Icons'

export default function Resources({ items }: { items: { label: string; href: string }[] }) {
    return (
        <NavbarContent className="hidden sm:flex" justify="center">
            <Dropdown className="bg-inputs mt-3">
                <NavbarItem>
                    <DropdownTrigger>
                        <Link
                            showAnchorIcon
                            href="#"
                            color="foreground"
                            anchorIcon={<CircleChevronDownIcon className="w-4 h-4 mr-0" />}
                        >
                            Addons
                        </Link>
                    </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu aria-label="Addons" className="w-auto">
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
