export interface CategoriaPlano {
  id_categoria: number;
  nombre: string;
  id_sub_categoria: number;
  nombre_sub_categoria: string;
  id_sub_sub_categoria: number;
  nombre_sub_sub_categoria: string;
}

export interface SubSubCategoria {
  id: number;
  nombre: string;
}

export interface SubCategoria {
  id: number;
  nombre: string;
  subSubCategorias?: SubSubCategoria[];
}

export interface Categoria {
  id: number;
  nombre: string;
  subCategorias?: SubCategoria[];
}

export interface Filtro {
  id_filtro_categoria: number | null;
  nombre_filtro_categoria: string;
  id_tipo_filtro_categoria: number;
  nombre_tipo_filtro_categoria: "TEXTO" | "NUMERICO" | "CHECK";
  statusFiltro: "NUEVO" | "EXISTENTE";
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

