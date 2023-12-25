import { useParams } from 'react-router-dom'
import useAllBookmarks from '../hooks/useAllBookmarks'
import BookmarksHeader from '../ui/bookmarks/BookmarksHeader'
import Bookmarks from '../ui/bookmarks/Bookmarks'
import useCollection from '../hooks/useCollection'
function Collection() {
    const { collectionId } = useParams()
    const { collection, isLoading } = useCollection({
        collectionId: collectionId,
    })
    return (
        <div className=" h-screen overflow-hidden">
            <BookmarksHeader />
            <Bookmarks AllBookmarks={collection} isLoading={isLoading} />
        </div>
    )
}

export default Collection
