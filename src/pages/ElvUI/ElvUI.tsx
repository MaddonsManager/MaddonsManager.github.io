import useElvUIData from '@/hook/useElvUIData'
import useFilteredData from '@/hook/useFilteredData'
import {
    Searcher,
    SelectType,
    SelectVersion,
    ProfilesDetails,
    ItemList,
    Header
} from '@/components'

import { Divider, Spinner, useDisclosure } from '@nextui-org/react'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import useInfiniteScrollLogic from '@/hook/useInfiniteScrollLogic'
import { StringItems } from '@/types'

const ElvUI = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { data, isLoading, error } = useElvUIData()
    const {
        searchTerm,
        setSearchTerm,
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
    } = useFilteredData(data as StringItems[], onOpen)
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
                    setSearchTerm={setSearchTerm}
                    valueName={data.map((item) => item.title)}
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
                    className="h-[calc(93vh-32px)] overflow-auto mb-4 p-4 shadow-sm"
                >
                    {isLoading && (
                        <div className="flex justify-center mt-4">
                            <Spinner>Loading ElvUI...</Spinner>
                        </div>
                    )}
                    {error && <p className="text-red-500">Error: {error}</p>}
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

export default ElvUI
