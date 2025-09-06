import Forbidden from "@/app/componentes/Forbidden";
import { verifySession } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import HabDesProductosClient from "./HabDesProductosClient";

export default async function HabDesProductosPage() {
    const session = await verifySession();

    if (!session) unauthorized();
    if (!session.accesSubMenu.includes(4)) {
        return <Forbidden />;
    }

    return <HabDesProductosClient />;
}