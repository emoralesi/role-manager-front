import { verifySession } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import GestionarRolesClient from "./GestionarRolesClient";
import Forbidden from "@/app/componentes/Forbidden";

export default async function GestionarRolesPage() {
  const session = await verifySession();

  if (!session) unauthorized();
  if (!session.accesSubMenu.includes(9)) {
    return <Forbidden />;
  }

  return <GestionarRolesClient />;
}