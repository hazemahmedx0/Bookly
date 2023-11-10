import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import menuApi from '../api/modules/menu.api'

export function useDeleteCollection() {
    const queryClient = useQueryClient()

    const deleteCollectionHandler = async (id: number) => {
        const { response, err } = await menuApi.delete({ ids: [id] })

        if (err) {
            throw new Error(err.message)
        }

        return response
    }

    const {
        isPending: isDeleting,
        mutate: deleteCollection,
        isSuccess,
    } = useMutation({
        mutationFn: deleteCollectionHandler,
        onSuccess: () => {
            toast.success('Collection successfully deleted')
        },
        onError: (err) => toast.error(err.message),
    })

    return { isDeleting, deleteCollection, isSuccess }
}
