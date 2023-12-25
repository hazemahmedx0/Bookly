import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

// React hook form & zod
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Folder, Plus, Loader2 } from 'lucide-react'
import bookmarkApi from '../../../api/modules/bookmark.api'
import BookmarkSheet from './BookmarkSheet'

// SignUp
export const urlinput = z.object({
    url: z.string().url({ message: 'Please enter a valid url' }),
})

export type urlForm = z.infer<typeof urlinput>

function AddBookmark() {
    const [sheetVisible, setSheetvisible] = useState(false)
    const [bookMarkmetaData, setBookMarkmetaData] = useState({} as any)

    // 1. form definition
    const form = useForm<urlForm>({
        resolver: zodResolver(urlinput),
        defaultValues: {
            url: '',
        },
    })

    // 2. form submit handler
    const onSubmit = async (data: urlForm) => {
        console.log(data)
        const { response, err } = await bookmarkApi.getMetaData(data.url)

        if (response) {
            setBookMarkmetaData(response.data)
            setSheetvisible(true)
        }
        if (err) {
            console.log(err)
        }
    }

    return (
        <>
            <BookmarkSheet
                sheetVisible={sheetVisible}
                setSheetvisible={setSheetvisible}
                bookMarkmetaData={bookMarkmetaData}
            />
            <Popover>
                <PopoverTrigger asChild>
                    <Button size="sm" variant="outline" className="px-4">
                        Add
                        <Plus size={16} className="ml-1" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-80"
                        >
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Url</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="https://..."
                                                error={
                                                    form.formState.errors?.url
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="w-full" />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button
                                    size="sm"
                                    type="submit"
                                    className=" mt-6 m;-auto"
                                    disabled={form.formState.isSubmitting}
                                >
                                    {form.formState.isSubmitting ? (
                                        <Loader2
                                            className="animate-spin"
                                            size={16}
                                        />
                                    ) : (
                                        'Save'
                                    )}{' '}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </PopoverContent>
            </Popover>
        </>
    )
}

export default AddBookmark
