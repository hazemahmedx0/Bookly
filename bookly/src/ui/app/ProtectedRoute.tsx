import { Loader2 } from 'lucide-react'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const { isLoading, user, isAuthenticated } = useUser()

    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) {
                navigate('/login')
            }
        },
        [isAuthenticated, isLoading, navigate]
    )
    if (isLoading) return <Loader2 />

    // 4. If there IS a user, render the app
    if (isAuthenticated) return children
}

export default ProtectedRoute
