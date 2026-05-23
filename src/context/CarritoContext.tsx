import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import api from '../api/axiosConfig'
import { useAuth } from './AuthContext'
import type { Carrito } from '../types'

interface CarritoContextType {
    carrito: Carrito | null
    loading: boolean
    añadirProducto: (productoId: number, cantidad: number) => Promise<void>
    eliminarProducto: (productoId: number) => Promise<void>
    actualizarCantidad: (productoId: number, cantidad: number) => Promise<void>
    vaciarCarrito: () => void
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined)

export const CarritoProvider = ({ children}: { children: ReactNode }) => {
    const { user } = useAuth()
    const [carrito, setCarrito] = useState<Carrito | null>(null)
    const [loading, setLoading] = useState(true)

    // Cargar el carrito al loguearse
    useEffect(() => {
        if (!user) {
        setCarrito(null)
        return
        }
        setLoading(true)
        api.get<Carrito[]>(`/carritos/cliente/${user.publicId}`)
        .then(res => {
            if (res.data.length > 0) {
            setCarrito(res.data[0])
            }
        })
        .catch(() => setCarrito(null))
        .finally(() => setLoading(false))
    }, [user])

    const añadirProducto = async (productoId: number, cantidad: number) => {
        if (!user) return
        if (carrito) {
            //actualizar carrito existente
            const itemsActualizados = [...carrito.items]
            const itemsExistentes = itemsActualizados.find(i => i.producto.id === productoId)

            const nuevosItems = itemsExistentes
            ? itemsActualizados.map(i => 
                i.producto.id === productoId 
                ? { productoId: i.producto.id, cantidad: i.cantidad + cantidad }
            : { productoId: i.producto.id, cantidad: i.cantidad }
            )
            : [...itemsActualizados.map(i => ({ productoId: i.producto.id, cantidad: i.cantidad })), 
                { productoId, cantidad }]

            const res = await api.put<Carrito>(`/carritos/update/${carrito.id}`, {
                clientePublicId: user.publicId,
                items: nuevosItems,
            })
            setCarrito(res.data)
        } else {
            //crear nuevo carrito
            const res = await api.post<Carrito>('/carritos/add', {
                clientePublicId: user.publicId,
                items: [{ productoId, cantidad }],
            })
            setCarrito(res.data)
        }
    }

    const actualizarCantidad = async (productoId: number, cantidad: number) => {
      if (!user || !carrito) return

      const nuevosItems = carrito.items
        .filter(i => !(i.producto.id === productoId && cantidad === 0))
        .map(i => ({
          productoId: i.producto.id,
          cantidad: i.producto.id === productoId ? cantidad : i.cantidad,
        }))

      if (nuevosItems.length === 0) {
        await api.delete(`/carritos/delete/${carrito.id}`)
        setCarrito(null)
        return
      }

      const res = await api.put<Carrito>(`/carritos/update/${carrito.id}`, {
        clientePublicId: user.publicId,
        items: nuevosItems,
      })
      setCarrito(res.data)
    }

    const eliminarProducto = async (productoId: number) => {
      if (!user || !carrito) return

      const nuevosItems = carrito.items
        .filter(i => i.producto.id !== productoId)
        .map(i => ({ productoId: i.producto.id, cantidad: i.cantidad }))

      if (nuevosItems.length === 0) {
        // Si no quedan items eliminamos el carrito entero
        await api.delete(`/carritos/delete/${carrito.id}`)
        setCarrito(null)
        return
      }

      const res = await api.put<Carrito>(`/carritos/update/${carrito.id}`, {
        clientePublicId: user.publicId,
        items: nuevosItems,
      })
      setCarrito(res.data)
    }

  const vaciarCarrito = () => setCarrito(null)

  return (
    <CarritoContext.Provider value={{ carrito, loading, añadirProducto, actualizarCantidad, eliminarProducto, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  )
}

export const useCarrito = () => {
  const context = useContext(CarritoContext)
  if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return context
}