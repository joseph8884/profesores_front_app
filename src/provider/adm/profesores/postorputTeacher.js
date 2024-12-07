export async function postorputTeacher(teacherData, type, id) {
    var url
    if (type === 'POST'){
     url = 'https://profesoresbackend.onrender.com/admin/profesor/crear';
    } else {
     url = `https://profesoresbackend.onrender.com/admin/profesor/actualizar/${id}`;
    }
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: type,
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacherData) // Convert the team data to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to create profesor');
        }

        const data = await response.json();
        return data; // Return the response data
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
}

