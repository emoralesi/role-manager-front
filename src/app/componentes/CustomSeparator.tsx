'use client';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Button, Stack, Typography, useTheme } from '@mui/material';

interface CustomSeparatorProps {
  openModificar: boolean;
  setOpenModificar: (value: boolean) => void;
}

export default function CustomSeparator({ openModificar, setOpenModificar }: CustomSeparatorProps) {
  const theme = useTheme();

  const breadcrumbsv0 = [
    <Button
      key="gestion"
      variant="text"
      color="inherit"
      onClick={() => setOpenModificar(false)}
      sx={{ textTransform: 'none', fontWeight: 500 }}
    >
      Gestionar Producto
    </Button>,
    <Typography
      key="modificar"
      sx={{
        color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        fontWeight: 600,
      }}
    >
      Modificar Producto
    </Typography>,
  ];

  const breadcrumbsv1 = [
    <Typography
      key="gestion"
      sx={{
        color: theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        fontWeight: 600,
      }}
    >
      Gestionar Producto
    </Typography>,
  ];

  return (
    <Stack spacing={2} sx={{ mb: 2 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ fontSize: '0.95rem' }}
      >
        {openModificar ? breadcrumbsv0 : breadcrumbsv1}
      </Breadcrumbs>
    </Stack>
  );
}