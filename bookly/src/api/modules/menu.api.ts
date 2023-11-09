import privateClient from '../client/private.client'
// import axios, { AxiosError } from 'axios'

const userEndpoints = {
    menudir: 'dir/all',
    update: 'dir',
}

const menuApi: any = {
    getInfo: async () => {
        try {
            const response = await privateClient.get(userEndpoints.menudir)
            return { response }
        } catch (err) {
            return { err }
        }
    },
    updateDir: async ({
        id,
        icon,
        name,
        parentId,
    }: {
        id: number
        icon: string
        name: string
        parentId: number
    }) => {
        try {
            const response = await privateClient.patch(
                userEndpoints.update,

                {
                    changes: [
                        {
                            id,
                            icon,
                            name,
                            parentId,
                        },
                    ],
                }
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
}

export default menuApi
