import { toast } from 'sonner';

export async function postORputIndividualClass(individualClass, id) {
    const puturl = `${process.env.REACT_APP_API_URL}/admin/clase/individual/actualizar/${id}`;
    const posturl = `${process.env.REACT_APP_API_URL}/admin/clase/individual/crear`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const putResponse = await fetch(puturl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(individualClass) // Convert the company data to JSON
        });

        const contentType = putResponse.headers.get('content-type');
        const responseText = await putResponse.text(); // Read the response as text

        if (!putResponse.ok) {   
            console.error('Failed to put Server responded with:', responseText);
            throw new Error('Failed to put student');
        }

        if (contentType && contentType.includes('application/json')) {
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            console.log('Response is not JSON:', responseText);
            toast.success("Clase del estudiante actualizada con éxito");
            return { message: responseText }; // Return the response text as a message
        }
    } catch (putError) {
        try {
            const postResponse = await fetch(posturl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(individualClass) // Convert the company data to JSON
            });

            const contentType = postResponse.headers.get('content-type');
            const responseText = await postResponse.text(); // Read the response as text

            if (!postResponse.ok) {  
                console.error('Server responded with:', responseText);
                throw new Error('Failed to post student');
            }

            if (contentType && contentType.includes('application/json')) {;
                return JSON.parse(responseText); // Attempt to parse the response as JSON
            } else {
                console.log('Response is not JSON:', responseText);
                toast.success("Clase del estudiante creada con éxito");
                return { message: responseText }; // Return the response text as a message
            }
        } catch (postError) {
            toast.error("Error al actualizar o crear la clase del estudiante, recuerde revisar el numero de horas", postError)
            console.error('Error posting individual class:', postError);
            throw postError;
        }
    }
}