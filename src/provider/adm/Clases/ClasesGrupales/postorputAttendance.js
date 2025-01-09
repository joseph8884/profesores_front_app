import { toast } from "sonner";

export async function postORputAttendance(listOfstudents) {
    const putUrl = `${process.env.REACT_APP_API_URL}/admin/clase/equipo/asistencia/actualizar`;
    const postUrl = `${process.env.REACT_APP_API_URL}/admin/clase/equipo/asistencia/crear`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const putResponse = await fetch(putUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listOfstudents) // Convert the team class data to JSON
        });

        const contentType = putResponse.headers.get('content-type');
        const responseText = await putResponse.text(); // Read the response as text

        if (!putResponse.ok) {
            toast.error("Error al actualizar la asistencia del equipo, por favor intentar mas tarde.", responseText);    
            console.error('Server responded with:', responseText);
            throw new Error('Failed to put team class');
        }

        if (contentType && contentType.includes('application/json')) {
            toast.error("Error al actualizar la asistencia del equipo", responseText);
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            console.log('Response is not JSON:', responseText);
            toast.success("Asitencia del equipo actualizada con éxito");
            return { message: responseText }; // Return the response text as a message
        }
    } catch (putError) {
        try {
            const postResponse = await fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listOfstudents) // Convert the team class data to JSON
            });

            const contentType = postResponse.headers.get('content-type');
            const responseText = await postResponse.text(); // Read the response as text

            if (!postResponse.ok) {
                toast.error("Error al crear la asistencia del equipo, por favor intentar mas tarde.", responseText);    
                console.error('Server responded with:', responseText);
                throw new Error('Failed to post team class');
            }

            if (contentType && contentType.includes('application/json')) {
                toast.error("Error al crear la asistencia del equipo", responseText);
                return JSON.parse(responseText); // Attempt to parse the response as JSON
            } else {
                console.log('Response is not JSON:', responseText);
                toast.success("Asistencia del equipo creada con éxito");
                return { message: responseText }; // Return the response text as a message
            }
        } catch (postError) {
            console.error('Error posting team class:', postError);
            throw postError;
        }
    }
}