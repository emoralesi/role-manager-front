'use server'
import { ServiceResponse } from "@/types/ServiceResponse";
import { cookies } from "next/headers";

export async function getFiltroCategorias(): Promise<any> {

    try {

        const cookieValue = (await cookies()).get("session")?.value;
        if (!cookieValue) throw new Error("Usuario no logueado");
        const session = JSON.parse(cookieValue);

        const response = await fetch(`http://localhost:3500/service/obtenerFiltroCategoria`, {
            method: "GET",
            headers: {
                "tu_clave_secreta_jwt": session.token,
            },
        });
        
        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }

}

export async function getFiltroCategoriasBySubSubCategoria(
    { id_sub_sub_categoria }: { id_sub_sub_categoria: number }
): Promise<ServiceResponse<FiltroCBSSCA[]>> {

    const req = {
        idSubSubCategoria: id_sub_sub_categoria
    };

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
            body: JSON.stringify(req),
        };

        const response = await fetch(
            "http://localhost:3500/service/obtenerFiltroCategoriaBySubSubCategoria",
            requestOptions
        );

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Error en getFiltroCategoriasBySubSubCategoria:", error);
        throw error;
    }
}