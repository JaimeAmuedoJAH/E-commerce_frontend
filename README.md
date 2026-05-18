# 🛍️ NOIR — E-commerce Frontend

Frontend de la tienda de moda **NOIR**, construido con **React**, **TypeScript** y **Vite**.
---

## 🚀 Tecnologías

| Tecnología | Versión |
|---|---|
| React | 19.2.5 |
| TypeScript | 6.0.2 |
| Vite | 8.0.9 |
| React Router DOM | 7.14.2 |
| Axios | 1.15.2 |
| Tailwind CSS | 3.4.19 |
| ESLint | 9.39.4 |

---

## 📐 Estructura del proyecto

```
src/
├── api/
│   └── axiosConfig.ts           # Cliente Axios con baseURL y token en cabeceras
├── components/
│   ├── EnhancedSections.tsx     # Sección de UI mejorada
│   ├── HeroSection.tsx          # Hero reusable (página Home)
│   ├── NavBarPublica.tsx        # Navbar compartido entre rutas públicas y privadas
│   ├── ProductCardEnhanced.tsx  # Tarjeta avanzada para productos
│   ├── ProductoCard.tsx         # Tarjeta de producto básica
│   └── ProtectedRoute.tsx       # Ruta protegida que valida auth
├── context/
│   ├── AuthContext.tsx          # Autenticación y sesión de usuario
│   └── CarritoContext.tsx       # Estado del carrito de compras
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Registro.tsx
│   ├── Categorias.tsx
│   ├── Productos.tsx
│   ├── ProductoDetalle.tsx
│   ├── Carrito.tsx
│   ├── Pago.tsx
│   ├── OrdenNueva.tsx
│   ├── OrdenConfirmacion.tsx
│   └── Ordenes.tsx
├── styles/
│   ├── animations.css
│   └── theme.ts                 # Variables de color y estilos base
├── types/
│   └── index.ts                 # Tipos e interfaces TypeScript
├── App.tsx
└── index.css
```

---

## 🔧 Configuración

### Requisitos previos
- Node.js 18+
- npm 9+
- Backend Spring Boot corriendo en `http://localhost:8110`

### Instalación

```bash
git clone https://github.com/JaimeAmuedoJAH/E-commerce_frontend.git
cd E-commerce_frontend
npm install
```

### Configuración del backend

La URL del backend se define en `src/api/axiosConfig.ts`:

```ts
const api = axios.create({
  baseURL: 'http://localhost:8110/api',
})
```

Cámbiala si tu backend corre en otro puerto o ruta.

### Ejecutar en desarrollo

```bash
npm run dev
```

Abrir en: `http://localhost:5173`

### Build para producción

```bash
npm run build
```

### Otros scripts

```bash
npm run lint
npm run preview
```

---

## 📱 Rutas principales

### Públicas
| Ruta | Descripción |
|---|---|
| `/` | Landing page con hero, colecciones y sección “Acerca de” |
| `/login` | Página de inicio de sesión |
| `/registro` | Página de registro de usuario |

### Privadas (requieren login)
| Ruta | Descripción |
|---|---|
| `/categorias` | Listado de categorías con buscador |
| `/productos/:categoriaId` | Productos filtrados por categoría |
| `/producto/:productoId` | Detalle de producto |
| `/carrito` | Carrito de compras |
| `/pago` | Pasarela de pago ficticia |
| `/ordenes/nueva` | Confirmación de dirección de envío |
| `/ordenes/confirmacion` | Confirmación del pedido |
| `/ordenes` | Historial de pedidos |

---

## 🔐 Autenticación

La app utiliza JWT almacenado en `localStorage`. El `AuthContext` gestiona:

- `user` → datos del usuario autenticado
- `token` → JWT de sesión
- `login()` → guarda token y usuario
- `logout()` → elimina sesión
- `isAuthenticated` → estado de autenticación

El componente `ProtectedRoute` protege todas las rutas privadas y redirige a `/login` si no hay sesión activa.

---

## 🛒 Carrito

`CarritoContext` maneja el estado del carrito y la sincronización con el backend:

- Carga el carrito del usuario al iniciar sesión
- `añadirProducto()` → agrega o actualiza un artículo
- `actualizarCantidad()` → cambia la cantidad de un producto
- `eliminarProducto()` → elimina un artículo del carrito
- `vaciarCarrito()` → limpia el carrito local

---

## 🎨 Diseño y estilo

- UI basada principalmente en **inline styles** con un archivo de tema en `src/styles/theme.ts`
- Se usa un diseño inspirado en **dark mode** con acentos claros
- Incluye soporte y configuración para **Tailwind CSS** y **PostCSS**

---

## 🔗 Backend sugerido

Este frontend está pensado para integrarse con un backend con APIs REST similares a:
- `/categorias/all`
- `/productos/:categoriaId`
- `/usuarios/login`
- `/usuarios/register`
- `/carrito`
- `/pago`
- `/ordenes`

---

**Versión**: 1.0.0  
**Autor**: Jaime Amuedo JAH

