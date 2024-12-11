import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

const SelectType = ({ selectedType, setSelectedType, addonTypes }) => {
    return (
        <Autocomplete
            label="Filtrar por tipo"
            isVirtualized
            placeholder="Selecciona un tipo"
            selectedKey={selectedType}
            onSelectionChange={(key) => {
                setSelectedType(key)
            }}
            defaultItems={addonTypes.map((type) => ({ key: type, name: type }))}
            radius="sm"
            size="sm"
            className="w-full lg:w-36"
        >
            {(item) => (
                <AutocompleteItem key={item.key} value={item.key} textValue={item.name}>
                    {item.name}
                </AutocompleteItem>
            )}
        </Autocomplete>
    )
}

export default SelectType
