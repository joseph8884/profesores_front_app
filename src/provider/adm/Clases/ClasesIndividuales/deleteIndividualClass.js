export async function deleteIndividualClass(id) {
    const url = `${process.env.REACT_APP_API_URL}/admin/clase/individual/eliminar/${id}`; // URL de la API para eliminar una clase individual
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
            throw new Error('Failed to delete individual class');
        }
        return await response.json(); // Retorna la respuesta en formato JSON si es exitosa
    } catch (error) {
        console.error('Error deleting individual class:', error);
        throw error;
    }
}