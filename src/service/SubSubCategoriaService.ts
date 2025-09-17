'use server'
import { cookies } from "next/headers";
import '../../envConfig.ts'

export async function getSubSubCategorias({ id_sub_categoria }: { id_sub_categoria: number }): Promise<any> {

    let req = {
        "id_sub_categoria": id_sub_categoria
    }

    try {

        const cookieValue = (await cookies()).get("session")?.value;
        if (!cookieValue) throw new Error("Usuario no logueado");

        const session = JSON.parse(cookieValue);

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'tu_clave_secreta_jwt': session.token,
            },
            body: JSON.stringify(req)

        };

        const response = await fetch(`${process.env.URL_BACKEND}service/obtenerSubSubCategoria`, requestOptions);

        const data = await response.json();

        return data

    } catch (error) {
        console.log(error);
        throw error
    }

}