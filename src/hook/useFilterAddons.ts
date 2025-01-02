import { useState, useMemo } from 'react'
import { AddonsData, AddonsDataState } from '@/types'

const useFilterAddons = (data: AddonsDataState | null, onOpen: (isOpen: boolean) => void) => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null)
    const [version, setVersion] = useState<string | null>(null)
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [isSelectAddon, setIsSelectAddon] = useState<AddonsData | null>(null)

    const combinedData = useMemo(() => {
        if (!data) return []
        const allData = [...data.LichKing, ...data.Cataclysm, ...data.Pandaria]
        return version === null ? allData : data[version] || []
    }, [data, version])

    const addonTypes = useMemo(() => {
        return combinedData && combinedData.length > 0
            ? Array.from(new Set(combinedData.map((addon) => addon.addonType)))
            : []
    }, [combinedData])

    const filteredData = useMemo(() => {
        return (
            combinedData?.filter((addon) => {
                const matchesSearch = searchTerm
                    ? addon.name.toLowerCase().includes(searchTerm.toLowerCase())
                    : true
                const matchesType = selectedType ? addon.addonType === selectedType : true
                return matchesSearch && matchesType
            }) || []
        )
    }, [combinedData, searchTerm, selectedType])

    const handleDownload = async (githubRepo: string) => {
        const mainUrl = `${githubRepo}/archive/refs/heads/main.zip`
        window.open(mainUrl)
    }

    const handleOpenDetails = (addon: AddonsData) => {
        setIsSelectAddon(addon)
        onOpen(true)
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
        handleDownload,
        handleOpenDetails,
        isSelectAddon
    }
}

export default useFilterAddons
