/**
 * EJEMPLO DE HOME.TSX MEJORADO
 * 
 * Este archivo muestra cómo integrar todos los nuevos componentes
 * y animaciones en tu página Home.
 * 
 * INSTRUCCIONES:
 * 1. Copia el contenido de este archivo
 * 2. Reemplaza el contenido de src/pages/Home.tsx
 * 3. Ajusta los imports si es necesario
 * 4. Asegúrate de importar ../styles/animations.css en App.tsx
 */

/*import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NavBarPublica from '../components/NavBarPublica'
import HeroSection from '../components/HeroSection'
import ProductCardEnhanced from '../components/ProductCardEnhanced'
import { FeaturesGrid, CategoriesGrid } from '../components/EnhancedSections'
import { theme } from '../styles/theme'
import api from '../api/axiosConfig'
import '../styles/animations.css'
import '../styles/components.css'
import type { Categoria, Producto } from '../types'

// Mapeo de emojis por categoría (mantener igual)
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

// Features - Mantener igual
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
  const [productosDestacados, setProductosDestacados] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  // Cargar categorías y productos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [categoriasRes, productosRes] = await Promise.all([
          api.get<Categoria[]>('/categorias/all'),
          api.get<Producto[]>('/productos/destacados')
        ])
        setCategorias(categoriasRes.data.slice(0, 6))
        setProductosDestacados(productosRes.data.slice(0, 8))
      } catch (error) {
        console.error('Error cargando datos:', error)
      } finally {
        setLoading(false)
      }
    }
    cargarDatos()
  }, [])

  const handleIrProductos = () => {
    navigate(isAuthenticated ? '/categorias' : '/login')
  }

  const handleIrCategoria = (categoriaId: number) => {
    navigate(isAuthenticated ? `/productos/${categoriaId}` : '/login')
  }

  const handleVerProducto = (productoId: number) => {
    navigate(`/producto/${productoId}`)
  }

  return (
    <div style={{ 
      background: theme.colors.bg, 
      minHeight: '100vh', 
      fontFamily: 'system-ui, sans-serif' 
    }}>
      <NavBarPublica />

      {/* ==================== HERO SECTION MEJORADO ==================== }
      <HeroSection 
        onExploreClick={handleIrProductos}
        onLearnMore={() => {
          const elem = document.getElementById('acerca')
          if (elem) elem.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* ==================== FEATURES SECTION MEJORADA ==================== }
      <FeaturesGrid features={features} />

      {/* ==================== SECCIÓN CATEGORÍAS ==================== }
      {!loading && categorias.length > 0 && (
        <CategoriesGrid 
          categories={categorias.map(c => ({
            id: c.id,
            nombre: c.nombre,
            emoji: iconosPorNombre[c.nombre] || '🏷️'
          }))}
          onCategoryClick={handleIrCategoria}
        />
      )}

      {/* ==================== PRODUCTOS DESTACADOS ==================== }
      {!loading && productosDestacados.length > 0 && (
        <section
          id="acerca"
          style={{
            padding: '5rem 2rem',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Fondo decorativo }
          <div
            style={{
              position: 'absolute',
              top: '-40%',
              right: '-10%',
              width: '600px',
              height: '600px',
              background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: 'float 8s ease-in-out infinite',
            }}
          />

          {/* Heading }
          <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
            <div
              className="animate-fade-in-up"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(102, 126, 234, 0.08)',
                border: '1.5px solid rgba(102, 126, 234, 0.3)',
                borderRadius: '999px',
                padding: '10px 18px',
                marginBottom: '1.5rem',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#f5576c',
                display: 'inline-block',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              <span style={{
                color: '#f5576c',
                fontSize: '11px',
                letterSpacing: '2px',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}>
                Colección Premium
              </span>
            </div>

            <h2
              className="animate-fade-in-up"
              style={{
                fontSize: 'clamp(32px, 8vw, 48px)',
                fontWeight: 800,
                color: '#0f1419',
                margin: '0 0 12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Productos Destacados
            </h2>

            <p
              className="animate-fade-in-up"
              style={{
                color: '#64748b',
                fontSize: '16px',
                margin: 0,
                maxWidth: '500px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Los favoritos de nuestros clientes. Piezas atemporales con descuentos exclusivos.
            </p>
          </div>

          {/* Grid de productos mejorado }
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {productosDestacados.map((producto, idx) => (
              <ProductCardEnhanced
                key={producto.id}
                id={producto.id}
                imagen={producto.imagen}
                titulo={producto.nombre}
                descripcion={producto.descripcion || 'Producto de alta calidad'}
                precio={producto.precio}
                badge={
                  producto.esNuevo 
                    ? 'NUEVO' 
                    : producto.descuento 
                      ? `-${producto.descuento}%`
                      : undefined
                }
                onClick={() => handleVerProducto(producto.id)}
                index={idx}
              />
            ))}
          </div>

          {/* Botón ver más }
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              onClick={handleIrProductos}
              className="hover-lift"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: theme.radius.lg,
                padding: '16px 48px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '2px',
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)'
              }}
            >
              Ver Toda la Colección
            </button>
          </div>
        </section>
      )}

      {/* ==================== NEWSLETTER SECTION (Opcional) ==================== }
      <section
        style={{
          padding: '4rem 2rem',
          background: 'linear-gradient(135deg, #0f1419 0%, #1a2234 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 60%, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <h3
          className="animate-fade-in-up"
          style={{
            fontSize: 'clamp(24px, 6vw, 36px)',
            fontWeight: 800,
            color: '#f1f5f9',
            margin: '0 0 12px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Suscríbete a Nuestras Novedades
        </h3>

        <p
          className="animate-fade-in-up"
          style={{
            color: '#94a3b8',
            fontSize: '16px',
            margin: '0 0 2rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Recibe primero los descuentos exclusivos y los lanzamientos de nuevas colecciones.
        </p>

        <div
          className="animate-fade-in-up"
          style={{
            display: 'flex',
            gap: '1rem',
            maxWidth: '500px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <input
            type="email"
            placeholder="Tu correo electrónico"
            style={{
              flex: 1,
              padding: '14px 20px',
              borderRadius: theme.radius.lg,
              border: '1px solid rgba(102, 126, 234, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#f1f5f9',
              fontSize: '14px',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#667eea'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            }}
          />
          <button
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: theme.radius.lg,
              padding: '14px 32px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)'
            }}
          >
            Suscribir
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
*/