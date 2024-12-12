import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { SearchIcon } from '@/components'

const SearchAddon = ({ searchTerm, setSearchTerm, addonNames }) => {
    return (
        <Autocomplete
            label="Search Addons by Name"
            isVirtualized
            selectedKey={searchTerm}
            onSelectionChange={(e) => setSearchTerm(e)}
            defaultItems={addonNames.map((name) => ({ key: name, name: name }))}
            startContent={<SearchIcon size={18} />}
            size="md"
            className="w-full font-bold"
            variant="underlined"
            color="primary"
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
