import { useAuthContext } from "@/context/AuhtContext";
import { getUsuarios, RegisterUsuario, UpdateEstadoUsuario, UpdatePasswordUsuario, UpdateUsuario } from "@/service/UsuarioService";
import { useState } from "react";

export const useUsuario = () => {

    const { handleLogOut } = useAuthContext();

    const [usuariosAll, setUsuariosAll] = useState<Usuario[]>([]);
    const [usuariosAllDataGrid, setUsuariosAllDataGrid] = useState<Usuario[]>([]);

    const RegistarUsuario = async ({ nombreUsuario, password, role }: { nombreUsuario: string, password: string, role: number }) => {

        try {

            const result = await RegisterUsuario({ nombreUsuario, password, role });
            if (result.status === "Forbidden") return handleLogOut();
            return result;

        } catch (error) {
            console.log(error);
        } finally {

        }

    }

    const actualizarPassword = async (id_usuario: number, newPassword: string) => {
        try {
            const result = await UpdatePasswordUsuario({ id_usuario, newPassword });
            if (result.status === "Forbidden") return handleLogOut();

            return result
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarUsuario = async ({ id_usuario, nombre_usuario, role }: { id_usuario: number, nombre_usuario: string, role: number }) => {
        try {

            const data = await UpdateUsuario({ id_usuario, nombre_usuario, role })
            if (data.status === "Forbidden") return handleLogOut();

            return data
        } catch (er) {
            console.log(er);
        }
    }

    const obtenerUsuarios = async () => {
        try {

            const data = await getUsuarios()
            if (data.status === "Forbidden") return handleLogOut();

            const usuarios: Usuario[] = data.resultado.map((u: any) => ({
                id_usuario: u.id_usuario,
                nombre_usuario: u.nombre_usuario,
                activo: u.activo,
                role: {
                    id_roles: u.id_roles,
                    nombre_rol: u.nombre_rol,
                } as Role,
            }));

            setUsuariosAll(usuarios)
            setUsuariosAllDataGrid(usuarios)
        } catch (er) {
            console.log(er);
        } finally {

        }
    }

    const actualizarUsuarioEstado = async ({ id_usuario, activo }: { id_usuario: number, activo: boolean }) => {
        try {

            const data = await UpdateEstadoUsuario({ id_usuario, activo })
            if (data.status === "Forbidden") return handleLogOut();

            return data
        } catch (er) {
            console.log(er);
        }
    }

    return { RegistarUsuario, obtenerUsuarios, usuariosAll, setUsuariosAll, actualizarUsuarioEstado, usuariosAllDataGrid, setUsuariosAllDataGrid, actualizarPassword, actualizarUsuario }
}