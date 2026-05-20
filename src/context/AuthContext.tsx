import { createContext, useContext, useEffect, useState, type ReactNode} from 'react'

interface User  {
    publicId: string
    nombre: string
    email: string
    rol:string
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (token: string, user: User) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.exp * 1000 < Date.now()
  } catch {
    return true
  }
}



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

    useEffect(() => {
    if (!token) return

    // Comprobar inmediatamente
    if (isTokenExpired(token)) {
        logout()
        return
    }

    // Comprobar cada minuto
    const interval = setInterval(() => {
        if (isTokenExpired(token)) {
        logout()
        }
    }, 60000)

    return () => clearInterval(interval)
    }, [token])

    return (
        <AuthContext.Provider value={{user, token, login, logout, isAuthenticated: !!token}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuth debe usarte dentro de AuthProvider')
    return context
}