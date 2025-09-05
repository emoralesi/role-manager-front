// layout.tsx
import { verifySession } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientLayout from "../componentes/ClienteLayout";
import { AuthProvider } from "@/context/AuhtContext";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();

  if (!session) {
    redirect("/login");
  }

  return <AuthProvider><ClientLayout>{children}</ClientLayout></AuthProvider>

}
