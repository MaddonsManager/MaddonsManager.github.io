import { useState, useEffect } from 'react'
import { Post } from '@/types'

interface postCache {
    posts: Post[] | null
}

const postCache: postCache = {
    posts: null
}

const useBlogPost = (): { post: Post[]; error: string | null; isLoading: boolean } => {
    const [post, setPost] = useState<Post[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const loadPost = async () => {
            setIsLoading(true)
            setError(null)

            try {
                if (postCache.posts) {
                    setPost(postCache.posts)
                    setIsLoading(false)
                    return
                }

                const response = await fetch(
                    'https://maddonsmanager.github.io/blogposts/posts.json'
                )
                if (!response.ok) {
                    throw new Error(`Error fetching post: ${response.statusText}`)
                }

                const data = await response.json()
                const posts = data.posts || []
                postCache.posts = posts
                setPost(posts)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                setIsLoading(false)
            }
        }
        loadPost()
    }, [])

    return { post, error, isLoading }
}

export default useBlogPost
