import { Loader2 } from 'lucide-react'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../../context/auth'

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
    if (isLoading) return <Loader2 />

    // 4. If there IS a user, render the app
    if (isAuthenticated) {
        return children
    }
}

export default ProtectedRoute
