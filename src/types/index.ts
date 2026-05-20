export interface Producto {
    id: number
    nombre: string
    talla: string
    color: string
    descripcion: string
    precio: number
    imagen: string
    stock: number
    categoriaId: number
    categoriaNombre: string
}

export interface Categoria {
    id: number
    nombre: string
    productos: Producto[]
}

export interface CarritoItem {
    id: number
    producto: Producto
    cantidad: number
}

export interface Carrito {
    id: number
    clientePublicId: string  // era: clienteId: number
    items: CarritoItem[]
    totalItems: number
}

export interface Tarjeta {
    id: number
    clientePublicId: string
    numeroTarjeta: string
    titular: string
    fechaExpiracion: string
    saldo: number
}

export interface PagoRequest {
    carritoId: number
    clientePublicId: string
    numeroTarjeta: string
    fechaExpiracion: string
    cvv: string
    titular: string
    monto: number
}

export interface PagoResponse {
    exitoso: boolean
    mensaje: string
    codigoTransaccion: string | null
    carritoId: number
    clientePublicId: string
}    