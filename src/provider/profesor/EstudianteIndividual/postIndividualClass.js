export async function postIndividualClass(individualClass) {
    const url = `${process.env.REACT_APP_API_URL}/profesor/estudiante/personalizado/crear/clase`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(individualClass) // Convert the individual class data to JSON
        });

        const contentType = response.headers.get('content-type');
        const responseText = await response.text(); // Read the response as text

        if (!response.ok) {
            console.error('Server responded with:', responseText);
            throw new Error('Failed to create individual class');
        }

        if (contentType && contentType.includes('application/json')) {
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            console.log('Response is not JSON:', responseText);
            return { message: responseText }; // Return the response text as a message
        }
    } catch (error) {
        console.error('Error creating individual class:', error);
        throw error;
    }
}