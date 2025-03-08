import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number
}

export type ReleaseNotesTypes = {
    version: string
    date: string
    extra: string
    features: string[]
    fixed: string[]
    breakingChanges: string[]
}

export type AddonsData = {
    title: string
    file_name: string
    expansion: string[]
    tags: string[]
    description: string
    author: string
    pr_author: string
    avatar_pr_author: string
    roles: string[]
    class: string[]
    zip: string
}

export type AddonsDataState = {
    item: string
    md: string
    logo: string
    zip: string
    title: string
    file_name: string
    description: string
    author: string
    pr_author: string
    avatar_pr_author: string
    expansion: string[]
    tags: string[]
    roles: string[]
    class: string[]
}

export type Post = {
    title: string
    description: string
    cover_image: string
    author: {
        name: string
        avatar: string
        email: string
        url: string
    }
    date: string
    tags: string[]
    folder: string
    posts: Post[]
    [key: string]: any
}

export type StringItems = {
    item: string
    md: string
    logo: string
    zip: string
    title: string
    file_name: string
    description: string
    author: string
    pr_author: string
    avatar_pr_author: string
    expansion: string[]
    tags: string[]
    roles: string[]
    class: string[]
    content: string
}

export type RepoItem = {
    path: string
    type: 'blob' | 'tree'
    mdContent: string | null
}
