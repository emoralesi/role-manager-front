import { Categoria, CategoriaPlano, InsertarCategoriasParams } from "@/types/Categoria";
import { ServiceResponse } from "@/types/ServiceResponse";

export async function getCategorias(): Promise<ServiceResponse<Categoria[]>> {
  const response = await fetch(`http://localhost:3500/service/obtenerCategoria`);
  const data = await response.json();
  return data;
}

export async function getTodoCategorias(): Promise<ServiceResponse<CategoriaPlano[]>> {
  const response = await fetch(`http://localhost:3500/service/obtenerTodoCategorias`);
  const data = await response.json();
  return data;
}

export async function insertarCategorias(params: InsertarCategoriasParams): Promise<any> {
  try {
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    };
    const response = await fetch(`http://localhost:3500/service/AgregarCategoriaYFiltro`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en Insertar Categorias", error);
    throw error;
  }
}

export default { getCategorias, getTodoCategorias, insertarCategorias };