import Forbidden from "@/app/componentes/Forbidden";
import { verifySession } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import AgregarCategoriaClient from "./AgregarCategoriaClient";

export default async function AgregarCategoriaPage() {
    const session = await verifySession();

    if (!session) unauthorized();
    if (!session.accesSubMenu.includes(1)) {
        return <Forbidden />;
    }

    return <AgregarCategoriaClient />;
}