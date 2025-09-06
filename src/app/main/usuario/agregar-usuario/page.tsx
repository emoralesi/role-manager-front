import Forbidden from "@/app/componentes/Forbidden";
import { verifySession } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import AgregarUsuarioClient from "./AgregarUsuarioClient";

export default async function AgregarUsuarioPage() {
    const session = await verifySession();

    if (!session) unauthorized();
    if (!session.accesSubMenu.includes(7)) {
        return <Forbidden />;
    }

    return <AgregarUsuarioClient />;
}