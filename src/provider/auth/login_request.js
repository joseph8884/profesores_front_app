import { toast } from "sonner";

export default async function postUser(user) {
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    console.log('login usuario', user);

    try {

        const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (resp.ok) {
            console.log('El cliente ha realizado login correctamente');
            return resp;
        } else if (resp.status === 403) {
            toast.error("Usuario o contraseña incorrectos");
            //throw new Error('Usuario o contraseña incorrectos');
        } else {
            const errorText = await resp.text();
            toast.error("Error al iniciar sesión", errorText);
            //throw new Error('Error al iniciar sesión');
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            toast.error("La solicitud ha tardado demasiado y ha sido cancelada");
        } else {
            toast.error("Error de red o servidor no disponible");
        }
        console.error('Error al iniciar sesion:', error);
        throw error;
    }
}
