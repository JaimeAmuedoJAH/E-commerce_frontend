import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import { theme } from '../styles/theme'

interface OrdenItem {
  id: number
  producto: { id: number; nombre: string; imagen: string }
  cantidad: number
  precioUnitario: number
  subtotal: number
}

interface Orden {
  id: number
  clienteId: number
  clienteNombre: string
  direccion: string
  total: number
  estado: string
  fechaCreacion: string
  codigoTransaccion: string
  items: OrdenItem[]
}

const estadoConfig: Record<string, { color: string; bg: string; border: string }> = {
  PENDIENTE: { color: '#f59e0b', bg: '#f59e0b12', border: '#f59e0b40' },
  CONFIRMADA: { color: '#3b82f6', bg: '#3b82f612', border: '#3b82f640' },
  ENVIADA: { color: '#8b5cf6', bg: '#8b5cf612', border: '#8b5cf640' },
  ENTREGADA: { color: theme.colors.accent, bg: theme.colors.accentBg, border: `${theme.colors.borderAccent}40` },
  CANCELADA: { color: theme.colors.error, bg: theme.colors.errorBg, border: theme.colors.errorBorder },
}

const Ordenes = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [ordenes, setOrdenes] = useState<Orden[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ordenAbierta, setOrdenAbierta] = useState<number | null>(null)

  useEffect(() => {
    if (!user) return
    api.get<Orden[]>(`/ordenes/cliente/${user.id}`)
      .then(res => setOrdenes(res.data))
      .catch(() => setError('Error al cargar los pedidos'))
      .finally(() => setLoading(false))
  }, [user])

  const formatFecha = (fecha: string) => new Date(fecha).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.bg, padding: '2.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: theme.colors.accent, fontSize: '11px', letterSpacing: '4px', margin: '0 0 6px' }}>
            CUENTA
          </p>
          <h1 style={{ color: theme.colors.textPrimary, fontSize: '28px', fontWeight: 700, margin: 0, letterSpacing: '2px' }}>
            MIS PEDIDOS
          </h1>
        </div>

        {loading && <p style={{ color: theme.colors.textMuted, fontSize: '14px' }}>Cargando...</p>}

        {error && (
          <div style={{
            background: theme.colors.errorBg,
            border: `1px solid ${theme.colors.errorBorder}`,
            borderRadius: theme.radius.md,
            padding: '12px 16px',
            fontSize: '13px', color: theme.colors.error,
          }}>
            {error}
          </div>
        )}

        {!loading && !error && ordenes.length === 0 && (
          <div style={{
            textAlign: 'center', marginTop: '4rem',
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
              margin: '0 auto 1.5rem', color: theme.colors.accent,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <h2 style={{ color: theme.colors.textPrimary, fontSize: '18px', fontWeight: 600, margin: '0 0 8px' }}>
              No tienes pedidos todavía
            </h2>
            <p style={{ color: theme.colors.textSecondary, fontSize: '14px', margin: '0 0 2rem' }}>
              Explora nuestra colección y realiza tu primer pedido
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {ordenes.map(orden => {
            const cfg = estadoConfig[orden.estado] || estadoConfig.PENDIENTE
            const abierta = ordenAbierta === orden.id
            return (
              <div key={orden.id} style={{
                background: theme.colors.bgCard,
                border: `1px solid ${abierta ? theme.colors.borderAccent : theme.colors.border}`,
                borderRadius: theme.radius.xl,
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}>

                {/* Cabecera */}
                <div
                  onClick={() => setOrdenAbierta(abierta ? null : orden.id)}
                  style={{
                    padding: '1.25rem 1.5rem', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      color: theme.colors.textMuted, fontSize: '13px', fontWeight: 500,
                    }}>
                      Pedido #{orden.id}
                    </span>
                    <span style={{
                      background: cfg.bg,
                      color: cfg.color,
                      border: `1px solid ${cfg.border}`,
                      borderRadius: theme.radius.full,
                      padding: '3px 10px', fontSize: '11px', fontWeight: 600,
                      letterSpacing: '1px',
                    }}>
                      {orden.estado}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ color: theme.colors.textMuted, fontSize: '12px' }}>
                      {formatFecha(orden.fechaCreacion)}
                    </span>
                    <span style={{ color: theme.colors.accent, fontSize: '16px', fontWeight: 700 }}>
                      {orden.total.toFixed(2)} €
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={theme.colors.textMuted} strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: abierta ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </div>

                {/* Detalle expandible */}
                {abierta && (
                  <div style={{ borderTop: `1px solid ${theme.colors.border}`, padding: '1.5rem' }}>

                    {/* Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                      {orden.items.map(item => (
                        <div key={item.id} style={{
                          display: 'flex', justifyContent: 'space-between',
                          alignItems: 'center', gap: '1rem',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{
                              width: '44px', height: '44px',
                              background: theme.colors.bg,
                              border: `1px solid ${theme.colors.border}`,
                              borderRadius: theme.radius.md,
                              overflow: 'hidden',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0,
                            }}>
                              {item.producto.imagen ? (
                                <img src={item.producto.imagen} alt={item.producto.nombre}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                  stroke={theme.colors.border} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                                  <circle cx="8.5" cy="8.5" r="1.5"/>
                                  <polyline points="21 15 16 10 5 21"/>
                                </svg>
                              )}
                            </div>
                            <div>
                              <p style={{ color: theme.colors.textPrimary, fontSize: '13px', fontWeight: 500, margin: '0 0 2px' }}>
                                {item.producto.nombre}
                              </p>
                              <p style={{ color: theme.colors.textMuted, fontSize: '12px', margin: 0 }}>
                                x{item.cantidad} · {item.precioUnitario.toFixed(2)} € / ud
                              </p>
                            </div>
                          </div>
                          <span style={{ color: theme.colors.textPrimary, fontSize: '13px', fontWeight: 600 }}>
                            {item.subtotal.toFixed(2)} €
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Info adicional */}
                    <div style={{
                      borderTop: `1px solid ${theme.colors.border}`,
                      paddingTop: '1rem',
                      display: 'flex', flexDirection: 'column', gap: '6px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: theme.colors.textMuted, fontSize: '12px' }}>Dirección</span>
                        <span style={{ color: theme.colors.textSecondary, fontSize: '12px', maxWidth: '300px', textAlign: 'right' }}>
                          {orden.direccion}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: theme.colors.textMuted, fontSize: '12px' }}>Cód. transacción</span>
                        <span style={{ color: theme.colors.textMuted, fontSize: '11px', fontFamily: 'monospace' }}>
                          {orden.codigoTransaccion}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Ordenes