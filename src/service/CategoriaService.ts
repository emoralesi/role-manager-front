'use server'
import { Categoria, CategoriaPlano, InsertarCategoriasParams } from "@/types/Categoria";
import { ServiceResponse } from "@/types/ServiceResponse";
import { cookies } from "next/headers";
import '../../envConfig.ts'

export async function getCategorias(): Promise<ServiceResponse<Categoria[]>> {
  try {
    const cookieValue = (await cookies()).get("session")?.value;
    if (!cookieValue) throw new Error("Usuario no logueado");
    const session = JSON.parse(cookieValue);

    const response = await fetch(`${process.env.URL_BACKEND}service/obtenerCategoria`, {
      method: "GET",
      headers: {
        "tu_clave_secreta_jwt": session.token,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getCategorias", error);
    throw error;
  }
}

export async function getTodoCategorias(): Promise<ServiceResponse<CategoriaPlano[]>> {
  try {
    const cookieValue = (await cookies()).get("session")?.value;
    if (!cookieValue) throw new Error("Usuario no logueado");
    const session = JSON.parse(cookieValue);

    const response = await fetch(`${process.env.URL_BACKEND}service/obtenerTodoCategorias`, {
      method: "GET",
      headers: {
        "tu_clave_secreta_jwt": session.token,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getTodoCategorias", error);
    throw error;
  }
}

export async function insertarCategorias(params: InsertarCategoriasParams): Promise<any> {
  try {
    const cookieValue = (await cookies()).get("session")?.value;
    if (!cookieValue) throw new Error("Usuario no logueado");
    const session = JSON.parse(cookieValue);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "tu_clave_secreta_jwt": session.token,
      },
      body: JSON.stringify(params),
    };
    const response = await fetch(`${process.env.URL_BACKEND}service/AgregarCategoriaYFiltro`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en Insertar Categorias", error);
    throw error;
  }
}