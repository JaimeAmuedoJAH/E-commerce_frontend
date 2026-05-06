import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'

const NavbarPublica = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
    const { carrito } = useCarrito()
    const totalItems = carrito?.totalItems ?? 0

    const handleNavLink = (id: string) => {
        if (window.location.pathname === '/') {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate(`/#${id}`)
            setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }
  

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={{
      background: '#0f1117', borderBottom: '0.5px solid #2e3244',
      padding: '0 2rem', height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <span style={{
          color: '#f0f0f0', fontSize: '22px', fontWeight: 700,
          letterSpacing: '6px',
        }}>
          NOIR
        </span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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
              color: '#9ca3af', fontSize: '13px', fontWeight: 400,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
            onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Acciones */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Carrito */}
                <button
                onClick={() => navigate('/carrito')}
                style={{
                    background: 'none', border: '0.5px solid #2e3244',
                    borderRadius: '8px', padding: '8px 12px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    color: '#9ca3af', fontSize: '13px',
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
                    background: '#1d9e75', color: '#fff',
                    borderRadius: '999px', padding: '1px 6px', fontSize: '11px', fontWeight: 600,
                    }}>
                    {totalItems}
                    </span>
                )}
                </button>

                {/* Nombre usuario */}
                <span style={{ color: '#6b7280', fontSize: '13px' }}>{user?.nombre}</span>

                {/* Salir */}
                <button
                onClick={() => { logout(); navigate('/login') }}
                style={{
                    background: 'none', border: '0.5px solid #2e3244',
                    borderRadius: '8px', padding: '8px 12px',
                    color: '#f87171', fontSize: '13px', cursor: 'pointer',
                }}
                >
                Salir
                </button>
            </div>
            ) : (
            <>
                <button
                onClick={() => navigate('/login')}
                style={{
                    background: 'none', border: '0.5px solid #2e3244',
                    borderRadius: '8px', padding: '8px 16px',
                    color: '#9ca3af', fontSize: '13px', cursor: 'pointer',
                }}
                >
                Iniciar sesión
                </button>
                <button
                onClick={() => navigate('/registro')}
                style={{
                    background: '#1d9e75', color: '#fff', border: 'none',
                    borderRadius: '8px', padding: '8px 16px',
                    fontSize: '13px', fontWeight: 500, cursor: 'pointer',
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

export default NavbarPublica