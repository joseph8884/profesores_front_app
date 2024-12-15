import { toast } from 'sonner';
export async function putIndividualClass(individualClass, id) {
    const url = `${process.env.REACT_APP_API_URL}/admin/clase/individual/actualizar/${id}`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(individualClass) // Convert the company data to JSON
        });

        const contentType = response.headers.get('content-type');
        const responseText = await response.text(); // Read the response as text

        if (!response.ok) {
            toast.error("Error al actualizar la clase del estudiante, por favor intentar mas tarde.", responseText);    
            console.error('Server responded with:', responseText);
            throw new Error('Failed to put student');
        }

        if (contentType && contentType.includes('application/json')) {
            toast.error("Error al actualizar la clase del estudiante", responseText);
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            console.log('Response is not JSON:', responseText);
            toast.success("Clase del estudiante actualizada con éxito");
            return { message: responseText }; // Return the response text as a message
        }
    } catch (error) {
        console.error('Error updating individual class:', error);
        throw error;
    }
    
}