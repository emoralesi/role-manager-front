import { useAuthContext } from "@/context/AuhtContext"
import { getSubSubCategorias } from "@/service/SubSubCategoriaService"
import { SubSubCategoria } from "@/types/Categoria"
import { useState } from "react"

export const useSubSubCategoria = () => {

    const { handleLogOut } = useAuthContext();

    const [subSubcategoriasAll, setSubSubCategoriasAll] = useState<SubSubCategoria[]>([])

    const cleanSubSubcategorias = () => {
        setSubSubCategoriasAll([])
    }

    const obtenerSubSubCategorias = async (id_sub_categoria: number) => {

        try {

            const data = await getSubSubCategorias({ id_sub_categoria })
            if (data.status === "Forbidden") return handleLogOut();

            setSubSubCategoriasAll(data.resultado)
        } catch (er) {
            console.log(er)
        } finally {
        }

    }
    return {
        obtenerSubSubCategorias, cleanSubSubcategorias, subSubcategoriasAll
    }


}