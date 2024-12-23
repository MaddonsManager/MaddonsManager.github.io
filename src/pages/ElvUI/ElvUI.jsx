import React, { useState, useMemo } from 'react'
import useElvUIData from '@/hook/useElvUIData'
import {
    Card,
    CardBody,
    Button,
    Image,
    Tooltip,
    Spinner,
    Divider,
    useDisclosure
} from '@nextui-org/react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { AnimatePresence } from 'framer-motion'
import { title, subtitle, SelectType, Searcher, SelectVersion, ProfilesDetails } from '@/components'
import { siteConfig } from '@/config/dirConfit'

const ElvUI = () => {
    const [version, setVersion] = useState(null)
    const { data, isLoading, error } = useElvUIData()
    const [itemToShow, setItemToShow] = useState(20)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [isSelectElvUI, setIsSelectElvUI] = useState(null)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    console.log('data', data)

    const combinedData = useMemo(() => {
        if (!data) return []
        const allData = [...(data.lich || []), ...(data.cata || []), ...(data.panda || [])]
        if (version === null) return allData
        return data[version] || []
    }, [data, version])

    const elvuiTypes = useMemo(() => {
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

    const handleCopyToClipboard = (content) => {
        navigator.clipboard.writeText(content).then(
            () => {
                alert('Content copied to clipboard!')
            },
            (err) => {
                console.error('Error copying to clipboard: ', err)
            }
        )
    }
    const handleOpenDetails = (elvui) => {
        setIsSelectElvUI(elvui)
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
                    ? `${combinedData.length} Private ElvUI`
                    : 'No ElvUI available'}
            </h1>
            <p className={subtitle()}>{siteConfig.description}</p>
            {isSelectElvUI && (
                <ProfilesDetails data={isSelectElvUI} isOpen={isOpen} onOpenChange={onOpenChange} />
            )}
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
                    valueType={elvuiTypes}
                />
            </div>

            <div className="h-[calc(95vh-32px)]">
                <div className=" h-full mx-auto mb-4">
                    <ScrollShadow
                        ref={scrollerRef}
                        className="h-[calc(93vh-32px)] overflow-auto mb-4 p-4 shadow-sm"
                        sh
                    >
                        {isLoading && (
                            <div className="flex justify-center mt-4">
                                <Spinner>Loading Profiles...</Spinner>
                            </div>
                        )}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {filteredData.length > 0 ? (
                            <div className="flex flex-wrap content-center items-center justify-center">
                                <AnimatePresence>
                                    {filteredData.slice(0, itemToShow).map((elvui) => (
                                        <div
                                            key={`${elvui.uuid}-${elvui.title}`}
                                            className="transition-transform duration-300 ease-in-out hover:scale-105 p-2"
                                        >
                                            <Card
                                                isPressable={true}
                                                onPress={() => handleOpenDetails(elvui)}
                                                isFooterBlurred
                                                initial="hidden"
                                                animate="visible"
                                                fallback
                                                shadow="sm"
                                                className="w-auto"
                                            >
                                                <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap">
                                                    <Image
                                                        removeWrapper
                                                        alt={elvui.title}
                                                        radius="sm"
                                                        src="/logo.png"
                                                        className="h-auto w-full flex-none object-cover object-center md:w-72"
                                                    />
                                                    <div className="px-4 py-5 flex-1">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-large font-medium">
                                                                {elvui.title}
                                                            </h3>
                                                            <Tooltip
                                                                content="Copy WA to clipboard"
                                                                color="primary"
                                                            >
                                                                <Button
                                                                    color="primary"
                                                                    radius="sm"
                                                                    size="sm"
                                                                    variant="shadow"
                                                                    onPress={() =>
                                                                        handleCopyToClipboard(
                                                                            elvui.content
                                                                        )
                                                                    }
                                                                >
                                                                    Copy
                                                                </Button>
                                                            </Tooltip>
                                                        </div>
                                                        <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
                                                            <p>{elvui.description}</p>
                                                            <p>{elvui.type}</p>
                                                        </div>
                                                    </div>
                                                </CardBody>
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

export default ElvUI
