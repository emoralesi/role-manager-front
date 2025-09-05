'use client'

import { useCategoria } from '@/hooks/useCategoria';
import { useFiltroCategoria } from '@/hooks/useFiltroCategoria';
import { useProducto } from '@/hooks/useProducto';
import { useSubCategoria } from '@/hooks/useSubCategoria';
import { useSubSubCategoria } from '@/hooks/useSubSubCategoria';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

export default function AgregarProductoPage() {
  const [nombreProducto, setnombreProducto] = useState('')
  const [sku, setSku] = useState('')
  const [precio, setPrecio] = useState(0)
  const [stock, setStock] = useState(0)
  const [categoria, setCategoria] = useState('')
  const [subCategoria, setSubCategoria] = useState('')
  const [subSubCategoria, setSubSubCategoria] = useState('')
  const { obtenerFiltroCategoriasBySubSubCategoria, filtroCategoriasBySubSubCategoriaAll, setFiltroCategoriasBySubSubCategoriaAll } = useFiltroCategoria()
  const [bdisabled, setBdisabled] = useState(false)
  const { categoriasAll, obtenerCategorias } = useCategoria();
  const { obtenerSubCategorias, subCategoriasAll } = useSubCategoria();
  const { obtenerSubSubCategorias, subSubcategoriasAll } = useSubSubCategoria();
  const { agregarProducto } = useProducto();

  const clean = () => {
    setnombreProducto('')
    setSku('')
    setPrecio(0)
    setCategoria('')
    setSubCategoria('')
    setSubSubCategoria('')
    setStock(0)
    setFiltroCategoriasBySubSubCategoriaAll([])
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let schema = {
      nombreProducto,
      precio,
      sku,
      stock,
      filtroCategoriasBySubSubCategoriaAll
    }

    const result = await agregarProducto(schema)

    if (result.ok === 200) {
      enqueueSnackbar('Producto agregado correctamente', { variant: 'success' })
    } else {
      enqueueSnackbar('Error al agregar el producto', { variant: 'error' })
    }

    clean()
  }

  const actualizarDataGrid = (params: any) => {
    setFiltroCategoriasBySubSubCategoriaAll(rows =>
      rows.map(obj =>
        obj.id_rel_sub_categoria_filtro === params.id_rel_sub_categoria_filtro
          ? { ...obj, value: params.value }
          : obj
      ),
    )
    return params
  }

  const processRowUpdate = useCallback(async (newRow: any) => actualizarDataGrid(newRow), [])

  const columns = [
    { field: 'nombre_filtro_categoria', headerName: 'Nombre', flex: 1 },
    {
      field: 'value',
      headerName: 'Valor',
      flex: 1,
      editable: true,
      renderCell: (params: any) => {
        const { row } = params;
        switch (row.nombre_tipo_filtro_categoria) {
          case 'CHECK':
            return (
              <input
                type="checkbox"
                checked={row.value}
                onChange={(event) => processRowUpdate({ ...row, value: event.target.checked })}
              />)
          case 'TEXTO':
            return (
              <TextField
                size="small"
                value={row.value}
                onChange={(event) => processRowUpdate({ ...row, value: event.target.value })}
              />)
          case 'NUMERICO':
            return (
              <TextField
                size="small"
                type="number"
                value={row.value}
                onChange={(event) => processRowUpdate({ ...row, value: event.target.value })}
              />)
          default:
            return null
        }
      },
    }
  ];

  useEffect(() => {
    obtenerCategorias();
  }, [])

  return (
    <Box p={2} sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Card sx={{ maxWidth: 900, mx: 'auto', p: 2, boxShadow: 3 }}>
        <Typography variant="h4" mb={3} fontWeight={600} textAlign={"center"}>
          Agregar Producto
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }} >
              <TextField
                label="Nombre del producto"
                value={nombreProducto}
                onChange={e => setnombreProducto(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} >
              <TextField
                label="SKU"
                value={sku}
                onChange={e => setSku(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} >
              <TextField
                label="Precio"
                type="number"
                value={precio}
                onChange={e => setPrecio(Number(e.target.value))}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} >
              <TextField
                label="Stock Inicial"
                type="number"
                value={stock}
                onChange={e => setStock(Number(e.target.value))}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} >
              <FormControl fullWidth>
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={categoria}
                  input={<OutlinedInput label="Categoria" />}
                  onChange={(e) => { setCategoria(e.target.value); obtenerSubCategorias(Number(e.target.value)); setSubCategoria(''); setSubSubCategoria(''); setFiltroCategoriasBySubSubCategoriaAll([]) }}
                  required
                  MenuProps={MenuProps}
                >
                  {categoriasAll?.map((cat) => (
                    <MenuItem key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} >
              <FormControl fullWidth>
                <InputLabel>Sub Categoria</InputLabel>
                <Select
                  value={subCategoria}
                  input={<OutlinedInput label="Sub Categoria" />}
                  onChange={(e) => { setSubCategoria(e.target.value); obtenerSubSubCategorias(Number(e.target.value)); setSubSubCategoria(''); setFiltroCategoriasBySubSubCategoriaAll([]) }}
                  required
                  MenuProps={MenuProps}
                >
                  {subCategoriasAll?.map((cat) => (
                    <MenuItem key={cat.id_sub_categoria} value={cat.id_sub_categoria}>{cat.nombre_sub_categoria}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} >
              <FormControl fullWidth>
                <InputLabel>Sub Sub Categoria</InputLabel>
                <Select
                  value={subSubCategoria}
                  input={<OutlinedInput label="Sub Sub Categoria" />}
                  onChange={(e) => { setSubSubCategoria(e.target.value); if (e.target.value !== '') { obtenerFiltroCategoriasBySubSubCategoria({ id_sub_sub_categoria: Number(e.target.value) }) } }}
                  required
                  MenuProps={MenuProps}
                >
                  {subSubcategoriasAll?.map((cat) => (
                    <MenuItem key={cat.id_sub_sub_categoria} value={cat.id_sub_sub_categoria}>{cat.nombre_sub_sub_categoria}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" fontWeight="bold">
                Completar Filtros
              </Typography>
              <Paper sx={{ height: 400, mt: 1, border: '1px solid #ddd' }}>
                <DataGrid
                  rows={filtroCategoriasBySubSubCategoriaAll}
                  getRowId={(rows) => rows.id_rel_sub_categoria_filtro}
                  columns={columns}
                  rowSelection={false}
                  processRowUpdate={processRowUpdate}
                  disableRowSelectionOnClick
                />
              </Paper>
            </Grid>

            <Grid size={{ xs: 12 }} textAlign="right">
              <Button type="submit" variant="contained" color="success" disabled={bdisabled}>
                Agregar Producto
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  )
}
