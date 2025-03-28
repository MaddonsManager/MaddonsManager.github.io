import { GroupIcon } from '@/assets/Icons'
import { Markdown } from '@/components'
import { classIcon, roleIcon } from '@/utils/classIcon'
import {
    Avatar,
    Button,
    Chip,
    Divider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    Image,
    Spinner
} from '@heroui/react'
import { useEffect, useState } from 'react'
interface AddonsDetailsProps {
    addon: any
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
    handleSharedAddon: (addon: string) => void
}

const AddonsDetails = ({ addon, isOpen, onOpenChange, handleSharedAddon }: AddonsDetailsProps) => {
    const [markdownContent, setMarkdownContent] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isOpen && addon.md) {
            setIsLoading(true)
            fetch(addon.md)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch markdown content.')
                    }
                    return response.text()
                })
                .then((data) => {
                    setMarkdownContent(data)
                })
                .catch((error) => {
                    console.error('Error fetching markdown content:', error)
                    setMarkdownContent('Failed to load content.')
                })
                .finally(() => {
                    setIsLoading(false)
                })
        } else {
            setMarkdownContent(null)
        }
    }, [isOpen, addon.md])

    return (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">{addon.title}</DrawerHeader>
                        <DrawerBody>
                            <div className="flex gap-3">
                                <Image
                                    alt={addon.pr_author}
                                    height={60}
                                    radius="sm"
                                    src={addon.avatar_pr_author}
                                    width={60}
                                />
                                <div className="flex flex-col">
                                    <h3 className="text-tiny text-default-900 ">
                                        pr author: {addon.pr_author}
                                    </h3>
                                    <h3 className="text-tiny text-default-900 ">
                                        Addon author: {addon.author}
                                    </h3>
                                    <div className="flex items-center">
                                        <p className="font-bold text-xs">Tags:</p>
                                        {addon.tags.map((tag: string, index: number) => (
                                            <Chip
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
                                    <div className="flex flex-wrap items-center">
                                        <p className="font-bold text-xs">Class:</p>
                                        {addon.class.map((className: string, index: number) => (
                                            <Chip
                                                avatar={
                                                    className === 'All' ? (
                                                        <GroupIcon />
                                                    ) : (
                                                        <Avatar
                                                            name={addon.title}
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
                                    <div className="flex items-center">
                                        <p className="font-bold text-xs">Roles:</p>
                                        {addon.roles.map((role: string, index: number) => (
                                            <Chip
                                                avatar={
                                                    <Avatar
                                                        name={addon.title}
                                                        src={roleIcon[role]}
                                                    />
                                                }
                                                key={index}
                                                color="warning"
                                                variant="dot"
                                                size="sm"
                                                className="my-1"
                                            >
                                                {role}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Divider className="my-2" />
                            <div className="flex items-center justify-between">
                                <p className=" text-white/60">95.1k Downloads - 141.9k views</p>
                                <p className="text-sm text-gray-500">Last updated:</p>
                            </div>
                            <Divider className="my-2" />
                            <h1 className="text-lg font-extrabold">Description</h1>
                            <div className="markdown-body  p-1 !bg-transparent">
                                <div className="flex justify-center">
                                    <Image
                                        isBlurred
                                        src={addon.logo}
                                        alt={addon.title}
                                        className="animate-levitate aspect-video"
                                    />
                                </div>
                                {isLoading ? (
                                    <Spinner className="items-center justify-center" />
                                ) : (
                                    <Markdown
                                        content={markdownContent || 'No content available.'}
                                        className="text-default-900 gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md"
                                    />
                                )}
                            </div>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button
                                size="sm"
                                color="primary"
                                onPress={() => handleSharedAddon(addon.title)}
                            >
                                Shared Download Link
                            </Button>
                            <Button size="sm" color="danger" onPress={onClose}>
                                Close
                            </Button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    )
}

export default AddonsDetails
