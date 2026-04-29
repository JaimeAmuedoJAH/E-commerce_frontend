import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'

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
      await api.post('/usuarios/register', {
        nombre,
        email,
        password,
        rol: 'ROLE_USER',
      })
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

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    background: '#0f1117', border: '0.5px solid #2e3244',
    borderRadius: '8px', padding: '9px 36px 9px 12px',
    fontSize: '13px', color: '#f0f0f0', outline: 'none',
  }

  const toggleBtnStyle = {
    position: 'absolute' as const, right: '10px', top: '50%',
    transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer',
    padding: 0, color: '#6b7280',
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: '#0f1117',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        background: '#1a1d27', border: '0.5px solid #2e3244',
        borderRadius: '16px', padding: '2rem',
        width: '100%', maxWidth: '360px',
      }}>
        {/* Logo */}
        <div style={{
          width: '36px', height: '36px', background: '#1d9e75',
          borderRadius: '8px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', margin: '0 auto 1.25rem',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>

        <h1 style={{ color: '#f0f0f0', fontSize: '20px', fontWeight: 500, textAlign: 'center', margin: '0 0 4px' }}>
          Crear cuenta
        </h1>
        <p style={{ color: '#6b7280', fontSize: '13px', textAlign: 'center', margin: '0 0 1.5rem' }}>
          Regístrate para empezar a comprar
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
          {/* Nombre */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Juan Pérez"
              style={{ ...inputStyle, padding: '9px 12px' }}
              onFocus={e => e.target.style.borderColor = '#1d9e75'}
              onBlur={e => e.target.style.borderColor = '#2e3244'}
            />
          </div>

          {/* Email */}
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
              style={{ ...inputStyle, padding: '9px 12px' }}
              onFocus={e => e.target.style.borderColor = '#1d9e75'}
              onBlur={e => e.target.style.borderColor = '#2e3244'}
            />
          </div>

          {/* Contraseña */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Mínimo 6 caracteres"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#1d9e75'}
                onBlur={e => e.target.style.borderColor = '#2e3244'}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={toggleBtnStyle}>
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Confirmar contraseña */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>
              Confirmar contraseña
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Repite tu contraseña"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#1d9e75'}
                onBlur={e => e.target.style.borderColor = '#2e3244'}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={toggleBtnStyle}>
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
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
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#6b7280', marginTop: '1rem' }}>
          ¿Ya tienes cuenta?{' '}
          <a href="/login" style={{ color: '#1d9e75', textDecoration: 'none' }}>
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  )
}

export default Registro