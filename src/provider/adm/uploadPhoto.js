import {toast} from "sonner"
export async function uploadPhoto(
    urlEndpoint,
    id,
    selectedFile,
) {
    const url = `${process.env.REACT_APP_API_URL}${urlEndpoint}${id}`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}` // Pass the token in the Authorization header
            },
            body: formData
        });

        const contentType = response.headers.get('content-type');
        const responseText = await response.text(); // Read the response as text

        if (!response.ok) {
            toast.error("Error al subir imagen, formato no admisible o tamaño superior a 2MB", responseText);    
            console.error('Server responded with:', responseText);
            throw new Error('Failed to put student');
        }

        if (contentType && contentType.includes('application/json')) {
            toast.error("Error al subir imagen, formato no admisible o tamaño superior a 2MB", responseText);
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            console.log('Response is not JSON:', responseText);
            toast.success("Imagen subida con éxito");
            return { message: responseText }; // Return the response text as a message
        }
    } catch (error) {
        console.error('Error uploading photo:', error);
        throw error;
    }
}

