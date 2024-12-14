export async function deleteTeamStudent(id) {
    const url = `${process.env.REACT_APP_API_URL}/admin/estudiante/equipo/eliminar/${id}`; // Id del estudiante para eliminar del equipo
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
            throw new Error('Failed to delete student from team');
        }
        return await response.json(); // Retorna la respuesta en formato JSON si es exitosa
    } catch (error) {
        console.error('Error deleting student from team:', error);
        throw error;
    }
}