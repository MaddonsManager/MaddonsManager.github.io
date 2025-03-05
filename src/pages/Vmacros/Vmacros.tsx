import { BookTextIcon, MenuIcon } from '@/assets/Icons'
import { Markdown } from '@/components'
import { useRepoContext } from '@/context/MacroContext'
import {
    Accordion,
    AccordionItem,
    BreadcrumbItem,
    Breadcrumbs,
    Input,
    Link,
    Snippet,
    Spinner
} from '@heroui/react'
import { useEffect, useMemo, useState } from 'react'

const getBreadcrumbs = (path: string) =>
    path
        .split('/')
        .map((part, index, arr) => (
            <BreadcrumbItem key={index}>
                {index === arr.length - 1 ? <span>{part}</span> : <a>{part}</a>}
            </BreadcrumbItem>
        ))

export default function Vmacros() {
    const { repoTree, isPending, error } = useRepoContext()
    const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)
    const [fileContent, setFileContent] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')

    useEffect(() => {
        if (selectedFilePath) {
            const file = repoTree.find((item) => item.path === selectedFilePath)
            setFileContent(file?.mdContent || 'No hay contenido disponible para este archivo.')
        }
    }, [selectedFilePath, repoTree])

    const folders = useMemo(() => {
        return repoTree.reduce<
            Record<string, Record<string, { path: string; mdContent: string | null }[]>>
        >((acc, item) => {
            if (item.type === 'blob' && item.path.endsWith('.md')) {
                const parts = item.path.split('/')
                const folder = parts[0]
                const subFolder = parts.length > 2 ? parts[1] : ''

                acc[folder] = acc[folder] || {}
                acc[folder][subFolder] = acc[folder][subFolder] || []
                acc[folder][subFolder].push({ path: item.path, mdContent: item.mdContent })
            }
            return acc
        }, {})
    }, [repoTree])

    const filteredFolders = useMemo(() => {
        if (!searchTerm) return folders

        const lowerSearch = searchTerm.toLowerCase()
        const result: typeof folders = {}

        for (const [folder, subfolders] of Object.entries(folders)) {
            for (const [subfolder, files] of Object.entries(subfolders)) {
                const filteredFiles = files.filter(({ path }) =>
                    path.toLowerCase().includes(lowerSearch)
                )

                if (filteredFiles.length > 0) {
                    if (!result[folder]) result[folder] = {}
                    result[folder][subfolder] = filteredFiles
                }
            }
        }
        return result
    }, [folders, searchTerm])

    return (
        <div className="flex h-screen">
            <aside className="w-1/4 p-4 scrollbar-thin scrollbar-webkit overflow-y-auto">
                <Input
                    type="text"
                    placeholder="Search macros..."
                    classNames={{
                        label: 'text-black/50 dark:text-white/90',
                        input: [
                            'bg-transparent',
                            'text-black/90 dark:text-white/90',
                            'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                            'gap-4',
                            'p-2'
                        ],
                        innerWrapper: 'bg-transparent',
                        inputWrapper: [
                            'shadow-xl',
                            '!cursor-text',
                            'mb-3',
                            'text-default-900',
                            'p-2',
                            'mx-auto',
                            'flex-col',
                            'lg:flex-row',
                            'rounded-lg',
                            'border-small',
                            'border-primary-200/40',
                            'bg-background/60',
                            'shadow-medium',
                            'backdrop-blur-md'
                        ]
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    radius="lg"
                    variant="underlined"
                />

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
                <Accordion
                    isCompact
                    variant="shadow"
                    className="text-default-900 gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2"
                >
                    {Object.entries(filteredFolders).map(([folder, subfolders]) => (
                        <AccordionItem key={folder} title={folder}>
                            {Object.entries(subfolders).map(([subfolder, files]) => (
                                <div key={subfolder}>
                                    {subfolder && subfolder !== 'root' && (
                                        <div className="text-sm font-bold text-primary flex items-center justify-center border bg-primary-500/10 rounded-md">
                                            <MenuIcon />
                                            {subfolder}
                                        </div>
                                    )}
                                    <ul>
                                        {files.map(({ path }) => (
                                            <Link
                                                key={path}
                                                className="cursor-pointer p-1 flex items-center"
                                                onPress={() => setSelectedFilePath(path)}
                                                color="foreground"
                                                underline="focus"
                                            >
                                                <BookTextIcon />
                                                {path.split('/').pop()?.replace('.md', '')}
                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </AccordionItem>
                    ))}
                </Accordion>
            </aside>
            <main className="w-3/4 p-4 scrollbar-thin scrollbar-webkit overflow-y-auto">
                {selectedFilePath ? (
                    <div>
                        <Breadcrumbs className="mb-7" color="primary">
                            {getBreadcrumbs(selectedFilePath!)}
                        </Breadcrumbs>
                        <Markdown content={fileContent} />
                    </div>
                ) : (
                    <p className="">
                        {repoTree.length} Vanilla Macros found, select a file to view its content or
                        create a new one.
                    </p>
                )}
            </main>
        </div>
    )
}
