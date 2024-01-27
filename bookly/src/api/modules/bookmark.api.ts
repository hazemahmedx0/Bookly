import privateClient from '../client/private.client'

const userEndpoints = {
    getInfo: 'bkmrk/scrape/',
    addBookmark: 'bkmrk/create',
    allBookmarks: 'bkmrk/all',
    collectionBookmarks: 'dir/content/',
    deleteBookmark: '/bkmrk?ids=',
    update: '/bkmrk',
}

const bookmarkApi: any = {
    getCollection: async (id: number) => {
        try {
            const response = await privateClient.get(
                `${userEndpoints.collectionBookmarks}${id}`
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    delBookmark: async ({ ids }: { ids: number[] }) => {
        try {
            const response = await privateClient.delete(
                `${userEndpoints.deleteBookmark}[${ids}]`
            )
            console.log('response', response)
            return { response }
        } catch (err) {
            console.log('response', err)

            return { err }
        }
    },
    getAllBookmarks: async () => {
        try {
            const response = await privateClient.get(userEndpoints.allBookmarks)
            return { response }
        } catch (err) {
            return { err }
        }
    },
    getMetaData: async (url: string) => {
        try {
            const response = await privateClient.get(
                `${userEndpoints.getInfo}${url}`
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    addBookmark: async ({
        link,
        directoryId,
        type,
        favorite,
        title,
        description,
        tags,
    }: {
        link: string
        directoryId: number
        type: string
        favorite: boolean
        title: string
        description: string
        tags: []
    }) => {
        try {
            const response = await privateClient.post(
                userEndpoints.addBookmark,

                {
                    link,
                    directoryId,
                    type,
                    favorite,
                    title,
                    description,
                    tags,
                }
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    updateBookmark: async ({
        id,
        link,
        title,
        directoryId,
        description,
        favorite,
        type,
    }: {
        id: number
        link: string
        title: string
        description: string
        directoryId: number
        favorite: boolean
        type: string
    }) => {
        try {
            const response = await privateClient.patch(
                userEndpoints.update,

                {
                    changes: [
                        {
                            id,
                            link,
                            title,
                            directoryId,
                            description,
                            favorite,
                            type,
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

export default bookmarkApi
