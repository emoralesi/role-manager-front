"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  Divider,
  TextField,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { Rol, useRoles } from "@/hooks/useRoles";

export default function GestionarRolesPage() {
  const { rolesAll, menus, obtenerRoles, crearRol, editarRol } = useRoles();
  const [open, setOpen] = useState(false);
  const [rolNombre, setRolNombre] = useState("");
  const [selected, setSelected] = useState<{ [menuId: number]: { [subId: number]: boolean } }>({});
  const [editingRolId, setEditingRolId] = useState<number | null>(null);

  useEffect(() => {
    obtenerRoles();
  }, [obtenerRoles]);

  const handleOpenNew = () => {
    setEditingRolId(null);
    setRolNombre("");
    setSelected({});
    setOpen(true);
  };

  const handleOpenEdit = (rol: Rol) => {
    setEditingRolId(rol.id_roles);
    setRolNombre(rol.nombre_rol);
    const selectedState: { [menuId: number]: { [subId: number]: boolean } } = {};
    rol.menus?.forEach((menu: any) => {
      selectedState[menu.id_menu] = {};
      menu.submenus.forEach((subId: any) => {
        selectedState[menu.id_menu][subId] = true;
      });
    });
    setSelected(selectedState);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRolNombre("");
    setSelected({});
    setEditingRolId(null);
  };

  const handleToggle = (menuId: number, subId: number) => {
    setSelected((prev) => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        [subId]: !prev[menuId]?.[subId],
      },
    }));
  };

  const handleSave = async () => {
    const menusSeleccionados = menus
      .map((menu: any) => ({
        id_menu: menu.id_menu,
        submenus: menu.submenus
          .filter((sub: any) => selected[menu.id_menu]?.[sub.id_sub_menu])
          .map((sub: any) => sub.id_sub_menu),
      }))
      .filter((menu: any) => menu.submenus.length > 0);

    try {
      if (editingRolId) {
        await editarRol(editingRolId, menusSeleccionados);
      } else {
        await crearRol(rolNombre, menusSeleccionados);
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box p={2} sx={{ minHeight: '100vh', bgcolor: '#f9f9f9' }}>
      <Card sx={{ maxWidth: 900, mx: 'auto', p: 2, boxShadow: 3 }}>
        <Typography variant="h4" mb={3} fontWeight={600} textAlign={"center"}>
          Gestionar Roles
        </Typography>

        <Grid container spacing={3}>
          {rolesAll.map((rol: any) => (
            <Grid size={{ xs: 12, md: 6 }} key={rol.id_roles}>
              <Paper sx={{ p: 2, borderRadius: 2, bgcolor: "#ffffff", boxShadow: 1 }}>
                <Typography variant="h6" fontWeight={600}>
                  {rol.nombre_rol}
                </Typography>
                <Stack spacing={0.5} mt={1} mb={1}>
                  {rol.permisos?.map((p: any, i: any) => (
                    <Typography key={i} variant="body2" color="text.secondary">
                      • {p}
                    </Typography>
                  ))}
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Button
                  variant="outlined"
                  size="small"
                  fullWidth
                  onClick={() => rol.id_roles !== 1 && handleOpenEdit(rol)}
                  disabled={rol.id_roles === 1} // Deshabilitar si es admin
                >
                  Editar Permisos
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>


        <Box mt={4} textAlign="center">
          <Button variant="contained" onClick={handleOpenNew}>
            Crear Rol
          </Button>
        </Box>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{editingRolId ? "Editar Permisos" : "Crear Rol"}</DialogTitle>
          <DialogContent dividers>
            <TextField
              fullWidth
              label="Nombre del Rol"
              value={rolNombre}
              disabled={!!editingRolId}
              onChange={(e) => setRolNombre(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
              {menus.map((menu: any) => (
                <Box key={menu.id_menu} mb={2}>
                  <Typography fontWeight={600} mb={1}>
                    {menu.nombre_menu}
                  </Typography>
                  <Stack spacing={1}>
                    {menu.submenus.map((sub: any) => (
                      <FormControlLabel
                        key={sub.id_sub_menu}
                        control={
                          <Checkbox
                            checked={!!selected[menu.id_menu]?.[sub.id_sub_menu]}
                            onChange={() => handleToggle(menu.id_menu, sub.id_sub_menu)}
                          />
                        }
                        label={sub.nombre_sub_menu}
                      />
                    ))}
                  </Stack>
                </Box>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSave} variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
}