import { HashRouter, Route, Routes } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

function App() {
    return (
        <>
            <Button>Click me</Button>

            <div className="grid w-full max-w-sm items-center gap-1.5 pl-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
            </div>

            <p className="text-display-X-small">Create an account</p>
            <p>Tedtrfd</p>
            <Routes>
                <Route path="/" element={<p>fdd</p>} />
            </Routes>
        </>
    )
}

function WrappedApp() {
    return (
        <HashRouter>
            <App />
        </HashRouter>
    )
}

export default WrappedApp
