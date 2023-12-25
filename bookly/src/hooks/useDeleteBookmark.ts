import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import menuApi from '../api/modules/menu.api'
import { useNavigate } from 'react-router-dom'
import bookmarkApi from '../api/modules/bookmark.api'

interface Bookmarktype {
    id: number
    link: string
    ownerId: number
    directoryId: number
    type: 'img' // Assuming type is always "img"
    favorite: boolean
    title: string
    description: string
    creationDate: string // Assuming creationDate is a string representing a date
    image: string
    tags: Tag[]
}

interface Tag {
    name: string
    id: number
}

export function useDeleteBookmark() {
    const queryClient = useQueryClient()
    const deleteBookmarkHandler = async (id: number[]) => {
        console.log('usedelete', id)
        // Immediately update cached data locally
        queryClient.setQueryData(['AllBookmarks'], (oldData: Bookmarktype[]) =>
            oldData.filter((bookmark) => !id.includes(bookmark.id))
        )
        const { response, err } = await bookmarkApi.delBookmark({
            ids: [...id],
        })

        if (err) {
            throw new Error(err.message)
        }

        return response
    }

    const {
        isPending: isDeleting,
        mutate: deleteBookmark,
        isSuccess,
    } = useMutation({
        mutationFn: deleteBookmarkHandler,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['AllBookmarks'] })
        },
        onError: (err) => toast.error(err.message),
    })

    return { isDeleting, deleteBookmark, isSuccess }
}
