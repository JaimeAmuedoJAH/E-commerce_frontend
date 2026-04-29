import { createContext, useContext, useState, type ReactNode} from 'react'

interface User  {
    id: number
    nombre: string
    email: string
    rol:string
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (token: string, user: User) => void
    logout: () => void
    isAuthenticaded: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: {children: ReactNode}) => {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    )
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem('user')
        return stored ? JSON.parse(stored) : null
    })

    const login = (token: string, user: User) => {
        setToken(token)
        setUser(user)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{user, token, login, logout, isAuthenticaded: !!token}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuth debe usarte dentro de AuthProvider')
    return context
}