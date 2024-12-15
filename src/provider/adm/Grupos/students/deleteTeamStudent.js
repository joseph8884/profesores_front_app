import { toast } from "sonner";
export async function deleteTeamStudent(id) {
    const url = `${process.env.REACT_APP_API_URL}/admin/estudiante/equipo/eliminar/${id}`; // Id del estudiante para eliminar del equipo
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });

        const contentType = response.headers.get('content-type');
        const responseText = await response.text(); // Read the response as text

        if (!response.ok) {
            toast.error("Error al eliminar el estudiante de este grupo", responseText);    
            console.error('Server responded with:', responseText);
            throw new Error('Failed to put student');
        }

        if (contentType && contentType.includes('application/json')) {
            toast.error("Error al eliminar el estudiante de este grupo", responseText);
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            console.log('Response is not JSON:', responseText);
            toast.success("Estudiante eliminado con éxito");
            return { message: responseText }; // Return the response text as a message
        }
    } catch (error) {
        toast.error("Error al eliminar el estudiante de este grupo"); 
        console.error('Error creating student:', error);
        throw error;
    }
}