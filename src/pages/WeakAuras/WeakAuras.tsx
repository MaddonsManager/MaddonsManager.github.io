import {
    Header,
    ItemList,
    ProfilesDetails,
    Searcher,
    SelectType,
    SelectVersion
} from '@/components'
import { useWeakAurasContext } from '@/context/WeakAurasContext'
import useFilteredData from '@/hook/useFilteredData'
import useInfiniteScrollLogic from '@/hook/useInfiniteScrollLogic'
import { Divider, Snippet, Spinner, useDisclosure } from '@heroui/react'
import { ScrollShadow } from '@heroui/scroll-shadow'

const WeakAuras = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { data = [], isPending, error } = useWeakAurasContext()
    const {
        searchTerm,
        handleSearchChange,
        version,
        setVersion,
        selectedType,
        setSelectedType,
        uniqueExpansions,
        dataTypes,
        filteredData,
        handleCopyToClipboard,
        handleOpenDetails,
        selectedItem
    } = useFilteredData(data, onOpen)
    const { itemToShow, loadRef, scrollerRef, hasMore } = useInfiniteScrollLogic(filteredData)

    return (
        <div className="layer">
            <Header data={data} />
            {isOpen && (
                <ProfilesDetails data={selectedItem} isOpen={isOpen} onOpenChange={onOpenChange} />
            )}
            <div className="bg-inputs">
                <Searcher
                    searchTerm={searchTerm}
                    setSearchTerm={handleSearchChange}
                    valueName={data?.map((item) => item.title)}
                />
                <Divider orientation="vertical" className="h-auto" />
                <SelectVersion
                    version={version}
                    setVersion={setVersion}
                    valueType={uniqueExpansions}
                />
                <Divider orientation="vertical" className="h-auto" />
                <SelectType
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    valueType={dataTypes}
                />
            </div>
            <div className="h-[calc(95vh-32px)] mx-auto mb-4">
                <ScrollShadow
                    ref={scrollerRef}
                    className="h-[calc(93vh-32px)] overflow-auto mb-4 p-2 shadow-sm"
                >
                    {isPending && (
                        <div className="flex justify-center mt-4">
                            <Spinner>Loading WeakAuras...</Spinner>
                        </div>
                    )}
                    {error && (
                        <Snippet symbol color="danger">
                            Error: {error}
                        </Snippet>
                    )}
                    {filteredData.length > 0 ? (
                        <ItemList
                            data={filteredData}
                            onOpenDetails={handleOpenDetails}
                            handleCopyToClipboard={handleCopyToClipboard}
                            itemToShow={itemToShow}
                        />
                    ) : null}
                    {hasMore && (
                        <div className="flex w-full justify-center mt-4">
                            <Spinner ref={loadRef} color="primary" />
                        </div>
                    )}
                </ScrollShadow>
            </div>
        </div>
    )
}

export default WeakAuras
