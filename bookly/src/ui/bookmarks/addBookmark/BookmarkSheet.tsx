import React, { useEffect, useState } from 'react'
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

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// React hook form & zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Folder, Plus, Loader2 } from 'lucide-react'

import { useAuth } from '../../../context/auth'

import { useMenuTree } from '../../../hooks/useMenuTree'
import bookmarkApi from '../../../api/modules/bookmark.api'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const bookmark = z.object({
    link: z.string().url({ message: 'Please enter a valid url' }),
    directoryId: z.any(),
    type: z.string(),
    favorite: z.boolean(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
})

export type bookmarkForm = z.infer<typeof bookmark>

function BookmarkSheet({
    sheetVisible,
    setSheetvisible,
    bookMarkmetaData,
    edit = false,
}: any) {
    const { auth, setAuth } = useAuth()
    const { treeMenu: treedata } = useMenuTree()
    const queryClient = useQueryClient()
    const { collectionId } = useParams()

    console.log('newewew', bookMarkmetaData)
    // 1. form definition
    const form = useForm<bookmarkForm>({
        resolver: zodResolver(bookmark),
        defaultValues: {
            link: bookMarkmetaData?.url || '',
            directoryId: auth?.user?.baseDirectoryId || 0,
            type: 'link',
            favorite: false,
            title: bookMarkmetaData?.title || '',
            description: bookMarkmetaData?.description || '',
            tags: [],
        },
        mode: 'onChange',
    })

    useEffect(() => {
        form.setValue(
            'link',
            bookMarkmetaData?.url ?? bookMarkmetaData?.link ?? ''
        )
        form.setValue('title', bookMarkmetaData?.title || '')
        form.setValue('description', bookMarkmetaData?.description || ' ')
        form.setValue('directoryId', bookMarkmetaData?.directoryId || ' ')
        form.setValue(
            'directoryId',
            bookMarkmetaData?.directoryId ?? auth?.user?.baseDirectoryId ?? ''
        )
    }, [bookMarkmetaData])

    // 2. form submit handler
    const onSubmit = async (data: bookmarkForm) => {
        try {
            if (edit) {
                await updateBookmark(data)
            } else {
                await addBookmark(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const updateBookmark = async (data: bookmarkForm) => {
        const { response, err } = await bookmarkApi.updateBookmark({
            id: bookMarkmetaData?.id,
            link: bookMarkmetaData?.link,
            title: data.title,
            directoryId: Number(data.directoryId),
            description: data.description,
            favorite: data.favorite,
            type: data.type,
        })

        if (response) {
            handleBookmarkUpdate(data.directoryId)
        } else {
            console.error('Error updating bookmark:', err)
        }
    }

    const addBookmark = async (data: bookmarkForm) => {
        const { response, err } = await bookmarkApi.addBookmark({
            ...data,
            directoryId: Number(data.directoryId),
        })

        if (response) {
            form.reset()
            handleBookmarkUpdate(data.directoryId)
        } else {
            console.error('Error adding bookmark:', err)
        }
    }

    const handleBookmarkUpdate = (updatedDirectoryId: string | number) => {
        queryClient.invalidateQueries({ queryKey: ['AllBookmarks'] })

        if (
            collectionId !== undefined &&
            Number(collectionId) === Number(updatedDirectoryId)
        ) {
            queryClient.invalidateQueries({
                queryKey: [`collection-${collectionId}`],
            })
        }

        setSheetvisible(false)
    }
    const [imgloaded, setImageloaded] = useState(false)

    return (
        <div>
            <Sheet
                open={sheetVisible}
                onOpenChange={() => setSheetvisible(false)}
            >
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Create new bookmark</SheetTitle>
                    </SheetHeader>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-80"
                        >
                            <div>
                                <div className="flex justify-between mb-8 mt-3 max-w-full relative rounded-xl overflow-hidden">
                                    <div className=" flex items-end pb-3 gap-2 pl-3 pr-3 text-white h-20 w-full absolute smooth-black-gradient bottom-0">
                                        <span className="flex items-center gap-2 w-full">
                                            {imgloaded ? (
                                                <img
                                                    className=" w-4 max-w-[24px]"
                                                    alt={
                                                        bookMarkmetaData?.title
                                                    }
                                                    src={bookMarkmetaData?.icon}
                                                    onLoad={() => {
                                                        setImageloaded(true)
                                                        console.log(
                                                            'dsdsdsdsdsds'
                                                        )
                                                    }}
                                                />
                                            ) : (
                                                <Folder size={24} />
                                            )}

                                            <p className="truncate">
                                                {bookMarkmetaData?.url ??
                                                    bookMarkmetaData?.link}
                                            </p>
                                        </span>
                                    </div>
                                    <img
                                        className="w-full h-32 object-cover rounded-xl"
                                        alt={bookMarkmetaData?.title}
                                        src={bookMarkmetaData?.image}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="mb-4">
                                            <FormLabel>title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="https://..."
                                                    error={
                                                        form.formState.errors
                                                            ?.title
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="w-full" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="mb-4">
                                            <FormLabel>description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="description"
                                                    error={
                                                        form.formState.errors
                                                            ?.description
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="w-full" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="directoryId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Collection</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={(
                                                    bookMarkmetaData?.directoryId ??
                                                    auth?.user
                                                        ?.baseDirectoryId ??
                                                    ''
                                                ).toString()}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a parent or leave it blank" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="max-h-40 overflow-auto">
                                                    {treedata &&
                                                        Object.values(
                                                            treedata
                                                        )?.map((item) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={`${item.id}`}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <SheetFooter>
                                <Button
                                    size="sm"
                                    type="submit"
                                    className=" mt-6 "
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? (
                                        <Loader2
                                            className="animate-spin"
                                            size={16}
                                        />
                                    ) : edit ? (
                                        'Save'
                                    ) : (
                                        'Create'
                                    )}
                                </Button>
                            </SheetFooter>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default BookmarkSheet
