export async function getStudentsCustom() {
    try {
        const url = `${process.env.REACT_APP_API_URL}/profesor/estudiante/personalizado`; // URL to the backend API endpoint
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
            fullName: student.fullName,
            email: student.email,
            phoneNumber: student.phoneNumber,
            photo: student.photo,
            hoursRemaining: student.hoursRemaining,
            office: student.office,
            status: student.status,
            latestPurchasedHour: student.latestPurchasedHour ? {
                id: student.latestPurchasedHour.id,
                studentID: student.latestPurchasedHour.studentID,
                adminID: student.latestPurchasedHour.adminID,
                hours: student.latestPurchasedHour.hours,
                date: student.latestPurchasedHour.date
            } : null
        }));
        console.log('Estudiantes obtenidos:', studentsList);
        return studentsList;
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        throw error;
    }
}