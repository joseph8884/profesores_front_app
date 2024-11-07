export async function getStudentsCustomByTeamID(id) {
    try {
        const url = `https://profesoresbackend.onrender.com/profesor/equipo/estudiantes/${id}`; // URL to the backend API endpoint
        const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        const data = await resp.json();
        const studentsList = data.map((student) => ({
            id: student.id,
            teamID: student.teamID,
            fullName: student.fullName,
            phoneNumber: student.phoneNumber,
            email: student.email,
            attendancePercentage: student.attendancePercentage,
            attendedClassesCount: student.attendedClassesCount
        }));
        console.log('Estudiantes obtenidos:', studentsList);
        return studentsList;
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        throw error;
    }
}
