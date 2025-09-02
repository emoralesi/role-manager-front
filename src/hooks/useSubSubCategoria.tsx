import { getSubSubCategorias } from "@/service/SubSubCategoriaService"
import { SubSubCategoria } from "@/types/Categoria"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

export const useSubSubCategoria = () => {

    const [subSubcategoriasAll, setSubSubCategoriasAll] = useState<SubSubCategoria[]>([])

    const cleanSubSubcategorias = () => {
        setSubSubCategoriasAll([])
    }

    const navigate = useRouter();

    const handleLogOut = async () => {
        await localStorage.removeItem('UserLogged');
        navigate.push('/login')
    };

    const obtenerSubSubCategorias = async (id_sub_categoria: number) => {

        try {

            const data = await getSubSubCategorias({ id_sub_categoria })

            if (data.status == "Forbidden") {
                handleLogOut()
            }

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