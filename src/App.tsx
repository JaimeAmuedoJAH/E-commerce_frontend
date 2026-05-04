import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Registro from './pages/Registro'
import ProtectedRoute from './components/ProtectedRoute'
import Categorias from './pages/Categorias'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/carrito" element={
        <ProtectedRoute>
          <Carrito />
        </ProtectedRoute>
      } />

      <Route path="/" element={
        <ProtectedRoute>
          <div style={{ color: 'white' }}>Home (protegido)</div>
        </ProtectedRoute> 
      } />
      <Route path="/categorias" element={
        <ProtectedRoute>
          <Categorias />
        </ProtectedRoute>
      } />
      <Route path="/productos/:categoriaId" element={
        <ProtectedRoute>
          <Productos />
        </ProtectedRoute>
      } />
      <Route path="/producto/:productoId" element={
        <ProtectedRoute>
          <ProductoDetalle />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App