import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    Button,
    Divider,
    Chip,
    Image,
    Avatar
} from '@heroui/react'
import ReactMarkdown from 'react-markdown'
import { classIcon, roleIcon } from '@/utils/classIcon'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import hljs from 'highlight.js'
import { useEffect } from 'react'
import { GroupIcon } from '@/assets/Icons'

interface ProfilesDetailsProps {
    data: any
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
}

const ProfilesDetails = ({ data, isOpen, onOpenChange }: ProfilesDetailsProps) => {
    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block as HTMLElement)
        })
    }, [data])

    return (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="full">
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
                                    src="/logo.png"
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
                                                            name={data.title}
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
                                                avatar={
                                                    <Avatar
                                                        name={data.title}
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
                                <p className="text-sm text-gray-500">version: </p>
                            </div>
                            <Divider className="my-2" />
                            <h2 className="text-lg font-extrabold">Description</h2>
                            <article className="markdown-body  p-1 !bg-transparent">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeRaw]}
                                    className="text-default-900 gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md"
                                >
                                    {data.md}
                                </ReactMarkdown>
                            </article>
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
