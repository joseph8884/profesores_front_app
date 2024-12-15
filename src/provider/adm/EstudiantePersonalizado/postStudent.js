import {toast} from "sonner"
export async function createEstudent(estudent) {
    const url = `${process.env.REACT_APP_API_URL}/admin/estudiante/personalizado/crear`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estudent) // Convert the company data to JSON
        });

        const contentType = response.headers.get('content-type');
        const responseText = await response.text(); // Read the response as text

        if (!response.ok) {
            toast.error("Error al crear Estudiante", responseText);    
            console.error('Server responded with:', responseText);
            throw new Error('Failed to put student');
        }

        if (contentType && contentType.includes('application/json')) {
            toast.error("Error al crear Estudiante", responseText);
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            console.log('Response is not JSON:', responseText);
            toast.success("Estudiante creado con éxito");
            return { message: responseText }; // Return the response text as a message
        }
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
}

