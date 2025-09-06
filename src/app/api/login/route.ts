// app/api/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LoginUsuario } from "@/service/UsuarioService";

export async function POST(req: Request) {
    const { nombreUsuario, password } = await req.json();

    try {
        
        const data = await LoginUsuario({ nombreUsuario, password });
        

        if (data.status !== 'ok') {
            return NextResponse.json({ status: "error" }, { status: 401 });
        }

        
        (await cookies()).set("session", JSON.stringify({
            id_usuario: data.id_usuario,
            nombreUsuario: data.nombreUsuario,
            idRole: data.idRole,
            accesSubMenu: data.accesSubMenu,
            token: data.token
        }), {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 día
        });
        
        return NextResponse.json({ status: "ok" });

    } catch (error) {
        return NextResponse.json({ status: "error", message: "Error interno" }, { status: 500 });
    }
}