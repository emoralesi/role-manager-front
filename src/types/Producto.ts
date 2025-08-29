interface FiltroCBSSCA {
    id_rel_sub_categoria_filtro: number;
    value: string;
}

interface InsertarProductoParams {
    categoria: number;
    nombreProducto: string;
    precio: number;
    sku: string;
    stock: number;
    filtroCategoriasBySubSubCategoriaAll: FiltroCBSSCA[];
}

interface UpdateProductoParams {
    id_producto: number;
    id_categoria: number;
    nombre: string;
    precio: number;
    sku: string;
}

interface Producto {
    id_producto: number;
    nombre: string;
    precio: number;
    sku: string;
    isactive: boolean;
    stock: number;
}

interface ListaProducto {
    id_producto: number;
    nombrecategoria: string;
    nombresubcategoria: string;
    nombresubsubcategoria: string;
    nombre: string;
    precio: string;
    sku: string;
    isactive: boolean;
    stock: number;
    id_categoria: number;
    id_sub_categoria: number;
    id_sub_sub_categoria: number;
}