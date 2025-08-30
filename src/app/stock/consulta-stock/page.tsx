'use client';
import { useProducto } from "@/hooks/useProducto";
import { 
  Box, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Grid
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function ConsultaStockPage() {
  const { 
    obtenerProductos, 
    listaProducto, 
    setListaProductoDataGrid, 
    listaProductoDataGrid 
  } = useProducto();

  const columns: GridColDef<Producto>[] = [
    { field: 'nombre', headerName: 'Nombre Producto', flex: 1 },
    { field: 'precio', headerName: 'Precio', flex: 1, type: "number" },
    { field: 'sku', headerName: 'SKU', flex: 1 },
    { field: 'isactive', headerName: 'Activo', type: 'boolean', flex: 1 },
    { field: 'stock', headerName: 'Stock Disponible', type: 'number', flex: 1 },
  ];

  const [nombreProducto, setNombreProducto] = useState<string>("");
  const [sku, setSku] = useState<string>("");

  useEffect(() => {
    obtenerProductos();
  }, []);

  const FilterN = (valor: string) => {
    setListaProductoDataGrid(
      listaProducto.filter(
        (val: Producto) =>
          val.nombre.toLowerCase().includes(valor.toLowerCase()) &&
          val.sku.toLowerCase().includes(sku.toLowerCase())
      )
    );
  };

  const FilterS = (valor: string) => {
    setListaProductoDataGrid(
      listaProducto.filter(
        (val: Producto) =>
          val.nombre.toLowerCase().includes(nombreProducto.toLowerCase()) &&
          val.sku.toLowerCase().includes(valor.toLowerCase())
      )
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Consulta de Stock
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Nombre Producto"
              variant="outlined"
              value={nombreProducto}
              onChange={(e) => {
                setNombreProducto(e.target.value);
                FilterN(e.target.value);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="SKU"
              variant="outlined"
              value={sku}
              onChange={(e) => {
                setSku(e.target.value);
                FilterS(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Paper elevation={1} sx={{ height: 420, width: "100%", borderRadius: 2, overflow: "hidden" }}>
          <DataGrid
            getRowId={(row) => row.id_producto}
            rows={listaProductoDataGrid}
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
          />
        </Paper>
      </Paper>
    </Container>
  );
}
