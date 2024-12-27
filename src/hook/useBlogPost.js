import { useState, useEffect } from 'react'

let blogPostCache = null

const useBlogPost = () => {
    const [post, setPost] = useState({ posts: [] })
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadPost = async () => {
            setIsLoading(true)
            setError(null)

            try {
                if (blogPostCache) {
                    setPost(blogPostCache)
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

                blogPostCache = data
                setPost(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadPost()
    }, [])

    return { post, error, isLoading }
}

export default useBlogPost
