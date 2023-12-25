import { Outlet } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import SideNav from '../sidenav/SideNav'
function AppLayout() {
    return (
        <ProtectedRoute>
            <div className="grid grid-cols-[256px_1fr] grid-rows-1  h-screen">
                <SideNav />
                <Outlet />
            </div>
        </ProtectedRoute>
    )
}

export default AppLayout
