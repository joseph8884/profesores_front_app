export async function postTeamClass(teamClass) {
    const url = 'https://profesoresbackend.onrender.com/profesor/equipo/crear/clase';
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamClass) // Convert the team class data to JSON
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
        } // Return the response in JSON format if successful
    } catch (error) {
        console.error('Error creating team class:', error);
        throw error;
    }
}