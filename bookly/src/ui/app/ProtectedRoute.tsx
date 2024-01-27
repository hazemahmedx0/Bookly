import { Loader2 } from 'lucide-react'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../../context/auth'
import LogoGray from '../../assets/logogray.svg'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const { auth, setAuth } = useAuth()

    const { isLoading, user, isAuthenticated } = useUser()

    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) {
                navigate('/login')
            } else {
                setAuth({ user: user?.user })
            }
        },
        [isAuthenticated, isLoading, navigate, user, setAuth]
    )
    if (isLoading)
        return (
            <>
                <div className="w-full flex justify-center h-screen">
                    <img
                        src={LogoGray}
                        alt="Bookly"
                        width={60}
                        className="mb-8 animate-pulse "
                    />
                </div>
            </>
        )

    // 4. If there IS a user, render the app
    if (isAuthenticated) {
        return children
    }
}

export default ProtectedRoute
