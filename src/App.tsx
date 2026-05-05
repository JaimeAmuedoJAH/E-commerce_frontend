import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Registro from './pages/Registro'
import ProtectedRoute from './components/ProtectedRoute'
import Categorias from './pages/Categorias'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import Pago from './pages/Pago'
import OrdenNueva from './pages/OrdenNueva'
import OrdenConfirmacion from './pages/OrdenConfirmacion'
import Navbar from './components/Navbar'
import Ordenes from './pages/Ordenes'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route path="/*" element={
        <ProtectedRoute>
          <>
            <Navbar />
            <Routes>
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/productos/:categoriaId" element={<Productos />} />
              <Route path="/producto/:productoId" element={<ProductoDetalle />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/pago" element={<Pago />} />
              <Route path="/ordenes/nueva" element={<OrdenNueva />} />
              <Route path="/ordenes/confirmacion" element={<OrdenConfirmacion />} />
              <Route path="/ordenes" element={<Ordenes />} />
            </Routes>
          </>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App