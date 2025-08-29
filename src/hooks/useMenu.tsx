import { getMenuYSubMenu } from "@/service/MenuService";
import { Menu } from "@/types/Menu";
import { getUserLogged, UserLogged } from "@/utils/localStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";


export const useMenu = () => {

    const [dataMenu, setDataMenu] = useState<Menu[]>([]);


    const navigate = useRouter();

    const handleLogOut = async () => {
        await localStorage.removeItem('UserLogged');
        navigate.push('/login')
    };

    const obtenerMenuYSubMenu = async () => {

        try {

            const userLogged: UserLogged | null = getUserLogged();
            if (!userLogged) throw new Error('Usuario no logueado');

            const idUsuario = userLogged.id_usuario
            const data = await getMenuYSubMenu({ idUsuario });

            if (data.status == "Forbidden") {
                handleLogOut()
            }
            setDataMenu(data.resultado)

        } catch (er) {
            console.log(er);
        }
    }

    return {
        obtenerMenuYSubMenu,
        dataMenu
    }
}