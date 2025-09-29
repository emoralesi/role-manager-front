import type { Metadata } from "next";
import { geistMono, geistSans } from "./fonts";
import "./globals.css";
import { Providers } from "./componentes/SnackProvider";

export const metadata: Metadata = {
  title: "Role Manager App",
  description: "Web Site para gestionar roles y permisos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ margin: 0, padding: 0 }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}