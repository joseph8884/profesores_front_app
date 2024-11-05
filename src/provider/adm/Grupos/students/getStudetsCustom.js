export async function getStudentsCustom() {
    try{
        const url = 'https://profesoresbackend.onrender.com/admin/estudiante/equipo/estudiantes';
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
            attendedClassesCount: student.attendedClassesCount,
            attendances: student.attendances.map((attendance) => ({
                id: attendance.id,
                classID: attendance.classID,
                studentTeamID: attendance.studentTeamID,
                attended: attendance.attended
            }))
        }));
        console.log('Estudiantes obtenidos:', studentsList);
        return studentsList;
    } catch (error) {  
        console.error('Error al obtener los estudiantes:', error);
        throw error;
    }
 // Asegúrate de que esto retorne la respuesta completa
};
