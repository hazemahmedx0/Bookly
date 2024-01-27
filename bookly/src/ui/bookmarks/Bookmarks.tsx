import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowUpRightSquare, Plus, Trash } from 'lucide-react'
import { useDeleteBookmark } from '../../hooks/useDeleteBookmark'
import BookMarksEmpty from '../../components/empty-states/BookMarksEmpty'
import BookmarkSheet from './addBookmark/BookmarkSheet'
import { useState } from 'react'

function Bookmarks({
    AllBookmarks,
    isLoading,
}: {
    AllBookmarks: any
    isLoading: boolean
}) {
    const { isDeleting, deleteBookmark } = useDeleteBookmark()

    const [sheetVisible, setSheetvisible] = useState(false)
    const [bookMarkmetaData, setBookMarkmetaData] = useState({})

    const numberArray = Array.from({ length: 12 }, (_, index) => index + 1)

    const openSheet = (item: any) => {
        setBookMarkmetaData(item)
        setSheetvisible(true)
    }

    if (isLoading)
        return (
            <main className="grid mainGrid gap-4 px-4 pt-4 pb-60 h-full overflow-y-scroll">
                {numberArray?.map((item: number) => (
                    <article
                        key={item}
                        role="listitem"
                        className="flex flex-col max-h-80  relative border rounded-lg overflow-clip hover:shadow-sm hover:border-neutral-300 transition-all "
                    >
                        <div className="  h-60 overflow-clip relative border-b">
                            <Skeleton className=" h-full w-full" />
                        </div>
                        <div className="gap-2 content-start flex flex-col flex-1  pt-3 px-3 pb-3 h-full justify-between ">
                            <Skeleton className=" h-4 w-full" />
                            <Skeleton className=" h-4 w-full" />
                        </div>
                    </article>
                ))}
            </main>
        )

    return (
        <>
            <BookmarkSheet
                sheetVisible={sheetVisible}
                setSheetvisible={setSheetvisible}
                bookMarkmetaData={bookMarkmetaData}
                edit={true}
            />
            <main className="grid mainGrid gap-4 px-4 pt-4 pb-60 h-full overflow-y-scroll">
                {AllBookmarks?.length === 0 && <BookMarksEmpty />}
                {AllBookmarks?.map(
                    (item: {
                        id: number | string | null | undefined
                        image: string | undefined
                        title: string | null | undefined
                        description: string | null | undefined
                        link: string | undefined
                    }) => (
                        <article
                            key={item.id}
                            role="listitem"
                            className="group flex flex-col h-full  max-h-80 relative border rounded-lg overflow-clip hover:shadow-sm hover:border-neutral-300 transition-all"
                        >
                            <div className="h-60 overflow-clip border-b relative">
                                <div className=" h-auto z-10  hidden group-hover:flex gap-2 absolute left-2 top-2 ">
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        title="Delete"
                                        data-button="delete"
                                        onClick={() => {
                                            deleteBookmark([item.id as number])
                                        }}
                                    >
                                        <Trash size={16} />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="outline"
                                        title="Open in new tab"
                                        data-button="new_tab"
                                        onClick={() => {
                                            window.open(item.link, '_blank')
                                        }}
                                    >
                                        <ArrowUpRightSquare size={16} />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        title="edit"
                                        data-button="edit"
                                        onClick={() => {
                                            openSheet(item)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </div>
                                <img
                                    src={item?.image}
                                    alt=""
                                    className="w-full h-full  object-cover  "
                                />{' '}
                            </div>
                            <div className="gap-2 content-start flex flex-col flex-1  pt-3 px-3 pb-3 h-full justify-between ">
                                <span className="text-base line-clamp-2">
                                    {item?.title}
                                </span>
                                <span className="text-sm text-gray-500 truncate">
                                    {item?.description}
                                </span>
                            </div>
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                tabIndex="0"
                                data-tab-index="0"
                                className="urlBookmark"
                            >
                                ss
                            </a>
                        </article>
                    )
                )}
            </main>
        </>
    )
}

export default Bookmarks
