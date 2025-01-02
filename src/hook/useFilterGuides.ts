import { useState, useMemo } from 'react'
import { Post } from '@/types'

const useFilterGuides = (post: Post[]) => {
    const [searchTerm, setSearchTerm] = useState<string | null>(null)
    const [selectedTag, setSelectedTag] = useState<string | null>(null)

    const postTags = useMemo(() => {
        return Array.from(new Set(post.flatMap((item) => item.tags)))
    }, [post])

    const filteredData = useMemo(() => {
        return post.filter((post) => {
            const matchesSearch = searchTerm
                ? post.title.toLowerCase().includes(searchTerm.toLowerCase())
                : true
            const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true
            return matchesSearch && matchesTag
        })
    }, [post, searchTerm, selectedTag])

    return {
        searchTerm,
        setSearchTerm,
        selectedTag,
        setSelectedTag,
        postTags,
        filteredData
    }
}

export default useFilterGuides
