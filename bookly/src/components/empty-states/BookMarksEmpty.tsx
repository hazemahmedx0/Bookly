import React from 'react'
import AddBookmark from '../../ui/bookmarks/addBookmark/AddBookmark'

function BookMarksEmpty() {
    return (
        <div className="text-xl col-span-4 w-full flex flex-col content-center justify-center items-center gap-5">
            <img
                src="../../../public/bookmakeEmptySVG.svg"
                width={200}
                alt=""
            />
            <p className="  text-zinc-500">No bookmarks</p>
            <p className=" text-base text-zinc-400">
                Click 'Add' to create your first bookmark!
            </p>
        </div>
    )
}

export default BookMarksEmpty
