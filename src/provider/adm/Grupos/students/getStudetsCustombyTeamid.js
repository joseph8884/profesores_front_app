import {toast} from "sonner"
export async function getStudentsCustomWithDate(idteam, month, year) {
    try{
        const url = `${process.env.REACT_APP_API_URL}/admin/estudiante/equipo/equipo/?teamId=${idteam}&year=${year}&month=${month}`;;
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
            classesAttended: student.classesAttended,
            attendancePercentage: student.attendancePercentage
        }));
        console.log('Estudiantes obtenidos:', studentsList);
        return studentsList;
    } catch (error) {  
        toast.error("No se encontraron estudiantes, por favor intente mas tarde")
        console.error('Error al obtener los estudiantes:', error);
        throw error;
    }
 // Asegúrate de que esto retorne la respuesta completa
};
