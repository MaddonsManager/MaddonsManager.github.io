import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { SearchIcon } from '@/components'

const SearchAddon = ({ searchTerm, setSearchTerm, valueName }) => {
    return (
        <Autocomplete
            label="Search by Name"
            isVirtualized
            selectedKey={searchTerm}
            onSelectionChange={(e) => setSearchTerm(e)}
            defaultItems={valueName.map((name) => ({ key: name, name: name }))}
            startContent={<SearchIcon size={18} />}
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
            placeholder="Enter addon name"
            popoverProps={{
                offset: 10,
                classNames: {
                    base: 'rounded-large',
                    content: 'p-1 border-small border-default-100 bg-background mt-2'
                }
            }}
        >
            {(item) => (
                <AutocompleteItem key={item.key} textValue={item.name}>
                    {item.name}
                </AutocompleteItem>
            )}
        </Autocomplete>
    )
}

export default SearchAddon
