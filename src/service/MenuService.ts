import { getUserLogged, UserLogged } from "@/utils/localStorage";

export async function getMenuYSubMenu({ idUsuario }: { idUsuario: number }): Promise<any> {

    try {
        let req = {
            idUsuario: idUsuario
        }

        const userLogged: UserLogged | null = getUserLogged();
        if (!userLogged) throw new Error('Usuario no logueado');

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "tu_clave_secreta_jwt": userLogged.token
            },
            body: JSON.stringify(req)

        };
        const response = await fetch(`http://localhost:3500/service/obtenerMenuItems`,
            requestOptions
        );

        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }

}

export default { getMenuYSubMenu };