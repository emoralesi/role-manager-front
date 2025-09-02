import { getTipoFiltroCategoria } from "@/service/TipoFiltroCateogiraService";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react"

export const useTipoFiltroCategoria = () => {

    const [tipoFiltroCategoriaAll, setTipoFiltroCategoriaAll] = useState<TipoFiltro[]>([])

    const navigate = useRouter();

    const handleLogOut = async () => {
        await localStorage.removeItem('UserLogged');
        navigate.push('/login')
    };

    const obtenerTipoFiltroCategoria = async () => {

        try {
            const data = await getTipoFiltroCategoria()

            if (data.status == "Forbidden") {
                handleLogOut()
            }

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