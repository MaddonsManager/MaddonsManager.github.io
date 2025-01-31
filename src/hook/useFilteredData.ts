import { StringItems } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const useFilteredData = (data: StringItems[], onOpen: () => void) => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null)
    const [version, setVersion] = useState<string | null>(null)
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [selectedItem, setSelectedItem] = useState<StringItems | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const searchParamValue = searchParams.get('s')

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

    const handleCopyToClipboard = (item: StringItems, content: string) => {
        navigator.clipboard.writeText(content)
        toast.success(`Copied ${item.title} to clipboard`)
    }

    const handleOpenDetails = (item: StringItems) => {
        setSelectedItem(item)
        onOpen()
    }

    useEffect(() => {
        setSearchTerm(searchParamValue)
    }, [searchParamValue, setSearchTerm])

    const handleSearchChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm)
        if (newSearchTerm) {
            setSearchParams({ s: newSearchTerm })
        } else {
            searchParams.delete('s')
            setSearchParams(searchParams)
        }
    }

    return {
        searchTerm,
        version,
        setVersion,
        selectedType,
        setSelectedType,
        uniqueExpansions,
        dataTypes,
        filteredData,
        handleCopyToClipboard,
        handleOpenDetails,
        selectedItem,
        handleSearchChange
    }
}

export default useFilteredData
