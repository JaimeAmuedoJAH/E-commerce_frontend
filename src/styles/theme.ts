export const theme = {
  colors: {
    // Fondos - Negro profundo como base oscura
    bg: '#0d0d0d',
    bgCard: '#141414',
    bgCardHover: '#1a1a1a',
    bgInput: '#141414',
    bgGradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)',
    bgGradient2: 'linear-gradient(135deg, #BAFF39 0%, #8fcc1e 100%)',

    // Navbar - Negro puro
    bgNav: '#080808',
    bgNavGradient: 'linear-gradient(90deg, #080808 0%, #0d0d0d 100%)',

    // Bordes
    border: '#2a2a2a',
    borderHover: '#3a3a3a',
    borderAccent: '#BAFF39',
    borderLight: '#1f1f1f',

    // Texto
    textPrimary: '#FFFFFF',
    textSecondary: '#d0d0d0',
    textMuted: '#6E6E6E',
    textLight: '#4a4a4a',

    // Texto navbar (blanco para contrastar con fondo negro)
    textNav: '#FFFFFF',
    textNavMuted: '#6E6E6E',

    // Acento principal - Amarillo-verde
    accent: '#BAFF39',
    accentDark: '#96d41e',
    accentLight: '#ccff6e',
    accentBg: '#BAFF3912',
    accentBgStrong: '#BAFF3922',

    // Secundario - Gris tenue
    secondary: '#6E6E6E',
    secondaryLight: '#8a8a8a',
    secondaryBg: '#6E6E6E12',

    // Estados
    error: '#ff4d4d',
    errorBg: '#1a0a0a',
    errorBorder: '#3d1515',
    warning: '#ffcc00',
    warningBg: '#1a1500',
    success: '#BAFF39',
    successBg: '#0d1a00',
    info: '#4a9fd4',
    infoBg: '#0a1520',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '999px',
  },
  shadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.6), 0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.5)',
    card: '0 8px 32px rgba(186, 255, 57, 0.06)',
    cardHover: '0 16px 48px rgba(186, 255, 57, 0.14)',
    accent: '0 0 20px rgba(186, 255, 57, 0.25)',
    glow: '0 0 30px rgba(186, 255, 57, 0.20)',
  },
  transition: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
}