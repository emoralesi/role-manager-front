import Forbidden from "@/app/componentes/Forbidden";
import { verifySession } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import AgregarProductoClient from "./AgregarProductoClient";

export default async function AgregarProductoPage() {
    const session = await verifySession();

    if (!session) unauthorized();
    if (!session.accesSubMenu.includes(3)) {
        return <Forbidden />;
    }

    return <AgregarProductoClient />;
}