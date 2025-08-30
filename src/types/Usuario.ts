interface Usuario {
    id_usuario: number;
    nombre_usuario: string;
    password_usuario?: string;
    activo: boolean;
    role: Role;
}