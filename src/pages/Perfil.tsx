import { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axiosConfig'
import { theme } from '../styles/theme'

interface UsuarioUpdateRequest {
  nombre?: string
  email?: string
  password?: string
  passwordActual?: string
  imagenPerfil?: string
}

const resizeImage = (file: File, maxSize: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = e => { img.src = e.target?.result as string }
    reader.onerror = reject
    reader.readAsDataURL(file)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > maxSize) { height = Math.round(height * maxSize / width); width = maxSize }
      } else {
        if (height > maxSize) { width = Math.round(width * maxSize / height); height = maxSize }
      }

      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', 0.8))
    }
    img.onerror = reject
  })
}

const Perfil = () => {
  const { user, login, token } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [nombre, setNombre] = useState(user?.nombre ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [passwordActual, setPasswordActual] = useState('')  // movido aquí dentro
  const [password, setPassword] = useState('')
  const [confirmarPassword, setConfirmarPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [imagenPreview, setImagenPreview] = useState<string | null>(user?.imagenPerfil ?? null)
  const [imagenBase64, setImagenBase64] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

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

  const refreshToken = localStorage.getItem('refreshToken') ?? ''

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar 5MB')
      return
    }

    try {
      const base64 = await resizeImage(file, 200)
      setImagenPreview(base64)
      setImagenBase64(base64)
      setError(null)
    } catch {
      setError('Error al procesar la imagen')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (password && password !== confirmarPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (password && password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (password && !passwordActual) {
      setError('Debes introducir tu contraseña actual para cambiarla')
      return
    }

    const body: UsuarioUpdateRequest = {}
    if (nombre !== user?.nombre) body.nombre = nombre
    if (email !== user?.email) body.email = email
    if (password) {
      body.password = password
      body.passwordActual = passwordActual
    }
    if (imagenBase64) body.imagenPerfil = imagenBase64

    if (Object.keys(body).length === 0) {
      setError('No has modificado ningún dato')
      return
    }

    setLoading(true)
    try {
      const { data } = await api.put(`/usuarios/update/${user?.publicId}`, body)
      if (token) {
        login(token, refreshToken, {
          ...user!,
          nombre: data.nombre,
          email: data.email,
          imagenPerfil: data.imagenPerfil,
        })
      }
      setSuccess('Perfil actualizado correctamente')
      setPassword('')
      setConfirmarPassword('')
      setPasswordActual('')
      setImagenBase64(null)
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError('Ya existe un usuario con ese email')
      } else if (err.response?.status === 401) {
        setError('La contraseña actual es incorrecta')
      } else {
        setError('Error al actualizar el perfil')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.colors.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        background: theme.colors.bgCard,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.xl,
        padding: '2.5rem',
        width: '100%',
        maxWidth: '440px',
        boxShadow: theme.shadow.card,
      }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: theme.colors.accent, fontSize: '11px', letterSpacing: '4px', margin: '0 0 6px' }}>
            CUENTA
          </p>
          <h1 style={{ color: theme.colors.textPrimary, fontSize: '22px', fontWeight: 700, margin: '0 0 4px', letterSpacing: '2px' }}>
            MI PERFIL
          </h1>
          <p style={{ color: theme.colors.textMuted, fontSize: '12px', margin: 0 }}>
            Modifica tus datos personales
          </p>
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '90px', height: '90px',
              borderRadius: theme.radius.full,
              border: `2px solid ${theme.colors.borderAccent}`,
              overflow: 'hidden', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: theme.colors.bg,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {imagenPreview ? (
              <img src={imagenPreview} alt="Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
                stroke={theme.colors.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            )}
          </div>
          <p style={{ color: theme.colors.textMuted, fontSize: '11px', marginTop: '8px' }}>
            Haz clic para cambiar la foto
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* Feedback */}
        {error && (
          <div style={{
            background: theme.colors.errorBg,
            border: `1px solid ${theme.colors.errorBorder}`,
            borderRadius: theme.radius.md,
            padding: '10px 14px', fontSize: '13px',
            color: theme.colors.error, marginBottom: '1.25rem',
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

        {success && (
          <div style={{
            background: theme.colors.accentBg,
            border: `1px solid ${theme.colors.borderAccent}`,
            borderRadius: theme.radius.md,
            padding: '10px 14px', fontSize: '13px',
            color: theme.colors.accent, marginBottom: '1.25rem',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500 }}>
              Nombre
            </label>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
              placeholder="Tu nombre" style={inputStyle}
              onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
              onBlur={e => e.target.style.borderColor = theme.colors.border} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500 }}>
              Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com" style={inputStyle}
              onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
              onBlur={e => e.target.style.borderColor = theme.colors.border} />
          </div>

          {/* Nueva contraseña */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500 }}>
              Nueva contraseña <span style={{ color: theme.colors.textMuted }}>(opcional)</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ ...inputStyle, paddingRight: '40px' }}
                onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                onBlur={e => e.target.style.borderColor = theme.colors.border}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: theme.colors.bgCard }}>
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

          {/* Contraseña actual y confirmar — solo visibles si se escribe nueva contraseña */}
          {password && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500 }}>
                  Contraseña actual
                </label>
                <input
                  type="password"
                  value={passwordActual}
                  onChange={e => setPasswordActual(e.target.value)}
                  placeholder="••••••••"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                  onBlur={e => e.target.style.borderColor = theme.colors.border}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500 }}>
                  Confirmar nueva contraseña
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmarPassword} onChange={e => setConfirmarPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    ...inputStyle,
                    borderColor: confirmarPassword && confirmarPassword !== password
                      ? theme.colors.error : theme.colors.border,
                  }}
                  onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                  onBlur={e => e.target.style.borderColor = theme.colors.border}
                />
              </div>
            </>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%',
            background: `linear-gradient(135deg, ${theme.colors.bg}, ${theme.colors.accentDark})`,
            color: '#fff', border: 'none',
            borderRadius: theme.radius.md,
            padding: '11px', fontSize: '13px', fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '1px', boxShadow: theme.shadow.accent,
            opacity: loading ? 0.6 : 1, transition: 'opacity 0.2s',
            marginTop: password ? 0 : '0.5rem',
          }}>
            {loading ? 'Guardando...' : 'GUARDAR CAMBIOS'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Perfil