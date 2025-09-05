"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Paper, Stack, TextField, Typography, Button, CircularProgress } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import Image from "next/image";

export default function LoginPage() {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch("/api/session");
                if (res.ok) {
                    const data = await res.json();
                    if (data.status === "ok") {
                        router.replace("/main/bienvenido");
                        return;
                    }
                } else {
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        };
        checkSession();
    }, [router]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}>
            <Paper sx={{ width: { xs: "100%", sm: 400 }, p: 4, borderRadius: 3, boxShadow: 6 }}>
                <Box sx={{ width: '100%', mb: 2, display: 'flex', justifyContent: 'center' }}>
                    <Image src="/assests/Logo.png" width={150} height={150} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                </Box>
                <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: 600 }}>Iniciar Sesión</Typography>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    setLoading(true);
                    try {
                        const res = await fetch("/api/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ nombreUsuario, password }),
                        });
                        if (res.ok) {
                            router.push("/main/bienvenido")
                        }
                        else {
                            enqueueSnackbar("Usuario o contraseña incorrecta", { variant: 'error' });

                            setLoading(false);
                        }
                    } catch {
                        enqueueSnackbar("Error de conexión", { variant: 'error' });
                        setLoading(false);
                    }
                }}>
                    <Stack spacing={2}>
                        <TextField label="Usuario" fullWidth value={nombreUsuario} onChange={e => setNombreUsuario(e.target.value)} required />
                        <TextField label="Contraseña" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} required />
                        <Button type="submit" fullWidth variant="contained" sx={{ py: 1.5, fontWeight: 600 }}>Iniciar Sesión</Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}