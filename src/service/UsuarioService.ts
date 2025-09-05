'use server'
import { ServiceResponse } from "@/types/ServiceResponse";
import { cookies } from "next/headers";

export async function LoginUsuario({ nombreUsuario, password }: { nombreUsuario: string, password: string }): Promise<any> {

    let req = {
        "nombreUsuario": nombreUsuario,
        "password": password
    }

    try {

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(req)

        };

        const response = await fetch(`http://localhost:3500/service/loginUser`, requestOptions);

        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }
}

export async function RegisterUsuario({ nombreUsuario, password, role }: { nombreUsuario: string, password: string, role: number }): Promise<any> {
    try {

        let req = {
            "nombreUsuario": nombreUsuario,
            "password": password,
            "role": role
        }

        const cookieValue = (await cookies()).get("session")?.value;
        if (!cookieValue) throw new Error("Usuario no logueado");

        const session = JSON.parse(cookieValue);

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'tu_clave_secreta_jwt': session.token,
            },
            body: JSON.stringify(req)

        };

        const response = await fetch(`http://localhost:3500/service/registerUser`, requestOptions);

        const data = await response.json();

        return data

    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function getUsuarios(): Promise<ServiceResponse<Usuario[]>> {

    try {

        const cookieValue = (await cookies()).get("session")?.value;
        if (!cookieValue) throw new Error("Usuario no logueado");
        const session = JSON.parse(cookieValue);

        const response = await fetch(`http://localhost:3500/service/obtenerUsuarios`, {
            method: "GET",
            headers: {
                "tu_clave_secreta_jwt": session.token,
            },
        });


        const data = await response.json();

        return data

    } catch (error) {
        throw error
    }
}

export async function UpdateEstadoUsuario({ id_usuario, activo }: { id_usuario: number, activo: boolean }): Promise<any> {
    try {

        let req = {
            "id_usuario": id_usuario,
            "activo": activo
        }

        const cookieValue = (await cookies()).get("session")?.value;
        if (!cookieValue) throw new Error("Usuario no logueado");

        const session = JSON.parse(cookieValue);

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "tu_clave_secreta_jwt": session.token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(req)

        };

        const response = await fetch(`http://localhost:3500/service/actualizarUsuarioEstado`, requestOptions);

        const data = await response.json();

        return data

    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function UpdateUsuario({ id_usuario, nombre_usuario, role }: { id_usuario: number, nombre_usuario: string, role: number }): Promise<any> {
    try {
        let req = {
            "id_usuario": id_usuario,
            "nombre_usuario": nombre_usuario,
            "role": role,
        }

        const cookieValue = (await cookies()).get("session")?.value;
        if (!cookieValue) throw new Error("Usuario no logueado");

        const session = JSON.parse(cookieValue);

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "tu_clave_secreta_jwt": session.token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(req)

        };

        const response = await fetch(`http://localhost:3500/service/actualizarUsuario`, requestOptions);

        const data = await response.json();

        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export async function UpdatePasswordUsuario({ id_usuario, newPassword }: { id_usuario: number, newPassword: string }): Promise<any> {
    try {
        let req = {
            "id_usuario": id_usuario,
            "newPassword": newPassword,
        }

        const cookieValue = (await cookies()).get("session")?.value;
        if (!cookieValue) throw new Error("Usuario no logueado");

        const session = JSON.parse(cookieValue);

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "tu_clave_secreta_jwt": session.token
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(req)
        };
        const response = await fetch(`http://localhost:3500/service/actualizarPasswordUsuario`, requestOptions);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}