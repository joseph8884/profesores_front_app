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

        if (!response.ok) {
            throw new Error('Failed to create team class');
        }
        return await response.json(); // Return the response in JSON format if successful
    } catch (error) {
        console.error('Error creating team class:', error);
        throw error;
    }
}