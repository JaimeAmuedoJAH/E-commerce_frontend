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
    clienteId: number
    items: CarritoItem[]
    totalItems: number
}