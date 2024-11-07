export async function deleteTeamAPI(id) {
    const url = `https://profesoresbackend.onrender.com/admin/equipo/eliminar/${id}`; // id del equipo para eliminar
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
            throw new Error('Failed to delete team');
        }
        return await response.json(); // Retorna la respuesta en formato JSON si es exitosa
    } catch (error) {
        console.error('Error deleting team:', error);
        throw error;
    }
}