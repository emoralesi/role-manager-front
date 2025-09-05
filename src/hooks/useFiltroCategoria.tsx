import { useAuthContext } from "@/context/AuhtContext";
import { getFiltroCategorias, getFiltroCategoriasBySubSubCategoria } from "@/service/FiltroCategoriaService";
import { Filtro } from "@/types/Categoria";
import { useEffect, useState } from "react";

export const useFiltroCategoria = () => {

    const { handleLogOut } = useAuthContext();

    const [FiltroCategoriasAll, setFiltroCategoriasAll] = useState<Filtro[]>([])
    const [filtroCategoriasBySubSubCategoriaAll, setFiltroCategoriasBySubSubCategoriaAll] = useState<FiltroCBSSCA[]>([])


    const obtenerFiltroCategorias = async () => {
        try {
            const data = await getFiltroCategorias()
            if (data.status === "Forbidden") return handleLogOut();

            setFiltroCategoriasAll(data.resultado)
        } catch (er) {
            console.log(er)
        } finally {
        }
    }

    const obtenerFiltroCategoriasBySubSubCategoria = async ({ id_sub_sub_categoria }: { id_sub_sub_categoria: number }) => {
        try {

            const data = await getFiltroCategoriasBySubSubCategoria({ id_sub_sub_categoria })
            if (data.status === "Forbidden") return handleLogOut();

            let dataResultado = data.resultado

            if (dataResultado) {
                dataResultado.forEach(element => {
                    switch (element.nombre_tipo_filtro_categoria) {
                        case 'TEXTO':
                            element.value = '';
                            break;
                        case 'CHECK':
                            element.value = false;
                            break;
                        case 'NUMERICO':
                            element.value = 0;
                            break;

                        default:
                            element.value = 0;
                            break;
                    }
                });
            }

            setFiltroCategoriasBySubSubCategoriaAll(dataResultado)
        } catch (er) {
            console.log(er)
        } finally {
        }
    }

    useEffect(() => {
        obtenerFiltroCategorias()
    }, [])


    return { FiltroCategoriasAll, obtenerFiltroCategoriasBySubSubCategoria, setFiltroCategoriasBySubSubCategoriaAll, filtroCategoriasBySubSubCategoriaAll }

}