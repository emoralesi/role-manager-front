interface Filtro {
    id_filtro_categoria: number | null;
    nombre_filtro_categoria: string;
    id_tipo_filtro_categoria: number;
    nombre_tipo_filtro_categoria: "TEXTO" | "NUMERICO" | "CHECK";
    statusFiltro: "NUEVO" | "EXISTENTE";
}

interface InsertarCategoriasParams {
    isNewCategoria: boolean;
    categoria: string;
    isNewSubCategoria: boolean;
    subCategoria: string;
    nombreSubCategoria: string;
    nombreSubSubCategoria: string;
    FiltroNuevo: Filtro[];
    FiltroExistente: Filtro[];
}

export async function insertarCategorias({
    isNewCategoria,
    categoria,
    isNewSubCategoria,
    subCategoria,
    nombreSubCategoria,
    nombreSubSubCategoria,
    FiltroNuevo,
    FiltroExistente }:
    InsertarCategoriasParams): Promise<any> {

    try {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                isNewCategoria,
                categoria,
                isNewSubCategoria,
                subCategoria,
                nombreSubCategoria,
                nombreSubSubCategoria,
                FiltroNuevo,
                FiltroExistente
            })

        };

        const response = await fetch(`http://localhost:3500/service/AgregarCategoriaYFiltro`,
            requestOptions
        );

        const data = await response.json();

        return data

    } catch (error) {
        console.log("Error en Insertar Categorias ", error)
        throw error
    }

}


export async function getCategorias(): Promise<any> {

    try {
        const response = await fetch(`http://localhost:3500/service/obtenerCategoria`);

        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }

}

export async function getTodoCategorias(): Promise<any> {

    try {
        const response = await fetch(`http://localhost:3500/service/obtenerTodoCategorias`);

        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }

}

export default { getCategorias, insertarCategorias, getTodoCategorias };

