'use server';
import { Menu } from "@/types/Menu";
import { ServiceResponse } from "@/types/ServiceResponse";
import { cookies } from "next/headers";
import '../../envConfig.ts'

export default async function getMenuYSubMenu(): Promise<ServiceResponse<Menu[]>> {
  try {
    const cookieValue = (await cookies()).get("session")?.value;
    if (!cookieValue) throw new Error("Usuario no logueado");

    const session = JSON.parse(cookieValue);

    const reqBody = {
      idUsuario: session.id_usuario
    };

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "tu_clave_secreta_jwt": session.token,
      },
      body: JSON.stringify(reqBody),
    };

    const response = await fetch(
      `${process.env.URL_BACKEND}service/obtenerMenuItems`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}