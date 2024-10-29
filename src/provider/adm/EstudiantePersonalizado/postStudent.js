export async function createEstudent(estudent) {
    const url = 'https://profesoresbackend.onrender.com/admin/estudiante/personalizado/crear';
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
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
}

