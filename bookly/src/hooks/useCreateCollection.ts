import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import menuApi from '../api/modules/menu.api'

export function useCreateCollection() {
    const queryClient = useQueryClient()

    const createCollectionHandler = async ({
        name,
        parentId,
    }: {
        name: string
        parentId: number
    }) => {
        const { response, err } = await menuApi.addCollection({
            name,
            parentId,
        })

        if (err) {
            throw new Error(err.message)
        }

        return response
    }

    const { isPending: isCreating, mutate: createCollection } = useMutation({
        mutationFn: createCollectionHandler,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['treeMenu'] })
            toast.success('Collection successfully created')
        },
        onError: (err) => toast.error(err.message),
    })

    return { isCreating, createCollection }
}
