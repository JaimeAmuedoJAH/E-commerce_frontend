import { useLocation, useNavigate } from 'react-router-dom'
import { theme } from '../styles/theme'

const OrdenConfirmacion = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { orden } = location.state || {}

  if (!orden) {
    navigate('/categorias')
    return null
  }

  return (
    <div style={{
      minHeight: '100vh', background: theme.colors.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Fondo decorativo */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translateX(-50%)',
        width: '500px', height: '500px',
        background: `radial-gradient(circle, ${theme.colors.accent}06 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        background: theme.colors.bgCard,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.xl,
        padding: '3rem 2.5rem',
        width: '100%', maxWidth: '500px',
        textAlign: 'center',
        boxShadow: theme.shadow.card,
        position: 'relative',
      }}>

        {/* Icono éxito */}
        <div style={{
          width: '64px', height: '64px',
          background: theme.colors.accentBg,
          border: `1px solid ${theme.colors.borderAccent}40`,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: theme.shadow.accent,
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
            stroke={theme.colors.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <p style={{ color: theme.colors.accent, fontSize: '11px', letterSpacing: '4px', margin: '0 0 8px' }}>
          PEDIDO CONFIRMADO
        </p>
        <h1 style={{ color: theme.colors.textPrimary, fontSize: '24px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '2px' }}>
          ¡GRACIAS POR TU COMPRA!
        </h1>
        <p style={{ color: theme.colors.textSecondary, fontSize: '14px', margin: '0 0 2rem', lineHeight: 1.6 }}>
          Tu pedido ha sido confirmado y está siendo procesado.
        </p>

        {/* Detalles */}
        <div style={{
          background: theme.colors.bg,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radius.lg,
          padding: '1.25rem',
          marginBottom: '2rem',
          textAlign: 'left',
        }}>
          {[
            { label: 'Nº de pedido', value: `#${orden.id}` },
            { label: 'Estado', value: orden.estado, accent: true },
            { label: 'Total', value: `${orden.total.toFixed(2)} €`, bold: true },
            { label: 'Dirección', value: orden.direccion },
          ].map(row => (
            <div key={row.label} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '10px',
            }}>
              <span style={{ color: theme.colors.textMuted, fontSize: '12px' }}>{row.label}</span>
              <span style={{
                color: row.accent ? theme.colors.accent : row.bold ? theme.colors.textPrimary : theme.colors.textSecondary,
                fontSize: '13px',
                fontWeight: row.bold ? 700 : 400,
                maxWidth: '240px', textAlign: 'right',
              }}>
                {row.value}
              </span>
            </div>
          ))}

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: '10px', borderTop: `1px solid ${theme.colors.border}`,
          }}>
            <span style={{ color: theme.colors.textMuted, fontSize: '12px' }}>Cód. transacción</span>
            <span style={{
              color: theme.colors.textMuted, fontSize: '11px',
              fontFamily: 'monospace', maxWidth: '240px', textAlign: 'right',
            }}>
              {orden.codigoTransaccion}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('/ordenes')}
            style={{
              flex: 1, background: 'none',
              border: `1px solid ${theme.colors.border}`,
              borderRadius: theme.radius.lg,
              padding: '11px',
              color: theme.colors.textSecondary,
              fontSize: '12px', cursor: 'pointer', letterSpacing: '1px',
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
            VER PEDIDOS
          </button>
          <button
            onClick={() => navigate('/categorias')}
            style={{
              flex: 1,
              background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentDark})`,
              color: '#fff', border: 'none',
              borderRadius: theme.radius.lg,
              padding: '11px',
              fontSize: '12px', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '1px',
              boxShadow: theme.shadow.accent,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            SEGUIR COMPRANDO
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrdenConfirmacion