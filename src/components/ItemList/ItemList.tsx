import { FlameIcon, GroupIcon } from '@/assets/Icons'
import { StringItems } from '@/types'
import { classIcon } from '@/utils/classIcon'
import { Avatar, Button, Card, CardBody, Chip, Divider, Image, Tooltip } from '@heroui/react'
import { AnimatePresence } from 'framer-motion'

interface ItemListProps {
    data: StringItems[]
    onOpenDetails: (item: StringItems) => void
    handleCopyToClipboard: (item: StringItems, content: string) => void
    itemToShow: number
}

const ItemList = ({ data, onOpenDetails, handleCopyToClipboard, itemToShow }: ItemListProps) => (
    <div className="flex flex-wrap gap-4 content-center items-center justify-center">
        <AnimatePresence>
            {data.slice(0, itemToShow).map((item: StringItems) => (
                <div
                    key={`${item.file_name}-${item.title}`}
                    className="transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    <Card
                        isPressable={true}
                        onPress={() => onOpenDetails(item)}
                        isFooterBlurred
                        shadow="sm"
                        className="md:w-[580px]"
                    >
                        <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap h-[260px] overflow-hidden w-full">
                            <Image
                                isBlurred
                                alt={item.title}
                                radius="sm"
                                src={item.logo}
                                className="w-full h-full flex-none object-cover object-center md:w-72"
                            />
                            <div className="px-4 py-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-large font-medium">{item.title}</h3>
                                        <Tooltip content="Copy to clipboard" color="primary">
                                            <Button
                                                color="primary"
                                                radius="sm"
                                                size="sm"
                                                variant="shadow"
                                                onPress={() =>
                                                    handleCopyToClipboard(
                                                        item,
                                                        item.content || 'No content available'
                                                    )
                                                }
                                            >
                                                Copy
                                            </Button>
                                        </Tooltip>
                                    </div>
                                    <Divider />
                                    <h3 className="text-small text-default-400 mt-2">
                                        By: {item.author}
                                    </h3>
                                </div>
                                <div className="flex flex-col pt-2 text-small text-default-400">
                                    <div className="flex flex-wrap">
                                        {item.class.map &&
                                            item.class.map((className: string, index: number) => (
                                                <div
                                                    key={index}
                                                    className="bg-default-300/20 rounded-md h-auto w-auto gap-2 p-1 m-1 transition-transform duration-300 ease-in-out hover:translate-x-2"
                                                >
                                                    {className === 'All' ? (
                                                        <GroupIcon
                                                            className="w-3 h-3 text-tiny"
                                                            aria-label="All classes"
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            key={index}
                                                            name={className}
                                                            src={classIcon[className]}
                                                            className="w-5 h-5 text-tiny"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag: string, index: number) => (
                                            <Chip
                                                avatar={<FlameIcon />}
                                                key={index}
                                                color="warning"
                                                variant="dot"
                                                size="sm"
                                                className="my-1"
                                            >
                                                {tag}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            ))}
        </AnimatePresence>
    </div>
)

export default ItemList
