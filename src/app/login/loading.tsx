import { Box, CircularProgress } from "@mui/material";

export default function LoginLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
