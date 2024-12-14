export async function createEstudent(estudent) {
    const url = `${process.env.REACT_APP_API_URL}/admin/estudiante/personalizado/crear`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(estudent) // Convert the company data to JSON
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

