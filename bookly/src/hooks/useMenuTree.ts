import menuApi from '../api/modules/menu.api'
import { useQuery } from '@tanstack/react-query'

type CustomData = {
    id: number
    parentId: number | null
    name: string
    icon: string
    ownerId: number
}

export function useMenuTree() {
    const getTreeMenu = async () => {
        try {
            const { response, err } = await menuApi.getInfo()
            if (err) {
                return err
            }
            return response.directories
        } catch (err) {
            return err
        }

        // if (response) {
        //     const filteredData = response.filter(
        //         (item: CustomData) => item.id !== 2
        //     )

        //     const transformedData = filteredData.map((item: CustomData) => {
        //         return {
        //             id: item.id,
        //             parent: item.parentId || 0, // Use 0 if parentId is null
        //             droppable: true,
        //             text: item.name,
        //         }
        //     })
        // }
    }

    const { isLoading, data: treeMenu } = useQuery({
        queryKey: ['treeMenu'],
        queryFn: getTreeMenu,
    })

    return {
        isLoading,
        treeMenu,
    }
}
