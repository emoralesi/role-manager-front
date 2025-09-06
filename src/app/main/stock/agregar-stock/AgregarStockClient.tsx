'use client'

import { useProducto } from "@/hooks/useProducto";
import { Box, Button, Divider, TextField, Typography, Paper, Grid, Card, CardContent } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function AgregarStockClient() {
  const [skuBusqueda, setSkuBusqueda] = useState<string>('');
  const [nombreProductoResultado, setNombreProductoResultado] = useState<string>('');
  const [skuResultado, setSkuResultado] = useState<string>('');
  const [stockResultado, setStockResultado] = useState<number>(0);
  const [stock, setStock] = useState<string>('0');

  const { obtenerProductos, listaProducto, agregarStock } = useProducto();

  useEffect(() => {
    obtenerProductos();
  }, []);

  useEffect(() => {
    if (skuResultado) buscarSKU(skuResultado);
  }, [listaProducto, skuResultado]);

  const buscarSKU = (valor: string) => {
    const result = listaProducto.find((p) => p.sku === valor);
    if (result) {
      setNombreProductoResultado(result.nombre);
      setSkuResultado(result.sku);
      setStockResultado(result.stock);
    } else {
      setNombreProductoResultado('');
      setSkuResultado('');
      setStockResultado(0);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!skuResultado) {
      enqueueSnackbar('Debe ingresar un SKU que exista para realizar la acción', { variant: 'warning' });
      return;
    }

    if (Number(stock) <= 0) {
      enqueueSnackbar('Debe ingresar un valor de STOCK mayor a 0', { variant: 'warning' });
      return;
    }

    const schema = { sku: skuResultado, stock: Number(stock) };
    const res = await agregarStock(schema);

    if (res.ok === 200) {
      enqueueSnackbar('Stock actualizado correctamente', { variant: 'success' });
      setStock('0');
      await obtenerProductos();
    } else {
      enqueueSnackbar('Ha ocurrido un error inesperado', { variant: 'error' });
    }
  }

  return (
    <Box p={2} sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Card sx={{ maxWidth: 900, mx: 'auto', p: 2, boxShadow: 3 }}>
        <Typography variant="h4" mb={3} fontWeight={600} textAlign={"center"}>
          Agregar Stock
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Buscar por SKU"
              variant="outlined"
              value={skuBusqueda}
              onChange={(e) => { setSkuBusqueda(e.target.value); buscarSKU(e.target.value); }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, sm: 5 }}>
              <TextField
                fullWidth
                label="Nombre Producto"
                variant="outlined"
                disabled
                value={nombreProductoResultado}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 3 }}>
              <TextField
                fullWidth
                label="SKU"
                variant="outlined"
                disabled
                value={skuResultado}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                fullWidth
                label="Stock Actual"
                variant="outlined"
                disabled
                value={stockResultado}
              />
            </Grid>
            <Grid size={{ xs: 6, sm: 2 }}>
              <TextField
                fullWidth
                label="Agregar Stock"
                variant="outlined"
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ mt: 2, textAlign: 'center' }}>
              <Button type="submit" variant="contained" color="success" sx={{ px: 4, py: 1.5 }}>
                Agregar Stock
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
}