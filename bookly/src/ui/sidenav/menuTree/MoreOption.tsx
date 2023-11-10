import { useState } from 'react'

// ShadCN
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { Button } from '../../../components/ui/button'

// Icons
import { MoreVertical, Loader2 } from 'lucide-react'

// Styles
import styles from './CustomNode.module.css'

// Hooks
import { useDeleteCollection } from '../../../hooks/useDeleteCollection'

export function MoreOption({ id }: { id: number }) {
    const { isDeleting, deleteCollection } = useDeleteCollection()
    const [isRemoving, setIsRemoving] = useState(false)

    return (
        <>
            <AlertDialog open={isRemoving} onOpenChange={setIsRemoving}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this collection? All
                            bookmarks within the collection will be moved to
                            trash.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button
                            disabled={isDeleting}
                            variant="destructive"
                            onClick={() => {
                                deleteCollection(id, {
                                    onSuccess: () => {
                                        setIsRemoving(false)
                                    },
                                })
                            }}
                        >
                            {isDeleting ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                'Delete'
                            )}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical size={18} className={styles.editIcon} />
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="end">
                    <DropdownMenuItem onClick={() => setIsRemoving(true)}>
                        Remove
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
