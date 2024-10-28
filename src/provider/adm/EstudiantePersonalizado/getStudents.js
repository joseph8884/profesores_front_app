export async function getStudents() {
    try{
        const url = 'https://profesoresbackend.onrender.com/admin/estudiante/personalizado/estudiantes';
        const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        const data = await resp.json();
        const studentsList = data.map((student) => ({ // Adjusted to match the new data structure
            ID: student.id,
            fullName: student.fullName,
            email: student.email,
            countryCode: student.countryCode,
            phoneNumber: student.phoneNumber,
            photo: student.photo,
            hoursPurchased: student.hoursPurchased,
            hoursSpented: student.hoursSpented,
            lastLog: student.lastLog,
            status: student.status,
            idUser: student.idUser,
            individualClasses: student.individualClasses
        }));
        console.log('Estudiantes obtenidos:', studentsList);
        return studentsList;
    } catch (error) {  
        console.error('Error al obtener los estudiantes:', error);
        throw error;
    }
 // Asegúrate de que esto retorne la respuesta completa
};
