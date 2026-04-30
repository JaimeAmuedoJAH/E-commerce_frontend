import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Registro from './pages/Registro'
import ProtectedRoute from './components/ProtectedRoute'
import Categorias from './pages/Categorias'
import Productos from './pages/Productos'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

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
    </Routes>
  )
}

export default App