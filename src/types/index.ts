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
    name: string
    folders: string[]
    githubRepo: string
    imageUrl: string
    addonType: string
    description: string
    author: string
    lastCommitData: string
    Hot: any | null
    [key: string]: any
}

export type AddonsDataState = {
    [key: string]: AddonsData[]
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
    post: Post[]
    [key: string]: any
}

export type StringItems = {
    uuid: string
    logo: string
    content: string | null
    md: string | null
    title: string
    description: string
    author: string
    expansion: string[]
    changelog: string[]
    tags: string[]
    class: string[]
    roles: string[]
    preview: string | null
    preview2: string | null
    preview3: string | null
}
