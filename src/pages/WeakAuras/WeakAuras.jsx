import React, { useState, useMemo } from 'react'
import useWeakAurasData from '@/hook/useWeakAurasData'
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
import { title, subtitle, SelectType, Searcher, SelectVersion } from '@/components'
import { siteConfig } from '@/config/dirConfit'
// import AddonsDetails from './AddonsDetails'

const WeakAuras = () => {
    const [version, setVersion] = useState(null)
    const { data, isLoading, error } = useWeakAurasData()
    const [itemToShow, setItemToShow] = useState(20)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [isSelectAddon, setIsSelectAddon] = useState(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const combinedData = useMemo(() => {
        if (!data) return []
        const allData = [...(data.lich || []), ...(data.cata || []), ...(data.panda || [])]
        if (version === null) return allData
        return data[version] || []
    }, [data, version])

    const weakAurasTypes = useMemo(() => {
        return combinedData.length > 0
            ? Array.from(new Set(combinedData.map((item) => item.type)))
            : []
    }, [combinedData])

    const filteredData = useMemo(() => {
        return combinedData.filter((item) => {
            const matchesSearch = searchTerm
                ? item.title.toLowerCase().includes(searchTerm.toLowerCase())
                : true
            const matchesType = selectedType ? item.type === selectedType : true
            return matchesSearch && matchesType
        })
    }, [combinedData, searchTerm, selectedType])

    const handleDownload = async (githubRepo) => {
        const mainUrl = `${githubRepo}/archive/refs/heads/main.zip`
        window.open(mainUrl)
    }

    const handleOpenDetails = (weakauras) => {
        setIsSelectAddon(weakauras)
        onOpen(true)
    }

    const loadMore = () => {
        setItemToShow((prev) => prev + 10)
    }
    const hasMore = itemToShow < filteredData.length
    const [loadRef, scrollerRef] = useInfiniteScroll({
        hasMore,
        onLoadMore: loadMore
    })

    return (
        <div className="justify-center inline-block max-w-4xl text-start">
            <h1 className={title({ color: 'blue', size: 'lg' })}>
                {combinedData.length > 0
                    ? `${combinedData.length} Private WeakAuras`
                    : 'No WeakAuras available'}
            </h1>
            <p className={subtitle()}>{siteConfig.description}</p>
            {/* {isSelectAddon && (
                <AddonsDetails addon={isSelectAddon} isOpen={isOpen} onOpenChange={onOpenChange} />
            )} */}
            <div className=" flex flex-shrink gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2">
                <Searcher
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    valueName={combinedData.map((item) => item.title)}
                />
                <Divider orientation="vertical" className="h-auto" />
                <SelectVersion version={version} setVersion={setVersion} />
                <Divider orientation="vertical" className="h-auto" />

                <SelectType
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    valueType={weakAurasTypes}
                />
            </div>

            <div className="h-[calc(95vh-32px)]">
                <div className=" h-full mx-auto mb-4">
                    <ScrollShadow
                        ref={scrollerRef}
                        className="h-[calc(93vh-32px)] overflow-auto mb-4 p-4 shadow-sm"
                        sh
                    >
                        {isLoading && <p>Loading Weakauras...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {filteredData.length > 0 ? (
                            <div className="flex flex-wrap content-center items-center justify-center">
                                {filteredData.map((weakauras, index) => (
                                    <AnimatePresence>
                                        <div className="transition-transform duration-300 ease-in-out hover:scale-105 p-2">
                                            <Card
                                                isPressable={true}
                                                onPress={() => handleOpenDetails(weakauras)}
                                                isFooterBlurred
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ duration: 0.2, delay: index * 0.1 }}
                                                fallback
                                                shadow="sm"
                                                className="w-auto"
                                            >
                                                <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                                                    <Image
                                                        removeWrapper
                                                        alt={weakauras.title}
                                                        radius="sm"
                                                        // src={weakauras.imageUrl}
                                                        src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/hero-card-complete.jpeg"
                                                        className="h-auto w-full flex-none object-cover object-top md:w-48"
                                                    />
                                                    <div className="px-4 py-5">
                                                        <h3 className="text-large font-medium">
                                                            {weakauras.title}
                                                        </h3>
                                                        <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
                                                            <p>{weakauras.description}</p>
                                                            <p>{weakauras.type}</p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                                {/* <CardFooter className="absolute bottom-0 z-10 flex items-center justify-between bg-black/70 border-t-1 border-default-600 dark:border-default-100">
                                                    <div className="flex flex-col items-start flex-grow gap-1">
                                                        <p className="font-bold md:text-sm xl:text-md">
                                                            {weakauras.name}
                                                        </p>
                                                        <p className="text-tiny text-white/60">
                                                            {weakauras.addonType}
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
                                                                <p>{addon.title}</p>
                                                            </Button>
                                                        </Tooltip>
                                                    </div>
                                                </CardFooter> */}
                                            </Card>
                                        </div>
                                    </AnimatePresence>
                                ))}
                            </div>
                        ) : (
                            <p>dont found WeakAuras that match the filters.</p>
                        )}
                        {hasMore &&
                            (<Spinner ref={loadRef} color="primary" className="mt-4" /> || null)}
                    </ScrollShadow>
                </div>
            </div>
        </div>
    )
}

export default WeakAuras
