import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// API route /api/session
export async function GET() {
  const cookieValue = (await cookies()).get("session")?.value;

  if (!cookieValue) {
    return NextResponse.json({ status: "unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(cookieValue);

    const safeSession = {
      id_usuario: session.id_usuario,
      nombreUsuario: session.nombreUsuario
    };

    return NextResponse.json({ status: "ok", session: safeSession });
  } catch {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}