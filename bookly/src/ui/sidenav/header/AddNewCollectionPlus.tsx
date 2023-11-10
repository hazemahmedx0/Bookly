import { useState } from 'react'

import CreateCollection from '../../dialogs/CreateCollection'

import { Plus } from 'lucide-react'

function AddNewCollectionPlus() {
    const [isCreatingDialogOpen, setIsCreatingDialogOpen] = useState(false)

    return (
        <>
            <CreateCollection
                isCreatingDialogOpen={isCreatingDialogOpen}
                onCreatingClosed={() =>
                    setIsCreatingDialogOpen(!isCreatingDialogOpen)
                }
            />
            <div
                onClick={() => setIsCreatingDialogOpen(!isCreatingDialogOpen)}
                className=" transition-all w-6 h-6 flex bg-transparent justify-center items-center rounded-md hover:bg-gray-200 "
            >
                <Plus className="text-gray-700 w-5 h-5" />
            </div>{' '}
        </>
    )
}

export default AddNewCollectionPlus
