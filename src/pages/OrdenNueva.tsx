import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'

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
    producto: { id: number; nombre: string; precio: number }
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
        clienteId: user.id,
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

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    background: '#0f1117', border: '0.5px solid #2e3244',
    borderRadius: '8px', padding: '9px 12px',
    fontSize: '13px', color: '#f0f0f0', outline: 'none',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', padding: '2rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/pago')}
          style={{
            background: 'none', border: '0.5px solid #2e3244',
            borderRadius: '8px', padding: '6px 12px',
            color: '#9ca3af', cursor: 'pointer', fontSize: '13px',
          }}
        >
          ← Volver
        </button>
        <h1 style={{ color: '#f0f0f0', fontSize: '22px', fontWeight: 500, margin: 0 }}>
          Confirmar pedido
        </h1>
      </div>

      {error && (
        <div style={{
          background: '#2a1a1a', border: '0.5px solid #7f1d1d',
          borderRadius: '8px', padding: '10px 14px',
          fontSize: '13px', color: '#f87171', marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>

        {/* Formulario dirección */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{
            background: '#1a1d27', border: '0.5px solid #2e3244',
            borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem',
          }}>
            <h2 style={{ color: '#f0f0f0', fontSize: '16px', fontWeight: 500, margin: '0 0 1rem' }}>
              Dirección de envío
            </h2>
            <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '6px' }}>
              Dirección completa
            </label>
            <textarea
              value={direccion}
              onChange={e => setDireccion(e.target.value)}
              placeholder="Calle, número, piso, ciudad, código postal..."
              rows={3}
              style={{ ...inputStyle, resize: 'none' }}
              onFocus={e => e.target.style.borderColor = '#1d9e75'}
              onBlur={e => e.target.style.borderColor = '#2e3244'}
            />
          </div>

          {/* Pago confirmado */}
          <div style={{
            background: '#0f2e24', border: '0.5px solid #1d9e75',
            borderRadius: '12px', padding: '1rem',
          }}>
            <p style={{ color: '#1d9e75', fontSize: '13px', fontWeight: 500, margin: '0 0 4px' }}>
              ✓ Pago procesado correctamente
            </p>
            <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
              Código de transacción: {codigoTransaccion}
            </p>
          </div>
        </div>

        {/* Resumen */}
        <div style={{
          width: '260px', background: '#1a1d27',
          border: '0.5px solid #2e3244', borderRadius: '12px', padding: '1.5rem',
        }}>
          <h2 style={{ color: '#f0f0f0', fontSize: '16px', fontWeight: 500, margin: '0 0 1rem' }}>
            Resumen
          </h2>
          {carrito?.items.map(item => (
            <div key={item.id} style={{
              display: 'flex', justifyContent: 'space-between', marginBottom: '8px',
            }}>
              <span style={{ color: '#6b7280', fontSize: '13px' }}>
                {item.producto.nombre} x{item.cantidad}
              </span>
              <span style={{ color: '#f0f0f0', fontSize: '13px' }}>
                {(item.producto.precio * item.cantidad).toFixed(2)} €
              </span>
            </div>
          ))}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingTop: '1rem', borderTop: '0.5px solid #2e3244', marginTop: '0.5rem',
          }}>
            <span style={{ color: '#f0f0f0', fontSize: '15px', fontWeight: 500 }}>Total</span>
            <span style={{ color: '#1d9e75', fontSize: '18px', fontWeight: 700 }}>
              {total?.toFixed(2)} €
            </span>
          </div>

          <button
            onClick={handleCrearOrden}
            disabled={loading || !direccion.trim()}
            style={{
              width: '100%', background: '#1d9e75', color: '#fff',
              border: 'none', borderRadius: '8px', padding: '11px',
              fontSize: '14px', fontWeight: 500, cursor: 'pointer',
              marginTop: '1.5rem',
              opacity: loading || !direccion.trim() ? 0.5 : 1,
            }}
          >
            {loading ? 'Creando pedido...' : 'Confirmar pedido'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrdenNueva