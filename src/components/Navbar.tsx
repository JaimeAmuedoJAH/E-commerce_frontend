import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const { carrito } = useCarrito()

  const totalItems = carrito?.totalItems ?? 0

  const navLink = (path: string, label: string) => (
    <button
      onClick={() => navigate(path)}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: '13px', padding: '6px 12px', borderRadius: '8px',
        color: location.pathname === path ? '#1d9e75' : '#9ca3af',
        fontWeight: location.pathname === path ? 600 : 400,
      }}
    >
      {label}
    </button>
  )

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav style={{
      background: '#1a1d27', borderBottom: '0.5px solid #2e3244',
      padding: '0 2rem', height: '56px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/categorias')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
      >
        <div style={{
          width: '28px', height: '28px', background: '#1d9e75',
          borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
            <path d="M9 10h6M9 14h4"/>
          </svg>
        </div>
        <span style={{ color: '#f0f0f0', fontSize: '15px', fontWeight: 600 }}>E-commerce</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {navLink('/categorias', 'Categorías')}
        {navLink('/ordenes', 'Mis pedidos')}
      </div>

      {/* Derecha */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

        {/* Carrito */}
        <button
          onClick={() => navigate('/carrito')}
          style={{
            background: 'none', border: '0.5px solid #2e3244',
            borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
            color: location.pathname === '/carrito' ? '#1d9e75' : '#9ca3af',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span style={{ fontSize: '13px' }}>Carrito</span>
          {totalItems > 0 && (
            <span style={{
              background: '#1d9e75', color: '#fff',
              borderRadius: '999px', padding: '1px 6px', fontSize: '11px', fontWeight: 600,
            }}>
              {totalItems}
            </span>
          )}
        </button>

        {/* Usuario */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#6b7280', fontSize: '13px' }}>{user?.nombre}</span>
          <button
            onClick={handleLogout}
            style={{
              background: 'none', border: '0.5px solid #2e3244',
              borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
              color: '#f87171', fontSize: '13px',
            }}
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar