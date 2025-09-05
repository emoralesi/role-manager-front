import { useAuthContext } from "@/context/AuhtContext";
import { getCategorias, getTodoCategorias, insertarCategorias } from "@/service/CategoriaService";
import { Categoria, CategoriaPlano, InsertarCategoriasParams } from "@/types/Categoria";
import { useState } from "react";

function transformarCategorias(datos: CategoriaPlano[]): Categoria[] {
    const mapaCategorias = new Map<number, Categoria>();

    datos.forEach((item) => {
        if (!mapaCategorias.has(item.id_categoria)) {
            mapaCategorias.set(item.id_categoria, {
                id_categoria: item.id_categoria,
                nombre: item.nombre,
                subCategorias: [],
            });
        }

        const categoria = mapaCategorias.get(item.id_categoria)!;

        let subCat = categoria?.subCategorias?.find((sc) => sc.id_sub_categoria === item.id_sub_categoria);
        if (!subCat) {
            subCat = {
                id_sub_categoria: item.id_sub_categoria,
                nombre_sub_categoria: item.nombre_sub_categoria,
                subSubCategorias: [],
            };
            categoria?.subCategorias?.push(subCat);
        }

        subCat?.subSubCategorias?.push({
            id_sub_sub_categoria: item.id_sub_sub_categoria,
            nombre_sub_sub_categoria: item.nombre_sub_sub_categoria,
        });
    });

    return Array.from(mapaCategorias.values());
}

export const useCategoria = () => {

    const { handleLogOut } = useAuthContext();

    const [categoriasAll, setCategoriasAll] = useState<Categoria[]>([]);
    const [categoriasTodoAll, setCategoriasTodoAll] = useState<Categoria[]>([]);
    const [categoriasTodoAllGrid, setCategoriasTodoAllGrid] = useState<Categoria[]>([]);
    const [loadingCategorias, setLoadingCategorias] = useState(false);
    const [errorCategoria, setError] = useState<boolean | null>(null);
    const [statusCategoria, setStatusCategoria] = useState<number>(0);

    const obtenerCategorias = async () => {
        try {
            setLoadingCategorias(true);
            const data = await getCategorias();
            if (data.status === "Forbidden") return handleLogOut();
            setCategoriasAll(data.resultado);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoadingCategorias(false);
        }
    };

    const obtenerTodoCategorias = async () => {
        try {
            const data = await getTodoCategorias()
            if (data.status === "Forbidden") return handleLogOut();

            const categoriasTransformadas = transformarCategorias(data.resultado as CategoriaPlano[]);
            setCategoriasTodoAll(categoriasTransformadas);
            setCategoriasTodoAllGrid(categoriasTransformadas);
        } catch (er) {
            console.log(er);
        }
    };


    const agregarCategoria = async (params: InsertarCategoriasParams) => {
        try {
            const data = await insertarCategorias(params);
            if (data.status === "Forbidden") return handleLogOut();
            return data;
        } catch (err) {
            console.error(err);
        }
    };

    return {
        categoriasAll,
        obtenerCategorias,
        categoriasTodoAll,
        obtenerTodoCategorias,
        categoriasTodoAllGrid,
        setCategoriasTodoAllGrid,
        loadingCategorias,
        errorCategoria,
        agregarCategoria,
        statusCategoria,
    };
};