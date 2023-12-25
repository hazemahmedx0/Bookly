// Chadcn
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
// Form
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useCreateCollection } from '../../hooks/useCreateCollection'
import { useMenuTree } from '../../hooks/useMenuTree'
import { useUser } from '../../hooks/useUser'

const FormSchema = z.object({
    name: z.string({
        required_error: 'Please Add name.',
    }),
    parent: z.any(),
})

function CreateCollection({
    isCreatingDialogOpen,
    onCreatingClosed,
}: {
    isCreatingDialogOpen: boolean
    onCreatingClosed: (params?: any) => any
}) {
    const { user } = useUser()
    const { treeMenu: treedata } = useMenuTree()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const { isCreating, createCollection } = useCreateCollection()
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(user?.user?.baseDirectoryId)
        console.log({
            name: data.name,
            parentId: isNaN(data.parent)
                ? user?.user?.baseDirectoryId
                : Number(data.parent),
        })

        createCollection(
            {
                name: data.name,
                parentId: isNaN(data.parent)
                    ? user?.user?.baseDirectoryId
                    : Number(data.parent),
            },
            { onSuccess: () => onCreatingClosed() }
        )
    }

    return (
        <Dialog open={isCreatingDialogOpen} onOpenChange={onCreatingClosed}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new collection</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Collection name</FormLabel>
                                    <FormControl>
                                        <Input
                                            defaultValue=""
                                            placeholder="collection"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="parent"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Parent</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a parent or leave it blank" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="max-h-40 overflow-auto">
                                            {treedata &&
                                                Object.values(treedata)?.map(
                                                    (item) => (
                                                        <SelectItem
                                                            key={item.id}
                                                            value={`${item.id}`}
                                                        >
                                                            {item.name}
                                                        </SelectItem>
                                                    )
                                                )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isCreating} size="sm" type="submit">
                            {isCreating ? 'Creating...' : 'Submit'}
                        </Button>
                    </form>
                </Form>
                <DialogFooter>
                    {/* <Button size="sm" type="submit">
                        Save changes
                    </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateCollection
