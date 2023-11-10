import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import AddNewCollectionPlus from './header/AddNewCollectionPlus'
import { useUser } from '../../hooks/useUser'
function UserHeader() {
    const { user } = useUser()
    console.log(user)
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
                        {user?.user?.name}
                    </span>
                </div>
            </div>
            <AddNewCollectionPlus />
        </div>
    )
}

export default UserHeader
