# 🎨 Guía de Estilos - E-Commerce Frontend

Este documento describe todos los estilos, animaciones y componentes CSS disponibles en el proyecto.

## 📋 Tabla de Contenidos

1. [Paleta de Colores](#paleta-de-colores)
2. [Componentes CSS](#componentes-css)
3. [Animaciones](#animaciones)
4. [Variables CSS](#variables-css)
5. [Ejemplos de Uso](#ejemplos-de-uso)

---

## 🎨 Paleta de Colores

### Colores Principales

| Variable | Valor | Uso |
|----------|-------|-----|
| `--accent` | `#667eea` | Acento principal (púrpura) |
| `--secondary` | `#f5576c` | Acento secundario (rosa) |
| `--bg` | `#ffffff` | Fondo principal |
| `--bg-card` | `#f8fafc` | Fondo de tarjetas |
| `--text-primary` | `#0f1419` | Texto principal |
| `--text-secondary` | `#475569` | Texto secundario |
| `--border` | `#e2e8f0` | Bordes normales |
| `--success` | `#10b981` | Éxito |
| `--error` | `#dc2626` | Error |
| `--warning` | `#f59e0b` | Advertencia |

### Gradientes Predefinidos

```css
--bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--bg-gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

---

## 🧩 Componentes CSS

### Botones

#### Botón Primario
```html
<button class="btn-primary">Comprar</button>
```
**Características:**
- Gradiente púrpura
- Sombra elegante
- Efecto hover: levanta 2px
- Transición suave 300ms

#### Botón Secundario
```html
<button class="btn-secondary">Añadir a carrito</button>
```
**Características:**
- Gradiente rosa
- Sombra elegante
- Efecto hover mejorado

#### Botón Contorno
```html
<button class="btn-outline">Cancelar</button>
```
**Características:**
- Borde púrpura
- Fondo transparente
- Cambia a fondo claro en hover

### Tarjetas

#### Tarjeta Estándar
```html
<div class="card">
  <h3>Producto Premium</h3>
  <p>Descripción del producto...</p>
</div>
```
**Características:**
- Borde sutil
- Sombra suave
- Efecto hover: levanta 4px
- Animación fade-in

#### Tarjeta con Gradiente
```html
<div class="card-gradient">
  <h3>Característica Especial</h3>
</div>
```
**Características:**
- Fondo gradiente sutil
- Borde gradiente
- Efecto hover mejorado

#### Tarjeta de Producto
```html
<div class="product-card">
  <img class="product-image" src="..." alt="producto">
  <div class="product-content">
    <h3 class="product-title">Nombre del Producto</h3>
    <p class="product-description">Descripción corta</p>
    <div class="product-price">
      <span class="product-price-value">$99.99</span>
      <button class="product-action-btn">Agregar</button>
    </div>
  </div>
</div>
```
**Características:**
- Imagen escalable en hover
- Precio con gradiente
- Badge para descuentos
- Transiciones fluidas

### Inputs y Formularios

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input class="form-control" type="email" placeholder="tu@email.com">
  <span class="form-help-text">Usaremos esto para tu cuenta</span>
</div>
```

**Con error:**
```html
<input class="form-control form-error" type="email">
<span class="form-error-message">Email inválido</span>
```

### Badges/Etiquetas

```html
<span class="badge">Disponible</span>
<span class="badge badge-success">✓ Comprado</span>
<span class="badge badge-error">✗ Cancelado</span>
<span class="badge badge-warning">⚠ Pendiente</span>
```

### Secciones Especiales

#### Sección Hero
```html
<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-title">Bienvenido a Nuestro Shop</h1>
    <p class="hero-subtitle">Encuentra los mejores productos</p>
    <button class="btn-primary">Explorar</button>
  </div>
</section>
```

#### Tarjeta de Característica
```html
<div class="feature-card">
  <div class="feature-icon">📦</div>
  <h3 class="feature-title">Envío Rápido</h3>
  <p class="feature-description">Recibe tu pedido en 24-48 horas</p>
</div>
```

---

## ✨ Animaciones

### Animaciones CSS Disponibles

| Clase | Descripción | Duración |
|-------|------------|----------|
| `animate-fade-in` | Aparece gradualmente | 600ms |
| `animate-slide-in-left` | Entra desde la izquierda | 600ms |
| `animate-slide-in-right` | Entra desde la derecha | 600ms |
| `animate-scale-up` | Crece suavemente | 600ms |
| `animate-pulse` | Parpadeo suave | 2s |
| `animate-glow` | Efecto resplandor | 2s |

### Efectos Hover

| Clase | Efecto |
|-------|--------|
| `hover-lift` | Levanta 8px con sombra |
| `hover-scale` | Escala 1.05x |
| `hover-glow` | Resplandor accent |

### Ejemplo de Uso

```tsx
<div className="card animate-fade-in">
  <h2>Contenido que aparece suavemente</h2>
</div>

<button className="btn-primary hover-lift">
  Botón que levanta en hover
</button>
```

---

## 🔧 Variables CSS

Todas estas variables están disponibles en cualquier componente:

```css
/* Colores */
background: var(--bg);
color: var(--text-primary);
border: 1px solid var(--border);

/* Sombras */
box-shadow: var(--shadow-card);

/* Transiciones */
transition: all var(--transition-base);

/* Border Radius */
border-radius: var(--radius-lg);
```

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Tarjeta de Producto Completa

```tsx
import { useState } from 'react'

export function ProductCard({ product }) {
  return (
    <div className="product-card hover-lift">
      <div style={{ position: 'relative' }}>
        <img 
          className="product-image" 
          src={product.image} 
          alt={product.name}
        />
        {product.discount && (
          <span className="product-badge">-{product.discount}%</span>
        )}
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          <span className="product-price-value">${product.price}</span>
          <button className="product-action-btn">Agregar al carrito</button>
        </div>
      </div>
    </div>
  )
}
```

### Ejemplo 2: Formulario con Validación Visual

```tsx
export function LoginForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  return (
    <form className="space-y-6">
      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          className={`form-control ${error ? 'form-error' : ''}`}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
        />
        {error && <span className="form-error-message">{error}</span>}
      </div>
      <button className="btn-primary w-full">Entrar</button>
    </form>
  )
}
```

### Ejemplo 3: Navbar Profesional

```tsx
import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">MyShop</div>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Inicio</Link>
          <Link to="/productos" className="navbar-link">Productos</Link>
          <Link to="/carrito" className="navbar-link">Carrito</Link>
          <Link to="/cuenta" className="navbar-link">Cuenta</Link>
        </div>
      </div>
    </nav>
  )
}
```

### Ejemplo 4: Sección de Características

```tsx
export function Features() {
  const features = [
    {
      icon: '🚚',
      title: 'Envío Rápido',
      description: 'Entrega en 24-48 horas'
    },
    {
      icon: '🔒',
      title: 'Pago Seguro',
      description: 'Encriptado de extremo a extremo'
    },
    {
      icon: '↩️',
      title: 'Devoluciones',
      description: '30 días sin costo'
    }
  ]

  return (
    <section style={{ padding: '48px 32px' }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-32px">
        {features.map(feature => (
          <div key={feature.title} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

---

## 🎯 Mejores Prácticas

1. **Usa las clases predefinidas** en lugar de crear tus propios estilos
2. **Combina animaciones** para crear experiencias fluidas
3. **Mantén consistencia** con la paleta de colores
4. **Usa variables CSS** para acceso dinámico a valores
5. **Aprovecha Tailwind** para responsive design

---

## 🚀 Próximos Pasos

Para mejorar aún más tu UI:

1. Aplica las clases a tus componentes existentes
2. Añade animaciones a las transiciones de página
3. Personaliza los colores según tu marca
4. Crea componentes reutilizables
5. Implementa dark mode si es necesario

---

**Última actualización:** Mayo 2026
