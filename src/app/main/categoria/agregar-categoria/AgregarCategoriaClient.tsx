'use client'
import { useCategoria } from '@/hooks/useCategoria';
import { useFiltroCategoria } from '@/hooks/useFiltroCategoria';
import { useSubCategoria } from '@/hooks/useSubCategoria';
import { useSubSubCategoria } from '@/hooks/useSubSubCategoria';
import { useTipoFiltroCategoria } from '@/hooks/useTipoFiltroCategoria';
import { Filtro } from '@/types/Categoria';
import { DeleteOutline } from '@mui/icons-material';
import {
    Box,
    Button,
    Card,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Stack,
    Switch,
    TextField,
    Typography
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState } from "react";

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250
        },
    },
};

export default function AgregarCategoriaClient() {
    const { agregarCategoria, categoriasAll, obtenerCategorias } = useCategoria();
    const { obtenerSubCategorias, cleanSubcategorias, subCategoriasAll } = useSubCategoria();
    const { obtenerSubSubCategorias, cleanSubSubcategorias } = useSubSubCategoria();
    const { FiltroCategoriasAll } = useFiltroCategoria();
    const { tipoFiltroCategoriaAll } = useTipoFiltroCategoria();

    const [nombreCategoria, setNombreCategoria] = useState('');
    const [categoria, setCategoria] = useState('');
    const [nombreSubCategoria, setNombreSubCategoria] = useState('');
    const [subCategoria, setSubCategoria] = useState('');
    const [isDisableSub, setIsDisableSub] = useState(true);
    const [nombreSubSubCategoria, setNombreSubSubCategoria] = useState('');
    const [isNewCategoria, setIsNewCategoria] = useState(true);
    const [isNewSubCategoria, setIsNewSubCategoria] = useState(true);
    const [nombreFiltro, setNombreFiltro] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState<number | ''>('');
    const [nombreTipoFiltro, setNombreTipoFiltro] = useState<"TEXTO" | "NUMERICO" | "CHECK" | undefined>(undefined);

    const [selectFiltroCategoria, setSelectFiltroCategoria] = useState<Filtro[]>([]);
    const [listaDataGrid, setListaDataGrid] = useState<Filtro[]>([]);

    useEffect(() => {
        obtenerCategorias();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const FiltroNuevo = listaDataGrid.filter(v => v.statusFiltro === "NUEVO");
        const FiltroExistente = listaDataGrid.filter(v => v.statusFiltro === "EXISTENTE");

        if (isNewCategoria && !nombreCategoria.trim()) {
            enqueueSnackbar("Debe ingresar un nombre de categoría.", {
                variant: "warning",
                anchorOrigin: { vertical: "bottom", horizontal: "right" }
            });
            return;
        }

        if (isNewSubCategoria && !nombreSubCategoria.trim()) {
            enqueueSnackbar("Debe ingresar un nombre de subcategoría.", {
                variant: "warning",
                anchorOrigin: { vertical: "bottom", horizontal: "right" }
            });
            return;
        }

        if (!nombreSubSubCategoria.trim()) {
            enqueueSnackbar("Debe ingresar un nombre de Sub Sub Categoría.", {
                variant: "warning",
                anchorOrigin: { vertical: "bottom", horizontal: "right" }
            });
            return;
        }

        if (FiltroNuevo.length + FiltroExistente.length === 0) {
            enqueueSnackbar("Debe agregar al menos un filtro.", {
                variant: "warning",
                anchorOrigin: { vertical: "bottom", horizontal: "right" }
            });
            return;
        }


        const schema = {
            isNewCategoria,
            categoria,
            nombreCategoria,
            isNewSubCategoria,
            subCategoria,
            nombreSubCategoria,
            nombreSubSubCategoria,
            FiltroNuevo,
            FiltroExistente,
        };

        const result = await agregarCategoria(schema);

        if (result?.ok === 200) {
            enqueueSnackbar("Categoría registrada con éxito 🎉", {
                variant: "success",
                anchorOrigin: { vertical: "bottom", horizontal: "right" }
            });
        } else {
            enqueueSnackbar("Ha ocurrido un error inesperado", {
                variant: "error",
                anchorOrigin: { vertical: "bottom", horizontal: "right" }
            });
        }

        setIsNewCategoria(true);
        setIsNewSubCategoria(true);
        setIsDisableSub(true);

        setNombreCategoria("");
        setCategoria("");
        setNombreSubCategoria("");
        setSubCategoria("");
        setNombreSubSubCategoria("");

        setNombreFiltro("");
        setTipoFiltro("");
        setNombreTipoFiltro(undefined);

        setListaDataGrid([]);
        setSelectFiltroCategoria([]);

        cleanSubcategorias();
        cleanSubSubcategorias();

    };

    const DeletedItem = useCallback((values: Filtro) => () => {
        setListaDataGrid(prev => prev.filter(v => v.nombre_filtro_categoria !== values.nombre_filtro_categoria));
        setSelectFiltroCategoria(prev => prev.filter(v => v.nombre_filtro_categoria !== values.nombre_filtro_categoria));
    }, []);

    const columns: GridColDef[] = useMemo(() => [
        { field: 'nombre_filtro_categoria', headerName: 'Nombre de filtro', flex: 1 },
        { field: 'nombre_tipo_filtro_categoria', headerName: 'Tipo de filtro', flex: 1 },
        { field: 'statusFiltro', headerName: 'Origen', width: 120 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Quitar',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    key={1}
                    icon={<DeleteOutline />}
                    label="Quitar Registro"
                    onClick={DeletedItem(params.row)}
                />
            ],
        },
    ], [DeletedItem]);

    return (
        <Box p={2} sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
            <Card sx={{ maxWidth: 900, mx: 'auto', p: 2, boxShadow: 3 }}>
                <Typography variant="h4" mb={3} fontWeight={600} textAlign={"center"}>
                    Agregar Categoría
                </Typography>

                {/* FORMULARIO */}
                <Grid container spacing={3}>
                    {/* Categoria */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isNewCategoria}
                                    onChange={(e) => {
                                        setIsNewCategoria(e.target.checked);
                                        if (e.target.checked) {
                                            setIsNewSubCategoria(true);
                                            setIsDisableSub(true);
                                            setCategoria('');
                                            cleanSubcategorias();
                                            cleanSubSubcategorias();
                                            setSubCategoria('');
                                        } else {
                                            setIsDisableSub(false);
                                        }
                                    }}
                                />
                            }
                            label="Nueva Categoría"
                        />
                        {isNewCategoria ? (
                            <TextField
                                label="Nombre de la categoría"
                                value={nombreCategoria}
                                onChange={(e) => setNombreCategoria(e.target.value)}
                                fullWidth
                                required
                            />
                        ) : (
                            <FormControl fullWidth>
                                <InputLabel>Categoría Existente</InputLabel>
                                <Select
                                    value={categoria}
                                    onChange={(e) => {
                                        setCategoria(e.target.value);
                                        obtenerSubCategorias(Number(e.target.value));
                                    }}
                                    input={<OutlinedInput label="Categoría Existente" />}
                                    MenuProps={MenuProps}
                                >
                                    {categoriasAll?.map((cat) => (
                                        <MenuItem key={cat.id_categoria} value={cat.id_categoria}>
                                            {cat.nombre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Grid>

                    {/* Subcategoria */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    disabled={isDisableSub}
                                    checked={isNewSubCategoria}
                                    onChange={(e) => {
                                        setIsNewSubCategoria(e.target.checked);
                                        if (e.target.checked) {
                                            cleanSubSubcategorias();
                                            setSubCategoria('');
                                        }
                                    }}
                                />
                            }
                            label="Nueva Subcategoría"
                        />
                        {isNewSubCategoria ? (
                            <TextField
                                label="Nombre de la subcategoría"
                                value={nombreSubCategoria}
                                onChange={(e) => setNombreSubCategoria(e.target.value)}
                                fullWidth
                                required
                            />
                        ) : (
                            <FormControl fullWidth>
                                <InputLabel>Subcategoría Existente</InputLabel>
                                <Select
                                    value={subCategoria}
                                    onChange={(e) => setSubCategoria(e.target.value)}
                                    input={<OutlinedInput label="Subcategoría Existente" />}
                                    MenuProps={MenuProps}
                                >
                                    {subCategoriasAll?.map((cat) => (
                                        <MenuItem key={cat.id_sub_categoria} value={cat.id_sub_categoria}>
                                            {cat.nombre_sub_categoria}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                    </Grid>

                    {/* Sub Sub categoria */}
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Nombre de la sub-subcategoría"
                            value={nombreSubSubCategoria}
                            onChange={(e) => setNombreSubSubCategoria(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* FILTROS */}
                <Typography variant="h6" gutterBottom>
                    Agregar Filtro
                </Typography>

                <Grid container spacing={3}>
                    {/* Nuevo Filtro */}
                    <Grid size={{ xs: 12, md: 6 }} >
                        <TextField
                            label="Nombre Filtro"
                            value={nombreFiltro}
                            onChange={(e) => setNombreFiltro(e.target.value)}
                            fullWidth
                        />
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel>Tipo de Filtro</InputLabel>
                            <Select
                                value={tipoFiltro}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setTipoFiltro(value);
                                    const selected = tipoFiltroCategoriaAll.find(opt => opt.id_tipo_filtro_categoria === Number(value));
                                    setNombreTipoFiltro(selected?.nombre_tipo_filtro_categoria as "TEXTO" | "NUMERICO" | "CHECK");
                                }}
                                input={<OutlinedInput label="Tipo de Filtro" />}
                                MenuProps={MenuProps}
                            >
                                {tipoFiltroCategoriaAll?.map((cat) => (
                                    <MenuItem key={cat.id_tipo_filtro_categoria} value={cat.id_tipo_filtro_categoria}>
                                        {cat.nombre_tipo_filtro_categoria}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            sx={{ mt: 2 }}
                            variant="outlined"
                            onClick={() => {
                                if (!FiltroCategoriasAll.find(e => e.nombre_filtro_categoria === nombreFiltro)) {
                                    const schema: Filtro = {
                                        id_filtro_categoria: null,
                                        nombre_filtro_categoria: nombreFiltro,
                                        id_tipo_filtro_categoria: Number(tipoFiltro),
                                        nombre_tipo_filtro_categoria: nombreTipoFiltro,
                                        statusFiltro: "NUEVO"
                                    };
                                    setListaDataGrid([...listaDataGrid, schema]);
                                    setTipoFiltro('');
                                    setNombreTipoFiltro(undefined);
                                    setNombreFiltro('');
                                }
                            }}
                        >
                            Agregar Filtro
                        </Button>
                    </Grid>

                    {/* Filtros Existentes */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth>
                            <InputLabel>Filtros Existentes</InputLabel>
                            <Select
                                multiple
                                value={selectFiltroCategoria.map(e => e.nombre_filtro_categoria)}
                                onChange={(e) => {
                                    const values = e.target.value as string[];

                                    const nuevos = values.filter(v => !selectFiltroCategoria.some(s => s.nombre_filtro_categoria === v));

                                    nuevos.forEach(v => {
                                        const filtro = FiltroCategoriasAll.find(f => f.nombre_filtro_categoria === v);
                                        if (filtro) {
                                            setListaDataGrid(prev => [...prev, { ...filtro, statusFiltro: "EXISTENTE" }]);
                                            setSelectFiltroCategoria(prev => [...prev, { ...filtro, statusFiltro: "EXISTENTE" }]);
                                        }
                                    });

                                    const eliminados = selectFiltroCategoria.filter(s => !values.includes(s.nombre_filtro_categoria));
                                    if (eliminados.length > 0) {
                                        setListaDataGrid(prev => prev.filter(v => !eliminados.some(e => e.nombre_filtro_categoria === v.nombre_filtro_categoria)));
                                        setSelectFiltroCategoria(prev => prev.filter(v => !eliminados.some(e => e.nombre_filtro_categoria === v.nombre_filtro_categoria)));
                                    }
                                }}
                                input={<OutlinedInput label="Filtros Existentes" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => <Chip key={value} label={value} />)}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {FiltroCategoriasAll.map((cat) => (
                                    <MenuItem key={cat.id_filtro_categoria} value={cat.nombre_filtro_categoria}>
                                        {cat.nombre_filtro_categoria} ({cat.nombre_tipo_filtro_categoria})
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Tabla */}
                <Box sx={{ mt: 3 }}>
                    <DataGrid
                        rows={listaDataGrid}
                        columns={columns}
                        getRowId={(row) => row.nombre_filtro_categoria}
                        autoHeight
                        disableColumnFilter
                        pageSizeOptions={[5, 10]}
                        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                    />
                </Box>

                {/* Botón Registrar */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Button variant="contained" color="success" onClick={handleSubmit}>
                        Registrar
                    </Button>
                </Box>
            </Card >
        </Box>
    );
}