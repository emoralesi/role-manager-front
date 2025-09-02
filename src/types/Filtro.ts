
interface FiltroCategoryaBySubPlano {
    id_filtro_categoria: number;
    nombre_filtro_categoria: string;
    id_tipo_filtro_categoria: number;
    nombre_tipo_filtro_categoria: string;
    id_rel_sub_categoria_filtro: number;
    id_sub_sub_categoria: number;
    nombre_sub_sub_categoria: string;
    id_sub_categoria: number;
    value?: string | number | boolean;
}

interface TipoFiltro{
    id_tipo_filtro_categoria: number;
    nombre_tipo_filtro_categoria: string;
}