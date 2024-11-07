export async function getAllIndividualClasses() {
    const url = 'https://profesoresbackend.onrender.com/admin/clase/individual/clases';
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
        const individualClassesList = data.map((individualClass) => ({ // Adjusted to match the new data structure
            ID: individualClass.id,
            teacherID: individualClass.teacherID,
            classType: individualClass.classType,
            dateTime: individualClass.dateTime,
            duration: individualClass.duration,
            studentID: individualClass.studentID,
            comment: individualClass.comment,
            topic: individualClass.topic,
            classHelded: individualClass.classHelded,
            cancellationReason: individualClass.cancellationReason,
            cancellationTiming: individualClass.cancellationTiming,
            canceledBy: individualClass.canceledBy
        }));

        if (!response.ok) {
            throw new Error('Failed to get individual classes');
        }
        return await response.json(); // Retorna la respuesta en formato JSON si es exitosa
    } catch (error) {
        console.error('Error getting individual classes:', error);
        throw error;
    }
    
}