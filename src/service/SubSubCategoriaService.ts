export async function getSubSubCategorias({ id_sub_categoria }: { id_sub_categoria: number }): Promise<any> {

    let req = {
        "id_sub_categoria": id_sub_categoria
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

        const response = await fetch(`http://localhost:3500/service/obtenerSubSubCategoria`, requestOptions);

        const data = await response.json();

        return data

    } catch (error) {
        console.log(error);
        throw error
    }

}
export default { getSubSubCategorias }