export interface UserLogged {
    idRole: number;
    id_usuario: number;
    nombreUsuario: string;
    status: string;
    token: string;
}

export function getUserLogged(): UserLogged | null {
    if (typeof window === 'undefined') return null;
    const storedUser = localStorage.getItem('UserLogged');
    if (!storedUser) return null;

    try {
        return JSON.parse(storedUser) as UserLogged;
    } catch (error) {
        console.error('Error parsing UserLogged', error);
        return null;
    }
}
