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

// React query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Shadcn
import { Toaster } from '@/components/ui/toaster'
import AuthRoutes from './ui/app/AuthRoutes'
import Unsorted from './pages/Unsorted'

// Sonner toast
import { Toaster as ToasterSonner } from 'sonner'

// Context
import { AuthProvider } from './context/auth'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1,
        },
    },
})

function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<Navigate replace to="all" />} />
                <Route path="all" element={<Allbookmarks />} />
                <Route path="unsorted" element={<Unsorted />} />
                <Route path="me/:collectionId" element={<Collection />} />
            </Route>

            <Route element={<AuthRoutes />}>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

function WrappedApp() {
    return (
        <>
            <AuthProvider>
                <ToasterSonner richColors={true} />
                <QueryClientProvider client={queryClient}>
                    <Toaster />
                    <BrowserRouter>
                        <App />
                        <Toaster />
                    </BrowserRouter>
                </QueryClientProvider>
            </AuthProvider>
        </>
    )
}

export default WrappedApp
