import React from 'react'
import sampleData from './bookmarksData.json'
function Bookmarks() {
    return (
        // <div className="grid grid-cols-4 auto-rows-auto gap-4 px-4 pt-4 h-[calc(100vh+102px)] overflow-y-scroll">
        <main className="grid mainGrid gap-4 px-4 pt-4 pb-60 h-full overflow-y-scroll">
            {sampleData.map((item) => (
                <article
                    role="listitem"
                    className="flex flex-col h-full relative border rounded-lg overflow-clip"
                >
                    <div className="  h-60 overflow-clip relative border-b">
                        <img
                            src={item.img}
                            alt=""
                            className="w-full h-full  object-cover  "
                        />{' '}
                    </div>
                    <div className="gap-2 content-start flex flex-col flex-1  pt-3 px-3 pb-3 h-full justify-between ">
                        <span className="text-base line-clamp-2">
                            {item.name}
                        </span>
                        <span className="text-sm text-gray-500">
                            {item.description}
                        </span>
                    </div>
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabindex="0"
                        data-tab-index="0"
                        className="urlBookmark"
                    >
                        ss
                    </a>
                </article>
            ))}
        </main>
    )
}

export default Bookmarks
