"use client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    IconButton,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleCopy = async (text: string, label: string) => {
        try {
            if (navigator?.clipboard?.writeText) {
                // ✅ método moderno
                await navigator.clipboard.writeText(text);
            } else {
                // 🔙 fallback para navegadores sin clipboard API
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }

            enqueueSnackbar(`${label} copiado: ${text}`, { variant: "success" });
        } catch (err) {
            console.error("Error copiando:", err);
            enqueueSnackbar("No se pudo copiar", { variant: "error" });
        }
    };


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
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        };
        checkSession();
    }, [router]);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                width: "100%",
                bgcolor: "grey.100",
            }}
        >
            <Paper
                sx={{
                    width: { xs: "100%", sm: 460 },
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 6,
                }}
            >
                {/* Logo */}
                <Box
                    sx={{
                        width: "100%",
                        mb: 1.5,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        src="/assests/Logo.png"
                        width={120}
                        height={90}
                        alt="Logo"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </Box>

                {/* Título */}
                <Typography
                    variant="h6"
                    sx={{ mb: 2, textAlign: "center", fontWeight: 700 }}
                >
                    Iniciar Sesión
                </Typography>

                {/* Formulario */}
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        setLoading(true);
                        try {
                            const res = await fetch("/api/login", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ nombreUsuario, password }),
                            });
                            if (res.ok) {
                                router.push("/main/bienvenido");
                            } else {
                                enqueueSnackbar("Usuario o contraseña incorrecta", {
                                    variant: "error",
                                });
                                setLoading(false);
                            }
                        } catch {
                            enqueueSnackbar("Error de conexión", { variant: "error" });
                            setLoading(false);
                        }
                    }}
                >
                    <Stack spacing={1.5}>
                        <TextField
                            label="Usuario"
                            fullWidth
                            size="small"
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                            required
                        />
                        <TextField
                            label="Contraseña"
                            type="password"
                            fullWidth
                            size="small"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                py: 1,
                                fontWeight: 600,
                                borderRadius: 2,
                                textTransform: "none",
                            }}
                        >
                            Iniciar Sesión
                        </Button>
                    </Stack>
                </form>

                {/* Divider */}
                <Divider sx={{ my: 3 }} />

                {/* Usuarios de prueba */}
                <Card
                    variant="outlined"
                    sx={{
                        bgcolor: "grey.50",
                        borderRadius: 2,
                        boxShadow: 0,
                    }}
                >
                    <CardContent sx={{ p: 2 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 1, textAlign: "center" }}
                        >
                            Usuarios de prueba
                        </Typography>

                        {/* Usuario 1 */}
                        <Box sx={{ mb: 1 }}>
                            <Box
                                sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                            >
                                <Typography variant="body2" sx={{ flex: 1 }}>
                                    <b>Usuario:</b> emanuelAdmin
                                </Typography>
                                <Tooltip title="Copiar usuario">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleCopy("emanuelAdmin", "Usuario")}
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="body2" sx={{ flex: 1 }}>
                                    <b>Contraseña:</b> emanuelAdmin
                                </Typography>
                                <Tooltip title="Copiar contraseña">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleCopy("emanuelAdmin", "Contraseña")}
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        {/* Usuario 2 */}
                        <Box>
                            <Box
                                sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                            >
                                <Typography variant="body2" sx={{ flex: 1 }}>
                                    <b>Usuario:</b> Francisco_Stock
                                </Typography>
                                <Tooltip title="Copiar usuario">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleCopy("Francisco_Stock", "Usuario")}
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography variant="body2" sx={{ flex: 1 }}>
                                    <b>Contraseña:</b> 123456
                                </Typography>
                                <Tooltip title="Copiar contraseña">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleCopy("123456", "Contraseña")}
                                    >
                                        <ContentCopyIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
}