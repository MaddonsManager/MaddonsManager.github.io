import React, { useState, useMemo } from 'react'
import useWeakAurasData from '@/hook/useWeakAurasData'
import { Card, CardBody, Button, Image, Tooltip, Spinner, Divider } from '@nextui-org/react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { AnimatePresence } from 'framer-motion'
import { title, subtitle, SelectType, Searcher, SelectVersion } from '@/components'
import { siteConfig } from '@/config/dirConfit'
import ReactMarkdown from 'react-markdown'

const WeakAuras = () => {
    const [version, setVersion] = useState(null)
    const { data, isLoading, error } = useWeakAurasData()
    const [itemToShow, setItemToShow] = useState(20)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('')

    console.log('data', data)

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
                    ? `${combinedData.length} Private WeakAuras`
                    : 'No WeakAuras available'}
            </h1>
            <p className={subtitle()}>{siteConfig.description}</p>
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
                                <AnimatePresence>
                                    {filteredData.slice(0, itemToShow).map((weakauras) => (
                                        <div
                                            key={`${weakauras.uuid}-${weakauras.title}`}
                                            className="transition-transform duration-300 ease-in-out hover:scale-105 p-2"
                                        >
                                            <Card
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
                                                        alt={weakauras.title}
                                                        radius="sm"
                                                        src={weakauras.logo}
                                                        className="h-auto w-full flex-none object-cover object-top md:w-48 items-center justify-center"
                                                    />
                                                    <div className="px-4 py-5 flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h3 className="text-large font-medium">
                                                                {weakauras.title}
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
                                                                            weakauras.content
                                                                        )
                                                                    }
                                                                >
                                                                    Copy
                                                                </Button>
                                                            </Tooltip>
                                                        </div>
                                                        <Divider />
                                                        <div className="flex flex-col gap-3 pt-2 text-small text-default-400">
                                                            <ReactMarkdown>
                                                                {weakauras.description.length > 150
                                                                    ? `${weakauras.description.substring(
                                                                          0,
                                                                          200
                                                                      )}...`
                                                                    : weakauras.description}
                                                            </ReactMarkdown>
                                                            <p>{weakauras.type}</p>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <p>dont found WeakAuras that match the filters.</p>
                        )}
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

export default WeakAuras
