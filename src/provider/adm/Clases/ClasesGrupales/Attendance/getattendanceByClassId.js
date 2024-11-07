export async function getAttendanceByClassId(classId) {
    const url = `https://profesoresbackend.onrender.com/admin/clase/equipo/asistencia/clase/${classId}`;
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
            throw new Error('Failed to get attendance by class ID');
        }

        const data = await response.json();
        const attendanceList = data.map((attendance) => ({
            id: attendance.id,
            classID: attendance.classID,
            studentTeamID: attendance.studentTeamID,
            attended: attendance.attended
        }));

        return attendanceList;
    } catch (error) {
        console.error('Error getting attendance by class ID:', error);
        throw error;
    }
}