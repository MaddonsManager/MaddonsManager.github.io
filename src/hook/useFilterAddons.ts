import { useState, useMemo } from 'react'

const useFilterAddons = (data) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [version, setVersion] = useState(null)
    const [selectedType, setSelectedType] = useState('')
    const [isSelectAddon, setIsSelectAddon] = useState(null)

    const combinedData = useMemo(() => {
        if (!data) return []
        const allData = [...data.LichKing, ...data.Cataclysm, ...data.Pandaria]
        if (version === null) return allData
        return data[version] || []
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

    const handleDownload = async (githubRepo) => {
        const mainUrl = `${githubRepo}/archive/refs/heads/main.zip`
        window.open(mainUrl)
    }

    const handleOpenDetails = (addon) => {
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
        addonTypes,
        handleDownload,
        handleOpenDetails,
        isSelectAddon
    }
}

export default useFilterAddons
