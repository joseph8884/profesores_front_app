export async function changeStatusTeam(id) {
    const url = `https://profesoresbackend.onrender.com/admin/equipo/status/${id}`; //Id del equipo a cambiar de estado
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to change team status');
        }
        return await response.json(); // Return the response data if successful
    } catch (error) {
        console.error('Error changing team status:', error);
        throw error;
    }
}