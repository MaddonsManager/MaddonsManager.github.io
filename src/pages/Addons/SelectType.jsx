import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

const SelectType = ({ selectedType, setSelectedType, addonTypes }) => {
    return (
        <Autocomplete
            label="Filtrar por tipo"
            isVirtualized
            selectedKey={selectedType}
            onSelectionChange={(key) => setSelectedType(key)}
            defaultItems={addonTypes.map((type) => ({ key: type, name: type }))}
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

export default SelectType
