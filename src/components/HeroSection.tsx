import { useEffect, useRef } from 'react'
import { theme } from '../styles/theme'

/**
 * Sección Hero mejorada con efectos visuales modernos
 * Incluye parallax, gradientes dinámicos y micro-interacciones
 */
export const HeroSection = ({ 
  onExploreClick, 
  onLearnMore 
}: { 
  onExploreClick: () => void; 
  onLearnMore: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return
      const { clientX, clientY } = e
      const moveX = (clientX - window.innerWidth / 2) * 0.02
      const moveY = (clientY - window.innerHeight / 2) * 0.02
      bgRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f0f4ff 100%)',
      }}
    >
      {/* Fondo animado con gradientes flotantes */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle at 30% 40%, rgba(102, 126, 234, 0.12) 0%, transparent 60%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          filter: 'blur(40px)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle at 70% 50%, rgba(245, 87, 108, 0.08) 0%, transparent 65%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          filter: 'blur(50px)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />

      {/* Badge animado */}
      <div
        className="animate-fade-in-up"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(102, 126, 234, 0.08)',
          border: '1.5px solid rgba(102, 126, 234, 0.3)',
          borderRadius: theme.radius.full,
          padding: '10px 18px',
          marginBottom: '2rem',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#667eea',
            display: 'inline-block',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            color: '#667eea',
            fontSize: '11px',
            letterSpacing: '3px',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          ✨ Nueva Colección 2026
        </span>
      </div>

      {/* Título principal con efecto de brillo */}
      <div
        className="animate-fade-in-up"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <svg
          width="clamp(36px, 5vw, 64px)"
          height="clamp(36px, 5vw, 64px)"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#667eea"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            animation: 'float 3s ease-in-out infinite',
            filter: 'drop-shadow(0 0 8px rgba(102, 126, 234, 0.3))',
          }}
        >
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.73V7l8 5v1H3v-1l8-5V5.73A2 2 0 0 1 10 4a2 2 0 0 1 2-2z" />
        </svg>

        <h1
          style={{
            color: theme.colors.textPrimary,
            fontSize: 'clamp(64px, 12vw, 120px)',
            fontWeight: 900,
            letterSpacing: '-2px',
            margin: 0,
            lineHeight: 1,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 10px rgba(102, 126, 234, 0.2)',
          }}
        >
          NOIR
        </h1>
      </div>

      {/* Subtítulo */}
      <p
        className="animate-fade-in-up"
        style={{
          color: '#667eea',
          fontSize: '11px',
          letterSpacing: '6px',
          margin: '0 0 1rem',
          fontWeight: 300,
          textTransform: 'uppercase',
          animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
          opacity: 0,
        }}
      >
        Viste el Silencio
      </p>

      {/* Descripción */}
      <p
        className="animate-fade-in-up"
        style={{
          color: theme.colors.textSecondary,
          fontSize: '16px',
          maxWidth: '550px',
          lineHeight: 2,
          margin: '0 0 3.5rem',
          fontWeight: 400,
          animation: 'fadeInUp 0.8s ease-out 0.3s forwards',
          opacity: 0,
        }}
      >
        Moda minimalista para quienes buscan elegancia sin esfuerzo. Prendas atemporales diseñadas para perdurar.
      </p>

      {/* Botones con efectos */}
      <div
        style={{
          display: 'flex',
          gap: '1.2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          animation: 'fadeInUp 0.8s ease-out 0.4s forwards',
          opacity: 0,
        }}
      >
        <button
          onClick={onExploreClick}
          className="hover-lift"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: theme.radius.lg,
            padding: '16px 40px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '2px',
            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            textTransform: 'uppercase',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.5)'
            e.currentTarget.style.transform = 'translateY(-4px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.3)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          Explorar Colección
        </button>

        <button
          onClick={onLearnMore}
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            color: '#667eea',
            border: '2px solid rgba(102, 126, 234, 0.3)',
            borderRadius: theme.radius.lg,
            padding: '14px 38px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '2px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'
            e.currentTarget.style.borderColor = '#764ba2'
            e.currentTarget.style.color = '#764ba2'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)'
            e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)'
            e.currentTarget.style.color = '#667eea'
          }}
        >
          Saber Más
        </button>
      </div>

      {/* Scroll indicator animado */}
      <div
        style={{
          marginTop: '6rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: theme.colors.textMuted,
          animation: 'bounce 2s ease-in-out infinite',
        }}
      >
        <p style={{ fontSize: '12px', letterSpacing: '2px', marginBottom: '0.5rem' }}>DESPLÁZATE</p>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
