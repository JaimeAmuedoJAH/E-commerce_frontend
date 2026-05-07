import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { theme } from '../styles/theme'
import type { Categoria } from '../types'

const Categorias = () => {
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    api.get<Categoria[]>('/categorias/all')
      .then(res => setCategorias(res.data))
      .catch(() => setError('Error al cargar las categorías'))
      .finally(() => setLoading(false))
  }, [])

  const categoriasFiltradas = categorias.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.bg, padding: '2.5rem' }}>

      {/* Header */}
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: theme.colors.accent, fontSize: '11px', letterSpacing: '4px', margin: '0 0 6px' }}>
            TIENDA
          </p>
          <h1 style={{ color: theme.colors.textPrimary, fontSize: '28px', fontWeight: 700, margin: '0 0 1.5rem', letterSpacing: '2px' }}>
            CATEGORÍAS
          </h1>

          {/* Buscador */}
          <div style={{ position: 'relative', maxWidth: '360px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={theme.colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar categoría..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box' as const,
                background: theme.colors.bgCard,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                padding: '10px 14px 10px 36px',
                fontSize: '13px', color: theme.colors.textPrimary, outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          </div>
        </div>

        {loading && (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: '220px', height: '160px',
                background: theme.colors.bgCard,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.xl,
                animation: 'pulse 1.5s infinite',
              }} />
            ))}
          </div>
        )}

        {error && (
          <div style={{
            background: theme.colors.errorBg,
            border: `1px solid ${theme.colors.errorBorder}`,
            borderRadius: theme.radius.md,
            padding: '12px 16px',
            fontSize: '13px', color: theme.colors.error,
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {!loading && !error && categoriasFiltradas.length === 0 && (
          <p style={{ color: theme.colors.textMuted, fontSize: '14px' }}>
            No se encontraron categorías.
          </p>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}>
          {categoriasFiltradas.map(categoria => (
            <div
              key={categoria.id}
              onClick={() => navigate(`/productos/${categoria.id}`)}
              style={{
                background: theme.colors.bgCard,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.xl,
                padding: '1.75rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = theme.colors.borderAccent
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = theme.shadow.accent
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = theme.colors.border
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Icono */}
              <div style={{
                width: '44px', height: '44px',
                background: theme.colors.accentBg,
                border: `1px solid ${theme.colors.borderAccent}40`,
                borderRadius: theme.radius.md,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
                color: theme.colors.accent,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
              </div>

              <h2 style={{ color: theme.colors.textPrimary, fontSize: '15px', fontWeight: 600, margin: '0 0 6px', letterSpacing: '1px' }}>
                {categoria.nombre}
              </h2>
              <p style={{ color: theme.colors.textMuted, fontSize: '12px', margin: '0 0 1rem' }}>
                {categoria.productos.length} {categoria.productos.length === 1 ? 'producto' : 'productos'}
              </p>
              <span style={{ color: theme.colors.accent, fontSize: '12px', fontWeight: 500 }}>
                Ver productos →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Categorias