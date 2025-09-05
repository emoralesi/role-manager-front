import { useAuthContext } from "@/context/AuhtContext";
import { getTipoFiltroCategoria } from "@/service/TipoFiltroCateogiraService";
import { useEffect, useState } from "react";

export const useTipoFiltroCategoria = () => {

    const { handleLogOut } = useAuthContext();

    const [tipoFiltroCategoriaAll, setTipoFiltroCategoriaAll] = useState<TipoFiltro[]>([])

    const obtenerTipoFiltroCategoria = async () => {

        try {
            const data = await getTipoFiltroCategoria()
            if (data.status === "Forbidden") return handleLogOut();

            setTipoFiltroCategoriaAll(data.resultado)
        } catch (er) {
            console.log(er)
        } finally {
        }

    }

    useEffect(() => {
        obtenerTipoFiltroCategoria()
    }, [])

    return {
        tipoFiltroCategoriaAll
    }
}