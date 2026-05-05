import { useLocation, useNavigate } from 'react-router-dom'

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
      minHeight: '100vh', background: '#0f1117',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
    }}>
      <div style={{
        background: '#1a1d27', border: '0.5px solid #2e3244',
        borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '480px',
        textAlign: 'center',
      }}>
        {/* Icono éxito */}
        <div style={{
          width: '56px', height: '56px', background: '#0f2e24',
          border: '0.5px solid #1d9e75', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="#1d9e75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h1 style={{ color: '#f0f0f0', fontSize: '22px', fontWeight: 600, margin: '0 0 8px' }}>
          ¡Pedido confirmado!
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 2rem' }}>
          Tu pedido ha sido creado correctamente.
        </p>

        {/* Detalles */}
        <div style={{
          background: '#0f1117', border: '0.5px solid #2e3244',
          borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6b7280', fontSize: '13px' }}>Nº de pedido</span>
            <span style={{ color: '#f0f0f0', fontSize: '13px' }}>#{orden.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6b7280', fontSize: '13px' }}>Estado</span>
            <span style={{ color: '#1d9e75', fontSize: '13px' }}>{orden.estado}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6b7280', fontSize: '13px' }}>Total</span>
            <span style={{ color: '#f0f0f0', fontSize: '13px', fontWeight: 600 }}>
              {orden.total.toFixed(2)} €
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#6b7280', fontSize: '13px' }}>Dirección</span>
            <span style={{ color: '#f0f0f0', fontSize: '13px', maxWidth: '200px', textAlign: 'right' }}>
              {orden.direccion}
            </span>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingTop: '8px', borderTop: '0.5px solid #2e3244',
          }}>
            <span style={{ color: '#6b7280', fontSize: '12px' }}>Cód. transacción</span>
            <span style={{ color: '#6b7280', fontSize: '11px', maxWidth: '200px', textAlign: 'right' }}>
              {orden.codigoTransaccion}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('/ordenes')}
            style={{
              flex: 1, background: 'none', color: '#9ca3af',
              border: '0.5px solid #2e3244', borderRadius: '8px', padding: '10px',
              fontSize: '13px', cursor: 'pointer',
            }}
          >
            Ver mis pedidos
          </button>
          <button
            onClick={() => navigate('/categorias')}
            style={{
              flex: 1, background: '#1d9e75', color: '#fff',
              border: 'none', borderRadius: '8px', padding: '10px',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            }}
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrdenConfirmacion