import { useState } from 'react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'

const useInfiniteScrollLogic = (filteredData: any[]) => {
    const [itemToShow, setItemToShow] = useState(20)

    const loadMore = () => {
        setItemToShow((prev) => prev + 10)
    }

    const hasMore = filteredData && filteredData.length > itemToShow

    const [loadRef, scrollerRef] = useInfiniteScroll({
        hasMore,
        onLoadMore: loadMore
    })

    return { itemToShow, loadRef, scrollerRef, hasMore }
}

export default useInfiniteScrollLogic
