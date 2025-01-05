import React, { createContext, useContext, useEffect, useState } from 'react'
import { Post } from '@/types'

interface BlogPostContextValue {
    post: Post[]
    error: string | null
    isLoading: boolean
}

const BlogPostContext = createContext<BlogPostContextValue | undefined>(undefined)

export const useBlogPostContext = (): BlogPostContextValue => {
    const context = useContext(BlogPostContext)
    if (!context) {
        throw new Error('useBlogPostContext debe usarse dentro de un BlogPostProvider')
    }
    return context
}

const postCache: { posts: Post[] | null } = {
    posts: null
}

export const BlogPostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [post, setPosts] = useState<Post[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const loadPosts = async () => {
            setIsLoading(true)
            setError(null)

            try {
                if (postCache.posts) {
                    setPosts(postCache.posts)
                    setIsLoading(false)
                    return
                }

                const response = await fetch(
                    'https://maddonsmanager.github.io/blogposts/posts.json'
                )
                if (!response.ok) {
                    throw new Error(`Error fetching posts: ${response.statusText}`)
                }

                const data = await response.json()
                const blogPosts = data.posts || []
                postCache.posts = blogPosts
                setPosts(blogPosts)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setIsLoading(false)
            }
        }

        loadPosts()
    }, [])

    return (
        <BlogPostContext.Provider value={{ post, error, isLoading }}>
            {children}
        </BlogPostContext.Provider>
    )
}
