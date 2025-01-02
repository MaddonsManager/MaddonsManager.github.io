import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { siteConfig } from '@/config/dirConfit'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import hljs from 'highlight.js'

const postCache: any = {}

const Post = () => {
    const { folder } = useParams()
    const [markdown, setMarkdown] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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
                console.error('Error al cargar el archivo Markdown:', error)
                setError(error.message)
            })
            .finally(() => setIsLoading(false))
    }, [folder])

    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block as HTMLElement)
        })
    }, [markdown])

    if (isLoading) {
        return <div>Cargando...</div>
    }

    if (error) {
        return <div>Error al cargar el post: {error}</div>
    }

    return (
        <div className="flex flex-col items-start justify-start">
            <Link to="/Guides">
                <button className="btn btn-primary btn-sm">Back</button>
            </Link>

            <article className="markdown-body p-1 !bg-transparent justify-center inline-block max-w-4xl text-start">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    className="text-default-900 gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2"
                >
                    {markdown}
                </ReactMarkdown>
            </article>
        </div>
    )
}

export default Post
