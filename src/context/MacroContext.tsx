import { RepoItem } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { createContext, FC, ReactNode, useContext } from 'react'

const GITHUB_API_URL =
    'https://api.github.com/repos/MaddonsManager/Vanilla-Macros/git/trees/master?recursive=1'

interface RepoContextValue {
    repoTree: RepoItem[]
    error: string | null
    isPending: boolean
}

const RepoContext = createContext<RepoContextValue | undefined>(undefined)

export const useRepoContext = (): RepoContextValue => {
    const context = useContext(RepoContext)
    if (!context) {
        throw new Error('useRepoContext debe usarse dentro de un RepoProvider')
    }
    return context
}

const fetchRepoTree = async (url: string): Promise<RepoItem[]> => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Error al obtener el árbol del repositorio')
        }
        const data = await response.json()
        const tree = data.tree

        return Promise.all(
            tree
                .filter((item: RepoItem) => item.path.endsWith('.md'))
                .map(async (item: RepoItem) => {
                    const md = `https://raw.githubusercontent.com/MaddonsManager/Vanilla-Macros/master/${item.path}`
                    const mdContent = await fetch(md).then((res) => (res.ok ? res.text() : null))
                    return { ...item, mdContent }
                })
        )
    } catch (error) {
        console.error('Error en fetchRepoTree:', error)
        throw error
    }
}

export const RepoProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isPending, error } = useQuery({
        queryKey: ['repoTree'],
        queryFn: () => fetchRepoTree(GITHUB_API_URL),
        refetchOnWindowFocus: false
    })
    console.log(data)
    return (
        <RepoContext.Provider
            value={{ repoTree: data ?? [], isPending, error: error?.message || null }}
        >
            {children}
        </RepoContext.Provider>
    )
}
