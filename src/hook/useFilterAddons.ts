import { useState, useMemo } from 'react'
import { AddonsData, AddonsDataState } from '@/types'

const useFilterAddons = (data: AddonsDataState[], onOpen: () => void) => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null)
    const [version, setVersion] = useState<string | null>(null)
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [isSelectAddon, setIsSelectAddon] = useState<AddonsData | null>(null)

    const combinedData = useMemo(() => {
        if (!data || data.length === 0) return []
        return Array.from(new Set(data.flatMap((item) => item.expansion)))
    }, [data])

    const addonTypes = useMemo(() => {
        return Array.from(new Set(data.flatMap((item) => item.tags)))
    }, [data])

    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchesSearch = searchTerm
                ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
                : true
            const matchesType = selectedType ? item.tags.includes(selectedType) : true
            const matchesExpansion = version ? item.expansion.includes(version) : true
            return matchesSearch && matchesType && matchesExpansion
        })
    }, [data, searchTerm, selectedType, version])

    const handleOpenDetails = (addon: AddonsData) => {
        setIsSelectAddon(addon)
        onOpen()
    }

    return {
        searchTerm,
        setSearchTerm,
        version,
        setVersion,
        selectedType,
        setSelectedType,
        addonTypes,
        filteredData,
        combinedData,
        handleOpenDetails,
        isSelectAddon
    }
}

export default useFilterAddons
