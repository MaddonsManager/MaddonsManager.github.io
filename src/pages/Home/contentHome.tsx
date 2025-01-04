import { SettingIcon, DeleteIcon, SearchIcon, FlameIcon } from '@/components/Icons'

export const contentHome = {
    maddonsTitleWebPage: 'Maddons Manager',
    maddonsDescriptionWebpage:
        'Effortlessly manage your World of Warcraft addons for Private servers with advanced search, easy configuration, and one-click removal.',
    cardTitles: [
        {
            title: 'Addons Manager',
            description:
                'The Addons Manager provides a streamlined way to install, update, and manage all your compatible World of Warcraft addons for classic versions like Lich King, Cataclysm, and Pandaria.',
            icon: <FlameIcon size={20} width={20} height={20} />
        },
        {
            title: 'Advanced Search',
            description:
                'Discover the perfect addon with our powerful Advanced Search feature. Quickly find the addons you need by filtering by game version, category, or specific functionality.',
            icon: <SearchIcon size={20} width={20} height={20} />
        },
        {
            title: 'Simple Configuration',
            description:
                'Experience a hassle-free setup with our intuitive Simple Configuration. Customize the app to your liking in seconds and ensure everything is ready to manage your WoW addons.',
            icon: <SettingIcon size={20} width={20} height={20} />
        },
        {
            title: 'Easy Removal',
            description:
                'Say goodbye to tedious addon removal. Our Easy Removal feature lets you uninstall any addon with a single click. No more hassle, just a few clicks and you’re done.',
            icon: <DeleteIcon size={20} width={20} height={20} />
        }
    ]
}
