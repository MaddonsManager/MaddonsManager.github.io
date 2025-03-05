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

interface ProfilesDetailsProps {
    data: any
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
}

const ProfilesDetails = ({ data, isOpen, onOpenChange }: ProfilesDetailsProps) => {
    const [markdownContent, setMarkdownContent] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isOpen && data.md) {
            setIsLoading(true)
            fetch(data.md)
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
    }, [isOpen, data.md])

    return (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">{data.title}</DrawerHeader>
                        <DrawerBody>
                            <div className="flex gap-3">
                                <Image
                                    alt={data.author}
                                    height={60}
                                    radius="sm"
                                    src={data.avatar_pr_author}
                                    width={60}
                                    className="object-cover"
                                />
                                <div className="text-tiny flex flex-col text-default-400">
                                    <p>author: {data.author}</p>
                                    <div className="flex items-center gap-2 my-2">
                                        <p className="font-bold ">Tags:</p>
                                        {data.tags.map((tag: string, index: number) => (
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
                                    <div className="flex flex-wrap items-center gap-2 my-2">
                                        <p className="font-bold ">Class:</p>
                                        {data.class.map((className: string, index: number) => (
                                            <Chip
                                                avatar={
                                                    className === 'All' ? (
                                                        <GroupIcon />
                                                    ) : (
                                                        <Avatar
                                                            name={className}
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
                                    <div className="flex items-center gap-2 my-2">
                                        <p className="font-bold">Roles:</p>
                                        {data.roles.map((role: string, index: number) => (
                                            <Chip
                                                avatar={<Avatar name={role} src={roleIcon[role]} />}
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
                            <h2 className="text-lg font-extrabold">Description</h2>
                            <div className="markdown-body p-1 !bg-transparent">
                                {' '}
                                {/* Usamos un div en lugar de article */}
                                <div className="flex justify-center">
                                    <Image
                                        isBlurred
                                        src={data.logo}
                                        alt={data.title}
                                        className="animate-levitate aspect-video"
                                    />
                                </div>
                                {isLoading ? (
                                    <Spinner className="items-center justify-center" />
                                ) : (
                                    <Markdown
                                        content={markdownContent || 'No content available.'}
                                        className="text-default-900 gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md dark:prose-invert prose"
                                    />
                                )}
                            </div>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button color="primary" onPress={onClose}>
                                Close
                            </Button>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    )
}

export default ProfilesDetails
