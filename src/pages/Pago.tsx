import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import { theme } from '../styles/theme'
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
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numeroTarjeta: '', titular: '', fechaExpiracion: '', cvv: '', saldo: '',
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
    background: theme.colors.bgInput,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    padding: '9px 12px',
    fontSize: '13px', color: theme.colors.textPrimary, outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    display: 'block', fontSize: '12px',
    color: theme.colors.textSecondary,
    marginBottom: '6px', fontWeight: 500 as const,
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.bg, padding: '2.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/carrito')}
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
              PAGO
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

          {/* Tarjetas */}
          <div style={{ flex: 1, minWidth: '320px' }}>
            <h2 style={{
              color: theme.colors.textPrimary, fontSize: '15px',
              fontWeight: 600, margin: '0 0 1.25rem', letterSpacing: '1px',
            }}>
              TUS TARJETAS
            </h2>

            {tarjetas.length === 0 && !mostrarFormNueva && (
              <p style={{ color: theme.colors.textMuted, fontSize: '13px', marginBottom: '1rem' }}>
                No tienes tarjetas guardadas.
              </p>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              {tarjetas.map(tarjeta => (
                <div
                  key={tarjeta.id}
                  onClick={() => { setTarjetaSeleccionada(tarjeta); setCvv('') }}
                  style={{
                    background: tarjetaSeleccionada?.id === tarjeta.id
                      ? theme.colors.accentBg
                      : theme.colors.bgCard,
                    border: `1px solid ${tarjetaSeleccionada?.id === tarjeta.id
                      ? theme.colors.borderAccent
                      : theme.colors.border}`,
                    borderRadius: theme.radius.xl,
                    padding: '1.25rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    if (tarjetaSeleccionada?.id !== tarjeta.id)
                      e.currentTarget.style.borderColor = theme.colors.borderHover
                  }}
                  onMouseLeave={e => {
                    if (tarjetaSeleccionada?.id !== tarjeta.id)
                      e.currentTarget.style.borderColor = theme.colors.border
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      {/* Número tarjeta */}
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                        <div style={{
                          width: '28px', height: '18px',
                          background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
                          borderRadius: '3px',
                        }} />
                        <span style={{ color: theme.colors.textPrimary, fontSize: '14px', fontWeight: 600, letterSpacing: '2px' }}>
                          •••• •••• •••• {tarjeta.numeroTarjeta.slice(-4)}
                        </span>
                      </div>
                      <p style={{ color: theme.colors.textSecondary, fontSize: '12px', margin: '0 0 2px' }}>
                        {tarjeta.titular}
                      </p>
                      <p style={{ color: theme.colors.textMuted, fontSize: '11px', margin: 0 }}>
                        Caduca: {tarjeta.fechaExpiracion}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: theme.colors.accent, fontSize: '16px', fontWeight: 700, margin: '0 0 2px' }}>
                        {tarjeta.saldo.toFixed(2)} €
                      </p>
                      <p style={{ color: theme.colors.textMuted, fontSize: '11px', margin: 0 }}>
                        Saldo disponible
                      </p>
                    </div>
                  </div>

                  {tarjetaSeleccionada?.id === tarjeta.id && (
                    <div style={{ marginTop: '1rem' }} onClick={e => e.stopPropagation()}>
                      <div style={{
                        height: '1px', background: theme.colors.border,
                        margin: '0 0 1rem',
                      }} />
                      <label style={labelStyle}>CVV de seguridad</label>
                      <input
                        type="password" value={cvv}
                        onChange={e => setCvv(e.target.value)}
                        placeholder="•••" maxLength={4}
                        style={{ ...inputStyle, maxWidth: '120px' }}
                        onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                        onBlur={e => e.target.style.borderColor = theme.colors.border}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Nueva tarjeta */}
            {!mostrarFormNueva ? (
              <button
                onClick={() => setMostrarFormNueva(true)}
                style={{
                  background: 'none',
                  border: `1px dashed ${theme.colors.border}`,
                  borderRadius: theme.radius.xl,
                  padding: '1rem',
                  color: theme.colors.textMuted,
                  cursor: 'pointer', fontSize: '13px',
                  width: '100%', textAlign: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = theme.colors.borderAccent
                  e.currentTarget.style.color = theme.colors.accent
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = theme.colors.border
                  e.currentTarget.style.color = theme.colors.textMuted
                }}
              >
                + Añadir nueva tarjeta
              </button>
            ) : (
              <div style={{
                background: theme.colors.bgCard,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.xl,
                padding: '1.5rem',
              }}>
                <h3 style={{ color: theme.colors.textPrimary, fontSize: '14px', fontWeight: 600, margin: '0 0 1.25rem', letterSpacing: '1px' }}>
                  NUEVA TARJETA
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  <div>
                    <label style={labelStyle}>Número de tarjeta</label>
                    <input type="text" maxLength={16} placeholder="1234567890123456"
                      value={nuevaTarjeta.numeroTarjeta}
                      onChange={e => setNuevaTarjeta({ ...nuevaTarjeta, numeroTarjeta: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                      onBlur={e => e.target.style.borderColor = theme.colors.border}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Titular</label>
                    <input type="text" placeholder="Nombre Apellido"
                      value={nuevaTarjeta.titular}
                      onChange={e => setNuevaTarjeta({ ...nuevaTarjeta, titular: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                      onBlur={e => e.target.style.borderColor = theme.colors.border}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>Fecha expiración</label>
                      <input type="text" placeholder="MM/AA"
                        value={nuevaTarjeta.fechaExpiracion}
                        onChange={e => setNuevaTarjeta({ ...nuevaTarjeta, fechaExpiracion: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                        onBlur={e => e.target.style.borderColor = theme.colors.border}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={labelStyle}>CVV</label>
                      <input type="password" placeholder="•••" maxLength={4}
                        value={nuevaTarjeta.cvv}
                        onChange={e => setNuevaTarjeta({ ...nuevaTarjeta, cvv: e.target.value })}
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                        onBlur={e => e.target.style.borderColor = theme.colors.border}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Saldo inicial (€)</label>
                    <input type="number" placeholder="0.00"
                      value={nuevaTarjeta.saldo}
                      onChange={e => setNuevaTarjeta({ ...nuevaTarjeta, saldo: e.target.value })}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
                      onBlur={e => e.target.style.borderColor = theme.colors.border}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={handleAñadirTarjeta}
                      style={{
                        flex: 1,
                        background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
                        color: '#fff', border: 'none',
                        borderRadius: theme.radius.md,
                        padding: '10px', fontSize: '13px', fontWeight: 600,
                        cursor: 'pointer', letterSpacing: '1px',
                        boxShadow: theme.shadow.accent,
                      }}
                    >
                      GUARDAR
                    </button>
                    <button
                      onClick={() => setMostrarFormNueva(false)}
                      style={{
                        flex: 1, background: 'none',
                        border: `1px solid ${theme.colors.border}`,
                        borderRadius: theme.radius.md,
                        padding: '10px', fontSize: '13px',
                        color: theme.colors.textSecondary, cursor: 'pointer',
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
                {total.toFixed(2)} €
              </span>
            </div>

            {tarjetaSeleccionada && (
              <div style={{
                background: theme.colors.accentBg,
                border: `1px solid ${theme.colors.borderAccent}40`,
                borderRadius: theme.radius.md,
                padding: '10px 12px',
                marginBottom: '1rem',
                fontSize: '12px', color: theme.colors.accent,
              }}>
                💳 •••• {tarjetaSeleccionada.numeroTarjeta.slice(-4)} seleccionada
              </div>
            )}

            <button
              onClick={handlePagar}
              disabled={!tarjetaSeleccionada || !cvv || loading}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
                color: '#fff', border: 'none',
                borderRadius: theme.radius.lg,
                padding: '13px',
                fontSize: '13px', fontWeight: 600,
                cursor: 'pointer', letterSpacing: '2px',
                boxShadow: theme.shadow.accent,
                opacity: !tarjetaSeleccionada || !cvv || loading ? 0.4 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {loading ? 'PROCESANDO...' : `PAGAR ${total.toFixed(2)} €`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pago