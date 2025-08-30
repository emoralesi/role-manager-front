'use client'

import { useRoles } from "@/hooks/useRoles";
import { useUsuario } from "@/hooks/useUsuario";
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function AgregarUsuarioPage() {

  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [repetirContrasena, setRepetirContrasena] = useState<string>("")
  const [roles, setRoles] = useState<number>(0)

  const { obtenerRoles, rolesAll } = useRoles();
  const { RegistarUsuario } = useUsuario();

  useEffect(() => {
    obtenerRoles();
  }, [])

  const verifyPassword = (pass1: string, pass2: string) => {
    if (pass1 !== pass2) {
      enqueueSnackbar('Las contraseñas no coinciden', { variant: 'error' });
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!verifyPassword(contrasena, repetirContrasena)) return;

    const data = {
      nombreUsuario,
      password: contrasena,
      role: roles
    }

    const result = await RegistarUsuario(data);

    if (result?.status === 'ok') {
      enqueueSnackbar('Usuario registrado con éxito', { variant: 'success' });
      setNombreUsuario("");
      setContrasena("");
      setRepetirContrasena("");
      setRoles(0);
    } else {
      enqueueSnackbar(result.error, { variant: 'error' });
    }
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250
      },
    },
  };

  return (
    <Box
      sx={{
        padding:'0px 24px 0px 24px',
        maxWidth: 800,
        margin: '0 auto',
        height: '100%',
      }}
    >
      <Typography variant="h4" mb={3} textAlign="center">
        Agregar Usuario
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
          >
            <TextField
              autoComplete="off"
              type="text"
              variant='outlined'
              color='secondary'
              label="Nombre de usuario"
              onChange={e => setNombreUsuario(e.target.value)}
              value={nombreUsuario}
              fullWidth
              required
            />
            <TextField
              type="password"
              variant='outlined'
              color='secondary'
              label="Contraseña"
              onChange={e => setContrasena(e.target.value)}
              value={contrasena}
              fullWidth
              required
            />
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel id="Roles">Roles</InputLabel>
              <Select
                value={roles}
                label='Roles'
                input={<OutlinedInput label="Roles" />}
                onChange={(e) => setRoles(Number(e.target.value))}
                required
                MenuProps={MenuProps}
              >
                {rolesAll.map((rol) => (
                  <MenuItem
                    key={rol.id_roles + rol.nombre_rol}
                    value={rol.id_roles}
                  >
                    {rol.nombre_rol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              type="password"
              variant='outlined'
              color='secondary'
              label="Repetir Contraseña"
              onChange={e => setRepetirContrasena(e.target.value)}
              value={repetirContrasena}
              fullWidth
              required
            />
          </Stack>

          <Button
            color="success"
            variant="contained"
            type="submit"
            sx={{ width: '100%', py: 1.5 }}
          >
            Crear Usuario
          </Button>
        </Stack>
      </form>
    </Box>
  )
}