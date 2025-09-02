export interface CategoriaPlano {
  id_categoria: number;
  nombre: string;
  id_sub_categoria: number;
  nombre_sub_categoria: string;
  id_sub_sub_categoria: number;
  nombre_sub_sub_categoria: string;
}

export interface SubSubCategoria {
  id_sub_sub_categoria: number;
  nombre_sub_sub_categoria: string;
}

export interface SubCategoria {
  id_sub_categoria: number;
  nombre_sub_categoria: string;
  subSubCategorias?: SubSubCategoria[];
}

export interface Categoria {
  id_categoria: number;
  nombre: string;
  subCategorias?: SubCategoria[];
}

export interface Filtro {
  id_filtro_categoria: number | null;
  nombre_filtro_categoria: string;
  id_tipo_filtro_categoria: number;
  nombre_tipo_filtro_categoria: "TEXTO" | "NUMERICO" | "CHECK" | undefined
  statusFiltro?: "NUEVO" | "EXISTENTE";
}

export interface InsertarCategoriasParams {
  isNewCategoria: boolean;
  categoria: string;
  isNewSubCategoria: boolean;
  subCategoria: string;
  nombreSubCategoria: string;
  nombreSubSubCategoria: string;
  FiltroNuevo: Filtro[];
  FiltroExistente: Filtro[];
}

