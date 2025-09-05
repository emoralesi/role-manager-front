import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieValue = (await cookies()).get("session")?.value;

  if (!cookieValue) {
    return NextResponse.json({ status: "unauthorized" }, { status: 401 });
  }

  try {
    const session = JSON.parse(cookieValue);
    return NextResponse.json({ status: "ok", session });
  } catch {
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}