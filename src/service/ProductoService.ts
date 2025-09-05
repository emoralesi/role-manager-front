'use server'
import { cookies } from "next/headers";

export async function insertarProducto({
    nombreProducto,
    precio,
    sku,
    stock,
    filtroCategoriasBySubSubCategoriaAll
}: InsertarProductoParams): Promise<any> {
    try {

        const cookieValue = (await cookies()).get("session")?.value;
        if (!cookieValue) throw new Error("Usuario no logueado");

        const session = JSON.parse(cookieValue);

        let req = {
            "nombre": nombreProducto,
            "precio": precio,
            "sku": sku,
            "stock": stock,
            "listaFiltros": filtroCategoriasBySubSubCategoriaAll
        }

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "tu_clave_secreta_jwt": session.token,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(req)

        };

        const response = await fetch(`http://localhost:3500/service/agregarProducto`, requestOptions);

        const data = await response.json();

        return data

    } catch (error) {
        return error
    }

}

export async function getProductos(): Promise<any> {

    try {

        const cookieValue = (await cookies()).get("session")?.value;
        if (!cookieValue) throw new Error("Usuario no logueado");

        const session = JSON.parse(cookieValue);

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'tu_clave_secreta_jwt': session.token,
            },
        };

        const resultado = await fetch('http://localhost:3500/service/obtenerProducto', requestOptions);

        const data = await resultado.json();

        return data;
    } catch (error) {
        throw error
    }

}

export async function updateIsActive({ id_producto, isactive }: { id_producto: number, isactive: boolean }): Promise<any> {

    let req = {
        "id_producto": id_producto,
        "isactive": isactive
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

        const response = await fetch(`http://localhost:3500/service/actualizarEstado`, requestOptions)

        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }

}

export async function AgregarStock({ sku, stock }: { sku: string, stock: number }): Promise<any> {

    let req = {
        "sku": sku,
        "stock": stock
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

        const response = await fetch(`http://localhost:3500/service/agregarStock`,
            requestOptions
        );

        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }

}


export async function UpdateProducto({
    id_producto,
    id_categoria,
    nombre,
    precio,
    sku }
    : UpdateProductoParams)
    : Promise<any> {

    let req = {
        "id_producto": id_producto,
        "id_categoria": id_categoria,
        "nombre": nombre,
        "precio": precio,
        "sku": sku
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
        const response = await fetch(`http://localhost:3500/service/actualizarProducto`, requestOptions);

        const data = await response.json();

        return data

    } catch (error) {
        console.log(error);
        throw error
    }
}