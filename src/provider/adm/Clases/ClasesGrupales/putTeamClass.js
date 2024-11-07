export async function putTeamClass(teamClass, id) {
    const url = `https://profesoresbackend.onrender.com/admin/clase/equipo/actualizar/${id}`;
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

        if (!response.ok) {
            throw new Error('Failed to update team class');
        }
        return await response.json(); // Return the response in JSON format if successful
    } catch (error) {
        console.error('Error updating team class:', error);
        throw error;
    }
}