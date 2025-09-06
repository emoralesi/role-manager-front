import Forbidden from "@/app/componentes/Forbidden";
import { verifySession } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import AgregarStockClient from "./AgregarStockClient";

export default async function AgregarStockPage() {
    const session = await verifySession();

    if (!session) unauthorized();
    if (!session.accesSubMenu.includes(6)) {
        return <Forbidden />;
    }

    return <AgregarStockClient />;
}