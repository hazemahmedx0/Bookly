import React from 'react'

import { Folder, Image, FileCode, CaseSensitive } from 'lucide-react'

type Props = {
    droppable: boolean
    fileType?: string
}

export const TypeIcon: React.FC<Props> = (props) => {
    if (props.droppable) {
        return <Folder size={16} />
    }

    switch (props.fileType) {
        case 'image':
            return <Image size={16} />
        case 'csv':
            return <FileCode size={16} />
        case 'text':
            return <CaseSensitive size={16} />
        default:
            return null
    }
}
