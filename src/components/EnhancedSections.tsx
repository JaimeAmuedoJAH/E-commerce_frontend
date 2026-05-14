import { theme } from '../styles/theme'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  index?: number
}

interface CategoryCardProps {
  name: string
  emoji: string
  onClick?: () => void
  index?: number
}

/**
 * Tarjeta de características mejorada
 */
export const FeatureCard = ({ icon, title, description, index = 0 }: FeatureCardProps) => {
  return (
    <div
      className="stagger-item"
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '28px 24px',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `staggerFadeInUp 0.6s ease-out forwards`,
        animationDelay: `${index * 0.1}s`,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#667eea'
        el.style.boxShadow = '0 16px 40px rgba(102, 126, 234, 0.2)'
        el.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#e2e8f0'
        el.style.boxShadow = '0 0 0 transparent'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Fondo decorativo */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 100% 0%, rgba(102, 126, 234, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Icono */}
      <div
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.08) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: '#667eea',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          e.currentTarget.style.color = 'white'
          e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.08) 100%)'
          e.currentTarget.style.color = '#667eea'
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
        }}
      >
        {icon}
      </div>

      {/* Contenido */}
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <h4
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: '#0f1419',
            margin: '0 0 8px',
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </h4>
        <p
          style={{
            fontSize: '14px',
            color: '#64748b',
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

/**
 * Tarjeta de categoría mejorada
 */
export const CategoryCard = ({ name, emoji, onClick, index = 0 }: CategoryCardProps) => {
  return (
    <div
      className="stagger-item"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '2px solid #e2e8f0',
        borderRadius: '20px',
        padding: '40px 24px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        animation: `staggerFadeInUp 0.6s ease-out forwards`,
        animationDelay: `${index * 0.08}s`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '220px',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#667eea'
        el.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.25)'
        el.style.transform = 'translateY(-8px) scale(1.02)'
        el.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.03) 100%)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#e2e8f0'
        el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
        el.style.transform = 'translateY(0) scale(1)'
        el.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
      }}
    >
      {/* Fondo decorativo animado */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0'
        }}
      />

      {/* Emoji animado */}
      <div
        style={{
          fontSize: '56px',
          marginBottom: '16px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: 'float 3s ease-in-out infinite',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.3) rotate(10deg)'
          e.currentTarget.style.animation = 'none'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
          e.currentTarget.style.animation = 'float 3s ease-in-out infinite'
        }}
      >
        {emoji}
      </div>

      {/* Nombre */}
      <h3
        style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#0f1419',
          margin: 0,
          position: 'relative',
          zIndex: 1,
          transition: 'color 0.3s ease',
        }}
      >
        {name}
      </h3>

      {/* Subtext */}
      <p
        style={{
          fontSize: '12px',
          color: '#94a3b8',
          margin: '8px 0 0',
          position: 'relative',
          zIndex: 1,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0'
        }}
      >
        Explorar
      </p>
    </div>
  )
}

/**
 * Sección de características con efecto stagger
 */
export const FeaturesGrid = ({ features }: { features: Array<{ icon: React.ReactNode; titulo: string; desc: string }> }) => {
  return (
    <section
      style={{
        padding: '5rem 2rem',
        borderTop: `1px solid ${theme.colors.border}`,
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.bgCard,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fondo decorativo */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(245, 87, 108, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          animation: 'float 10s ease-in-out infinite',
        }}
      />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {features.map((f, idx) => (
          <FeatureCard key={f.titulo} icon={f.icon} title={f.titulo} description={f.desc} index={idx} />
        ))}
      </div>
    </section>
  )
}

/**
 * Grid de categorías
 */
export const CategoriesGrid = ({ categories, onCategoryClick }: { categories: Array<{ id: number; nombre: string; emoji: string }>; onCategoryClick: (id: number) => void }) => {
  return (
    <section
      style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
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
          Categorías Destacadas
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
          Descubre nuestras colecciones cuidadosamente seleccionadas para cada estilo
        </p>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {categories.map((cat, idx) => (
          <CategoryCard
            key={cat.id}
            name={cat.nombre}
            emoji={cat.emoji}
            onClick={() => onCategoryClick(cat.id)}
            index={idx}
          />
        ))}
      </div>
    </section>
  )
}

export default {
  FeatureCard,
  CategoryCard,
  FeaturesGrid,
  CategoriesGrid,
}
