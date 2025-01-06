import { createContext, useContext, FC, ReactNode } from 'react'
import { Post } from '@/types'
import { useQuery } from '@tanstack/react-query'

const jsonUrl = 'https://maddonsmanager.github.io/blogposts/posts.json'

interface BlogPostContextValue {
    post: Post[]
    error: string | null
    isPending: boolean
}

const BlogPostContext = createContext<BlogPostContextValue | undefined>(undefined)

export const useBlogPostContext = (): BlogPostContextValue => {
    const context = useContext(BlogPostContext)
    if (!context) {
        throw new Error('useBlogPostContext debe usarse dentro de un BlogPostProvider')
    }
    return context
}

const fetchBlogPosts = async (url: string): Promise<Post[]> => {
    const response = await fetch(url).then((res) => res.json())
    return response.posts
}

export const BlogPostProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { data, isPending, error } = useQuery({
        queryKey: ['blogPosts'],
        queryFn: () => fetchBlogPosts(jsonUrl),
        refetchOnWindowFocus: false
    })

    const post = data || []
    return (
        <BlogPostContext.Provider value={{ post, isPending, error: error?.message || null }}>
            {children}
        </BlogPostContext.Provider>
    )
}
