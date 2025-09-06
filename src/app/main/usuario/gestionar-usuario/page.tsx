import Forbidden from "@/app/componentes/Forbidden";
import { verifySession } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import GestionarUsuarioClient from "./GestionarUsuarioClient";

export default async function GestionarUsuarioPage() {
  const session = await verifySession();

  if (!session) unauthorized();
  if (!session.accesSubMenu.includes(8)) {
    return <Forbidden />;
  }

  return <GestionarUsuarioClient />;
}