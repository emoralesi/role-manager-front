import Forbidden from "@/app/componentes/Forbidden";
import { verifySession } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import ListaCategoriasClient from "./ListaCategoriasClient";

export default async function ListaCategoriasPage() {
    const session = await verifySession();

    if (!session) unauthorized();
    if (!session.accesSubMenu.includes(2)) {
        return <Forbidden />;
    }

    return <ListaCategoriasClient />;
}