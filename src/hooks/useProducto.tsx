import { useAuthContext } from '@/context/AuhtContext';
import { AgregarStock, getProductos, insertarProducto, updateIsActive, UpdateProducto } from '@/service/ProductoService';
import { useState } from 'react';

export const useProducto = () => {

    const { handleLogOut } = useAuthContext();

    const [loadingProducto, setLoadingProducto] = useState<boolean>(false);
    const [listaProducto, setListaProducto] = useState<ListaProducto[]>([])
    const [listaProductoDataGrid, setListaProductoDataGrid] = useState<ListaProducto[]>([])
    const [errorProducto, setErrorProducto] = useState<boolean>(false);
    const [stautsProducto, setStatusProducto] = useState<number>(0);


    const agregarProducto = async (params: InsertarProductoParams) => {

        try {
            const result = await insertarProducto(params)
            if (result.status === "Forbidden") return handleLogOut();
            return result;

        } catch (error) {
            console.log(error);
        } finally {

        }

    }

    const actualizarProducto = async (params: UpdateProductoParams) => {
        try {

            const result = await UpdateProducto(params)
            if (result.status === "Forbidden") return handleLogOut();
            return result

        } catch (error) {
            console.log(error);
        } finally {

        }
    }

    const actualizarEstado = async ({ id_producto, isactive }: { id_producto: number, isactive: boolean }) => {
        try {

            const data = await updateIsActive({ id_producto, isactive });
            if (data.status === "Forbidden") return handleLogOut();

            return data
        } catch (er) {
            console.log(er);
        }
    }

    const obtenerProductos = async () => {
        try {

            const data = await getProductos();
            if (data.status === "Forbidden") return handleLogOut();

            setListaProducto(data.resultado)
            setListaProductoDataGrid(data.resultado)

        } catch (er) {
            console.log(er);
        } finally {
        }
    };

    const agregarStock = async ({ sku, stock }: { sku: string, stock: number }) => {
        try {

            const data = await AgregarStock({ sku, stock });
            if (data.status === "Forbidden") return handleLogOut();
            setStatusProducto(data.ok);

            return data;

        } catch (error) {
            console.log(error);
        }
    };

    return { obtenerProductos, actualizarEstado, agregarStock, agregarProducto, actualizarProducto, loadingProducto, errorProducto, stautsProducto, listaProducto, listaProductoDataGrid, setListaProducto, setListaProductoDataGrid }
}