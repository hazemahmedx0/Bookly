import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function TreeMenuLoading() {
    return (
        <div className="space-y-3">
            <Skeleton className="h-6 w-full bg-gray-200" />
            <Skeleton className="h-6 w-full bg-gray-200/60" />
            <Skeleton className="h-6 w-full bg-gray-200/40" />
            <Skeleton className="h-6 w-full bg-gray-200/30" />
            <Skeleton className="h-6 w-full bg-gray-200/10" />
        </div>
    )
}

export default TreeMenuLoading
