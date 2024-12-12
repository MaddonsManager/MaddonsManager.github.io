import React, { useState } from 'react'
import useAddonsData from '@/hook/useAddonsData'
import { Card, CardBody, CardFooter, Button, Image, Tooltip, Spinner } from '@nextui-org/react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { motion, AnimatePresence } from 'framer-motion'
import { DownloadIcon } from '@/utils/icons'
import SelectType from './SelectType'
import SelectVersion from './SelectVersion'
import SearchAddons from './SearchAddons'
import { title } from '@/components'
import { i } from 'framer-motion/client'

const Addon = () => {
    const [version, setVersion] = useState('lich')
    const { data, isLoading, error } = useAddonsData(version)
    const [itemToShow, setItemToShow] = useState(20)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedType, setSelectedType] = useState('')

    const addonTypes =
        data && data.length > 0 ? Array.from(new Set(data.map((addon) => addon.addonType))) : []

    const filteredData = data
        ? data.filter(
              (addon) =>
                  (!searchTerm || addon.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
                  (!selectedType || addon.addonType === selectedType)
          )
        : []

    const handleDownload = async (githubRepo) => {
        const mainUrl = `${githubRepo}/archive/refs/heads/main.zip`
        const masterUrl = `${githubRepo}/archive/refs/heads/master.zip`
        window.open(mainUrl)
    }

    const MotionCard = motion.create(Card)

    const cardVariants = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
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
        <div className="justify-center inline-block max-w-7xl text-center py-8">
            <h1 className={title({ color: 'blue', size: 'lg' })}>
                {data && data.length > 0
                    ? `${data.length} Addons available in Maddons`
                    : 'No Addons available in Maddons'}
            </h1>
            <div className=" flex flex-shrink gap-4 w-auto p-4 mx-auto flex-col lg:flex-row">
                <SearchAddons
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    addonNames={data ? data.map((addon) => addon.name) : []}
                />
                <SelectVersion version={version} setVersion={setVersion} />
                <SelectType
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    addonTypes={addonTypes}
                />
            </div>

            <div className="h-[calc(95vh-32px)]">
                <div className=" h-full mx-auto mb-4">
                    <ScrollShadow
                        ref={scrollerRef}
                        hideScrollBar
                        className="h-[calc(93vh-32px)] overflow-auto mb-4"
                    >
                        {isLoading && <p>Loading Addons...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {filteredData.length > 0 ? (
                            <div className="flex flex-wrap gap-4 content-center items-center justify-center">
                                {filteredData.map((addon, index) => (
                                    <AnimatePresence>
                                        <div className="transition-transform duration-300 ease-in-out hover:scale-105">
                                            <MotionCard
                                                isPressable={true}
                                                isFooterBlurred
                                                variants={cardVariants}
                                                initial="hidden"
                                                animate="visible"
                                                transition={{ duration: 0.2, delay: index * 0.1 }}
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
                                            </MotionCard>
                                        </div>
                                    </AnimatePresence>
                                ))}
                            </div>
                        ) : (
                            <p>No se encontraron addons que coincidan con los filtros.</p>
                        )}
                        {(hasMore && <Spinner ref={loadRef} color="primary" className="mt-4" />) ||
                            null}
                    </ScrollShadow>
                </div>
            </div>
        </div>
    )
}

export default Addon
