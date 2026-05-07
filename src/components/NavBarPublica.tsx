import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import { theme } from '../styles/theme'

const NavBarPublica = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const { carrito } = useCarrito()
  const totalItems = carrito?.totalItems ?? 0

  const handleNavLink = (id: string) => {
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  return (
    <nav style={{
      background: `${theme.colors.bg}ee`,
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${theme.colors.border}`,
      padding: '0 2.5rem',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div style={{
          width: '32px', height: '32px',
          background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
          borderRadius: theme.radius.md,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: theme.shadow.accent,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.73V7l8 5v1H3v-1l8-5V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/>
          </svg>
        </div>
        <span style={{
          color: theme.colors.textPrimary,
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '5px',
        }}>
          NOIR
        </span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {[
          { label: 'Inicio', action: () => handleNavLink('inicio') },
          { label: 'Productos', action: () => handleNavLink('productos') },
          { label: 'Mis pedidos', action: () => isAuthenticated ? navigate('/ordenes') : navigate('/login') },
          { label: 'Acerca de', action: () => handleNavLink('acerca') },
        ].map(link => (
          <button
            key={link.label}
            onClick={link.action}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: theme.colors.textSecondary,
              fontSize: '13px', fontWeight: 400,
              padding: '6px 14px', borderRadius: theme.radius.md,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = theme.colors.textPrimary
              e.currentTarget.style.background = theme.colors.bgCard
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = theme.colors.textSecondary
              e.currentTarget.style.background = 'none'
            }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Acciones */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isAuthenticated ? (
          <>
            {/* Carrito */}
            <button
              onClick={() => navigate('/carrito')}
              style={{
                background: theme.colors.bgCard,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                padding: '7px 14px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '7px',
                color: theme.colors.textSecondary,
                fontSize: '13px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = theme.colors.borderAccent
                e.currentTarget.style.color = theme.colors.accent
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme.colors.border
                e.currentTarget.style.color = theme.colors.textSecondary
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Carrito
              {totalItems > 0 && (
                <span style={{
                  background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
                  color: '#fff',
                  borderRadius: theme.radius.full,
                  padding: '1px 7px',
                  fontSize: '11px',
                  fontWeight: 700,
                }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Nombre */}
            <span style={{
              color: theme.colors.textMuted,
              fontSize: '13px',
              padding: '0 4px',
            }}>
              {user?.nombre}
            </span>

            {/* Salir */}
            <button
              onClick={() => { logout(); navigate('/Login') }}
              style={{
                background: 'none',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                padding: '7px 14px',
                color: theme.colors.error,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = theme.colors.errorBg
                e.currentTarget.style.borderColor = theme.colors.error
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.borderColor = theme.colors.border
              }}
            >
              Salir
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              style={{
                background: 'none',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                padding: '7px 16px',
                color: theme.colors.textSecondary,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = theme.colors.borderHover
                e.currentTarget.style.color = theme.colors.textPrimary
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme.colors.border
                e.currentTarget.style.color = theme.colors.textSecondary
              }}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate('/registro')}
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
                border: 'none',
                borderRadius: theme.radius.md,
                padding: '7px 16px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: theme.shadow.accent,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBarPublica