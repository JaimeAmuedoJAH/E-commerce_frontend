import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

const Carrito = () => {
  const navigate = useNavigate()
  const { carrito, loading, actualizarCantidad, eliminarProducto } = useCarrito()

  const total = carrito?.items.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad, 0
  ) ?? 0

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', padding: '2rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: '0.5px solid #2e3244',
            borderRadius: '8px', padding: '6px 12px',
            color: '#9ca3af', cursor: 'pointer', fontSize: '13px',
          }}
        >
          ← Volver
        </button>
        <h1 style={{ color: '#f0f0f0', fontSize: '22px', fontWeight: 500, margin: 0 }}>
          Mi carrito
        </h1>
      </div>

      {loading && <p style={{ color: '#6b7280', fontSize: '14px' }}>Cargando...</p>}

      {!loading && (!carrito || carrito.items.length === 0) && (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '1rem' }}>
            Tu carrito está vacío
          </p>
          <button
            onClick={() => navigate('/categorias')}
            style={{
              background: '#1d9e75', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '10px 2rem',
              fontSize: '14px', cursor: 'pointer',
            }}
          >
            Ir a comprar
          </button>
        </div>
      )}

      {carrito && carrito.items.length > 0 && (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Lista de items */}
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {carrito.items.map(item => (
              <div key={item.id} style={{
                background: '#1a1d27', border: '0.5px solid #2e3244',
                borderRadius: '12px', padding: '1rem',
                display: 'flex', gap: '1rem', alignItems: 'center',
              }}>
                {/* Imagen */}
                <div style={{
                  width: '70px', height: '70px', flexShrink: 0,
                  background: '#0f1117', borderRadius: '8px',
                  overflow: 'hidden', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  {item.producto.imagen ? (
                    <img src={item.producto.imagen} alt={item.producto.nombre}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke="#2e3244" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#f0f0f0', fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>
                    {item.producto.nombre}
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '12px', margin: '0 0 8px' }}>
                    {item.producto.color} · {item.producto.talla}
                  </p>
                  <p style={{ color: '#1d9e75', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                    {(item.producto.precio * item.cantidad).toFixed(2)} €
                  </p>
                </div>

                {/* Cantidad */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => actualizarCantidad(item.producto.id, item.cantidad - 1)}
                    style={{
                      width: '28px', height: '28px', background: '#0f1117',
                      border: '0.5px solid #2e3244', borderRadius: '6px',
                      color: '#f0f0f0', cursor: 'pointer', fontSize: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    −
                  </button>
                  <span style={{ color: '#f0f0f0', fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => actualizarCantidad(item.producto.id, item.cantidad + 1)}
                    style={{
                      width: '28px', height: '28px', background: '#0f1117',
                      border: '0.5px solid #2e3244', borderRadius: '6px',
                      color: '#f0f0f0', cursor: 'pointer', fontSize: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    +
                  </button>
                </div>

                {/* Eliminar */}
                <button
                  onClick={() => eliminarProducto(item.producto.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#f87171', padding: '4px',
                  }}
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
            width: '260px', background: '#1a1d27',
            border: '0.5px solid #2e3244', borderRadius: '12px', padding: '1.5rem',
          }}>
            <h2 style={{ color: '#f0f0f0', fontSize: '16px', fontWeight: 500, margin: '0 0 1rem' }}>
              Resumen
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#6b7280', fontSize: '13px' }}>Productos</span>
              <span style={{ color: '#f0f0f0', fontSize: '13px' }}>{carrito.totalItems}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              paddingTop: '1rem', borderTop: '0.5px solid #2e3244', marginTop: '1rem',
            }}>
              <span style={{ color: '#f0f0f0', fontSize: '15px', fontWeight: 500 }}>Total</span>
              <span style={{ color: '#1d9e75', fontSize: '18px', fontWeight: 700 }}>
                {total.toFixed(2)} €
              </span>
            </div>
            <button
              onClick={() => navigate('/pago')}
              style={{
                width: '100%', background: '#1d9e75', color: '#fff',
                border: 'none', borderRadius: '8px', padding: '11px',
                fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                marginTop: '1.5rem',
              }}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Carrito