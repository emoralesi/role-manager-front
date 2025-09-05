import { useAuthContext } from "@/context/AuhtContext"
import { getSubCategorias } from "@/service/SubCategoriaService"
import { SubCategoria } from "@/types/Categoria"
import { useState } from "react"

export const useSubCategoria = () => {

    const { handleLogOut } = useAuthContext();

    const [subCategoriasAll, setSubCategoriasAll] = useState<SubCategoria[]>([])


    const cleanSubcategorias = () => {
        setSubCategoriasAll([])
    }

    const obtenerSubCategorias = async (id_categoria: number) => {

        try {

            const data = await getSubCategorias({ id_categoria })
            if (data.status === "Forbidden") return handleLogOut();

            setSubCategoriasAll(data.resultado)
        } catch (er) {
            console.log(er)
        } finally {
        }

    }
    return {
        obtenerSubCategorias, cleanSubcategorias, subCategoriasAll
    }


}