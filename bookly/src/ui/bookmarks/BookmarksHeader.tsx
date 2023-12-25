import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Folder, Plus } from 'lucide-react'
import AddBookmark from './addBookmark/AddBookmark'

function BookmarksHeader() {
    return (
        <div className="w-full px-4 pt-3 border border-b pb-3">
            <div className="flex justify-between mb-4">
                <Input className=" max-w-xs" type="text" placeholder="Search" />
                <AddBookmark />
            </div>

            <div>
                <div className="flex text-gray-600 items-center gap-1.5">
                    {/* <Folder size={16} className="mr-1" /> */}
                    <span className=" ">All Bookmarks</span>
                </div>
            </div>
        </div>
    )
}

export default BookmarksHeader
