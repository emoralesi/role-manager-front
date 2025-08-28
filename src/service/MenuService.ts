export async function getMenuYSubMenu({ idUsuario }: { idUsuario: number }): Promise<any> {

    try {
        let req = {
            idUsuario: idUsuario
        }
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "tu_clave_secreta_jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY5NTgzMTY1MSwiZXhwIjoxNjk1ODMyMjUxfQ.FVrdi0gdlQeZynte6D838cf9xuM2S7iVXjQqSfTzaE8"
            },
            body: JSON.stringify(req)

        };
        const response = await fetch(`http://localhost:3500/service/obtenerMenuItems`,
            requestOptions
        );

        const data = await response.json();
        
        return data

    } catch (error) {
        throw error
    }

}

export default { getMenuYSubMenu };