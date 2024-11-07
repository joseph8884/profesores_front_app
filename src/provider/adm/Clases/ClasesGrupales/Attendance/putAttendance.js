export async function putAttendance(attendanceData, id) {
    const url = `https://profesoresbackend.onrender.com/admin/clase/equipo/asistencia/actualizar/${id}`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(attendanceData) // Convert the attendance data to JSON
        });

        if (!response.ok) {
            throw new Error('Failed to update attendance');
        }
        return await response.json(); // Return the response in JSON format if successful
    } catch (error) {
        console.error('Error updating attendance:', error);
        throw error;
    }
}