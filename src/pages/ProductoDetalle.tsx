import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useCarrito } from '../context/CarritoContext'
import { theme } from '../styles/theme'
import type { Producto } from '../types'

const ProductoDetalle = () => {
  const { productoId } = useParams()
  const navigate = useNavigate()
  const { añadirProducto } = useCarrito()
  const [producto, setProducto] = useState<Producto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [agregado, setAgregado] = useState(false)
  const [cantidad, setCantidad] = useState(1)

  useEffect(() => {
    if (!productoId) {
      setError('ID de producto no proporcionado')
      setLoading(false)
      return
    }
    api.get<Producto>(`/productos/${productoId}`)
      .then(res => setProducto(res.data))
      .catch(() => setError('Error al cargar el producto'))
      .finally(() => setLoading(false))
  }, [productoId])

  const handleAñadir = async () => {
    if (!producto) return
    await añadirProducto(producto.id, cantidad)
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.bg, padding: '2.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Volver */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: theme.colors.bgCard,
            border: `1px solid ${theme.colors.border}`,
            borderRadius: theme.radius.md,
            padding: '8px 14px',
            color: theme.colors.textSecondary,
            cursor: 'pointer', fontSize: '13px',
            display: 'flex', alignItems: 'center', gap: '6px',
            marginBottom: '2rem',
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

        {loading && <p style={{ color: theme.colors.textMuted, fontSize: '14px' }}>Cargando...</p>}

        {error && (
          <div style={{
            background: theme.colors.errorBg, border: `1px solid ${theme.colors.errorBorder}`,
            borderRadius: theme.radius.md, padding: '12px 16px',
            fontSize: '13px', color: theme.colors.error,
          }}>
            {error}
          </div>
        )}

        {producto && (
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>

            {/* Imagen */}
            <div style={{
              width: '380px', height: '420px', flexShrink: 0,
              background: theme.colors.bgCard,
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.xl,
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {producto.imagen ? (
                <img src={producto.imagen} alt={producto.nombre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none"
                  stroke={theme.colors.border} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <p style={{ color: theme.colors.accent, fontSize: '11px', letterSpacing: '3px', margin: '0 0 8px' }}>
                {producto.categoriaNombre?.toUpperCase()}
              </p>
              <h1 style={{
                color: theme.colors.textPrimary, fontSize: '28px',
                fontWeight: 700, margin: '0 0 1rem', letterSpacing: '1px',
              }}>
                {producto.nombre}
              </h1>

              {/* Badges */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  background: theme.colors.bgCard,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.full,
                  padding: '4px 12px',
                  fontSize: '12px', color: theme.colors.textSecondary,
                }}>
                  Talla: {producto.talla}
                </span>
                <span style={{
                  background: theme.colors.bgCard,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.full,
                  padding: '4px 12px',
                  fontSize: '12px', color: theme.colors.textSecondary,
                }}>
                  Color: {producto.color}
                </span>
                <span style={{
                  background: producto.stock > 0 ? theme.colors.accentBg : theme.colors.errorBg,
                  border: `1px solid ${producto.stock > 0 ? theme.colors.borderAccent + '40' : theme.colors.errorBorder}`,
                  borderRadius: theme.radius.full,
                  padding: '4px 12px',
                  fontSize: '12px',
                  color: producto.stock > 0 ? theme.colors.accent : theme.colors.error,
                }}>
                  {producto.stock > 0 ? `${producto.stock} disponibles` : 'Sin stock'}
                </span>
              </div>

              <p style={{
                color: theme.colors.textSecondary, fontSize: '14px',
                lineHeight: 1.9, marginBottom: '2rem',
              }}>
                {producto.descripcion}
              </p>

              {/* Precio */}
              <div style={{
                background: theme.colors.bgCard,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.lg,
                padding: '1.25rem',
                marginBottom: '1.5rem',
              }}>
                <p style={{ color: theme.colors.textMuted, fontSize: '12px', margin: '0 0 4px', letterSpacing: '1px' }}>
                  PRECIO
                </p>
                <span style={{ color: theme.colors.accent, fontSize: '32px', fontWeight: 800 }}>
                  {producto.precio.toFixed(2)} €
                </span>
              </div>

              {/* Cantidad */}
              {producto.stock > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <p style={{ color: theme.colors.textSecondary, fontSize: '13px', margin: 0 }}>Cantidad:</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      style={{
                        width: '32px', height: '32px',
                        background: theme.colors.bgCard,
                        border: `1px solid ${theme.colors.border}`,
                        borderRadius: theme.radius.md,
                        color: theme.colors.textPrimary,
                        cursor: 'pointer', fontSize: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      −
                    </button>
                    <span style={{ color: theme.colors.textPrimary, fontSize: '15px', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>
                      {cantidad}
                    </span>
                    <button
                      onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                      style={{
                        width: '32px', height: '32px',
                        background: theme.colors.bgCard,
                        border: `1px solid ${theme.colors.border}`,
                        borderRadius: theme.radius.md,
                        color: theme.colors.textPrimary,
                        cursor: 'pointer', fontSize: '16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Botón añadir */}
              <button
                onClick={handleAñadir}
                disabled={producto.stock === 0}
                style={{
                  width: '100%',
                  background: agregado
                    ? theme.colors.accentBg
                    : producto.stock > 0
                      ? `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`
                      : theme.colors.bgCard,
                  color: agregado ? theme.colors.accent : producto.stock > 0 ? '#fff' : theme.colors.textMuted,
                  border: `1px solid ${agregado ? theme.colors.borderAccent : producto.stock > 0 ? 'transparent' : theme.colors.border}`,
                  borderRadius: theme.radius.lg,
                  padding: '14px',
                  fontSize: '13px', fontWeight: 600, cursor: producto.stock > 0 ? 'pointer' : 'not-allowed',
                  letterSpacing: '2px',
                  boxShadow: producto.stock > 0 && !agregado ? theme.shadow.accent : 'none',
                  transition: 'all 0.3s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
              >
                {agregado ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    AÑADIDO AL CARRITO
                  </>
                ) : producto.stock > 0 ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    AÑADIR AL CARRITO
                  </>
                ) : (
                  'SIN STOCK'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductoDetalle