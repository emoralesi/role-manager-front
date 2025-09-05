'use client';

import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useCategoria } from '@/hooks/useCategoria';
import { useProducto } from '@/hooks/useProducto';
import { useSubCategoria } from '@/hooks/useSubCategoria';
import { useSubSubCategoria } from '@/hooks/useSubSubCategoria';
import { useSnackbar } from 'notistack';

interface ModificarProductoProps {
    params: any;
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};

export default function ModificarProducto({ params }: ModificarProductoProps) {
    const [nombreProducto, setNombreProducto] = useState(params.nombre || '');
    const [sku, setSku] = useState(params.sku || '');
    const [precio, setPrecio] = useState(params.precio || 0);
    const [categoria, setCategoria] = useState(params.id_categoria || '');
    const [subCategoria, setSubCategoria] = useState(params.id_sub_categoria || '');
    const [subSubCategoria, setSubSubCategoria] = useState(params.id_sub_sub_categoria || '');

    const { categoriasAll, obtenerCategorias } = useCategoria();
    const { subCategoriasAll, obtenerSubCategorias } = useSubCategoria();
    const { subSubcategoriasAll, obtenerSubSubCategorias } = useSubSubCategoria();
    const { actualizarProducto } = useProducto();
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const schema = {
            id_producto: params.id_producto,
            id_categoria: categoria,
            id_sub_categoria: subCategoria,
            id_sub_sub_categoria: subSubCategoria,
            nombre: nombreProducto,
            precio: Number(precio),
            sku,
        };

        try {
            const res = await actualizarProducto(schema);
            if (res.status === "ok") {
                enqueueSnackbar('Producto actualizado correctamente', { variant: 'success' });
            } else {
                enqueueSnackbar('No se pudo actualizar el producto', { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Error en la actualización del producto', { variant: 'error' });
        }
    };

    useEffect(() => {
        obtenerCategorias();
        if (params.id_categoria) {
            obtenerSubCategorias(params.id_categoria);
        }
        if (params.id_sub_categoria) {
            obtenerSubSubCategorias(params.id_sub_categoria);
        }
    }, []);

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Modificar Producto
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* Campos de texto */}
                    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                        <TextField
                            label="Nombre del producto"
                            variant="outlined"
                            color="secondary"
                            value={nombreProducto}
                            onChange={(e) => setNombreProducto(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Precio"
                            type="number"
                            variant="outlined"
                            color="secondary"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            fullWidth
                            required
                        />
                    </Stack>

                    <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} sx={{ mb: 3 }}>
                        <TextField
                            label="SKU"
                            variant="outlined"
                            color="secondary"
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                            fullWidth
                            required
                        />

                        <FormControl fullWidth>
                            <InputLabel>Categoria</InputLabel>
                            <Select
                                value={categoria}
                                input={<OutlinedInput label="Categoria" />}
                                onChange={(e) => {
                                    setCategoria(e.target.value);
                                    obtenerSubCategorias(Number(e.target.value));
                                    setSubCategoria('');
                                    setSubSubCategoria('');
                                }}
                                required
                                MenuProps={MenuProps}
                            >
                                {categoriasAll?.map((cat) => (
                                    <MenuItem key={cat.id_categoria} value={cat.id_categoria}>
                                        {cat.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>Subcategoría</InputLabel>
                            <Select
                                value={subCategoria}
                                input={<OutlinedInput label="Subcategoría" />}
                                onChange={(e) => {
                                    setSubCategoria(e.target.value);
                                    obtenerSubSubCategorias(e.target.value);
                                    setSubSubCategoria('');
                                }}
                                required
                                MenuProps={MenuProps}
                            >
                                {subCategoriasAll?.map((sub) => (
                                    <MenuItem key={sub.id_sub_categoria} value={sub.id_sub_categoria}>
                                        {sub.nombre_sub_categoria}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Sub-subcategoría */}
                        <FormControl fullWidth>
                            <InputLabel>Sub-subcategoría</InputLabel>
                            <Select
                                value={subSubCategoria}
                                input={<OutlinedInput label="Sub-subcategoría" />}
                                onChange={(e) => setSubSubCategoria(e.target.value)}
                                required
                                MenuProps={MenuProps}
                            >
                                {subSubcategoriasAll?.map((subsub) => (
                                    <MenuItem key={subsub.id_sub_sub_categoria} value={subsub.id_sub_sub_categoria}>
                                        {subsub.nombre_sub_sub_categoria}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    {/* Botón */}
                    <Box textAlign="right">
                        <Button variant="contained" type="submit" color="success">
                            Actualizar
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}