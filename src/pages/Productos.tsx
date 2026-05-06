import { use, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
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

    const productosFiltrados = productos.filter(p => {
      const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      const coincideTalla = filtroTalla === '' || p.talla === filtroTalla
      const coincideColor = filtroColor === '' || p.color.toLowerCase().includes(filtroColor.toLowerCase())
      const coincideStock = !soloConStock || p.stock > 0
      return coincideNombre && coincideTalla && coincideColor && coincideStock
    })

    const tallas = [...new Set(productos.map(p => p.talla).filter(Boolean))]
    const colores = [...new Set(productos.map(p => p.color).filter(Boolean))]


useEffect(() => {
    api.get<Producto[]>(`/productos/categoria/${categoriaId}`)
        .then(res => setProductos(res.data))
        .catch(() => setError('Error al cargar los productos'))
        .finally(() => setLoading(false))
    }, [categoriaId])

    return (
        <div style={{ minHeight: '100vh', background: '#0f1117', padding: '2rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/categorias')}
          style={{
            background: 'none', border: '0.5px solid #2e3244',
            borderRadius: '8px', padding: '6px 12px',
            color: '#9ca3af', cursor: 'pointer', fontSize: '13px',
          }}
        >
          ← Volver
        </button>
        <h1 style={{ color: '#f0f0f0', fontSize: '22px', fontWeight: 500, margin: 0 }}>
          {productos[0]?.categoriaNombre || 'Productos'}
        </h1>
      </div>

      {/* Buscador y filtros */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{
            background: '#1a1d27', border: '0.5px solid #2e3244',
            borderRadius: '8px', padding: '9px 14px',
            fontSize: '13px', color: '#f0f0f0', outline: 'none',
            width: '220px', boxSizing: 'border-box' as const,
          }}
          onFocus={e => e.target.style.borderColor = '#1d9e75'}
          onBlur={e => e.target.style.borderColor = '#2e3244'}
        />

        {/* Filtro talla */}
        <select
          value={filtroTalla}
          onChange={e => setFiltroTalla(e.target.value)}
          style={{
            background: '#1a1d27', border: '0.5px solid #2e3244',
            borderRadius: '8px', padding: '9px 14px',
            fontSize: '13px', color: filtroTalla ? '#f0f0f0' : '#6b7280',
            outline: 'none', cursor: 'pointer',
          }}
        >
          <option value="">Todas las tallas</option>
          {tallas.map(talla => (
            <option key={talla} value={talla}>{talla}</option>
          ))}
        </select>

        {/* Filtro color */}
        <select
          value={filtroColor}
          onChange={e => setFiltroColor(e.target.value)}
          style={{
            background: '#1a1d27', border: '0.5px solid #2e3244',
            borderRadius: '8px', padding: '9px 14px',
            fontSize: '13px', color: filtroColor ? '#f0f0f0' : '#6b7280',
            outline: 'none', cursor: 'pointer',
          }}
        >
          <option value="">Todos los colores</option>
          {colores.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>

        {/* Filtro stock */}
        <button
          onClick={() => setSoloConStock(!soloConStock)}
          style={{
            background: soloConStock ? '#1d9e75' : '#1a1d27',
            border: `0.5px solid ${soloConStock ? '#1d9e75' : '#2e3244'}`,
            borderRadius: '8px', padding: '9px 14px',
            fontSize: '13px', color: soloConStock ? '#fff' : '#6b7280',
            cursor: 'pointer',
          }}
        >
          Solo con stock
        </button>

        {/* Limpiar filtros */}
        {(busqueda || filtroTalla || filtroColor || soloConStock) && (
          <button
            onClick={() => {
              setBusqueda('')
              setFiltroTalla('')
              setFiltroColor('')
              setSoloConStock(false)
            }}
            style={{
              background: 'none', border: '0.5px solid #2e3244',
              borderRadius: '8px', padding: '9px 14px',
              fontSize: '13px', color: '#f87171', cursor: 'pointer',
            }}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {loading && (
        <p style={{ color: '#6b7280', fontSize: '14px' }}>Cargando...</p>
      )}

      {error && (
        <div style={{
          background: '#2a1a1a', border: '0.5px solid #7f1d1d',
          borderRadius: '8px', padding: '10px 14px',
          fontSize: '13px', color: '#f87171',
        }}>
          {error}
        </div>
      )}

      {!loading && !error && productosFiltrados.length === 0 && (
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          No hay productos en esta categoría.
        </p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        {productosFiltrados.map(producto => (
          <div
            key={producto.id}
            onClick={() => navigate(`/producto/${producto.id}`)}
            style={{
              background: '#1a1d27',
              border: '0.5px solid #2e3244',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#1d9e75')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2e3244')}
          >
            {/* Imagen */}
            <div style={{
              width: '100%', height: '160px',
              background: '#0f1117',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {producto.imagen ? (
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                  stroke="#2e3244" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              )}
            </div>

            {/* Info */}
            <div style={{ padding: '1rem' }}>
              <h2 style={{ color: '#f0f0f0', fontSize: '14px', fontWeight: 500, margin: '0 0 4px' }}>
                {producto.nombre}
              </h2>
              <p style={{ color: '#6b7280', fontSize: '12px', margin: '0 0 8px' }}>
                {producto.color} · {producto.talla}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#1d9e75', fontSize: '15px', fontWeight: 600 }}>
                  {producto.precio.toFixed(2)} €
                </span>
                <span style={{ color: '#6b7280', fontSize: '11px' }}>
                  Stock: {producto.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productos