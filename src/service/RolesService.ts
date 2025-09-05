'use server'
import { cookies } from "next/headers";


export async function crearRolService({
  nombreRol,
  menus
}: {
  nombreRol: string;
  menus: { id_menu: number; submenus: number[] }[];
}): Promise<any> {
  try {
    const req = { nombreRol, menus };

    const cookieValue = (await cookies()).get("session")?.value;
    if (!cookieValue) throw new Error("Usuario no logueado");

    const session = JSON.parse(cookieValue);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "tu_clave_secreta_jwt": session.token,
      },
      body: JSON.stringify(req),
    };

    const response = await fetch(
      `http://localhost:3500/service/crearRol`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getRoles(): Promise<any> {
  try {
    const cookieValue = (await cookies()).get("session")?.value;
    if (!cookieValue) throw new Error("Usuario no logueado");

    const session = JSON.parse(cookieValue);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "tu_clave_secreta_jwt": session.token,
      },
    };

    const response = await fetch(
      `http://localhost:3500/service/obtenerRoles`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getRolesConMenus(): Promise<any> {
  try {
    const cookieValue = (await cookies()).get("session")?.value;
    if (!cookieValue) throw new Error("Usuario no logueado");

    const session = JSON.parse(cookieValue);

    const requestOptions: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "tu_clave_secreta_jwt": session.token,
      },
    };

    const response = await fetch(
      `http://localhost:3500/service/obtenerRolesConMenus`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}


export async function actualizarRol({
  idRol,
  nombreRol,
  menus
}: {
  idRol: number;
  nombreRol: string;
  menus: { id_menu: number; submenus: number[] }[];
}): Promise<any> {
  try {
    const req = { idRol, nombreRol, menus };

    const cookieValue = (await cookies()).get("session")?.value;
    if (!cookieValue) throw new Error("Usuario no logueado");

    const session = JSON.parse(cookieValue);

    const requestOptions: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "tu_clave_secreta_jwt": session.token,
      },
      body: JSON.stringify(req),
    };

    const response = await fetch(
      `http://localhost:3500/service/actualizarRol`,
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}