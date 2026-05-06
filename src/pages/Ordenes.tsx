import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'

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

const estadoColor: Record<string, string> = {
  PENDIENTE: '#f59e0b',
  CONFIRMADA: '#3b82f6',
  ENVIADA: '#8b5cf6',
  ENTREGADA: '#1d9e75',
  CANCELADA: '#f87171',
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

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit', month: 'long', year: 'numeric',
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', padding: '2rem' }}>
      <h1 style={{ color: '#f0f0f0', fontSize: '22px', fontWeight: 500, marginBottom: '1.5rem' }}>
        Mis pedidos
      </h1>

      {loading && <p style={{ color: '#6b7280', fontSize: '14px' }}>Cargando...</p>}

      {error && (
        <div style={{
          background: '#2a1a1a', border: '0.5px solid #7f1d1d',
          borderRadius: '8px', padding: '10px 14px',
          fontSize: '13px', color: '#f87171',
        }}>
          {error}
        </div>
      )}

      {!loading && !error && ordenes.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '1rem' }}>
            No tienes pedidos todavía.
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {ordenes.map(orden => (
          <div key={orden.id} style={{
            background: '#1a1d27', border: '0.5px solid #2e3244',
            borderRadius: '12px', overflow: 'hidden',
          }}>
            {/* Cabecera */}
            <div
              onClick={() => setOrdenAbierta(ordenAbierta === orden.id ? null : orden.id)}
              style={{
                padding: '1rem 1.25rem', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                flexWrap: 'wrap', gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#6b7280', fontSize: '13px' }}>
                  Pedido #{orden.id}
                </span>
                <span style={{
                  background: estadoColor[orden.estado] + '20',
                  color: estadoColor[orden.estado],
                  border: `0.5px solid ${estadoColor[orden.estado]}`,
                  borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: 600,
                }}>
                  {orden.estado}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ color: '#6b7280', fontSize: '12px' }}>
                  {formatFecha(orden.fechaCreacion)}
                </span>
                <span style={{ color: '#1d9e75', fontSize: '15px', fontWeight: 700 }}>
                  {orden.total.toFixed(2)} €
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: ordenAbierta === orden.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
            </div>

            {/* Detalle expandible */}
            {ordenAbierta === orden.id && (
              <div style={{ borderTop: '0.5px solid #2e3244', padding: '1.25rem' }}>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                  {orden.items.map(item => (
                    <div key={item.id} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '40px', height: '40px', background: '#0f1117',
                          borderRadius: '6px', overflow: 'hidden',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {item.producto.imagen ? (
                            <img src={item.producto.imagen} alt={item.producto.nombre}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                              stroke="#2e3244" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2"/>
                              <circle cx="8.5" cy="8.5" r="1.5"/>
                              <polyline points="21 15 16 10 5 21"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <p style={{ color: '#f0f0f0', fontSize: '13px', margin: '0 0 2px' }}>
                            {item.producto.nombre}
                          </p>
                          <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                            x{item.cantidad} · {item.precioUnitario.toFixed(2)} € / ud
                          </p>
                        </div>
                      </div>
                      <span style={{ color: '#f0f0f0', fontSize: '13px', fontWeight: 500 }}>
                        {item.subtotal.toFixed(2)} €
                      </span>
                    </div>
                  ))}
                </div>

                {/* Info adicional */}
                <div style={{
                  borderTop: '0.5px solid #2e3244', paddingTop: '1rem',
                  display: 'flex', flexDirection: 'column', gap: '6px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>Dirección</span>
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>{orden.direccion}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280', fontSize: '12px' }}>Cód. transacción</span>
                    <span style={{ color: '#6b7280', fontSize: '11px' }}>{orden.codigoTransaccion}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Ordenes