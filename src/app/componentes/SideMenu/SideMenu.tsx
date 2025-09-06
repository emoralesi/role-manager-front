'use client';

import { List, Skeleton, Box, Divider } from "@mui/material";
import React, { useEffect } from 'react';
import { CustomizedListItem } from "./CustomizedListItem";
import { useMenu } from "@/hooks/useMenu";

export default function SideMenu() {
    const { obtenerMenuYSubMenu, dataMenu } = useMenu();

    useEffect(() => {
        obtenerMenuYSubMenu();
    }, []);

    if (!dataMenu || dataMenu.length === 0) {
        return (
            <List component='nav' aria-labelledby='nested-list-subheader'>
                {[1, 2, 3, 4].map((i) => (
                    <Box key={i} sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                            <Skeleton variant="circular" width={40} height={40} animation="wave" />
                            <Skeleton
                                variant="text"
                                width="60%"
                                height={30}
                                animation="wave"
                                sx={{
                                    ml: 2,
                                    display: {
                                        xs: 'none', 
                                        sm: 'block'
                                    }
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                pl: 5,
                                mt: 1,
                                display: {
                                    xs: 'none',
                                    sm: 'block'
                                }
                            }}
                        >
                            {[1, 2, 3].map((j) => (
                                <Box key={j} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                    <Skeleton variant="circular" width={30} height={30} animation="wave" />
                                    <Skeleton
                                        variant="text"
                                        width="50%"
                                        height={25}
                                        animation="wave"
                                        sx={{ ml: 2 }}
                                    />
                                </Box>
                            ))}
                        </Box>

                        <Divider />
                    </Box>
                ))}
            </List>
        )
    }

    return (
        <List component='nav' aria-labelledby='nested-list-subheader'>
            {dataMenu.map(doc => (
                <CustomizedListItem key={doc.nombre_menu} doc={doc} />
            ))}
        </List>
    )
}