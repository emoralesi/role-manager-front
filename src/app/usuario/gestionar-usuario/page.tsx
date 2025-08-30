'use client'
import { useRoles } from "@/hooks/useRoles";
import { useUsuario } from "@/hooks/useUsuario";
import {
  Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select,
  Stack, TextField, Typography, Paper,
  SelectChangeEvent
} from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import FlakyIcon from "@mui/icons-material/Flaky";
import EditIcon from "@mui/icons-material/Edit";
import { UserLogged } from "@/utils/localStorage";

export default function GestionarUsuarioPage() {
  const MenuProps = {
    PaperProps: { style: { maxHeight: 48 * 4.5 + 8, width: 250 } }
  };

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [roles, setRoles] = useState<number>(0);
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [activo, setActivo] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  const [rol, setRol] = useState<number>(0);

  const { obtenerUsuarios, usuariosAll, setUsuariosAll, usuariosAllDataGrid, setUsuariosAllDataGrid, actualizarUsuarioEstado, actualizarUsuario, actualizarPassword } = useUsuario();
  const { obtenerRoles, rolesAll } = useRoles();

  const userLogged: UserLogged | null = JSON.parse(localStorage.getItem('UserLogged') || 'null');

  const FilterNombreProducto = (valor: string) => {
    setUsuariosAllDataGrid(
      usuariosAll.filter(
        (val) =>
          val.nombre_usuario.toLowerCase().includes(valor.toLowerCase()) &&
          (roles !== 0 ? val.role.id_roles === roles : true)
      )
    );
  };

  const FilterRole = (valor: number) => {
    setUsuariosAllDataGrid(
      usuariosAll.filter(
        (val) =>
          val.nombre_usuario.toLowerCase().includes(nombreUsuario.toLowerCase()) &&
          (valor !== 0 ? val.role.id_roles === valor : true)
      )
    );
  };

  const FilterActivo = (valor: boolean) => {
    setUsuariosAllDataGrid(
      usuariosAll.filter(
        (val) =>
          val.nombre_usuario.toLowerCase().includes(nombreUsuario.toLowerCase()) &&
          (roles !== 0 ? val.role.id_roles === roles : true) &&
          val.activo === valor
      )
    );
  };

  const UpdateStatus = useCallback(
    (id: number, row: Usuario) => async () => {
      const Mybody = { id_usuario: id, activo: !row.activo };
      const res = await actualizarUsuarioEstado(Mybody);
      if (res.ok === 200) {
        setUsuariosAll(prev => prev.map(r => r.id_usuario === id ? { ...r, activo: !r.activo } : r));
        setUsuariosAllDataGrid(prev => prev.map(r => r.id_usuario === id ? { ...r, activo: !r.activo } : r));
        enqueueSnackbar(`Usuario ${row.nombre_usuario} actualizado correctamente`, { variant: "success" });
      } else {
        enqueueSnackbar("Error al actualizar usuario", { variant: "error" });
      }
    },
    []
  );

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombreUsuario(e.target.value);
    FilterNombreProducto(e.target.value);
  };

  const handleRoleChange = (e: SelectChangeEvent<number>) => {
    const value = e.target.value as number;
    setRoles(value);
    FilterRole(value);
  };

  const handleActivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivo(e.target.checked);
    FilterActivo(e.target.checked);
  };


  const handleOpen = (row: Usuario) => {
    setUsuarioSeleccionado(row);
    setNombreUsuario(row.nombre_usuario);
    setRol(row.role.id_roles);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUsuarioSeleccionado(null);
  };

  const handleGuardar = async () => {
    if (!usuarioSeleccionado) return;

    const body = { id_usuario: usuarioSeleccionado.id_usuario, nombre_usuario: nombreUsuario, role: rol };
    const result = await actualizarUsuario(body);

    if (result && result.ok === 200) {
      enqueueSnackbar("Usuario actualizado correctamente", { variant: "success" });
    } else {
      enqueueSnackbar("Error al actualizar el usuario", { variant: "error" });
    }

    obtenerUsuarios();
    setOpen(false);
  };

  const columns = useMemo<GridColDef<Usuario>[]>(
    () => [
      { field: "nombre_usuario", headerName: "Nombre Usuario", flex: 1 },
      { field: "role", headerName: "Rol", flex: 1, valueGetter: (value: any, row: Usuario) => row.role.nombre_rol },
      { field: "activo", headerName: "Activo", type: "boolean", flex: 1 },
      {
        field: "actions",
        type: "actions",
        headerName: "Acciones",
        flex: 1,
        getActions: (params) => {
          const isUserLogged = userLogged?.id_usuario === params.row.id_usuario;
          return [
            <GridActionsCellItem
              icon={<FlakyIcon />}
              label="Actualizar Estado"
              key="toggle"
              onClick={UpdateStatus(params.id as number, params.row)}
              disabled={isUserLogged}
            />,
            <GridActionsCellItem
              icon={<EditIcon color="primary" />}
              label="Editar Usuario"
              key="edit"
              onClick={() => handleOpen(params.row)}
              disabled={isUserLogged}
            />,
          ];
        },
      },
    ],
    [UpdateStatus, userLogged]
  );

  useEffect(() => {
    obtenerRoles();
    obtenerUsuarios();
  }, []);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" mb={3} fontWeight={600}>
          Gestionar Usuario
        </Typography>

        <Paper sx={{ mb: 3, p: 2 }} elevation={3}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Nombre de usuario"
              variant="outlined"
              color="secondary"
              value={nombreUsuario}
              onChange={handleNombreChange}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel id="roles-label">Roles</InputLabel>
              <Select
                labelId="roles-label"
                value={roles}
                onChange={handleRoleChange}
                input={<OutlinedInput label="Roles" />}
                MenuProps={MenuProps}
              >
                <MenuItem value={0}>Todos</MenuItem>
                {rolesAll.map((rol) => (
                  <MenuItem key={rol.id_roles} value={rol.id_roles}>
                    {rol.nombre_rol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={<Checkbox checked={activo} onChange={handleActivoChange} />}
              label="Activo"
            />
          </Stack>
        </Paper>

        <Box
          sx={{
            width: "100%",
            height: 500,
            bgcolor: "white",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <DataGrid
            getRowId={(row) => row.id_usuario}
            columns={columns}
            rows={usuariosAllDataGrid}
            pageSizeOptions={[6, 10, 20]}
            initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
          />
        </Box>
      </Box>



      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Nombre Usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} fullWidth />
            <FormControl fullWidth>
              <InputLabel id="rol-label">Rol</InputLabel>
              <Select labelId="rol-label" value={rol} onChange={(e) => setRol(e.target.value as number)}>
                {rolesAll.map((rol: any) => (<MenuItem key={rol.id_roles} value={rol.id_roles}>{rol.nombre_rol}</MenuItem>))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancelar</Button>
          <Button onClick={handleGuardar} variant="contained">Guardar</Button>
          <Button color="secondary" onClick={() => setOpenPasswordModal(true)}>Cambiar Contraseña</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPasswordModal} onClose={() => setOpenPasswordModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Nueva Contraseña" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordModal(false)} color="error">Cancelar</Button>
          <Button
            variant="contained"
            onClick={async () => {
              if (!usuarioSeleccionado) return;
              const result = await actualizarPassword(usuarioSeleccionado.id_usuario, newPassword);
              enqueueSnackbar(result?.ok === 200 ? "Contraseña actualizada correctamente" : "Error al actualizar la contraseña", {
                variant: result?.ok === 200 ? "success" : "error"
              });
            }}
          >
            Guardar Contraseña
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}