'use server'
import { ServiceResponse } from "@/types/ServiceResponse";
import { cookies } from "next/headers";
import '../../envConfig.ts'

export async function getTipoFiltroCategoria(): Promise<ServiceResponse<TipoFiltro[]>> {

    try {

        const cookieValue = (await cookies()).get("session")?.value;
        if (!cookieValue) throw new Error("Usuario no logueado");
        const session = JSON.parse(cookieValue);

        const response = await fetch(`${process.env.URL_BACKEND}service/obtenerTipoFiltroCategoria`, {
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