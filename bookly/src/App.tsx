// React router dom
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// LAYOUT
import AppLayout from './ui/app/AppLayout'

//  404 Not Found
import PageNotFound from './pages/PageNotFound'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Allbookmarks from './pages/Allbookmarks'
import Collection from './pages/Collection'

function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="all" />} />
                <Route path="all" element={<Allbookmarks />} />
                <Route path="me/:collectionId" element={<Collection />} />
            </Route>

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

function WrappedApp() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}

export default WrappedApp
