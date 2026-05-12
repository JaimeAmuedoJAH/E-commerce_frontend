import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NavBarPublica from '../components/NavBarPublica'
import { theme } from '../styles/theme'
import api from '../api/axiosConfig'
import '../styles/components.css'
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
      <section id="inicio" className="animate-fade-in" style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '4rem 2rem', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%',
          transform: 'translateX(-50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          animation: 'pulse 4s ease-in-out infinite',
        }} />

        <div className="animate-fade-in" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(102, 126, 234, 0.08)',
          border: '1px solid rgba(102, 126, 234, 0.4)',
          borderRadius: theme.radius.full,
          padding: '8px 16px', marginBottom: '2rem',
          animation: 'slideInDown 600ms ease-out',
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#667eea', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ color: '#667eea', fontSize: '12px', letterSpacing: '3px', fontWeight: 500 }}>
            ✨ NUEVA COLECCIÓN 2026
          </span>
        </div>

        <div className="animate-slide-in-left" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '1rem' }}>
          <svg width="clamp(36px, 5vw, 72px)" height="clamp(36px, 5vw, 72px)" viewBox="0 0 24 24" fill="none"
            stroke="#667eea" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
            style={{ animation: 'pulse 2s ease-in-out infinite' }}>
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.73V7l8 5v1H3v-1l8-5V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/>
          </svg>
          <h1 className="animate-slide-in-right" style={{
            color: theme.colors.textPrimary,
            fontSize: 'clamp(56px, 10vw, 112px)',
            fontWeight: 800, letterSpacing: '16px', margin: 0, lineHeight: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            NOIR
          </h1>
        </div>

        <p className="animate-fade-in" style={{ color: '#667eea', fontSize: '12px', letterSpacing: '5px', margin: '0 0 1.5rem', fontWeight: 300 }}>
          VISTE EL SILENCIO
        </p>
        <p className="animate-fade-in" style={{ color: theme.colors.textSecondary, fontSize: '16px', maxWidth: '500px', lineHeight: 1.9, margin: '0 0 3rem' }}>
          Moda minimalista para quienes buscan elegancia sin esfuerzo. Prendas atemporales diseñadas para durar.
        </p>

        <div className="animate-scale-up" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={handleIrProductos} className="btn-primary hover-lift" style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: '#fff', border: 'none', borderRadius: theme.radius.lg,
            padding: '14px 36px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            letterSpacing: '2px', boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)'
            }}
          >
            EXPLORAR COLECCIÓN
          </button>
          <button onClick={() => document.getElementById('acerca')?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline hover-lift" style={{
            background: 'none', color: '#667eea',
            border: '1px solid #667eea', borderRadius: theme.radius.lg,
            padding: '14px 36px', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            letterSpacing: '2px', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'
              e.currentTarget.style.borderColor = '#764ba2'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none'
              e.currentTarget.style.borderColor = '#667eea'
            }}
          >
            SABER MÁS
          </button>
        </div>

        <div style={{ marginTop: '5rem', color: theme.colors.textMuted, animation: 'pulse 2s ease-in-out infinite' }}>
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
        background: theme.colors.bgCard,
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem',
        }}>
          {features.map((f, idx) => (
            <div key={f.titulo} className="feature-card animate-fade-in" style={{
              display: 'flex', gap: '1rem', alignItems: 'flex-start',
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'left',
              animation: `fadeIn 600ms ease-out ${idx * 100}ms both`,
            }}>
              <div className="feature-icon" style={{
                width: '40px', height: '40px', flexShrink: 0,
                background: 'rgba(102, 126, 234, 0.1)',
                border: '1px solid rgba(102, 126, 234, 0.4)',
                borderRadius: theme.radius.md,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#667eea',
                transition: 'all 300ms ease',
              }}
              onMouseEnter={(e) => {
                const parent = e.currentTarget.parentElement
                if (parent) {
                  parent.style.borderColor = '#667eea'
                  parent.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.15)'
                }
              }}
              onMouseLeave={(e) => {
                const parent = e.currentTarget.parentElement
                if (parent) {
                  parent.style.borderColor = '#e2e8f0'
                  parent.style.boxShadow = 'none'
                }
              }}>
                {f.icono}
              </div>
              <div>
                <p className="feature-title" style={{ color: '#0f1419', fontSize: '14px', fontWeight: 600, margin: '0 0 4px' }}>{f.titulo}</p>
                <p style={{ color: theme.colors.textSecondary, fontSize: '12px', margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="animate-fade-in" style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: '#667eea', fontSize: '11px', letterSpacing: '4px', marginBottom: '0.75rem', animation: 'fadeIn 600ms ease-out' }}>COLECCIONES</p>
          <h2 style={{ color: theme.colors.textPrimary, fontSize: '32px', fontWeight: 700, margin: '0 0 1rem', letterSpacing: '3px', animation: 'slideInDown 600ms ease-out' }}>
            NUESTROS PRODUCTOS
          </h2>
          <p style={{ color: theme.colors.textSecondary, fontSize: '14px', maxWidth: '400px', margin: '0 auto', animation: 'fadeIn 600ms ease-out 150ms both' }}>
            Descubre nuestra selección de prendas diseñadas para cada ocasión.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {categorias.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleIrCategoria(cat.id)}
              className="card hover-lift animate-scale-up"
              style={{
                background: theme.colors.bgCard,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.xl,
                padding: '2.5rem 2rem',
                cursor: 'pointer', textAlign: 'center',
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `scaleUp 600ms ease-out ${idx * 100}ms both`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#667eea'
                e.currentTarget.style.background = theme.colors.bgCardHover
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme.colors.border
                e.currentTarget.style.background = theme.colors.bgCard
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '1.25rem', transition: 'all 300ms ease' }}
              onMouseEnter={(e) => {
                const parent = (e.target as HTMLElement).parentElement
                if (parent) {
                  const div = parent.querySelector('[style]') as HTMLElement
                  if (div) div.style.transform = 'scale(1.2) rotate(-5deg)'
                }
              }}
              onMouseLeave={(e) => {
                const parent = (e.target as HTMLElement).parentElement
                if (parent) {
                  const div = parent.querySelector('[style]') as HTMLElement
                  if (div) div.style.transform = 'scale(1) rotate(0)'
                }
              }}>
                {iconosPorNombre[cat.nombre] ?? '🛍️'}
              </div>
              <h3 style={{ color: theme.colors.textPrimary, fontSize: '14px', fontWeight: 600, margin: '0 0 6px', letterSpacing: '3px', transition: 'color 300ms ease' }}>
                {cat.nombre.toUpperCase()}
              </h3>
              <p style={{ color: theme.colors.textSecondary, fontSize: '12px', margin: '0 0 1.25rem' }}>
                {cat.productos.length} productos
              </p>
              <span style={{ color: '#667eea', fontSize: '12px', letterSpacing: '1px', fontWeight: 500, transition: 'all 300ms ease' }}>
                Ver colección →
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button onClick={handleIrProductos} className="btn-outline hover-lift" style={{
            background: 'none', color: '#667eea',
            border: '1px solid #667eea',
            borderRadius: theme.radius.lg, padding: '12px 36px',
            fontSize: '12px', cursor: 'pointer', letterSpacing: '3px', fontWeight: 500, transition: 'all 300ms ease',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'
              e.currentTarget.style.borderColor = '#764ba2'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'none'
              e.currentTarget.style.borderColor = '#667eea'
            }}
          >
            VER TODAS LAS CATEGORÍAS
          </button>
        </div>
      </section>

      {/* Acerca de */}
      <section id="acerca" className="animate-fade-in" style={{ padding: '6rem 2rem', background: theme.colors.bgCard, borderTop: `1px solid ${theme.colors.border}` }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#667eea', fontSize: '11px', letterSpacing: '4px', marginBottom: '0.75rem', animation: 'fadeIn 600ms ease-out' }}>NUESTRA HISTORIA</p>
          <h2 style={{ color: theme.colors.textPrimary, fontSize: '32px', fontWeight: 700, margin: '0 0 2rem', letterSpacing: '3px', animation: 'slideInDown 600ms ease-out' }}>
            ACERCA DE NOIR
          </h2>
          <div className="card animate-scale-up" style={{
            background: theme.colors.bg, border: `1px solid ${theme.colors.border}`, borderRadius: theme.radius.xl, padding: '2.5rem', marginBottom: '2rem',
            transition: 'all 300ms ease',
            animation: 'scaleUp 600ms ease-out 100ms both',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.15)'
            e.currentTarget.style.borderColor = '#667eea'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none'
            e.currentTarget.style.borderColor = theme.colors.border
          }}>
            <p style={{ color: theme.colors.textSecondary, fontSize: '15px', lineHeight: 2, margin: '0 0 1rem' }}>
              NOIR nació de la idea de que la moda no tiene que ser complicada. Creemos en prendas atemporales, materiales de calidad y un diseño que habla por sí solo.
            </p>
            <p style={{ color: theme.colors.textSecondary, fontSize: '15px', lineHeight: 2, margin: 0 }}>
              Cada pieza de nuestra colección está pensada para adaptarse a cualquier momento del día, combinando comodidad y estilo sin compromiso.
            </p>
          </div>
          <button onClick={handleIrProductos} className="btn-primary hover-lift" style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: '#fff', border: 'none', borderRadius: theme.radius.lg,
            padding: '14px 36px', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
            letterSpacing: '3px', boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(102, 126, 234, 0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)'
            }}
          >
            DESCUBRIR LA COLECCIÓN
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${theme.colors.border}`, padding: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.73V7l8 5v1H3v-1l8-5V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z"/>
          </svg>
          <span style={{ color: theme.colors.textMuted, fontSize: '13px', letterSpacing: '4px' }}>NOIR</span>
        </div>
        <p style={{ color: theme.colors.textMuted, fontSize: '11px', letterSpacing: '2px', margin: 0 }}>© 2026 NOIR — TODOS LOS DERECHOS RESERVADOS</p>
        <p style={{ color: theme.colors.textMuted, fontSize: '11px', letterSpacing: '1px', margin: 0 }}>VISTE EL SILENCIO</p>
      </footer>
    </div>
  )
}

export default Home