'use client';
import { Menu } from "@/types/Menu";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Divider, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { Icons } from "./iconsSideBar";
import { ListChild } from "./ListChild";

export const CustomizedListItem = ({ doc }: { doc: Menu }) => {
    const [open, setOpen] = useState(true)
    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <div className='navBox'>
            <div className='listItem'>
                <ListItemButton key={doc.id_menu} onClick={handleClick}>
                    <Icons idMenu={doc.id_menu} idSubMenu={null} />
                    <ListItemText
                        sx={{
                            paddingLeft: '7px',
                            display: {
                                xs: 'none',
                                md: 'block',
                            },
                        }}
                        primary={doc.nombre_menu}
                    />

                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </div>

            <Collapse
                in={open}
                timeout='auto'
                unmountOnExit
            >
                <ListChild doc={doc.subMenu} />
            </Collapse>
            <Divider />
        </div>
    )
}
