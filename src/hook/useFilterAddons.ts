import { AddonsData, AddonsDataState } from '@/types'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const useFilterAddons = (data: AddonsDataState[], onOpen: () => void) => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null)
    const [version, setVersion] = useState<string | null>(null)
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [isSelectAddon, setIsSelectAddon] = useState<AddonsData | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const searchParamValue = searchParams.get('s')

    const combinedData = useMemo(() => {
        if (!data || data.length === 0) return []
        return Array.from(new Set(data.flatMap((item) => item.expansion)))
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

    const addonTypes = useMemo(() => {
        return Array.from(new Set(filteredData.flatMap((item) => item.tags)))
    }, [filteredData])

    const handleOpenDetails = (addon: AddonsData) => {
        setIsSelectAddon(addon)
        onOpen()
    }

    const handleSharedAddon = (addon: string) => {
        const link = `${window.location.origin}/#/download/${addon}`
        navigator.clipboard.writeText(link)
        toast.success(`Copied ${addon} to clipboard`)
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
        addonTypes,
        filteredData,
        combinedData,
        handleOpenDetails,
        isSelectAddon,
        handleSharedAddon,
        handleSearchChange
    }
}

export default useFilterAddons
