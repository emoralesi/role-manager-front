'use client';

import { List } from "@mui/material";
import React, { useEffect } from 'react';
import { CustomizedListItem } from "./CustomizedListItem";
import { useMenu } from "@/hooks/useMenu";

export default function SideMenu() {

    const { obtenerMenuYSubMenu, dataMenu } = useMenu();

    useEffect(() => {
        obtenerMenuYSubMenu()
    }, [])

    return (
        <div>
            <List component='nav' aria-labelledby='nested-list-subheader'>
                {dataMenu.map(doc => {
                    return (
                        <CustomizedListItem key={doc.nombre_menu} doc={doc} />
                    )
                })}
            </List>
        </div>
    )
}