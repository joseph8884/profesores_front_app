export async function getStudentsCustom() {
    try {
        const url = `${process.env.REACT_APP_API_URL}/profesor/estudiante/personalizado/`; // URL to the backend API endpoint
        const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        const data = await resp.json();
        const studentsList = await Promise.all(data.map(async (student) => {
            let photoUrl = '/default_profile_photo.png';
            try {
                const photoResp = await fetch(`${process.env.REACT_APP_API_URL}/photos/estudiante/personalizado/${student.id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                        'Content-Type': 'image/jpeg'
                    }
                });
                if (!photoResp.ok) throw new Error('Photo not found');
                const photoBlob = await photoResp.blob();
                photoUrl = URL.createObjectURL(photoBlob);
            } catch (error) {
                console.error(`Error fetching photo for student ${student.id}:`, error);
            }
            return{
            id: student.id,
            fullName: student.fullName,
            email: student.email,
            phoneNumber: student.phoneNumber,
            photo: photoUrl,
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
        }
        }));
        console.log('Estudiantes obtenidos:', studentsList);
        return studentsList;
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        throw error;
    }
}