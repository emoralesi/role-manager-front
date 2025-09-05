// page.tsx
import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function BienvenidoPage() {
  const session = await verifySession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenido {session.nombreUsuario}</h1>
      <p>ID de usuario: {session.id_usuario}</p>
      <p>Rol: {session.idRole}</p>
      <p>Token: {session.token}</p>
    </div>
  );
}