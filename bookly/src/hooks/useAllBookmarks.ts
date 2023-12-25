import { useQuery } from '@tanstack/react-query'
import bookmarkApi from '../api/modules/bookmark.api'

export default function useAllBookmarks() {
    const getAllBookmarks = async () => {
        try {
            const { response, err } = await bookmarkApi.getAllBookmarks()
            if (err) {
                return err
            }
            return response.bookmarks
        } catch (err) {
            return err
        }
    }

    const { isLoading, data: AllBookmarks } = useQuery({
        queryKey: ['AllBookmarks'],
        queryFn: getAllBookmarks,
    })

    return {
        isLoading,
        AllBookmarks,
    }
}
