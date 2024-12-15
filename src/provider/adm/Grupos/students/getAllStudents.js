import {toast} from "sonner"
export async function getAllStudents() {
    try {
        const url = `${process.env.REACT_APP_API_URL}/admin/estudiante/equipo/estudiantes`;
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
            ID: student.id,
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
        toast.error("Error al obtener todos los estudiantes")
        console.error('Error al obtener los estudiantes:', error);
        throw error;
    }
}
