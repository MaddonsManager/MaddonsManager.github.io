import React, { useState, useMemo } from 'react'
import useAddonsData from '@/hook/useAddonsData'
import {
    Card,
    CardBody,
    CardFooter,
    Button,
    Image,
    Tooltip,
    Spinner,
    useDisclosure,
    Divider
} from '@nextui-org/react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { AnimatePresence } from 'framer-motion'
import { DownloadIcon } from '@/utils/icons'
import { title, subtitle, Searcher, SelectType, SelectVersion } from '@/components'
import { siteConfig } from '@/config/dirConfit'
import AddonsDetails from './AddonsDetails'

const Addon = () => {
    const [version, setVersion] = useState(null)
    const { data, isLoading, error } = useAddonsData()
    const [itemToShow, setItemToShow] = useState(20)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [isSelectAddon, setIsSelectAddon] = useState(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

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

    const loadMore = () => {
        setItemToShow((prev) => prev + 10)
    }

    const hasMore = filteredData && filteredData.length > itemToShow

    const [loadRef, scrollerRef] = useInfiniteScroll({
        hasMore,
        onLoadMore: loadMore
    })

    return (
        <div className="justify-center inline-block max-w-4xl text-start">
            <h1 className={title({ color: 'blue', size: 'lg' })}>
                {combinedData.length > 0
                    ? `${combinedData.length} Private Addons`
                    : 'No Addons available in Maddons'}
            </h1>
            <p className={subtitle()}>{siteConfig.description}</p>
            {isSelectAddon && (
                <AddonsDetails addon={isSelectAddon} isOpen={isOpen} onOpenChange={onOpenChange} />
            )}
            <div className=" flex flex-shrink gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2">
                <Searcher
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    valueName={combinedData ? combinedData.map((addon) => addon.name) : []}
                />
                <Divider orientation="vertical" className="h-auto" />
                <SelectVersion
                    version={version}
                    setVersion={setVersion}
                    valueType={['LichKing', 'Cataclysm', 'Pandaria']}
                />
                <Divider orientation="vertical" className="h-auto" />

                <SelectType
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    valueType={addonTypes}
                />
            </div>

            <div className="h-[calc(95vh-32px)]">
                <div className=" h-full mx-auto mb-4">
                    <ScrollShadow
                        ref={scrollerRef}
                        className="h-[calc(93vh-32px)] overflow-auto mb-4 p-2 shadow-sm"
                        sh
                    >
                        {isLoading && (
                            <div className="flex justify-center mt-4">
                                <Spinner>Loading Addons...</Spinner>
                            </div>
                        )}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {filteredData.length > 0 ? (
                            <div className="flex flex-wrap gap-4 content-center items-center justify-center">
                                <AnimatePresence>
                                    {filteredData.slice(0, itemToShow).map((addon) => (
                                        <div
                                            key={`${addon.name}-${addon.githubRepo}`}
                                            className="transition-transform duration-300 ease-in-out hover:scale-105"
                                        >
                                            <Card
                                                isPressable={true}
                                                onPress={() => handleOpenDetails(addon)}
                                                isFooterBlurred
                                                initial="hidden"
                                                animate="visible"
                                                fallback
                                                shadow="sm"
                                                className="w-[200px] h-[200px]"
                                            >
                                                <CardBody className="p-0 overflow-visible">
                                                    <Image
                                                        removeWrapper
                                                        alt={addon.name}
                                                        radius="sm"
                                                        src={addon.imageUrl}
                                                        className="object-contain w-full h-full"
                                                    />
                                                </CardBody>
                                                <CardFooter className="absolute bottom-0 z-10 flex items-center justify-between bg-black/70 border-t-1 border-default-600 dark:border-default-100">
                                                    <div className="flex flex-col items-start flex-grow gap-1">
                                                        <p className="font-bold md:text-sm xl:text-md">
                                                            {addon.name}
                                                        </p>
                                                        <p className="text-tiny text-white/60">
                                                            {addon.addonType}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-end justify-end flex-grow gap-2">
                                                        <Tooltip
                                                            content="Download it"
                                                            color="primary"
                                                        >
                                                            <Button
                                                                isIconOnly
                                                                color="primary"
                                                                radius="full"
                                                                size="sm"
                                                                variant="shadow"
                                                                onPress={() =>
                                                                    handleDownload(addon.githubRepo)
                                                                }
                                                            >
                                                                <DownloadIcon />
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : null}
                        {hasMore && (
                            <div ref={loadRef} className="flex justify-center mt-4">
                                <Spinner color="primary" />
                            </div>
                        )}
                    </ScrollShadow>
                </div>
            </div>
        </div>
    )
}

export default Addon
