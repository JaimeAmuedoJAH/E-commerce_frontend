import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { theme } from '../styles/theme'

const Registro = () => {
  const navigate = useNavigate()

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    try {
      await api.post('/usuarios/register', { nombre, email, password, rol: 'ROLE_USER' })
      navigate('/login')
    } catch (err: any) {
      if (err.response?.status === 400) {
        setError(err.response.data?.message || 'Datos incorrectos')
      } else {
        setError('Error en el servidor. Inténtalo de nuevo más tarde.')
      }
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    background: theme.colors.bgInput,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    padding: '10px 14px',
    fontSize: '13px', color: theme.colors.textPrimary, outline: 'none',
    transition: 'border-color 0.2s',
  }

  const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )

  const EyeOffIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  )

  const toggleBtnStyle = {
    position: 'absolute' as const, right: '10px', top: '50%',
    transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer',
    padding: 0, color: theme.colors.textMuted,
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: theme.colors.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Fondo decorativo */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: '500px', height: '500px',
        background: `radial-gradient(circle, ${theme.colors.accent}06 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        background: theme.colors.bgCard,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.xl,
        padding: '2.5rem',
        width: '100%', maxWidth: '380px',
        boxShadow: theme.shadow.card,
        position: 'relative',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '48px', height: '48px',
            background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
            borderRadius: theme.radius.lg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: theme.shadow.accent,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
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
          Crear cuenta
        </h1>
        <p style={{
          color: theme.colors.textSecondary, fontSize: '13px',
          textAlign: 'center', margin: '0 0 1.75rem',
        }}>
          Regístrate para empezar a comprar
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
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500 }}>
              Nombre
            </label>
            <input
              type="text" value={nombre}
              onChange={e => setNombre(e.target.value)}
              required placeholder="Juan Pérez"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500 }}>
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

          {/* Contraseña */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500 }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required placeholder="Mínimo 6 caracteres"
                style={{ ...inputStyle, paddingRight: '40px' }}
                onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                onBlur={e => e.target.style.borderColor = theme.colors.border}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={toggleBtnStyle}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500 }}>
              Confirmar contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required placeholder="Repite tu contraseña"
                style={{ ...inputStyle, paddingRight: '40px' }}
                onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                onBlur={e => e.target.style.borderColor = theme.colors.border}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={toggleBtnStyle}>
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            style={{
              width: '100%',
              background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
              color: '#fff', border: 'none',
              borderRadius: theme.radius.md,
              padding: '11px', fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '1px',
              boxShadow: theme.shadow.accent,
              opacity: loading ? 0.6 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            {loading ? 'Creando cuenta...' : 'CREAR CUENTA'}
          </button>
        </form>

        <p style={{
          textAlign: 'center', fontSize: '12px',
          color: theme.colors.textMuted, marginTop: '1.25rem',
        }}>
          ¿Ya tienes cuenta?{' '}
          <a href="/login" style={{ color: theme.colors.accent, textDecoration: 'none', fontWeight: 500 }}>
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  )
}

export default Registro