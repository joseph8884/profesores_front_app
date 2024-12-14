export async function addHoursEndpoint(hoursObject) {
    const url = `${process.env.REACT_APP_API_URL}/admin/estudiante/personalizado/agregar-horas`; // URL de la API para crear un estudiante personalizado};
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hoursObject) // Convert the company data to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to add hours');
        }
        return await response.json(); // Retorna la respuesta en formato JSON si es exitosa
    } catch (error) {
        console.error('Error updating hours for student:', error);
        throw error;
    }
}

