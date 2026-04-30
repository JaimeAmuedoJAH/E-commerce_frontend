import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axiosConfig'

interface LoginResponseDTO {
  token: string
  usuario: {
    id: number
    nombre: string
    email: string
    rol: string
  }
}

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { data } = await api.post<LoginResponseDTO>('/usuarios/login', {
        email,
        password,
      })
      login(data.token, data.usuario)
      navigate('/categorias')
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        setError('Email o contraseña incorrectos')
      } else {
        setError('Error al conectar con el servidor')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: '#0f1117',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#1a1d27',
        border: '0.5px solid #2e3244',
        borderRadius: '16px',
        padding: '2rem 2rem',
        width: '100%',
        maxWidth: '360px',
      }}>
        {/* Logo */}
        <div style={{
          width: '36px', height: '36px',
          background: '#1d9e75',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.25rem',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
            <path d="M9 10h6M9 14h4"/>
          </svg>
        </div>

        <h1 style={{ color: '#f0f0f0', fontSize: '20px', fontWeight: 500, textAlign: 'center', margin: '0 0 4px' }}>
          Bienvenido
        </h1>
        <p style={{ color: '#6b7280', fontSize: '13px', textAlign: 'center', margin: '0 0 1.5rem' }}>
          Inicia sesión en tu cuenta
        </p>

        {error && (
          <div style={{
            background: '#2a1a1a', border: '0.5px solid #7f1d1d',
            borderRadius: '8px', padding: '10px 14px',
            fontSize: '13px', color: '#f87171', marginBottom: '1rem',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="juan@example.com"
              style={{
                width: '100%', boxSizing: 'border-box',
                background: '#0f1117', border: '0.5px solid #2e3244',
                borderRadius: '8px', padding: '9px 12px',
                fontSize: '13px', color: '#f0f0f0', outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = '#1d9e75'}
              onBlur={e => e.target.style.borderColor = '#2e3244'}
            />
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>
                Contraseña
            </label>
                <div style={{ position: 'relative' }}>
                    <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    style={{
                        width: '100%', boxSizing: 'border-box',
                        background: '#0f1117', border: '0.5px solid #2e3244',
                        borderRadius: '8px', padding: '9px 36px 9px 12px',
                        fontSize: '13px', color: '#f0f0f0', outline: 'none',
                    }}
                    onFocus={e => e.target.style.borderColor = '#1d9e75'}
                    onBlur={e => e.target.style.borderColor = '#2e3244'}
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        position: 'absolute', right: '10px', top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: 0, color: '#6b7280',
                    }}
                    >
                    {showPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                        </svg>
                    )}
                    </button>
                </div>
            </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', background: '#1d9e75',
              color: '#fff', border: 'none', borderRadius: '8px',
              padding: '10px', fontSize: '14px', fontWeight: 500,
              cursor: 'pointer', opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280', marginTop: '1rem' }}>
          ¿No tienes cuenta?{' '}
          <a href="/registro" style={{ color: '#1d9e75', textDecoration: 'none' }}>
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login