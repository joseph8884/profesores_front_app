export async function deleteProfesor(id) {
    const url = `${process.env.REACT_APP_API_URL}/admin/profesor/eliminar/${id}`; // URL de la API para crear un estudiante personalizado};
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
            throw new Error('Failed to delete profesor');
        }
        return await response.json(); // Retorna la respuesta en formato JSON si es exitosa
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
}

