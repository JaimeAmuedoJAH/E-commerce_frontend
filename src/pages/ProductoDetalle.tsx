import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api/axiosConfig"
import type { Producto } from "../types"

const ProductoDetalle = () => {
    const { productoId } = useParams()
    const navigate = useNavigate()
    const [producto, setProducto] = useState<Producto | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!productoId) {
            setError('ID de producto no proporcionado')
            setLoading(false)
            return
        }
        api.get<Producto>(`/productos/${productoId}`)
        .then(res => setProducto(res.data))
        .catch(() => setError('Error al cargar el producto'))
        .finally(() => setLoading(false))
    }, [productoId])

    return (
        <div style={{ minHeight: '100vh', background: '#0f1117', padding: '2rem' }}>

      {/* Header */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: 'none', border: '0.5px solid #2e3244',
          borderRadius: '8px', padding: '6px 12px',
          color: '#9ca3af', cursor: 'pointer', fontSize: '13px',
          marginBottom: '1.5rem',
        }}
      >
        ← Volver
      </button>

      {loading && <p style={{ color: '#6b7280', fontSize: '14px' }}>Cargando...</p>}

      {error && (
        <div style={{
          background: '#2a1a1a', border: '0.5px solid #7f1d1d',
          borderRadius: '8px', padding: '10px 14px',
          fontSize: '13px', color: '#f87171',
        }}>
          {error}
        </div>
      )}

      {producto && (
        <div style={{
          display: 'flex', gap: '2rem', flexWrap: 'wrap',
        }}>
          {/* Imagen */}
          <div style={{
            width: '320px', height: '320px', flexShrink: 0,
            background: '#1a1d27', border: '0.5px solid #2e3244',
            borderRadius: '12px', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none"
                stroke="#2e3244" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            )}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: '260px' }}>
            <p style={{ color: '#1d9e75', fontSize: '12px', margin: '0 0 6px' }}>
              {producto.categoriaNombre}
            </p>
            <h1 style={{ color: '#f0f0f0', fontSize: '24px', fontWeight: 600, margin: '0 0 8px' }}>
              {producto.nombre}
            </h1>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
              <span style={{
                background: '#1a1d27', border: '0.5px solid #2e3244',
                borderRadius: '6px', padding: '4px 10px',
                fontSize: '12px', color: '#9ca3af',
              }}>
                Talla: {producto.talla}
              </span>
              <span style={{
                background: '#1a1d27', border: '0.5px solid #2e3244',
                borderRadius: '6px', padding: '4px 10px',
                fontSize: '12px', color: '#9ca3af',
              }}>
                Color: {producto.color}
              </span>
            </div>

            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              {producto.descripcion}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ color: '#1d9e75', fontSize: '28px', fontWeight: 700 }}>
                {producto.precio.toFixed(2)} €
              </span>
              <span style={{
                color: producto.stock > 0 ? '#6b7280' : '#f87171',
                fontSize: '13px',
              }}>
                {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock'}
              </span>
            </div>

            <button
              disabled={producto.stock === 0}
              style={{
                background: producto.stock > 0 ? '#1d9e75' : '#2e3244',
                color: '#fff', border: 'none', borderRadius: '8px',
                padding: '12px 2rem', fontSize: '14px', fontWeight: 500,
                cursor: producto.stock > 0 ? 'pointer' : 'not-allowed',
                opacity: producto.stock === 0 ? 0.5 : 1,
              }}
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductoDetalle