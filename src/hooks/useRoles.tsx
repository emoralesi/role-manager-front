import { getRoles } from "@/service/RolesService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useRoles = () => {

    const [rolesAll, setRolesAll] = useState<Role[]>([]);

    const navigate = useRouter();

    const handleLogOut = async () => {
        await localStorage.removeItem('UserLogged');
        navigate.push('/login')
    };

    const obtenerRoles = async () => {
        try {
            const data = await getRoles();

            if(data.status == "Forbidden") {
                handleLogOut()
            }
            setRolesAll(data.resultado)

        } catch (er) {
            console.log(er);
        } finally {

        }
    };

    return { obtenerRoles, rolesAll }
}