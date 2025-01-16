import { Card, CardBody, Image, Button, Tooltip, Chip, Avatar, Divider } from "@heroui/react"
import { AnimatePresence } from 'framer-motion'
import { classIcon } from '@/utils/classIcon'
import { FlameIcon, GroupIcon } from '@/assets/Icons'
import { StringItems } from '@/types'

interface ItemListProps {
    data: StringItems[]
    onOpenDetails: (item: StringItems) => void
    handleCopyToClipboard: (content: string) => void
    itemToShow: number
}

const ItemList = ({ data, onOpenDetails, handleCopyToClipboard, itemToShow }: ItemListProps) => (
    <div className="flex flex-wrap gap-4 content-center items-center justify-center">
        <AnimatePresence>
            {data.slice(0, itemToShow).map((item: StringItems) => (
                <div
                    key={`${item.uuid}-${item.title}`}
                    className="transition-transform duration-300 ease-in-out hover:scale-105"
                >
                    <Card
                        isPressable={true}
                        onPress={() => onOpenDetails(item)}
                        isFooterBlurred
                        shadow="sm"
                        className="md:w-[850px]"
                    >
                        <CardBody className="flex flex-row flex-wrap p-0 sm:flex-nowrap h-[260px] overflow-hidden w-full">
                            <Image
                                removeWrapper
                                alt={item.title}
                                radius="sm"
                                src={item.logo}
                                className="w-full h-full flex-none object-cover object-center md:w-72"
                            />
                            <div className="px-4 py-5 flex-1">
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
                                                    item.content || 'Dont have content'
                                                )
                                            }
                                        >
                                            Copy
                                        </Button>
                                    </Tooltip>
                                </div>
                                <Divider />
                                <div className="flex flex-wrap gap-3 pt-2 text-small text-default-400">
                                    <p>
                                        {item.description.length > 150
                                            ? `${item.description.substring(0, 200)}...`
                                            : item.description}
                                    </p>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex flex-wrap gap-3 pt-2">
                                        {item.class.map &&
                                            item.class.map((className: string, index: number) => (
                                                <Chip
                                                    avatar={
                                                        className === 'ALL' ? (
                                                            <GroupIcon />
                                                        ) : (
                                                            <Avatar
                                                                name={item.title}
                                                                src={classIcon[className]}
                                                            />
                                                        )
                                                    }
                                                    key={index}
                                                    color="warning"
                                                    variant="dot"
                                                    size="sm"
                                                    className="my-1"
                                                >
                                                    {className}
                                                </Chip>
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
