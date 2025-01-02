import { Autocomplete, AutocompleteItem } from '@nextui-org/react'

interface SelectNotesProps {
    selectedNotes: 'app' | 'web'
    setSelectedNotes: (notes: 'app' | 'web') => void
}

const SelectNotes = ({ selectedNotes, setSelectedNotes }: SelectNotesProps) => {
    return (
        <div className="max-w-fit flex justify-end mb-4 mr-3 flex-shrink gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md">
            <Autocomplete
                label="Notes"
                isVirtualized
                selectedKey={selectedNotes}
                onSelectionChange={(key: React.Key | null) =>
                    setSelectedNotes(key as 'app' | 'web')
                }
                size="md"
                className="w-auto max-w-fit font-bold text-default-900"
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
                placeholder="Select Notes"
                popoverProps={{
                    offset: 10,
                    classNames: {
                        base: 'rounded-large',
                        content: 'p-1 border-small border-default-100 bg-background mt-2 max-h-20'
                    }
                }}
            >
                <AutocompleteItem key="web">Web Notes</AutocompleteItem>
                <AutocompleteItem key="app">App Notes</AutocompleteItem>
            </Autocomplete>
        </div>
    )
}

export default SelectNotes
