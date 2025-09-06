'use client'

import { useRoles } from "@/hooks/useRoles";
import { useUsuario } from "@/hooks/useUsuario";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function AgregarUsuarioClient() {
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [repetirContrasena, setRepetirContrasena] = useState<string>("");
  const [roles, setRoles] = useState<number>(0);

  const { obtenerRoles, rolesAll } = useRoles();
  const { RegistarUsuario } = useUsuario();

  useEffect(() => {
    obtenerRoles();
  }, []);

  const verifyPassword = (pass1: string, pass2: string) => {
    if (pass1 !== pass2) {
      enqueueSnackbar("Las contraseñas no coinciden", { variant: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!verifyPassword(contrasena, repetirContrasena)) return;

    const data = {
      nombreUsuario,
      password: contrasena,
      role: roles,
    };

    const result = await RegistarUsuario(data);

    if (result?.status === "ok") {
      enqueueSnackbar("Usuario registrado con éxito", { variant: "success" });
      setNombreUsuario("");
      setContrasena("");
      setRepetirContrasena("");
      setRoles(0);
    } else {
      enqueueSnackbar(result.error, { variant: "error" });
    }
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return (
    <Box p={2} sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Card sx={{ maxWidth: 900, mx: 'auto', p: 2, boxShadow: 3 }}>
        <Typography variant="h4" mb={3} fontWeight={600} textAlign={"center"}>
          Agregar Usuario
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }} >
              <TextField
                autoComplete="off"
                label="Nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} >
              <TextField
                type="password"
                label="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel id="Roles">Roles</InputLabel>
                <Select
                  value={roles}
                  input={<OutlinedInput label="Roles" />}
                  onChange={(e) => setRoles(Number(e.target.value))}
                  required
                  MenuProps={MenuProps}
                >
                  {rolesAll.map((rol) => (
                    <MenuItem key={rol.id_roles} value={rol.id_roles}>
                      {rol.nombre_rol}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="password"
                label="Repetir Contraseña"
                value={repetirContrasena}
                onChange={(e) => setRepetirContrasena(e.target.value)}
                fullWidth
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }} textAlign="center">
              <Button
                color="success"
                variant="contained"
                type="submit"
                sx={{ mt: 2, px: 4, py: 1.5 }}
              >
                Crear Usuario
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Box>
  );
}