import { createContext, useContext, useEffect, useState, type ReactNode} from 'react'
import api from '../api/axiosConfig'

interface User {
    publicId: string
    nombre: string
    email: string
    rol: string
    imagenPerfil?: string
}

interface AuthContextType {
    user: User | null
    token: string | null
    login: (token: string, refreshToken: string, user: User) => void
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
    const [token, setToken] = useState<string | null>(() => {
        const stored = localStorage.getItem('token')
        if (!stored || stored === 'undefined' || stored === 'null') return null
        return stored
    })

    const [user, setUser] = useState<User | null>(() => {
        try {
            const stored = localStorage.getItem('user')
            if (!stored || stored === 'undefined' || stored === 'null') return null
            return JSON.parse(stored)
        } catch {
            localStorage.removeItem('user')
            return null
        }
    })

    const login = (token: string, refreshToken: string, user: User) => {
        setToken(token)
        setUser(user)
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = () => {
        api.post('/auth/logout').catch(() => {}) 
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
    }

    useEffect(() => {
        if (!token) return

        if (isTokenExpired(token)) {
            logout()
            return
        }

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