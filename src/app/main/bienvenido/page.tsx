import { verifySession } from "@/lib/auth";
import { Category, Group, Inventory, Storefront } from "@mui/icons-material";
import { Box, Card, Grid, Typography } from "@mui/material";
import { redirect } from "next/navigation";

export default async function BienvenidoPage() {
  const session = await verifySession();

  if (!session) {
    redirect("/login");
  }

  return (
    <Box p={2} sx={{ height: "100vh", bgcolor: "#f9f9f9" }}>
      <Card sx={{ maxWidth: 900, mx: "auto", p: 4, boxShadow: 3 }}>
        <Grid container spacing={4} alignItems="center">

          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              gutterBottom
            >
              👋 Bienvenido a tu Plataforma de Gestión de Negocio
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Administra tu negocio de manera sencilla y centralizada: gestiona
              usuarios con roles y permisos, controla el stock, organiza
              categorías y administra tus productos de forma eficiente.
            </Typography>
          </Grid>

          <Grid container spacing={3} justifyContent="center">
            <Grid size={{ xs: 6, md: 3 }}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Storefront fontSize="large" color="primary" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Productos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestión completa
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Group fontSize="large" color="secondary" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Usuarios
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Roles y permisos
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Inventory fontSize="large" color="success" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Stock
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Productos disponibles
                </Typography>
              </Card>
            </Grid>

            <Grid size={{ xs: 6, md: 3 }}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Category fontSize="large" color="warning" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Categorías
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Organización fácil
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}