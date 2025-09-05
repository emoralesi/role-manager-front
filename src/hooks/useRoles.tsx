import { useState, useCallback } from "react";
import { actualizarRol, crearRolService, getRolesConMenus } from "@/service/RolesService";
import { log } from "console";

export interface Submenu {
    id_sub_menu: number;
    nombre_sub_menu: string;
}

export interface Menu {
    id_menu: number;
    nombre_menu: string;
    submenus: Submenu[];
}

export interface Rol {
    id_roles: number;
    nombre_rol: string;
    permisos?: string[];
    menus?: { id_menu: number; submenus: number[] }[];
}

export const useRoles = () => {
    const [rolesAll, setRolesAll] = useState<Rol[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);

    const obtenerRoles = useCallback(async () => {
        try {
            const data = await getRolesConMenus();

            console.log("Datos obtenidos de getRolesConMenus:", data);

            if (data.ok === 200) {
                const menuMap: { [id: number]: Menu } = {};
                const rolesMap: { [id: number]: Rol } = {};

                data.resultado.forEach((item: any) => {

                    if (!rolesMap[item.id_roles]) {
                        rolesMap[item.id_roles] = {
                            id_roles: item.id_roles,
                            nombre_rol: item.nombre_rol,
                            permisos: [],
                            menus: [],
                        };
                    }

                    if (item.id_menu) {

                        if (!menuMap[item.id_menu]) {
                            menuMap[item.id_menu] = {
                                id_menu: item.id_menu,
                                nombre_menu: item.nombre_menu,
                                submenus: [],
                            };
                        }

                        const subExist = menuMap[item.id_menu].submenus.some(
                            (sub) => sub.id_sub_menu === item.id_sub_menu
                        );
                        if (item.id_sub_menu && !subExist) {
                            menuMap[item.id_menu].submenus.push({
                                id_sub_menu: item.id_sub_menu,
                                nombre_sub_menu: item.nombre_sub_menu,
                            });
                        }

                        if (item.id_sub_menu) {
                            const permiso = `${item.nombre_menu} - ${item.nombre_sub_menu}`;
                            if (!rolesMap[item.id_roles].permisos?.includes(permiso)) {
                                rolesMap[item.id_roles].permisos?.push(permiso);
                            }

                            const menuIndex = rolesMap[item.id_roles].menus?.findIndex(
                                (m) => m.id_menu === item.id_menu
                            );
                            if (menuIndex === -1 || menuIndex === undefined) {
                                rolesMap[item.id_roles].menus?.push({
                                    id_menu: item.id_menu,
                                    submenus: [item.id_sub_menu],
                                });
                            } else if (!rolesMap[item.id_roles].menus![menuIndex].submenus.includes(item.id_sub_menu)) {
                                rolesMap[item.id_roles].menus![menuIndex].submenus.push(item.id_sub_menu);
                            }
                        }
                    }
                });

                setRolesAll(Object.values(rolesMap));
                setMenus(Object.values(menuMap));
            } else {
                console.warn("Error cargando roles:", data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const crearRol = useCallback(
        async (nombreRol: string, menusSeleccionados: { id_menu: number; submenus: number[] }[]) => {
            try {
                const req = { nombreRol, menus: menusSeleccionados };
                const data = await crearRolService(req);
                if (data.ok === 200) {
                    await obtenerRoles();
                }
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        [obtenerRoles]
    );

    const editarRol = useCallback(
        async (
            idRol: number,
            menusSeleccionados: { id_menu: number; submenus: number[] }[]
        ) => {
            try {
                const rolExistente = rolesAll.find((r) => r.id_roles === idRol);
                if (!rolExistente) throw new Error("Rol no encontrado");

                const req = {
                    idRol,
                    nombreRol: rolExistente.nombre_rol,
                    menus: menusSeleccionados,
                };

                const data = await actualizarRol(req);
                if (data.ok === 200) {
                    await obtenerRoles();
                }
                return data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
        [rolesAll, obtenerRoles]
    );

    return {
        rolesAll,
        menus,
        obtenerRoles,
        crearRol,
        editarRol,
    };
};