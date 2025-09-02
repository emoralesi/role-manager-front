interface FiltroCBSSCA {
    id_rel_sub_categoria_filtro: number;
    id_filtro_categoria: number;
    id_sub_categoria: number;
    id_sub_sub_categoria: number;
    id_tipo_filtro_categoria: number;
    nombre_filtro_categoria: string;
    nombre_sub_sub_categoria: string;
    nombre_tipo_filtro_categoria: 'TEXTO' | 'CHECK' | 'NUMERICO';
    value?: string | number | boolean;
}

interface InsertarProductoParams {
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
    precio: number;
    sku: string;
    isactive: boolean;
    stock: number;
    id_categoria: number;
    id_sub_categoria: number;
    id_sub_sub_categoria: number;
}