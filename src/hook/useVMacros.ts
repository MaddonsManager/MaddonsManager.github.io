import { useRepoContext } from '@/context/MacroContext'
import { useEffect, useMemo, useState } from 'react'

export const useMacros = () => {
    const { repoTree, isPending, error } = useRepoContext()
    const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null)
    const [fileContent, setFileContent] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('')

    useEffect(() => {
        if (selectedFilePath) {
            const file = repoTree.find((item) => item.path === selectedFilePath)
            setFileContent(file?.mdContent || 'Dont have content for this file.')
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

    return {
        isPending,
        error,
        selectedFilePath,
        setSelectedFilePath,
        fileContent,
        searchTerm,
        setSearchTerm,
        filteredFolders
    }
}
