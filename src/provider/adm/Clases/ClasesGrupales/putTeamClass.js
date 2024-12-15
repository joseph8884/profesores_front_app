import { toast } from "sonner";
export async function putTeamClass(teamClass, id) {
    const url = `${process.env.REACT_APP_API_URL}/admin/clase/equipo/actualizar/${id}`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamClass) // Convert the team class data to JSON
        });

        const contentType = response.headers.get('content-type');
        const responseText = await response.text(); // Read the response as text

        if (!response.ok) {
            toast.error("Error al editar clase de este grupo", responseText);    
            console.error('Server responded with:', responseText);
            throw new Error('Failed to put student');
        }

        if (contentType && contentType.includes('application/json')) {
            toast.error("Error al editar clase de este grupo", responseText);  
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            toast.success("Estudiante editado con éxito");
            return { message: responseText }; // Return the response text as a message
        }
    } catch (error) {
        toast.error("Error al editar clase de este grupo");
        console.error('Error creating Team:', error);
        throw error;
    }
}