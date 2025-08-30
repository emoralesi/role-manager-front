import { ServiceResponse } from "@/types/ServiceResponse";

export async function getRoles(): Promise<ServiceResponse<Role[]>> {

    try {
        const response = await fetch(`http://localhost:3500/service/obtenerRoles`)

        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }

}

export default { getRoles }