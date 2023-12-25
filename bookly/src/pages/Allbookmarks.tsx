import BookmarksHeader from '../ui/bookmarks/BookmarksHeader'
import Bookmarks from '../ui/bookmarks/Bookmarks'
import useAllBookmarks from '../hooks/useAllBookmarks'

function Allbookmarks() {
    const { AllBookmarks, isLoading } = useAllBookmarks()
    return (
        <div className=" h-screen overflow-hidden">
            <BookmarksHeader />
            <Bookmarks AllBookmarks={AllBookmarks} isLoading={isLoading} />
        </div>
    )
}

export default Allbookmarks
