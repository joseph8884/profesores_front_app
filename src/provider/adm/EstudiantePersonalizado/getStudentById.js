export async function getStudentById(id) {
    const url = `https://profesoresbackend.onrender.com/admin/estudiante/personalizado/estudiante/${id}`; // URL de la API para crear un estudiante personalizado};
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }            
        });

        if (!response.ok) {
            throw new Error('Failed to get student');
        }
        return await response.json(); // Retorna la respuesta en formato JSON si es exitosa
    } catch (error) {
        console.error('Error get student:', error);
        throw error;
    }
}

