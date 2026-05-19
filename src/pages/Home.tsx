import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NavBarPublica from '../components/NavBarPublica'
import { theme } from '../styles/theme'
import api from '../api/axiosConfig'
import type { Categoria } from '../types'

const iconosPorNombre: Record<string, string> = {
  'Camisetas': '👕',
  'Pantalones': '👖',
  'Vestidos': '👗',
  'Chaquetas': '🧥',
  'Abrigos': '🧣',
  'Calzado': '👟',
  'Accesorios': '👜',
  'Ropa Interior': '🩲',
  'Deportivo': '🏃',
  'Bolsos': '👝',
}

const categoriaImagenes: Record<string, string> = {
  'Camisetas': new URL('../assets/camisetas.png', import.meta.url).href,
  'Pantalones': new URL('../assets/pantalones.png', import.meta.url).href,
  'Vestidos': new URL('../assets/vestidos.png', import.meta.url).href,
  'Chaquetas': new URL('../assets/chaquetas.png', import.meta.url).href,
  'Accesorios': new URL('../assets/accesorios.png', import.meta.url).href,
  'Ropa Interior': new URL('../assets/ropa_interior.png', import.meta.url).href,
  'Deportivo': new URL('../assets/deportivo.png', import.meta.url).href,
  'Bolsos': new URL('../assets/bolsos.png', import.meta.url).href,
}

const features = [
  {
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    titulo: 'Calidad Premium',
    desc: 'Materiales seleccionados para durar temporada tras temporada.',
  },
  {
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    titulo: 'Envío Rápido',
    desc: 'Recibe tu pedido en 24-48 horas en toda España.',
  },
  {
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    titulo: 'Pago Seguro',
    desc: 'Tus datos siempre protegidos con cifrado de extremo a extremo.',
  },
  {
    icono: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
      </svg>
    ),
    titulo: 'Devoluciones Gratis',
    desc: '30 días para cambiar de opinión sin coste alguno.',
  },
]

const Home = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [categorias, setCategorias] = useState<Categoria[]>([])

  useEffect(() => {
    api.get<Categoria[]>('/categorias/all')
      .then(res => setCategorias(res.data.slice(0, 4)))
      .catch(() => {})
  }, [])

  const handleIrProductos = () => {
    navigate(isAuthenticated ? '/categorias' : '/login')
  }

  const handleIrCategoria = (categoriaId: number) => {
    navigate(isAuthenticated ? `/productos/${categoriaId}` : '/login')
  }

  return (
    <div style={{ background: theme.colors.bg, minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <NavBarPublica />

      {/* Hero */}
      <section id="inicio" style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '4rem 0', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        width: '100%',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%', height: '100%',
          backgroundImage: `url(${new URL('../assets/Logo_noir.png', import.meta.url).href})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'clamp(300px, 50vw, 600px)',
          opacity: 0.7,
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: theme.colors.accentBg,
          border: `1px solid ${theme.colors.borderAccent}40`,
          borderRadius: theme.radius.full,
          padding: '6px 16px', marginBottom: '16rem', position: 'relative', zIndex: 1,
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
          <span style={{ color: '#fff', fontSize: '12px', letterSpacing: '3px', fontWeight: 500 }}>
            NUEVA COLECCIÓN 2026
          </span>
        </div>

       

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <button onClick={handleIrProductos} style={{
            background: 'transparent',
            color: '#fff',
            border: '2px solid #fff',
            borderRadius: theme.radius.lg,
            padding: '12px 32px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '2px',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            EXPLORAR COLECCIÓN
          </button>
          <button onClick={() => document.getElementById('acerca')?.scrollIntoView({ behavior: 'smooth' })} style={{
            background: 'rgba(255, 255, 255, 0.12)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: theme.radius.lg,
            padding: '12px 32px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '2px',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.borderColor = '#fff'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            SABER MÁS
          </button>
        </div>

        <div style={{ marginTop: '5rem', color: theme.colors.textMuted, position: 'relative', zIndex: 1 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>

      {/* Features */}
      <section style={{
        padding: '4rem 2rem',
        borderTop: `1px solid ${theme.colors.border}`,
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.bg,
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem',
        }}>
          {features.map(f => (
            <div key={f.titulo} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '40px', height: '40px', flexShrink: 0,
                background: theme.colors.accentBg,
                border: `1px solid ${theme.colors.borderAccent}40`,
                borderRadius: theme.radius.md,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: theme.colors.accent,
              }}>
                {f.icono}
              </div>
              <div>
                <p style={{ color: theme.colors.textPrimary, fontSize: '14px', fontWeight: 600, margin: '0 0 4px' }}>{f.titulo}</p>
                <p style={{ color: theme.colors.textSecondary, fontSize: '12px', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Productos */}
      <section id="productos" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: theme.colors.accent, fontSize: '11px', letterSpacing: '4px', marginBottom: '0.75rem' }}>COLECCIONES</p>
          <h2 style={{ color: theme.colors.textPrimary, fontSize: '32px', fontWeight: 700, margin: '0 0 1rem', letterSpacing: '3px' }}>
            NUESTROS PRODUCTOS
          </h2>
          <p style={{ color: theme.colors.textSecondary, fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
            Descubre nuestra selección de prendas diseñadas para cada ocasión.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {categorias.map(cat => {
            const imageUrl = categoriaImagenes[cat.nombre]
            return (
              <div
                key={cat.id}
                onClick={() => handleIrCategoria(cat.id)}
                style={{
                  background: imageUrl
                    ? `url(${imageUrl}) center/cover no-repeat`
                    : theme.colors.bgCard,
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: theme.radius.xl,
                  padding: '2.5rem 2rem',
                  cursor: 'pointer', textAlign: 'center',
                  transition: 'all 0.3s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = theme.colors.borderAccent
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = theme.shadow.accent
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = theme.colors.border
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {imageUrl && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.24)' }} />
                )}
                <div style={{ position: 'relative', zIndex: 1, minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  {!imageUrl && (
                    <div style={{ fontSize: '48px', marginBottom: '1.25rem' }}>
                      {iconosPorNombre[cat.nombre] ?? '🛍️'}
                    </div>
                  )}
                  <h3 style={{ color: imageUrl ? '#fff' : theme.colors.textPrimary, fontSize: '14px', fontWeight: 600, margin: '0 0 6px', letterSpacing: '3px' }}>
                    {cat.nombre.toUpperCase()}
                  </h3>
                  <p style={{ color: imageUrl ? 'rgba(255,255,255,0.85)' : theme.colors.textSecondary, fontSize: '12px', margin: '0 0 1.25rem' }}>
                    {cat.productos.length} productos
                  </p>
                  <span style={{ color: imageUrl ? '#fff' : theme.colors.accent, fontSize: '12px', letterSpacing: '1px', fontWeight: 500 }}>
                    Ver colección →
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={handleIrProductos} style={{
            background: 'none', color: theme.colors.accent,
            border: `1px solid ${theme.colors.borderAccent}`,
            borderRadius: theme.radius.lg, padding: '12px 36px',
            fontSize: '12px', cursor: 'pointer', letterSpacing: '3px', fontWeight: 500, transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = theme.colors.accentBg}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            VER TODAS LAS CATEGORÍAS
          </button>
        </div>
      </section>

      {/* Acerca de */}
      <section id="acerca" style={{ padding: '6rem 2rem', background: theme.colors.bg, borderTop: `1px solid ${theme.colors.border}` }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: theme.colors.accent, fontSize: '11px', letterSpacing: '4px', marginBottom: '0.75rem' }}>NUESTRA HISTORIA</p>
          <h2 style={{ color: theme.colors.textPrimary, fontSize: '32px', fontWeight: 700, margin: '0 0 2rem', letterSpacing: '3px' }}>
            ACERCA DE NOIR
          </h2>
          <div style={{ background: theme.colors.bg, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.xl, padding: '2.5rem', marginBottom: '2rem' }}>
            <p style={{ color: theme.colors.textSecondary, fontSize: '15px', lineHeight: 2, margin: '0 0 1rem' }}>
              NOIR nació de la idea de que la moda no tiene que ser complicada. Creemos en prendas atemporales, materiales de calidad y un diseño que habla por sí solo.
            </p>
            <p style={{ color: theme.colors.textSecondary, fontSize: '15px', lineHeight: 2, margin: 0 }}>
              Cada pieza de nuestra colección está pensada para adaptarse a cualquier momento del día, combinando comodidad y estilo sin compromiso.
            </p>
          </div>
          <button onClick={handleIrProductos} style={{
            background: 'transparent',
            color: theme.colors.accent,
            border: `2px solid ${theme.colors.accent}`,
            borderRadius: theme.radius.lg,
            padding: '12px 32px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '3px',
            transition: 'all 0.3s',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = theme.colors.accentBg
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            DESCUBRIR LA COLECCIÓN
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${theme.colors.bg}`, padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={new URL('../assets/Logo_noir.png', import.meta.url).href} alt="NOIR logo" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          <span style={{ color: theme.colors.textMuted, fontSize: '13px', letterSpacing: '4px' }}>NOIR</span>
        </div>
        <p style={{ color: theme.colors.textMuted, fontSize: '11px', letterSpacing: '2px', margin: 0 }}>© 2026 NOIR — TODOS LOS DERECHOS RESERVADOS</p>
        <p style={{ color: theme.colors.textMuted, fontSize: '11px', letterSpacing: '1px', margin: 0 }}>VISTE EL SILENCIO</p>
      </footer>
    </div>
  )
}

export default Home