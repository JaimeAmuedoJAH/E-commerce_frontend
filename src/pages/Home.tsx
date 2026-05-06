import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NavbarPublica from '../components/NavBarPublica'

const categorias = [
  { nombre: 'Camisetas', icono: '👕' },
  { nombre: 'Pantalones', icono: '👖' },
  { nombre: 'Accesorios', icono: '👜' },
  { nombre: 'Calzado', icono: '👟' },
]

const Home = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleIrProductos = () => {
    if (isAuthenticated) {
      navigate('/categorias')
    } else {
      navigate('/login')
    }
  }

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh' }}>
      <NavbarPublica />

      {/* Hero */}
      <section id="inicio" style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '4rem 2rem', textAlign: 'center',
      }}>
        <p style={{ color: '#1d9e75', fontSize: '13px', letterSpacing: '4px', marginBottom: '1.5rem' }}>
          NUEVA COLECCIÓN 2026
        </p>

        {/* Logo con percha */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}>
          <svg width="clamp(32px, 5vw, 64px)" height="clamp(32px, 5vw, 64px)" viewBox="0 0 24 24" fill="none"
            stroke="#1d9e75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.73V7l8 5v1H3v-1l8-5V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/>
          </svg>
          <h1 style={{
            color: '#f0f0f0', fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700, letterSpacing: '12px', margin: 0,
            lineHeight: 1.1,
          }}>
            NOIR
          </h1>
        </div>

        <p style={{ color: '#6b7280', fontSize: '11px', letterSpacing: '4px', margin: '0 0 1rem' }}>
          VISTE EL SILENCIO
        </p>

        <p style={{
          color: '#6b7280', fontSize: '16px', maxWidth: '480px',
          lineHeight: 1.8, margin: '0 0 2.5rem',
        }}>
          Moda minimalista para quienes buscan elegancia sin esfuerzo.
          Prendas diseñadas para durar.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={handleIrProductos}
            style={{
              background: '#1d9e75', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '14px 32px',
              fontSize: '14px', fontWeight: 500, cursor: 'pointer',
              letterSpacing: '1px',
            }}
          >
            EXPLORAR COLECCIÓN
          </button>
          <button
            onClick={() => document.getElementById('acerca')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'none', color: '#9ca3af',
              border: '0.5px solid #2e3244',
              borderRadius: '8px', padding: '14px 32px',
              fontSize: '14px', cursor: 'pointer',
              letterSpacing: '1px',
            }}
          >
            SABER MÁS
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{ marginTop: '4rem', color: '#2e3244' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>

      {/* Productos / Categorías */}
      <section id="productos" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ color: '#1d9e75', fontSize: '12px', letterSpacing: '4px', marginBottom: '1rem', textAlign: 'center' }}>
          COLECCIONES
        </p>
        <h2 style={{
          color: '#f0f0f0', fontSize: '32px', fontWeight: 600,
          textAlign: 'center', margin: '0 0 3rem', letterSpacing: '2px',
        }}>
          NUESTROS PRODUCTOS
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1rem',
        }}>
          {categorias.map(cat => (
            <div
              key={cat.nombre}
              onClick={handleIrProductos}
              style={{
                background: '#1a1d27', border: '0.5px solid #2e3244',
                borderRadius: '12px', padding: '2rem',
                cursor: 'pointer', textAlign: 'center',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#1d9e75')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#2e3244')}
            >
              <div style={{ fontSize: '40px', marginBottom: '1rem' }}>{cat.icono}</div>
              <h3 style={{ color: '#f0f0f0', fontSize: '14px', fontWeight: 500, margin: '0 0 8px', letterSpacing: '2px' }}>
                {cat.nombre.toUpperCase()}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
                Ver colección →
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            onClick={handleIrProductos}
            style={{
              background: 'none', color: '#1d9e75',
              border: '0.5px solid #1d9e75',
              borderRadius: '8px', padding: '12px 32px',
              fontSize: '13px', cursor: 'pointer', letterSpacing: '2px',
            }}
          >
            VER TODAS LAS CATEGORÍAS
          </button>
        </div>
      </section>

      {/* Acerca de */}
      <section id="acerca" style={{
        padding: '6rem 2rem',
        borderTop: '0.5px solid #2e3244',
        maxWidth: '700px', margin: '0 auto', textAlign: 'center',
      }}>
        <p style={{ color: '#1d9e75', fontSize: '12px', letterSpacing: '4px', marginBottom: '1rem' }}>
          NUESTRA HISTORIA
        </p>
        <h2 style={{
          color: '#f0f0f0', fontSize: '32px', fontWeight: 600,
          margin: '0 0 1.5rem', letterSpacing: '2px',
        }}>
          ACERCA DE NOIR
        </h2>
        <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.9, marginBottom: '1rem' }}>
          NOIR nació de la idea de que la moda no tiene que ser complicada.
          Creemos en prendas atemporales, materiales de calidad y un diseño
          que habla por sí solo.
        </p>
        <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: 1.9, marginBottom: '2.5rem' }}>
          Cada pieza de nuestra colección está pensada para adaptarse a cualquier
          momento del día, combinando comodidad y estilo sin compromiso.
        </p>
        <button
          onClick={handleIrProductos}
          style={{
            background: '#1d9e75', color: '#fff', border: 'none',
            borderRadius: '8px', padding: '14px 32px',
            fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            letterSpacing: '2px',
          }}
        >
          DESCUBRIR LA COLECCIÓN
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '0.5px solid #2e3244', padding: '2rem',
        textAlign: 'center',
      }}>
        <p style={{ color: '#2e3244', fontSize: '12px', letterSpacing: '2px' }}>
          © 2026 NOIR — TODOS LOS DERECHOS RESERVADOS
        </p>
      </footer>
    </div>
  )
}

export default Home