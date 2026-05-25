import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axiosConfig'
import { theme } from '../styles/theme'

interface LoginResponseDTO {
  token: string
  refreshToken: string
  usuario: {
    publicId: string
    nombre: string
    email: string
    rol: string
    imagenPerfil?: string
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
      const { data } = await api.post<LoginResponseDTO>('/usuarios/login', { email, password })
      login(data.token, data.refreshToken, data.usuario)
      navigate('/')
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

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box' as const,
    background: theme.colors.bg,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    padding: '10px 14px',
    fontSize: '13px',
    color: theme.colors.textPrimary,
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: theme.colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Blobs decorativos */}
      <div style={{
        position: 'absolute', top: '10%', left: '10%',
        width: '300px', height: '300px',
        borderRadius: '50%',
        background: `rgba(109, 110, 143, 0.08)`,
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '8%', right: '8%',
        width: '250px', height: '250px',
        borderRadius: '50%',
        background: `rgba(81, 92, 242, 0.1)`,
        filter: 'blur(70px)',
        pointerEvents: 'none',
      }} />

      {/* Tarjeta */}
      <div style={{
        background: theme.colors.bgCard,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.xl,
        padding: '2.5rem',
        width: '100%',
        maxWidth: '380px',
        boxShadow: theme.shadow.card,
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px', height: '48px',
            borderRadius: theme.radius.lg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: theme.shadow.accent,
            overflow: 'hidden',
            background: theme.colors.bg,
          }}>
            <img
              src={new URL('../assets/Logo_noir.png', import.meta.url).href}
              alt="NOIR logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <span style={{
            color: theme.colors.textPrimary, fontSize: '20px',
            fontWeight: 700, letterSpacing: '6px', display: 'block',
          }}>
            NOIR
          </span>
          <span style={{
            color: theme.colors.textMuted, fontSize: '10px',
            letterSpacing: '3px', display: 'block', marginTop: '2px',
          }}>
            VISTE EL SILENCIO
          </span>
        </div>

        <h1 style={{
          color: theme.colors.textPrimary, fontSize: '18px',
          fontWeight: 600, textAlign: 'center', margin: '0 0 4px',
        }}>
          Bienvenido de nuevo
        </h1>
        <p style={{
          color: theme.colors.textSecondary, fontSize: '13px',
          textAlign: 'center', margin: '0 0 1.75rem',
        }}>
          Inicia sesión en tu cuenta
        </p>

        {error && (
          <div style={{
            background: theme.colors.errorBg,
            border: `1px solid ${theme.colors.errorBorder}`,
            borderRadius: theme.radius.md,
            padding: '10px 14px',
            fontSize: '13px', color: theme.colors.error,
            marginBottom: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block', fontSize: '12px',
              color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500,
            }}>
              Email
            </label>
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              required placeholder="juan@example.com"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block', fontSize: '12px',
              color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500,
            }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: '40px' }}
                onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                onBlur={e => e.target.style.borderColor = theme.colors.border}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '10px', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: 0, color: theme.colors.textMuted,
                }}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${theme.colors.bg}, ${theme.colors.accentDark})`,
              color: '#fff', border: 'none',
              borderRadius: theme.radius.md,
              padding: '11px', fontSize: '13px', fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '1px',
              boxShadow: theme.shadow.accent,
              opacity: loading ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Entrando...' : 'INICIAR SESIÓN'}
          </button>
        </form>

        <p style={{
          textAlign: 'center', fontSize: '12px',
          color: theme.colors.textMuted, marginTop: '1.25rem',
        }}>
          ¿No tienes cuenta?{' '}
          <a
            href="/registro"
            style={{ color: theme.colors.accent, textDecoration: 'none', fontWeight: 500 }}
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login