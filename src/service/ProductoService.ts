import { getUserLogged, UserLogged } from "@/utils/localStorage";

export async function insertarProducto({
    categoria,
    nombreProducto,
    precio,
    sku,
    stock,
    filtroCategoriasBySubSubCategoriaAll
}: InsertarProductoParams): Promise<any> {
    try {

        let req = {
            "id_categoria": categoria,
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
        const userLogged: UserLogged | null = getUserLogged();
        if (!userLogged) throw new Error('Usuario no logueado');

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'tu_clave_secreta_jwt': userLogged.token,
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
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
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
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
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
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
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

export default { insertarProducto, getProductos, updateIsActive, UpdateProducto, AgregarStock }