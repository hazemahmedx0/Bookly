import { Archive, Bookmark, Trash, LucideIcon } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function MainCategories() {
    const list: Array<{
        name: string
        Icon: React.ReactElement
        link: string
    }> = [
        {
            name: 'All bookmarks',
            Icon: <Bookmark className=" w-4 h-4" />,
            link: '/all',
        },
        {
            name: 'Unsorted',
            Icon: <Archive className=" w-4 h-4" />,
            link: '/unsorted',
        },
        {
            name: 'Trash',
            Icon: <Trash className=" w-4 h-4" />,
            link: '/trash',
        },
    ]

    return (
        <ul className="">
            {list.map((item) => (
                <li key={item.name}>
                    <NavLink
                        to={item.link}
                        className={({ isActive }) =>
                            `text-zinc-600 flex flex-row gap-2 h-8 mb-1 px-2  items-center hover:bg-gray-200  transition-all rounded-md ${
                                isActive ? 'bg-gray-200 text-zinc-900 ' : ''
                            }`
                        }
                    >
                        {item.Icon} {item.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}

export default MainCategories
