export interface SubMenu {
    id_sub_menu: number;
    nombre_sub_menu: string;
    link_sub_menu: string;
    idRoles: number[];
}

export interface Menu {
    id_menu: number;
    nombre_menu: string;
    subMenu: SubMenu[];
}

