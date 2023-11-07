import React from 'react'

import { Folder, Image, FileCode, CaseSensitive } from 'lucide-react'

type Props = {
    droppable: boolean
    fileType?: string
}

export const TypeIcon: React.FC<Props> = (props) => {
    if (props.droppable) {
        return <Folder />
    }

    switch (props.fileType) {
        case 'image':
            return <Image />
        case 'csv':
            return <FileCode />
        case 'text':
            return <CaseSensitive />
        default:
            return null
    }
}
