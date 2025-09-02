import { getSubCategorias } from "@/service/SubCategoriaService"
import { SubCategoria } from "@/types/Categoria"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

export const useSubCategoria = () => {

    const [subCategoriasAll, setSubCategoriasAll] = useState<SubCategoria[]>([])

    const navigate = useRouter();

    const handleLogOut = async () => {
        await localStorage.removeItem('UserLogged');
        navigate.push('/login')
    };

    const cleanSubcategorias = () => {
        setSubCategoriasAll([])
    }

    const obtenerSubCategorias = async (id_categoria: number) => {

        try {

            const data = await getSubCategorias({ id_categoria })

            if (data.status == "Forbidden") {
                handleLogOut()
            }

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