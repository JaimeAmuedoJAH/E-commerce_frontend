import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { theme } from '../styles/theme'

const Carrito = () => {
  const navigate = useNavigate()
  const { carrito, loading, actualizarCantidad, eliminarProducto } = useCarrito()

  const total = carrito?.items.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad, 0
  ) ?? 0

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.bg, padding: '2.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: theme.colors.accent, fontSize: '11px', letterSpacing: '4px', margin: '0 0 6px' }}>
            COMPRA
          </p>
          <h1 style={{ color: theme.colors.textPrimary, fontSize: '28px', fontWeight: 700, margin: 0, letterSpacing: '2px' }}>
            MI CARRITO
          </h1>
        </div>

        {loading && <p style={{ color: theme.colors.textMuted, fontSize: '14px' }}>Cargando...</p>}

        {!loading && (!carrito || carrito.items.length === 0) && (
          <div style={{
            textAlign: 'center', marginTop: '5rem',
            padding: '4rem 2rem',
            background: theme.colors.bgCard,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.xl,
          }}>
            <div style={{
              width: '64px', height: '64px',
              background: theme.colors.accentBg,
              border: `1px solid ${theme.colors.borderAccent}40`,
              borderRadius: theme.radius.xl,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: theme.colors.accent,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <h2 style={{ color: theme.colors.textPrimary, fontSize: '18px', fontWeight: 600, margin: '0 0 8px' }}>
              Tu carrito está vacío
            </h2>
            <p style={{ color: theme.colors.textSecondary, fontSize: '14px', margin: '0 0 2rem' }}>
              Explora nuestra colección y añade productos
            </p>
            <button
              onClick={() => navigate('/categorias')}
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
                color: '#fff', border: 'none',
                borderRadius: theme.radius.lg,
                padding: '12px 28px',
                fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', letterSpacing: '2px',
                boxShadow: theme.shadow.accent,
              }}
            >
              EXPLORAR TIENDA
            </button>
          </div>
        )}

        {carrito && carrito.items.length > 0 && (
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>

            {/* Lista items */}
            <div style={{ flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {carrito.items.map(item => (
                <div key={item.id} style={{
                  background: theme.colors.bgCard,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.xl,
                  padding: '1.25rem',
                  display: 'flex', gap: '1.25rem', alignItems: 'center',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = theme.colors.borderHover}
                  onMouseLeave={e => e.currentTarget.style.borderColor = theme.colors.border}
                >
                  {/* Imagen */}
                  <div style={{
                    width: '80px', height: '80px', flexShrink: 0,
                    background: theme.colors.bg,
                    borderRadius: theme.radius.lg,
                    overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${theme.colors.border}`,
                  }}>
                    {item.producto.imagen ? (
                      <img src={item.producto.imagen} alt={item.producto.nombre}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke={theme.colors.border} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <p style={{ color: theme.colors.textPrimary, fontSize: '14px', fontWeight: 600, margin: '0 0 4px' }}>
                      {item.producto.nombre}
                    </p>
                    <p style={{ color: theme.colors.textMuted, fontSize: '12px', margin: '0 0 10px' }}>
                      {item.producto.color} · {item.producto.talla}
                    </p>
                    <p style={{ color: theme.colors.accent, fontSize: '15px', fontWeight: 700, margin: 0 }}>
                      {(item.producto.precio * item.cantidad).toFixed(2)} €
                    </p>
                  </div>

                  {/* Cantidad */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => actualizarCantidad(item.producto.id, item.cantidad - 1)}
                      style={{
                        width: '30px', height: '30px',
                        background: theme.colors.bg,
                        border: `1px solid ${theme.colors.border}`,
                        borderRadius: theme.radius.md,
                        color: theme.colors.textPrimary,
                        cursor: 'pointer', fontSize: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = theme.colors.borderHover}
                      onMouseLeave={e => e.currentTarget.style.borderColor = theme.colors.border}
                    >
                      −
                    </button>
                    <span style={{ color: theme.colors.textPrimary, fontSize: '14px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                      {item.cantidad}
                    </span>
                    <button
                      onClick={() => actualizarCantidad(item.producto.id, item.cantidad + 1)}
                      style={{
                        width: '30px', height: '30px',
                        background: theme.colors.bg,
                        border: `1px solid ${theme.colors.border}`,
                        borderRadius: theme.radius.md,
                        color: theme.colors.textPrimary,
                        cursor: 'pointer', fontSize: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'border-color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = theme.colors.borderHover}
                      onMouseLeave={e => e.currentTarget.style.borderColor = theme.colors.border}
                    >
                      +
                    </button>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => eliminarProducto(item.producto.id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: theme.colors.textMuted, padding: '4px',
                      borderRadius: theme.radius.md,
                      transition: 'color 0.2s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = theme.colors.error}
                    onMouseLeave={e => e.currentTarget.style.color = theme.colors.textMuted}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Resumen */}
            <div style={{
              width: '280px', flexShrink: 0,
              background: theme.colors.bgCard,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.xl,
              padding: '1.5rem',
              position: 'sticky', top: '80px',
            }}>
              <h2 style={{ color: theme.colors.textPrimary, fontSize: '16px', fontWeight: 600, margin: '0 0 1.25rem', letterSpacing: '1px' }}>
                RESUMEN
              </h2>

              {carrito.items.map(item => (
                <div key={item.id} style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '8px',
                }}>
                  <span style={{ color: theme.colors.textMuted, fontSize: '13px' }}>
                    {item.producto.nombre} x{item.cantidad}
                  </span>
                  <span style={{ color: theme.colors.textSecondary, fontSize: '13px' }}>
                    {(item.producto.precio * item.cantidad).toFixed(2)} €
                  </span>
                </div>
              ))}

              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 0',
                borderTop: `1px solid ${theme.colors.border}`,
                marginTop: '0.75rem',
              }}>
                <span style={{ color: theme.colors.textPrimary, fontSize: '15px', fontWeight: 600 }}>Total</span>
                <span style={{ color: theme.colors.accent, fontSize: '22px', fontWeight: 800 }}>
                  {total.toFixed(2)} €
                </span>
              </div>

              <button
                onClick={() => navigate('/pago')}
                style={{
                  width: '100%',
                  background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
                  color: '#fff', border: 'none',
                  borderRadius: theme.radius.lg,
                  padding: '13px',
                  fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', letterSpacing: '2px',
                  boxShadow: theme.shadow.accent,
                  marginTop: '0.5rem',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                FINALIZAR COMPRA
              </button>

              <button
                onClick={() => navigate('/categorias')}
                style={{
                  width: '100%', background: 'none',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.lg,
                  padding: '11px',
                  fontSize: '13px', color: theme.colors.textSecondary,
                  cursor: 'pointer', letterSpacing: '1px',
                  marginTop: '0.75rem',
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
                SEGUIR COMPRANDO
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Carrito