'use server'
import { cookies } from "next/headers";

export async function getSubCategorias({ id_categoria }: { id_categoria: number }): Promise<any> {

    let req = {
        "id_categoria": id_categoria
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
        console.log("este es my requestOption", requestOptions);
        const response = await fetch(`http://localhost:3500/service/obtenerSubCategoria`, requestOptions);

        const data = await response.json();

        return data

    } catch (error) {
        console.log(error);
        throw error
    }

}