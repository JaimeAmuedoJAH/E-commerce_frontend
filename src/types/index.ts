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