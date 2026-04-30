import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axiosConfig'
import type { Categoria } from '../types'

const Categorias = () => {
    const navigate = useNavigate()
    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        api.get<Categoria[]>('/categorias/all')
        .then(res => setCategorias(res.data))
        .catch(() => setError('Error al cargar las categorías'))
        .finally(() => setLoading(false))
    }, [])

    return (
        <div style={{ minHeight: '100vh', background: '#0f1117', padding: '2rem' }}>
      <h1 style={{ color: '#f0f0f0', fontSize: '22px', fontWeight: 500, marginBottom: '1.5rem' }}>
        Categorías
      </h1>

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

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
      }}>
        {categorias.map(categoria => (
          <div
            key={categoria.id}
            onClick={() => navigate(`/productos/${categoria.id}`)}
            style={{
              background: '#1a1d27',
              border: '0.5px solid #2e3244',
              borderRadius: '12px',
              padding: '1.5rem',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = '#1d9e75')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = '#2e3244')}
          >
            <div style={{
              width: '40px', height: '40px', background: '#1d9e75',
              borderRadius: '8px', display: 'flex', alignItems: 'center',
              justifyContent: 'center', marginBottom: '1rem',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            </div>
            <h2 style={{ color: '#f0f0f0', fontSize: '15px', fontWeight: 500, margin: '0 0 4px' }}>
              {categoria.nombre}
            </h2>
            <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
              {categoria.productos.length} productos
            </p>
          </div>
        ))}
      </div>
    </div>
    )
}

    export default Categorias