import { Skeleton } from '@/components/ui/skeleton'
import LogoGray from '../../assets/logogray.svg'

function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center space-y-1 h-screen">
            <img
                src={LogoGray}
                alt="Bookly"
                width={60}
                className="mb-8 animate-pulse  "
            />
            <div className="space-y-3">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-8 w-[200px]" />
            </div>
        </div>
    )
}

export default LoadingSpinner
