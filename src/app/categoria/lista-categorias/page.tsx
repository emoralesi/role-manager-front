'use client';

import { useCategoria } from "@/hooks/useCategoria";
import {
  Box,
  TextField,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Paper
} from "@mui/material";
import { useEffect, useState } from "react";

export default function ListarCategoriasPage() {
  const { obtenerTodoCategorias, categoriasTodoAll } = useCategoria();

  const [nombreCategoria, setNombreCategoria] = useState<string>('');
  const [nombreSubCategoria, setNombreSubCategoria] = useState<string>('');
  const [nombreSubSubCategoria, setNombreSubSubCategoria] = useState<string>('');

  useEffect(() => {
    obtenerTodoCategorias();
  }, []);

  const categoriasFiltradas = categoriasTodoAll.filter(categoria =>
    categoria.nombre.toLowerCase().includes(nombreCategoria.toLowerCase()) &&
    (!nombreSubCategoria || categoria.subCategorias?.some(sub =>
      sub.nombre_sub_categoria.toLowerCase().includes(nombreSubCategoria.toLowerCase()) &&
      (!nombreSubSubCategoria || sub.subSubCategorias?.some(subsub =>
        subsub.nombre_sub_sub_categoria.toLowerCase().includes(nombreSubSubCategoria.toLowerCase())
      ))
    ))
  );

  return (
    <Box p={2} sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Card sx={{ maxWidth: 900, mx: 'auto', p: 2, boxShadow: 3 }}>
        <Typography variant="h4" mb={3} fontWeight={600} textAlign={"center"}>
          Lista de Categorías
        </Typography>

        {/* Filtros de búsqueda */}
        <Grid container spacing={2} mb={4}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Categoría"
              variant="outlined"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Sub Categoría"
              variant="outlined"
              value={nombreSubCategoria}
              onChange={(e) => setNombreSubCategoria(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <TextField
              label="Sub Sub Categoría"
              variant="outlined"
              value={nombreSubSubCategoria}
              onChange={(e) => setNombreSubSubCategoria(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {categoriasFiltradas.map((categoria) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={categoria.id_categoria}>
              <Card
                sx={{
                  minHeight: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 3,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': { transform: 'scale(1.03)', boxShadow: 6 }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary" fontWeight="bold">
                    {categoria.nombre}
                  </Typography>

                  {categoria.subCategorias?.map((sub) => (
                    <Box key={sub.id_sub_categoria} mb={1}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {sub.nombre_sub_categoria}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
                        {sub.subSubCategorias?.map((subsub) => (
                          <Chip key={subsub.id_sub_sub_categoria} label={subsub.nombre_sub_sub_categoria} size="small" color="primary" />
                        ))}
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}