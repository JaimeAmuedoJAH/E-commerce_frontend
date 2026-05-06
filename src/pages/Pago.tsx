import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import type { Tarjeta, PagoResponse } from '../types'

const Pago = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { carrito } = useCarrito()

  const [tarjetas, setTarjetas] = useState<Tarjeta[]>([])
  const [tarjetaSeleccionada, setTarjetaSeleccionada] = useState<Tarjeta | null>(null)
  const [cvv, setCvv] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mostrarFormNueva, setMostrarFormNueva] = useState(false)

  // Form nueva tarjeta
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numeroTarjeta: '',
    titular: '',
    fechaExpiracion: '',
    cvv: '',
    saldo: '',
  })

  const total = carrito?.items.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad, 0
  ) ?? 0

  useEffect(() => {
    if (!user) return
    api.get<Tarjeta[]>(`/tarjetas/cliente/${user.id}`)
      .then(res => setTarjetas(res.data))
      .catch(() => setError('Error al cargar las tarjetas'))
  }, [user])

  const handlePagar = async () => {
    if (!tarjetaSeleccionada || !carrito || !user) return
    if (!cvv) { setError('Introduce el CVV'); return }

    setError(null)
    setLoading(true)

    try {
      const { data } = await api.post<PagoResponse>('/pagos/procesar', {
        carritoId: carrito.id,
        clienteId: user.id,
        numeroTarjeta: tarjetaSeleccionada.numeroTarjeta,
        fechaExpiracion: tarjetaSeleccionada.fechaExpiracion,
        cvv,
        titular: tarjetaSeleccionada.titular,
        monto: total,
      })

      if (data.exitoso) {
        navigate('/ordenes/nueva', { state: { codigoTransaccion: data.codigoTransaccion, total } })
      } else {
        setError(data.mensaje)
      }
    } catch {
      setError('Error al procesar el pago')
    } finally {
      setLoading(false)
    }
  }

  const handleAñadirTarjeta = async () => {
    if (!user) return
    setError(null)
    try {
      const { data } = await api.post<Tarjeta>('/tarjetas/add', {
        clienteId: user.id,
        ...nuevaTarjeta,
        saldo: parseFloat(nuevaTarjeta.saldo),
      })
      setTarjetas([...tarjetas, data])
      setMostrarFormNueva(false)
      setNuevaTarjeta({ numeroTarjeta: '', titular: '', fechaExpiracion: '', cvv: '', saldo: '' })
    } catch {
      setError('Error al añadir la tarjeta')
    }
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box' as const,
    background: '#0f1117', border: '0.5px solid #2e3244',
    borderRadius: '8px', padding: '9px 12px',
    fontSize: '13px', color: '#f0f0f0', outline: 'none',
  }

  const labelStyle = {
    display: 'block', fontSize: '12px',
    color: '#9ca3af', marginBottom: '6px',
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', padding: '2rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/carrito')}
          style={{
            background: 'none', border: '0.5px solid #2e3244',
            borderRadius: '8px', padding: '6px 12px',
            color: '#9ca3af', cursor: 'pointer', fontSize: '13px',
          }}
        >
          ← Volver
        </button>
        <h1 style={{ color: '#f0f0f0', fontSize: '22px', fontWeight: 500, margin: 0 }}>
          Pago
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

        {/* Tarjetas */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ color: '#f0f0f0', fontSize: '16px', fontWeight: 500, marginBottom: '1rem' }}>
            Tus tarjetas
          </h2>

          {tarjetas.length === 0 && !mostrarFormNueva && (
            <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '1rem' }}>
              No tienes tarjetas guardadas.
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
            {tarjetas.map(tarjeta => (
              <div
                key={tarjeta.id}
                onClick={() => { setTarjetaSeleccionada(tarjeta); setCvv('') }}
                style={{
                  background: tarjetaSeleccionada?.id === tarjeta.id ? '#0f2e24' : '#1a1d27',
                  border: `0.5px solid ${tarjetaSeleccionada?.id === tarjeta.id ? '#1d9e75' : '#2e3244'}`,
                  borderRadius: '12px', padding: '1rem',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ color: '#f0f0f0', fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>
                      •••• •••• •••• {tarjeta.numeroTarjeta.slice(-4)}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '12px', margin: '0 0 4px' }}>
                      {tarjeta.titular}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                      Caduca: {tarjeta.fechaExpiracion}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#1d9e75', fontSize: '14px', fontWeight: 600, margin: 0 }}>
                      {tarjeta.saldo.toFixed(2)} €
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '11px', margin: '4px 0 0' }}>
                      Saldo
                    </p>
                  </div>
                </div>

                {/* CVV si está seleccionada */}
                {tarjetaSeleccionada?.id === tarjeta.id && (
                  <div style={{ marginTop: '1rem' }} onClick={e => e.stopPropagation()}>
                    <label style={labelStyle}>CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={e => setCvv(e.target.value)}
                      placeholder="•••"
                      maxLength={4}
                      style={{ ...inputStyle, maxWidth: '100px' }}
                      onFocus={e => e.target.style.borderColor = '#1d9e75'}
                      onBlur={e => e.target.style.borderColor = '#2e3244'}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Añadir nueva tarjeta */}
          {!mostrarFormNueva ? (
            <button
              onClick={() => setMostrarFormNueva(true)}
              style={{
                background: 'none', border: '0.5px dashed #2e3244',
                borderRadius: '12px', padding: '0.75rem 1rem',
                color: '#6b7280', cursor: 'pointer', fontSize: '13px',
                width: '100%', textAlign: 'center',
              }}
            >
              + Añadir nueva tarjeta
            </button>
          ) : (
            <div style={{
              background: '#1a1d27', border: '0.5px solid #2e3244',
              borderRadius: '12px', padding: '1.25rem',
            }}>
              <h3 style={{ color: '#f0f0f0', fontSize: '14px', fontWeight: 500, margin: '0 0 1rem' }}>
                Nueva tarjeta
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <label style={labelStyle}>Número de tarjeta</label>
                  <input
                    type="text" maxLength={16} placeholder="1234567890123456"
                    value={nuevaTarjeta.numeroTarjeta}
                    onChange={e => setNuevaTarjeta({ ...nuevaTarjeta, numeroTarjeta: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#1d9e75'}
                    onBlur={e => e.target.style.borderColor = '#2e3244'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Titular</label>
                  <input
                    type="text" placeholder="Nombre Apellido"
                    value={nuevaTarjeta.titular}
                    onChange={e => setNuevaTarjeta({ ...nuevaTarjeta, titular: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#1d9e75'}
                    onBlur={e => e.target.style.borderColor = '#2e3244'}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Fecha expiración</label>
                    <input
                      type="text" placeholder="MM/AA"
                      value={nuevaTarjeta.fechaExpiracion}
                      onChange={e => setNuevaTarjeta({ ...nuevaTarjeta, fechaExpiracion: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#1d9e75'}
                      onBlur={e => e.target.style.borderColor = '#2e3244'}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>CVV</label>
                    <input
                      type="password" placeholder="•••" maxLength={4}
                      value={nuevaTarjeta.cvv}
                      onChange={e => setNuevaTarjeta({ ...nuevaTarjeta, cvv: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = '#1d9e75'}
                      onBlur={e => e.target.style.borderColor = '#2e3244'}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Saldo inicial (€)</label>
                  <input
                    type="number" placeholder="0.00"
                    value={nuevaTarjeta.saldo}
                    onChange={e => setNuevaTarjeta({ ...nuevaTarjeta, saldo: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#1d9e75'}
                    onBlur={e => e.target.style.borderColor = '#2e3244'}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={handleAñadirTarjeta}
                    style={{
                      flex: 1, background: '#1d9e75', color: '#fff',
                      border: 'none', borderRadius: '8px', padding: '10px',
                      fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                    }}
                  >
                    Guardar tarjeta
                  </button>
                  <button
                    onClick={() => setMostrarFormNueva(false)}
                    style={{
                      flex: 1, background: 'none', color: '#9ca3af',
                      border: '0.5px solid #2e3244', borderRadius: '8px', padding: '10px',
                      fontSize: '13px', cursor: 'pointer',
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
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
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '8px',
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
              {total.toFixed(2)} €
            </span>
          </div>

          <button
            onClick={handlePagar}
            disabled={!tarjetaSeleccionada || !cvv || loading}
            style={{
              width: '100%', background: '#1d9e75', color: '#fff',
              border: 'none', borderRadius: '8px', padding: '11px',
              fontSize: '14px', fontWeight: 500, cursor: 'pointer',
              marginTop: '1.5rem',
              opacity: !tarjetaSeleccionada || !cvv || loading ? 0.5 : 1,
            }}
          >
            {loading ? 'Procesando...' : `Pagar ${total.toFixed(2)} €`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pago