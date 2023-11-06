import { useUser } from '../../hooks/useUser'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import LoadingSpinner from '../loadingSkeletons/LoadingSpinner'

function AuthRoutes() {
    const navigate = useNavigate()
    const { isLoading, isAuthenticated } = useUser()

    useEffect(
        function () {
            if (isAuthenticated) navigate('/all')
        },
        [isAuthenticated, isLoading, navigate]
    )
    if (isLoading) return <LoadingSpinner />
    // if (true) return <LoadingSpinner />

    // 4. If there IS a user, render the app
    if (!isAuthenticated && !isLoading) return <Outlet />
}

export default AuthRoutes
