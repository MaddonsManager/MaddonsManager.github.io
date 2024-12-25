import React from 'react'
import useBlogPost from '@/hook/useBlogPost'
import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/dirConfit'

const Guides = () => {
    const { post, error, isLoading } = useBlogPost()

    if (isLoading) {
        return <div>Cargando...</div>
    }

    if (error) {
        return <div>Error al cargar los posts: {error}</div>
    }

    if (!post || !post.posts) {
        return <div>No se encontraron posts.</div>
    }

    return (
        <div>
            {post.posts.map((post, index) => (
                <article key={`${index}-${post.title}`}>
                    <img
                        src={`${siteConfig.links.Blog}/blogposts/${post.folder}/${post.cover_image}`}
                        alt={post.title}
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <section>
                        <h2>
                            <Link to={`/post/${post.folder}`}>{post.title}</Link>
                        </h2>
                        <p>{post.description}</p>
                        <section>
                            {post.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} style={{ marginRight: '8px' }}>
                                    #{tag}
                                </span>
                            ))}
                        </section>
                        <section>
                            <p>Author: {post.author.name}</p>
                            <p>Email: {post.author.email}</p>
                        </section>
                        <p>Date: {post.date}</p>
                    </section>
                </article>
            ))}
        </div>
    )
}

export default Guides
