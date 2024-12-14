export async function changeStatusProfesor(id) {
    const url = `${process.env.REACT_APP_API_URL}/admin/profesor/estado/${id}`; // URL de la API para crear un estudiante personalizado};
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
            throw new Error('Failed to create student');
        }
        return await response.json(); // Retorna la respuesta en formato JSON si es exitosa
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
}

