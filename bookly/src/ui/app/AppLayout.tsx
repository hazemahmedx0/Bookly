import { Outlet } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

function AppLayout() {
    return (
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    )
}

export default AppLayout
