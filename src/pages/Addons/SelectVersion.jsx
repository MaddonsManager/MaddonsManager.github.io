import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

const SelectVersion = ({ version, setVersion }) => {
    return (
        <Autocomplete
            label="Select Version"
            selectedKey={version}
            onSelectionChange={(e) => setVersion(e)}
            size="md"
            className="w-full font-bold"
            variant="underlined"
            color="primary"
        >
            <AutocompleteItem key="lich">Lich King</AutocompleteItem>
            <AutocompleteItem key="cata">Cataclysm</AutocompleteItem>
            <AutocompleteItem key="panda">Pandaria</AutocompleteItem>
        </Autocomplete>
    )
}

export default SelectVersion
