export async function getAttendances() {
    const url = `${process.env.REACT_APP_API_URL}/admin/clase/equipo/asistencia/asistencias`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const attendancesList = data.map((attendance) => ({
            ID: attendance.id,
            classID: attendance.classID,
            studentTeamID: attendance.studentTeamID,
            attended: attendance.attended
        }));

        if (!response.ok) {
            throw new Error('Failed to get attendances');
        }
        return attendancesList; // Return the mapped attendances list
    } catch (error) {
        console.error('Error getting attendances:', error);
        throw error;
    }
}