import { Plus } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function UserHeader() {
    return (
        <div className="flex flex-row justify-between items-center h-11">
            <div className="flex flex-row items-center gap-2 pl-2">
                <Avatar className=" w-6 h-6 ">
                    <AvatarImage
                        src="https://github.com/xshadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback className="bg-red-100 text-[10px]">
                        CN
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col ">
                    <span className="text-label-small text-zinc-950">
                        John Doe
                    </span>
                </div>
            </div>
            <div className=" transition-all w-6 h-6 flex bg-transparent justify-center items-center rounded-md hover:bg-gray-200 ">
                <Plus className="text-gray-700 w-5 h-5" />
            </div>
        </div>
    )
}

export default UserHeader
