"use client";

import Link from "next/link";
import { Container, Typography, Button, Box, Paper } from "@mui/material";

export default function Forbidden() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          textAlign: "center",
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: "error.main" }}
        >
          403 - Forbidden
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          No está autorizado para acceder a este recurso.
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          Si cree que esto es un error, por favor contacte a su administrador.
        </Typography>

        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/main/bienvenido"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Volver al inicio
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}