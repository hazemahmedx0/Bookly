import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Auth {
    user: any
}

interface AuthContextType {
    auth: Auth
    setAuth: React.Dispatch<React.SetStateAction<Auth>>
}

const AuthContext = createContext<AuthContextType>({
    auth: { user: null },
    setAuth: () => null,
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<Auth>({
        user: null,
    })
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
