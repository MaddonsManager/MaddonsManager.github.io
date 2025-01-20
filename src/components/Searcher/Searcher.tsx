import { Autocomplete, AutocompleteItem } from '@heroui/react'
import { SearchIcon } from '@/assets/Icons'

interface SearcherProps {
    searchTerm: string | null
    setSearchTerm: (key: string) => void
    valueName: string[]
}

const SearchAddon = ({ searchTerm, setSearchTerm, valueName }: SearcherProps) => {
    return (
        <Autocomplete
            label="Search by Name"
            isVirtualized
            selectedKey={searchTerm}
            onSelectionChange={(key) => setSearchTerm(key as string)}
            defaultItems={valueName.map((title) => ({ key: title, title: title }))}
            startContent={<SearchIcon className="w-4 h-4" />}
            size="md"
            className="w-full font-bold text-default-900"
            variant="underlined"
            color="primary"
            listboxProps={{
                hideSelectedIcon: true,
                itemClasses: {
                    base: [
                        'rounded-medium',
                        'text-default-500',
                        'transition-opacity',
                        'data-[hover=true]:text-foreground',
                        'dark:data-[hover=true]:bg-primary-50',
                        'data-[pressed=true]:opacity-70',
                        'data-[hover=true]:bg-primary-200',
                        'data-[selectable=true]:focus:bg-primary-100',
                        'data-[focus-visible=true]:ring-primary-500'
                    ]
                }
            }}
            placeholder="Enter a name"
            popoverProps={{
                offset: 10,
                classNames: {
                    base: 'rounded-large',
                    content: 'p-1 border-small border-default-100 bg-background mt-2'
                }
            }}
        >
            {(item) => (
                <AutocompleteItem key={item.key} textValue={item.title}>
                    {item.title}
                </AutocompleteItem>
            )}
        </Autocomplete>
    )
}

export default SearchAddon
