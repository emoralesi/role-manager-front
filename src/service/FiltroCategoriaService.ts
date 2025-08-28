export async function getFiltroCategorias(): Promise<any> {

    try {
        const response = await fetch(`http://localhost:3500/service/obtenerFiltroCategoria`);

        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }

}

export async function getFiltroCategoriasBySubSubCategoria(
    { id_sub_sub_categoria }: { id_sub_sub_categoria: number }
): Promise<any> {

    const req = {
        idSubSubCategoria: id_sub_sub_categoria
    };

    try {
        const requestOptions: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

export default { getFiltroCategorias }