import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import { theme } from '../styles/theme'
import '../styles/components.css'

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
    <nav className="navbar" style={{
      background: `linear-gradient(90deg, ${theme.colors.bgNav} 0%, #1a2234 100%)`,
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid rgba(102, 126, 234, 0.1)`,
      padding: '0 2.5rem',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    }}>

      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        className="hover-scale"
      >
        <div style={{
          width: '32px', height: '32px',
          background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
          borderRadius: theme.radius.md,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(102, 126, 234, 0.2)',
          transition: 'all 300ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 40px rgba(102, 126, 234, 0.4)'
          e.currentTarget.style.transform = 'rotate(-5deg) scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.2)'
          e.currentTarget.style.transform = 'rotate(0) scale(1)'
        }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.73V7l8 5v1H3v-1l8-5V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/>
          </svg>
        </div>
        <span style={{
          color: '#f1f5f9',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '5px',
          background: 'linear-gradient(135deg, #667eea 0%, #f5576c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          transition: 'all 300ms ease',
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
            className="navbar-link"
            style={{
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: '#94a3b8',
              fontSize: '14px', 
              fontWeight: 500,
              padding: '8px 16px', 
              borderRadius: theme.radius.md,
              transition: 'color 300ms ease',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#667eea'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#94a3b8'
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
                background: 'transparent',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                padding: '7px 14px',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '7px',
                color: theme.colors.textMuted,
                fontSize: '13px',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
              }}
              className="hover-lift"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#667eea'
                e.currentTarget.style.color = '#667eea'
                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme.colors.border
                e.currentTarget.style.color = theme.colors.textMuted
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.boxShadow = 'none'
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
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: '#fff',
                  borderRadius: theme.radius.full,
                  padding: '2px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}>
                  {totalItems}
                </span>
              )}
            </button>

            {/* Nombre */}
            <span style={{
              color: '#94a3b8',
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
                color: '#f87171',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="hover-lift"
              onMouseEnter={e => {
                e.currentTarget.style.background = '#fee2e2'
                e.currentTarget.style.borderColor = '#dc2626'
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
                background: 'transparent',
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                padding: '7px 16px',
                color: theme.colors.textMuted,
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="hover-lift"
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#667eea'
                e.currentTarget.style.color = '#667eea'
                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme.colors.border
                e.currentTarget.style.color = theme.colors.textMuted
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate('/registro')}
              style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                border: 'none',
                borderRadius: theme.radius.md,
                padding: '7px 16px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              className="hover-lift"
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)'
              }}
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