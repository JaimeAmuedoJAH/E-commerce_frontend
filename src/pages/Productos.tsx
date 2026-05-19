import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import { theme } from '../styles/theme'
import type { Producto } from '../types'

const Productos = () => {
  const { categoriaId } = useParams()
  const navigate = useNavigate()
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busqueda, setBusqueda] = useState('')
  const [filtroTalla, setFiltroTalla] = useState('')
  const [filtroColor, setFiltroColor] = useState('')
  const [soloConStock, setSoloConStock] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const size = 8

  useEffect(() => {
      setLoading(true)
      api.get(`/productos/categoria/${categoriaId}`, {
          params: {
              nombre: busqueda,
              talla: filtroTalla,
              color: filtroColor,
              soloConStock,
              page,
              size,
          }
      })
      .then(res => {
          setProductos(res.data.content)
          setTotalPages(res.data.page.totalPages)
      })
      .catch(() => setError('Error al cargar los productos'))
      .finally(() => setLoading(false))
  }, [categoriaId, busqueda, filtroTalla, filtroColor, soloConStock, page])

  const tallas = [...new Set(productos.map(p => p.talla).filter(Boolean))]
  const colores = [...new Set(productos.map(p => p.color).filter(Boolean))]

  const productosFiltrados = productos.filter(p => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideTalla = filtroTalla === '' || p.talla === filtroTalla
    const coincideColor = filtroColor === '' || p.color.toLowerCase().includes(filtroColor.toLowerCase())
    const coincideStock = !soloConStock || p.stock > 0
    return coincideNombre && coincideTalla && coincideColor && coincideStock
  })

  const selectStyle = {
    background: theme.colors.bg,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    padding: '9px 14px',
    fontSize: '13px',
    color: theme.colors.textSecondary,
    outline: 'none', cursor: 'pointer',
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.colors.bg, padding: '2.5rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => navigate('/categorias')}
            style={{
              background: theme.colors.bg,
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
            <p style={{ color: theme.colors.accent, fontSize: '11px', letterSpacing: '3px', margin: '0 0 2px' }}>
              COLECCIÓN
            </p>
            <h1 style={{ color: theme.colors.textPrimary, fontSize: '24px', fontWeight: 700, margin: 0, letterSpacing: '2px' }}>
              {productos[0]?.categoriaNombre?.toUpperCase() || 'PRODUCTOS'}
            </h1>
          </div>
        </div>

        {/* Filtros */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.75rem',
          marginBottom: '2rem',
          padding: '1.25rem',
          background: theme.colors.bg,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.radius.lg,
        }}>
          {/* Buscador */}
          <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke={theme.colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text" placeholder="Buscar producto..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box' as const,
                background: theme.colors.bgInput,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.md,
                padding: '9px 14px 9px 36px',
                fontSize: '13px', color: theme.colors.textPrimary, outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = theme.colors.borderAccent}
              onBlur={e => e.target.style.borderColor = theme.colors.border}
            />
          </div>

          <select value={filtroTalla} onChange={e => setFiltroTalla(e.target.value)} style={selectStyle}>
            <option value="">Todas las tallas</option>
            {tallas.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select value={filtroColor} onChange={e => setFiltroColor(e.target.value)} style={selectStyle}>
            <option value="">Todos los colores</option>
            {colores.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <button
            onClick={() => setSoloConStock(!soloConStock)}
            style={{
              background: soloConStock ? theme.colors.accentBg : 'none',
              border: `1px solid ${soloConStock ? theme.colors.borderAccent : theme.colors.border}`,
              borderRadius: theme.radius.md,
              padding: '9px 14px',
              fontSize: '13px',
              color: soloConStock ? theme.colors.accent : theme.colors.textSecondary,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Solo con stock
          </button>

          {(busqueda || filtroTalla || filtroColor || soloConStock) && (
            <button
              onClick={() => { setBusqueda(''); setFiltroTalla(''); setFiltroColor(''); setSoloConStock(false) }}
              style={{
                background: theme.colors.bg,
                border: `1px solid ${theme.colors.errorBorder}`,
                borderRadius: theme.radius.md,
                padding: '9px 14px',
                fontSize: '13px', color: theme.colors.error,
                cursor: 'pointer',
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {loading && <p style={{ color: theme.colors.textMuted, fontSize: '14px' }}>Cargando...</p>}

        {error && (
          <div style={{
            background: theme.colors.errorBg, border: `1px solid ${theme.colors.errorBorder}`,
            borderRadius: theme.radius.md, padding: '12px 16px',
            fontSize: '13px', color: theme.colors.error,
          }}>
            {error}
          </div>
        )}

        {!loading && !error && productosFiltrados.length === 0 && (
          <p style={{ color: theme.colors.textMuted, fontSize: '14px' }}>No se encontraron productos.</p>
        )}

        {/* Grid de productos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.25rem',
        }}>
          {productosFiltrados.map(producto => (
            <div
              key={producto.id}
              onClick={() => navigate(`/producto/${producto.id}`)}
              style={{
                background: theme.colors.bgCard,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.xl,
                overflow: 'hidden', cursor: 'pointer',
                transition: 'all 0.3s',
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
              {/* Imagen */}
              <div style={{
                width: '100%', height: '200px',
                background: theme.colors.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                {producto.imagen ? (
                  <img src={producto.imagen} alt={producto.nombre}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                    stroke={theme.colors.border} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                )}
                {producto.stock === 0 && (
                  <div style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: theme.colors.errorBg,
                    border: `1px solid ${theme.colors.errorBorder}`,
                    borderRadius: theme.radius.full,
                    padding: '3px 10px',
                    fontSize: '11px', color: theme.colors.error, fontWeight: 500,
                  }}>
                    Sin stock
                  </div>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: '1.25rem' }}>
                <h2 style={{ color: theme.colors.textPrimary, fontSize: '14px', fontWeight: 600, margin: '0 0 4px' }}>
                  {producto.nombre}
                </h2>
                <p style={{ color: theme.colors.textMuted, fontSize: '12px', margin: '0 0 1rem' }}>
                  {producto.color} · {producto.talla}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: theme.colors.textSecondary, fontSize: '16px', fontWeight: 700 }}>
                    {producto.precio.toFixed(2)} €
                  </span>
                  <span style={{
                    color: producto.stock > 0 ? theme.colors.textMuted : theme.colors.error,
                    fontSize: '11px',
                  }}>
                    {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button
              onClick={() => setPage(p => p - 1)}
              disabled={page === 0}
              style={{
                background: theme.colors.bg,
                border: `1px solid ${page === 0 ? theme.colors.border : theme.colors.borderAccent}`,
                borderRadius: theme.radius.md,
                padding: '8px 16px',
                color: page === 0 ? theme.colors.textMuted : theme.colors.textSecondary,
                cursor: page === 0 ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                transition: 'all 0.2s',
              }}
            >
              ← Anterior
            </button>

            <span style={{ color: theme.colors.textMuted, fontSize: '13px' }}>
              Página {page + 1} de {totalPages}
            </span>

            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page === totalPages - 1}
              style={{
                background: theme.colors.bg,
                border: `1px solid ${page === totalPages - 1 ? theme.colors.border : theme.colors.borderAccent}`,
                borderRadius: theme.radius.md,
                padding: '8px 16px',
                color: page === totalPages - 1 ? theme.colors.textMuted : theme.colors.textSecondary,
                cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer',
                fontSize: '13px',
                transition: 'all 0.2s',
              }}
            >
              Siguiente →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Productos