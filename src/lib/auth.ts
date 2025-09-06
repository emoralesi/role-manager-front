import { cookies } from "next/headers";

export type Session = {
  id_usuario: string;
  nombreUsuario: string;
  idRole: number;
  accesSubMenu: number[];
  token: string;
} | null;

export async function verifySession(): Promise<Session> {
  const cookieValue = (await cookies()).get("session")?.value;
  if (!cookieValue) return null;

  try {
    return JSON.parse(cookieValue) as Session;
  } catch {
    return null;
  }
}