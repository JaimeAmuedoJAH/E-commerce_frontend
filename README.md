# 🛍️ NOIR — E-commerce Frontend

Frontend de la plataforma de moda **NOIR**, desarrollado con **TypeScript** y **Vite**. Diseño dark mode minimalista con integración completa al backend Spring Boot.

---

## 🚀 Tecnologías

| Tecnología | Versión |
|---|---|
| React | 19 |
| TypeScript | 5 |
| Vite | 6 |
| React Router DOM | 7 |
| Axios | - |
| Tailwind CSS | 3 |

---

## 📐 Arquitectura

```
src/
├── api/                   # Configuración de axios y llamadas al backend
│   └── axiosConfig.ts
├── components/            # Componentes reutilizables
│   ├── NavbarPublica.tsx   # Navbar principal (pública y privada)
│   └── ProtectedRoute.tsx  # Guarda de rutas privadas
├── context/               # Estado global con Context API
│   ├── AuthContext.tsx     # Sesión de usuario y JWT
│   └── CarritoContext.tsx  # Estado del carrito
├── pages/                 # Páginas de la aplicación
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
├── types/                 # Interfaces TypeScript
│   └── index.ts
└── App.tsx
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

### URL del backend

Configurada en `src/api/axiosConfig.ts`:

```ts
const api = axios.create({
  baseURL: 'http://localhost:8110/api',
})
```

Cámbiala si tu backend corre en otro puerto.

### Arrancar en desarrollo

```bash
npm run dev
```

La app estará disponible en: `http://localhost:5173`

### Build para producción

```bash
npm run build
```

---

## 📱 Páginas

### Públicas
| Ruta | Descripción |
|---|---|
| `/` | Landing page de NOIR con hero, colecciones y acerca de |
| `/login` | Inicio de sesión |
| `/registro` | Registro de nuevo usuario |

### Privadas (requieren autenticación)
| Ruta | Descripción |
|---|---|
| `/categorias` | Listado de categorías con buscador |
| `/productos/:categoriaId` | Productos de una categoría con filtros |
| `/producto/:productoId` | Detalle de producto |
| `/carrito` | Carrito de compra |
| `/pago` | Pasarela de pago con tarjetas guardadas |
| `/ordenes/nueva` | Confirmación de dirección de envío |
| `/ordenes/confirmacion` | Confirmación del pedido |
| `/ordenes` | Historial de pedidos |

---

## 🔐 Autenticación

La autenticación se gestiona con JWT almacenado en `localStorage`. El `AuthContext` expone:

- `user` → datos del usuario logueado
- `token` → JWT
- `login()` → guarda token y usuario
- `logout()` → limpia sesión
- `isAuthenticated` → booleano

El `ProtectedRoute` redirige automáticamente a `/login` si no hay sesión activa.

---

## 🛒 Carrito

El `CarritoContext` gestiona el carrito sincronizado con el backend:

- Al loguearse se carga el carrito existente del usuario
- `añadirProducto()` → crea o actualiza el carrito
- `actualizarCantidad()` → actualiza cantidad de un item
- `eliminarProducto()` → elimina un item (si el carrito queda vacío lo elimina)
- `vaciarCarrito()` → limpia el estado local

---

## 💳 Pasarela de Pago

Flujo completo de pago ficticio:

1. Usuario selecciona tarjeta guardada o añade una nueva
2. Introduce el CVV
3. Frontend llama a `POST /pagos/procesar`
4. Si exitoso → se crea la orden con el código de transacción
5. Redirige a confirmación

---

## 🎨 Diseño

- **Dark mode** completo con fondo `#0f1117`
- **Color de acento** verde `#1d9e75`
- **Tipografía** del sistema, sin fuentes externas
- Todos los estilos con **inline styles** para máxima compatibilidad

---

## 🗂️ Milestones GitHub

| Milestone | Descripción |
|---|---|
| Milestone 1 | Setup y configuración |
| Milestone 2 | Autenticación (login, registro, JWT) |
| Milestone 3 | Catálogo (categorías, productos, filtros) |
| Milestone 4 | Carrito |
| Milestone 5 | Órdenes |
| Milestone 6 | Pasarela de pago ficticia |

---

## 🔗 Repositorio Backend

[E-commerce Backend](https://github.com/JaimeAmuedoJAH/E-commerce_backend)

---

**Versión**: 1.0.0  
**Última actualización**: Mayo 2026  
**Autor**: Jaime Amuedo JAH
