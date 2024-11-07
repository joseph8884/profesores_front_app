export async function putIndividualClass(individualClass, id) {
    const url = `https://profesoresbackend.onrender.com/admin/clase/individual/actualizar/${id}`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(individualClass) // Convert the company data to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to update individual class');
        }
        return await response.json(); // Retorna la respuesta en formato JSON si es exitosa
    } catch (error) {
        console.error('Error updating individual class:', error);
        throw error;
    }
    
}