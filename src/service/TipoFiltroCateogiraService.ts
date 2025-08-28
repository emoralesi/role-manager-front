export async function getTipoFiltroCategoria(): Promise<any> {

    try {
        const response = await fetch(`http://localhost:3500/service/obtenerTipoFiltroCategoria`)

        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }

}

export default { getTipoFiltroCategoria };