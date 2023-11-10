import privateClient from '../client/private.client'
// import axios, { AxiosError } from 'axios'

const userEndpoints = {
    menudir: 'dir/all',
    adddir: 'dir/create',
    update: 'dir',
    delete: '/dir?ids=',
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

    addCollection: async ({
        name,
        parentId,
    }: {
        name: string
        parentId: number
    }) => {
        try {
            console.log('name', name)
            console.log('name', parentId)
            const response = await privateClient.post(
                userEndpoints.adddir,

                {
                    name,
                    parentId,
                }
            )
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
    delete: async ({ ids }: { ids: number[] }) => {
        try {
            const response = await privateClient.delete(
                `${userEndpoints.delete}[${ids}]`
            )
            console.log('response', response)
            return { response }
        } catch (err) {
            console.log('response', err)

            return { err }
        }
    },
}

export default menuApi
