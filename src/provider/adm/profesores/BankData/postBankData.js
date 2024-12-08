export async function postBankData(teacherData) {
    const url = 'https://profesoresbackend.onrender.com/admin/profesorbanco/crear';
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacherData) // Convert the team data to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to create team');
        }

        const data = await response.json();
        return data; // Return the response data
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
}

