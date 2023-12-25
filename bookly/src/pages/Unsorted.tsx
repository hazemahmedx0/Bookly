import BookmarksHeader from '../ui/bookmarks/BookmarksHeader'
import Bookmarks from '../ui/bookmarks/Bookmarks'
import useCollection from '../hooks/useCollection'
import { useUser } from '../hooks/useUser'

function Unsorted() {
    const { user } = useUser()
    console.log(user)
    const { collection, isLoading } = useCollection({
        collectionId: user?.user?.baseDirectoryId,
    })
    console.log('dsds', collection)
    return (
        <div className=" h-screen overflow-hidden">
            <BookmarksHeader />
            <Bookmarks AllBookmarks={collection} isLoading={isLoading} />
        </div>
    )
}

export default Unsorted
