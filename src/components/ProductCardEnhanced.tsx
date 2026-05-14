interface ProductCardEnhancedProps {
  id: number
  imagen: string
  titulo: string
  descripcion: string
  precio: number
  badge?: string
  onClick?: () => void
  index?: number
}

/**
 * Tarjeta de producto mejorada con efectos visuales modernos
 * Incluye: hover effects, overlay de información, badge animado
 */
export const ProductCardEnhanced = ({
  imagen,
  titulo,
  descripcion,
  precio,
  badge,
  onClick,
  index = 0,
}: ProductCardEnhancedProps) => {
  return (
    <div
      className="stagger-item"
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `staggerFadeInUp 0.6s ease-out forwards`,
        animationDelay: `${index * 0.08}s`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#667eea'
        el.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.25)'
        el.style.transform = 'translateY(-8px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#e2e8f0'
        el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
        el.style.transform = 'translateY(0)'
      }}
      onClick={onClick}
    >
      {/* Imagen contenedor */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '260px',
          overflow: 'hidden',
          background: '#f0f4ff',
        }}
      >
        <img
          src={imagen}
          alt={titulo}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.12) rotate(1deg)'
            e.currentTarget.style.filter = 'brightness(1.1) saturate(1.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.filter = 'brightness(1) saturate(1)'
          }}
        />

        {/* Overlay de información */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.7) 100%)',
            opacity: 0,
            transition: 'opacity 0.3s ease-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0'
          }}
        >
          <div style={{ textAlign: 'center', color: 'white' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 8px', animation: 'float 2s ease-in-out infinite' }}>
              <path d="M18 8h-1a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <p style={{ fontSize: '14px', fontWeight: 600, margin: 0 }}>Ver Detalles</p>
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '8px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              boxShadow: '0 4px 16px rgba(102, 126, 234, 0.4)',
              letterSpacing: '1px',
              animation: 'float 3s ease-in-out infinite',
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div
        style={{
          padding: '22px 20px',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: '#0f1419',
            margin: '0 0 8px',
            lineHeight: 1.4,
            transition: 'color 0.3s ease',
          }}
        >
          {titulo}
        </h3>

        <p
          style={{
            fontSize: '13px',
            color: '#64748b',
            margin: '0 0 14px',
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {descripcion}
        </p>

        {/* Separador decorativo */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%)',
            margin: '12px 0',
          }}
        />

        {/* Precio y acción */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ${precio.toFixed(2)}
          </span>

          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="12 5 19 12 12 19" />
              <polyline points="19 12 5 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardEnhanced
