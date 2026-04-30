import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Registro from './pages/Registro'
import ProtectedRoute from './components/ProtectedRoute'

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
    </Routes>
  )
}

export default App