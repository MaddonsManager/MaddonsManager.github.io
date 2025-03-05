import Markdown from '@/components/Markdown/Markdown'
import { siteConfig } from '@/config/dirConfit'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const postCache: { [key: string]: string } = {}

const Post = () => {
    const { folder } = useParams()
    const [markdown, setMarkdown] = useState('')
    const [error, setError] = useState(null)
    const [isPending, setIsLoading] = useState(true)

    useEffect(() => {
        if (!folder) return

        if (postCache[folder]) {
            setMarkdown(postCache[folder])
            setIsLoading(false)
            return
        }

        setIsLoading(true)
        setError(null)
        fetch(`${siteConfig.links.Blog}/blogposts/${folder}/post.md`)
            .then((response) => {
                if (!response.ok)
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                return response.text()
            })
            .then((text) => {
                postCache[folder] = text
                setMarkdown(text)
            })
            .catch((error) => {
                console.error('error to fetch post:', error)
                setError(error.message)
            })
            .finally(() => setIsLoading(false))
    }, [folder])

    if (isPending) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error to fetch post: {error}</div>
    }

    return (
        <div className="flex flex-col items-start justify-start">
            <Link to="/Guides">
                <button className="btn btn-primary btn-sm">Back</button>
            </Link>
            <Markdown content={markdown} />
        </div>
    )
}

export default Post
