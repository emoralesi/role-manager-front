import Forbidden from "@/app/componentes/Forbidden";
import { verifySession } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import ConsultaStockClient from "./ConsultaStockClient";

export default async function ConsultaStockPage() {
    const session = await verifySession();

    if (!session) unauthorized();
    if (!session.accesSubMenu.includes(5)) {
        return <Forbidden />;
    }

    return <ConsultaStockClient />;
}