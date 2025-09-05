"use client";

import { Box, Paper } from "@mui/material";
import SideMenu from "./SideMenu/SideMenu";
import Header from "./Header";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { md: "200px", xs: "60px" },
          height: "100vh",
          borderRadius: 0,
          overflowY: "auto",
          paddingRight: "20px",
        }}
      >
        <SideMenu />
      </Paper>

      <Box
        sx={{
          marginBottom: 0,
          width: { xs: "calc(100% - 70px)", md: "calc(100% - 200px)" },
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box>
          <Header />
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
