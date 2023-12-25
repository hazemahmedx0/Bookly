import React, { useState } from 'react'
import bookmarkApi from '../api/modules/bookmark.api'
import { useQuery } from '@tanstack/react-query'

function useCollection({
    collectionId,
}: {
    collectionId: string | number | undefined
}) {
    const getCollection = async () => {
        try {
            const { response, err } = await bookmarkApi.getCollection(
                collectionId
            )
            if (err) {
                return err
            }
            return response.bookmarks
        } catch (err) {
            return err
        }
    }

    const { isLoading, data: collection } = useQuery({
        queryKey: [`collection-${collectionId}`],
        queryFn: getCollection,
    })

    return {
        isLoading,
        collection,
    }
}

export default useCollection
