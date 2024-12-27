import { useState, useMemo } from 'react'

const useFilteredData = (data) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [version, setVersion] = useState(null)
    const [selectedType, setSelectedType] = useState('')

    const uniqueExpansions = useMemo(() => {
        if (!data || data.length === 0) return []
        return Array.from(new Set(data.flatMap((item) => item.expansion)))
    }, [data])

    const dataTypes = useMemo(() => {
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

    return {
        searchTerm,
        setSearchTerm,
        version,
        setVersion,
        selectedType,
        setSelectedType,
        uniqueExpansions,
        dataTypes,
        filteredData
    }
}

export default useFilteredData
