import { useState, useMemo } from 'react'

const useFilterGuides = (post) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTag, setSelectedTag] = useState('')

    const postTags = useMemo(() => {
        return Array.from(new Set(post.posts.flatMap((item) => item.tags)))
    }, [post])

    const filteredData = useMemo(() => {
        return post.posts.filter((post) => {
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
