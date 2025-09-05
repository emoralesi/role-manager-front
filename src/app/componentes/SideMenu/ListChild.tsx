'use client';
import { SubMenu } from "@/types/Menu";
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { Icons } from "./iconsSideBar";

export const ListChild = ({ doc }: { doc: SubMenu[] }) => {
    return (
        <div className='listchild'>
            <List component='li' disablePadding>
                {doc.map(subMenus => {
                    return (
                        <Link  href={`/main/${subMenus.link_sub_menu}`} style={{ textDecoration: 'none' }} key={subMenus.id_sub_menu}>
                            <ListItemButton key={subMenus.id_sub_menu}>
                                <ListItemIcon>
                                    <Icons idMenu={null} idSubMenu={subMenus.id_sub_menu} />
                                </ListItemIcon>
                                <ListItemText sx={{
                                    color: 'black', display: {
                                        xs: 'none',
                                        md: 'block',
                                    },
                                }} key={subMenus.id_sub_menu} primary={subMenus.nombre_sub_menu} />
                            </ListItemButton>
                        </Link>
                    )
                })}
            </List>
        </div>
    )
}