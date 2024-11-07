export async function postAttendance(attendance) {
    const url = 'https://profesoresbackend.onrender.com/admin/clase/equipo/asistencia/crear';
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attendance) // Convert the attendance data to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to create attendance');
        }
        return await response.json(); // Return the response in JSON format if successful
    } catch (error) {
        console.error('Error creating attendance:', error);
        throw error;
    }
}