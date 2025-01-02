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
import { ScrollShadow } from '@nextui-org/scroll-shadow'
import { AnimatePresence } from 'framer-motion'
import { DownloadIcon } from '@/utils/icons'
import { Searcher, SelectType, SelectVersion, Header } from '@/components'
import AddonsDetails from './AddonsDetails'
import useFilterAddons from '@/hook/useFilterAddons'
import useInfiniteScrollLogic from '@/hook/useInfiniteScrollLogic'

const Addon = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const { data, isLoading, error } = useAddonsData()
    const {
        searchTerm,
        setSearchTerm,
        version,
        setVersion,
        selectedType,
        setSelectedType,
        filteredData,
        combinedData,
        addonTypes,
        handleDownload,
        handleOpenDetails,
        isSelectAddon
    } = useFilterAddons(data, onOpen)
    const { itemToShow, loadRef, scrollerRef, hasMore } = useInfiniteScrollLogic(filteredData)

    return (
        <div className="layer">
            <Header data={combinedData} />
            {isSelectAddon && (
                <AddonsDetails addon={isSelectAddon} isOpen={isOpen} onOpenChange={onOpenChange} />
            )}
            <div className="bg-inputs">
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

            <div className="h-[calc(95vh-32px)] mx-auto mb-4">
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
                                                    <Tooltip content="Download it" color="primary">
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
    )
}

export default Addon
