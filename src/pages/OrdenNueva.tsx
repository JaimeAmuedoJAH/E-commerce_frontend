import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import { theme } from '../styles/theme'

interface OrdenResponse {
  id: number
  clienteId: number
  clienteNombre: string
  direccion: string
  total: number
  estado: string
  fechaCreacion: string
  codigoTransaccion: string
  items: {
    id: number
    producto: { id: number; nombre: string; imagen: string }
    cantidad: number
    precioUnitario: number
    subtotal: number
  }[]
}

const OrdenNueva = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { carrito, vaciarCarrito } = useCarrito()

  const { codigoTransaccion, total } = location.state || {}

  const [direccion, setDireccion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCrearOrden = async () => {
    if (!user || !carrito) return
    if (!direccion.trim()) { setError('Introduce una dirección de envío'); return }

    setError(null)
    setLoading(true)

    try {
      const items = carrito.items.map(item => ({
        productoId: item.producto.id,
        cantidad: item.cantidad,
        precioUnitario: item.producto.precio,
      }))

      const { data } = await api.post<OrdenResponse>('/ordenes/add', {
        clientePublicId: user.publicId,
        direccion,
        items,
        codigoTransaccion,
      })

      vaciarCarrito()
      navigate('/ordenes/confirmacion', { state: { orden: data } })
    } catch {
      setError('Error al crear la orden')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.bg, padding: '2.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/pago')}
            style={{
              background: theme.colors.bgCard,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.md,
              padding: '8px 14px',
              color: theme.colors.textSecondary,
              cursor: 'pointer', fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = theme.colors.borderHover}
            onMouseLeave={e => e.currentTarget.style.borderColor = theme.colors.border}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Volver
          </button>
          <div>
            <p style={{ color: theme.colors.accent, fontSize: '11px', letterSpacing: '4px', margin: '0 0 2px' }}>
              CHECKOUT
            </p>
            <h1 style={{ color: theme.colors.textPrimary, fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '2px' }}>
              CONFIRMAR PEDIDO
            </h1>
          </div>
        </div>

        {error && (
          <div style={{
            background: theme.colors.errorBg,
            border: `1px solid ${theme.colors.errorBorder}`,
            borderRadius: theme.radius.md,
            padding: '12px 16px',
            fontSize: '13px', color: theme.colors.error,
            marginBottom: '1.5rem',
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

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Formulario */}
          <div style={{ flex: 1, minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Pago confirmado */}
            <div style={{
              background: theme.colors.accentBg,
              border: `1px solid ${theme.colors.borderAccent}40`,
              borderRadius: theme.radius.xl,
              padding: '1.25rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div style={{
                width: '36px', height: '36px', flexShrink: 0,
                background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
                borderRadius: theme.radius.md,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <div>
                <p style={{ color: theme.colors.accent, fontSize: '13px', fontWeight: 600, margin: '0 0 2px' }}>
                  Pago procesado correctamente
                </p>
                <p style={{ color: theme.colors.textMuted, fontSize: '11px', margin: 0, fontFamily: 'monospace' }}>
                  {codigoTransaccion}
                </p>
              </div>
            </div>

            {/* Dirección */}
            <div style={{
              background: theme.colors.bgCard,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.xl,
              padding: '1.5rem',
            }}>
              <h2 style={{ color: theme.colors.textPrimary, fontSize: '15px', fontWeight: 600, margin: '0 0 1.25rem', letterSpacing: '1px' }}>
                DIRECCIÓN DE ENVÍO
              </h2>
              <label style={{ display: 'block', fontSize: '12px', color: theme.colors.textSecondary, marginBottom: '6px', fontWeight: 500 }}>
                Dirección completa
              </label>
              <textarea
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
                placeholder="Calle, número, piso, ciudad, código postal..."
                rows={3}
                style={{
                  width: '100%', boxSizing: 'border-box' as const,
                  background: theme.colors.bgInput,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.md,
                  padding: '10px 12px',
                  fontSize: '13px', color: theme.colors.textPrimary,
                  outline: 'none', resize: 'none' as const,
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                onBlur={e => e.target.style.borderColor = theme.colors.border}
              />
            </div>
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
            <h2 style={{ color: theme.colors.textPrimary, fontSize: '15px', fontWeight: 600, margin: '0 0 1.25rem', letterSpacing: '1px' }}>
              RESUMEN
            </h2>

            {carrito?.items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: theme.colors.textMuted, fontSize: '13px' }}>
                  {item.producto.nombre} x{item.cantidad}
                </span>
                <span style={{ color: theme.colors.textSecondary, fontSize: '13px' }}>
                  {(item.producto.precio * item.cantidad).toFixed(2)} €
                </span>
              </div>
            ))}

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1rem 0',
              borderTop: `1px solid ${theme.colors.border}`,
              marginTop: '0.75rem',
            }}>
              <span style={{ color: theme.colors.textPrimary, fontSize: '15px', fontWeight: 600 }}>Total</span>
              <span style={{ color: theme.colors.accent, fontSize: '22px', fontWeight: 800 }}>
                {total?.toFixed(2)} €
              </span>
            </div>

            <button
              onClick={handleCrearOrden}
              disabled={loading || !direccion.trim()}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
                color: '#fff', border: 'none',
                borderRadius: theme.radius.lg,
                padding: '13px',
                fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', letterSpacing: '2px',
                boxShadow: theme.shadow.accent,
                opacity: loading || !direccion.trim() ? 0.4 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {loading ? 'CREANDO PEDIDO...' : 'CONFIRMAR PEDIDO'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdenNueva