import { DownloadIcon, SharedIcon } from '@/assets/Icons'
import { Header, Searcher, SelectType, SelectVersion } from '@/components'
import { useAddonsContext } from '@/context/AddonsContext'
import useFilterAddons from '@/hook/useFilterAddons'
import useInfiniteScrollLogic from '@/hook/useInfiniteScrollLogic'
import { expansionIcon } from '@/utils/expansionIcon'
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Image,
    Snippet,
    Spinner,
    Tooltip,
    useDisclosure
} from '@heroui/react'
import { ScrollShadow } from '@heroui/scroll-shadow'
import { AnimatePresence } from 'framer-motion'
import AddonsDetails from './AddonsDetails'

const Addon = () => {
    const { isOpen, onOpenChange } = useDisclosure()
    const { data, isPending, error } = useAddonsContext()
    const {
        searchTerm,
        version,
        setVersion,
        selectedType,
        setSelectedType,
        filteredData,
        combinedData,
        addonTypes,
        handleOpenDetails,
        handleSharedAddon,
        isSelectAddon,
        handleSearchChange
    } = useFilterAddons(data, onOpenChange)
    const { itemToShow, loadRef, scrollerRef, hasMore } = useInfiniteScrollLogic(filteredData)

    return (
        <div className="">
            <Header data={data} />
            {isSelectAddon && (
                <AddonsDetails
                    addon={isSelectAddon}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    handleSharedAddon={handleSharedAddon}
                />
            )}
            <div className="bg-inputs">
                <Searcher
                    searchTerm={searchTerm}
                    setSearchTerm={handleSearchChange}
                    valueName={filteredData.map((item) => item.title)}
                />
                <Divider orientation="vertical" className="h-auto" />
                <SelectVersion version={version} setVersion={setVersion} valueType={combinedData} />
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
                >
                    {isPending && (
                        <div className="flex justify-center mt-4">
                            <Spinner>Loading Addons...</Spinner>
                        </div>
                    )}
                    {error && (
                        <Snippet symbol color="danger">
                            Error: {error}
                        </Snippet>
                    )}
                    {filteredData.length > 0 ? (
                        <div className="flex flex-wrap gap-4 content-center items-center justify-center">
                            <AnimatePresence>
                                {filteredData.slice(0, itemToShow).map((addon) => (
                                    <div
                                    key={`${addon.title}-${addon.file_name}-${addon.expansion.join('-')}`}
                                        className="transition-transform duration-300 ease-in-out hover:scale-105"
                                    >
                                        <Card
                                            isPressable={true}
                                            onPress={() => handleOpenDetails(addon)}
                                            isFooterBlurred
                                            shadow="sm"
                                            className="md:w-[380px] md:min-h-[446px]"
                                        >
                                            <CardHeader className="relative bg-transparent h-[200px] mb-6">
                                                <Image
                                                    removeWrapper
                                                    alt={addon.title}
                                                    radius="sm"
                                                    src={addon.logo}
                                                    className="absolute inset-0 h-full w-full object-cover object-center"
                                                />
                                                <Avatar
                                                    isBordered
                                                    color="default"
                                                    alt={addon.pr_author}
                                                    src={addon.avatar_pr_author}
                                                    size="lg"
                                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-16 z-10"
                                                />
                                                <Chip
                                                    className="translate-y-24 z-10"
                                                    color="warning"
                                                    variant="faded"
                                                    radius="sm"
                                                >
                                                    @{addon.pr_author}
                                                </Chip>
                                            </CardHeader>
                                            <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap md:h-full">
                                                <div className="px-4 flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-large font-medium">
                                                            {addon.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </CardBody>
                                            <Divider />
                                            <CardFooter className="flex justify-between items-center">
                                                <div className="flex flex-col gap-2">
                                                    {addon.expansion.map &&
                                                        addon.expansion.map(
                                                            (expansion: string, index: number) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex flex-col bg-default-300/20 rounded-md h-auto w-auto gap-2 p-1 m-1 transition-transform duration-300 ease-in-out hover:translate-x-2 content-center items-center justify-center"
                                                                >
                                                                    <Image
                                                                        key={index}
                                                                        alt={expansion}
                                                                        src={
                                                                            expansionIcon[expansion]
                                                                        }
                                                                        className="w-8 h-8 text-tiny"
                                                                    />
                                                                    <p className="text-tiny text-default-600/60">
                                                                        <span>{expansion}</span>
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                                <div className="flex gap-2 justify-center items-center">
                                                    <Tooltip
                                                        content="Shared download url"
                                                        color="primary"
                                                    >
                                                        <Button
                                                            isIconOnly
                                                            color="primary"
                                                            radius="full"
                                                            size="sm"
                                                            variant="shadow"
                                                            onPress={() =>
                                                                handleSharedAddon(addon.title)
                                                            }
                                                        >
                                                            <SharedIcon
                                                                size={20}
                                                                width={20}
                                                                height={20}
                                                            />
                                                        </Button>
                                                    </Tooltip>

                                                    <Tooltip content="Download it" color="primary">
                                                        <Button
                                                            isIconOnly
                                                            color="primary"
                                                            radius="full"
                                                            size="sm"
                                                            variant="shadow"
                                                            onPress={() => window.open(addon.zip)}
                                                        >
                                                            <DownloadIcon
                                                                size={20}
                                                                width={20}
                                                                height={20}
                                                            />
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
                        <div className="flex justify-center mt-4">
                            <Spinner ref={loadRef} color="primary" />
                        </div>
                    )}
                </ScrollShadow>
            </div>
        </div>
    )
}

export default Addon
