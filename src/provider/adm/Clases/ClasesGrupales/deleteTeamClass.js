export async function deleteTeamClass(id) {
    const url = `https://profesoresbackend.onrender.com/admin/clase/equipo/eliminar/${id}`; // URL de la API para eliminar una clase grupal
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error('Failed to delete team class');
        }
        return await response.json(); // Return the response in JSON format if successful
    } catch (error) {
        console.error('Error deleting team class:', error);
        throw error;
    }
}