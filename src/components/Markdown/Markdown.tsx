import hljs from 'highlight.js'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

const BASE_CLASSES = 'markdown-body p-1 !bg-transparent'
const DEFAULT_CLASSES =
    'text-default-900 gap-4 w-auto p-4 mx-auto flex-col lg:flex-row rounded-md border-small border-primary-200/40 bg-background/60 shadow-medium backdrop-blur-md mb-2 dark:prose-invert prose'

const Markdown = ({ content, className }: { content: string; className?: string }) => {
    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block as HTMLElement)
        })
    }, [content])

    const markdownClasses = className ? className : DEFAULT_CLASSES

    return (
        <article className={BASE_CLASSES}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                className={markdownClasses}
            >
                {content}
            </ReactMarkdown>
        </article>
    )
}

export default Markdown
