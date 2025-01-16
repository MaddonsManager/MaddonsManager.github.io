import { Autocomplete, AutocompleteItem } from "@heroui/react"
interface SelectVersionProps {
    version: string | null
    setVersion: (version: string | null) => void
    valueType: string[]
}

const SelectVersion = ({ version, setVersion, valueType }: SelectVersionProps) => {
    return (
        <Autocomplete
            label="Select Version"
            selectedKey={version}
            onSelectionChange={(key) => setVersion(key as string)}
            defaultItems={valueType.map((type) => ({ key: type, name: type }))}
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
            placeholder="Select wow version"
            popoverProps={{
                offset: 10,
                classNames: {
                    base: 'rounded-large',
                    content:
                        'p-1 border-small border-default-100 bg-background mt-2 text-default-900'
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

export default SelectVersion
