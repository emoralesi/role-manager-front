// page.tsx

import { verifySession } from "@/lib/auth";
import { forbidden, unauthorized } from "next/navigation";
import GestionarRolesClient from "./GestionarRolesClient";

export default async function GestionarRolesPage() {
  const session = await verifySession();

  console.log("mi session",session);
  

  if (!session) unauthorized();
  if (session.idRole !== 1) forbidden();

  return <GestionarRolesClient />;
}
