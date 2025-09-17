"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "@/types/Menu";
import getMenuYSubMenu from "@/service/MenuService";
import { useAuthContext } from "@/context/AuhtContext";

export const useMenu = () => {

    const { handleLogOut } = useAuthContext();
    const [dataMenu, setDataMenu] = useState<Menu[]>([]);
    const router = useRouter();


    const obtenerMenuYSubMenu = async () => {
        try {
            const data = await getMenuYSubMenu();

            if (data.status === "Forbidden") return handleLogOut();

            setDataMenu(data.resultado);
        } catch (error) {
            console.error("Error al obtener menú", error);
        }
    };

    return {
        dataMenu,
        obtenerMenuYSubMenu
    };
};