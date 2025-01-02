import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    Button,
    Divider,
    Chip,
    Link,
    Image
} from '@nextui-org/react'
interface AddonsDetailsProps {
    addon: any
    isOpen: boolean
    onOpenChange: (isOpen: boolean) => void
}

const AddonsDetails = ({ addon, isOpen, onOpenChange }: AddonsDetailsProps) => {
    return (
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
            <DrawerContent>
                {(onClose) => (
                    <>
                        <DrawerHeader className="flex flex-col gap-1">{addon.name}</DrawerHeader>
                        <DrawerBody>
                            <div className="flex gap-3">
                                <Image
                                    alt={addon.author}
                                    height={60}
                                    radius="sm"
                                    src="/logo.svg"
                                    width={60}
                                />
                                <div className="flex flex-col">
                                    <p className="text-tiny text-white/90 ">
                                        author: {addon.author}
                                    </p>
                                    <Chip color="warning" variant="dot" size="sm" className="my-2">
                                        {addon.addonType}
                                    </Chip>
                                </div>
                            </div>
                            <Divider className="my-2" />
                            <div className="flex items-center justify-between">
                                <p className=" text-white/60">95.1k Downloads - 141.9k views</p>
                                <p className="text-sm text-gray-500">
                                    Last updated: {addon.lastCommitDate}
                                </p>
                            </div>
                            <Divider className="my-2" />
                            <h1 className="text-lg font-extrabold">Description</h1>
                            <p className="block my-2 text-justify">{addon.description}</p>
                            <div className="flex justify-center p-4 bg-gray-900">
                                <Image
                                    shadow="md"
                                    alt={addon.name}
                                    radius="sm"
                                    src={addon.imageUrl}
                                    className="max-w-[500px] max-h-[500px]"
                                />
                            </div>
                        </DrawerBody>
                        <DrawerFooter>
                            <Link size="sm" isExternal showAnchorIcon href={addon.githubRepo}>
                                GitHub Link
                            </Link>
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

export default AddonsDetails
