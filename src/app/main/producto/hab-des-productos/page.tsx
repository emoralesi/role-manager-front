'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import CustomSeparator from '@/app/componentes/CustomSeparator';
import ModificarProducto from '@/app/componentes/ModificarProducto';
import { useProducto } from '@/hooks/useProducto';
import {
  Box,
  TextField,
  Stack,
  Typography,
  Paper,
  Card,
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import FlakyIcon from '@mui/icons-material/Flaky';
import { useSnackbar } from 'notistack';
import { GridColDef } from '@mui/x-data-grid';

export default function HabilitarDeshabilitarPrPage() {
  const [nombreProducto, setNombreProducto] = useState('');
  const [sku, setSku] = useState('');
  const [formModificar, setFormModificar] = useState<any>(null);
  const [openModificar, setOpenModificar] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const {
    obtenerProductos,
    listaProducto,
    setListaProducto,
    listaProductoDataGrid,
    setListaProductoDataGrid,
    actualizarEstado,
  } = useProducto();

  useEffect(() => {
    setListaProductoDataGrid(
      listaProducto.filter(
        (val) =>
          val.sku.toLowerCase().includes(sku.toLowerCase()) &&
          val.nombre.toLowerCase().includes(nombreProducto.toLowerCase())
      )
    );
  }, [sku, nombreProducto, listaProducto, setListaProductoDataGrid]);

  const UpdateStatus = useCallback(
    (id: number, row: any) => async () => {
      try {
        const body = {
          id_producto: id,
          isactive: !row.isactive,
        };

        const res = await actualizarEstado(body);

        if (res.ok === 200) {
          setListaProducto((prevRows) =>
            prevRows.map((r) =>
              r.id_producto === id ? { ...r, isactive: !r.isactive } : r
            )
          );
          setListaProductoDataGrid((prevRows) =>
            prevRows.map((r) =>
              r.id_producto === id ? { ...r, isactive: !r.isactive } : r
            )
          );
          enqueueSnackbar(
            `El estado del producto ${row.sku} ha sido actualizado correctamente`,
            { variant: 'success' }
          );
        } else {
          enqueueSnackbar(
            'El estado del producto no ha podido ser actualizado',
            { variant: 'error' }
          );
        }
      } catch (error) {
        enqueueSnackbar('Error al actualizar el estado del producto', {
          variant: 'error',
        });
      }
    },
    [actualizarEstado, enqueueSnackbar, setListaProducto, setListaProductoDataGrid]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'nombre', headerName: 'Nombre Producto', flex: 1 },
      { field: 'nombrecategoria', headerName: 'Categoría', flex: 1 },
      { field: 'nombresubcategoria', headerName: 'Subcategoría', flex: 1 },
      { field: 'nombresubsubcategoria', headerName: 'Sub-Subcategoría', flex: 1 },
      { field: 'precio', headerName: 'Precio', type: 'number', flex: 1 },
      { field: 'sku', headerName: 'SKU', flex: 1 },
      {
        field: 'isactive',
        headerName: 'Activo',
        type: 'boolean',
        flex: 1,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Acciones',
        flex: 1,
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<FlakyIcon />}
            label="Actualizar Estado"
            onClick={UpdateStatus(params.id, params.row)}
            key={`update-${params.id}`}
          />,
          <GridActionsCellItem
            icon={<DisplaySettingsIcon />}
            label="Modificar"
            onClick={() => {
              setFormModificar(params.row);
              setOpenModificar(true);
            }}
            key={`edit-${params.id}`}
          />,
        ],
      },
    ],
    [UpdateStatus]
  );

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <Box p={2} sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <CustomSeparator openModificar={openModificar} setOpenModificar={setOpenModificar} />

      {openModificar ? (
        <ModificarProducto params={formModificar} />
      ) : (

        <Card sx={{ maxWidth: 900, mx: 'auto', p: 2, boxShadow: 3 }}>
          <Typography variant="h4" mb={3} fontWeight={600} textAlign={"center"}>
            Gestionar Productos
          </Typography>

          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            sx={{ mb: 3 }}
          >
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Nombre del producto"
              value={nombreProducto}
              onChange={(e) => setNombreProducto(e.target.value)}
              fullWidth
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="SKU"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              fullWidth
            />
          </Stack>

          <Box sx={{ width: '100%', height: { xs: 400, md: 600 } }}>
            <DataGrid
              getRowId={(row) => row.id_producto}
              columns={columns}
              rows={listaProductoDataGrid || []}
              pageSizeOptions={[10, 20, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              disableColumnFilter
              disableRowSelectionOnClick
              sx={{
                border: '1px solid #ddd',
                borderRadius: 2,
                bgcolor: 'background.paper',
              }}
            />
          </Box>
        </Card>
      )}
    </Box>
  );
}
