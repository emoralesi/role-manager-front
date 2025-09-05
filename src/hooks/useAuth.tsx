"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type SessionData = {
  id_usuario: number;
  nombreUsuario: string;
  idRole: number;
  token: string;
} | null;

export const useAuth = () => {
  const router = useRouter();
  const [session, setSession] = useState<SessionData>(null);
  const [user, setUser] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (nombreUsuario: string, password: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreUsuario, password }),
      });

      if (res.ok) {
        const data = await res.json();
        setSession(data.session);
        router.push("/main/bienvenido");
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setSession(null);
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const requireRole = (allowedRoles: number[]) => {
    if (!session) return false;
    return allowedRoles.includes(session.idRole);
  };

  return { session, loading, login, logout, requireRole, user };
};