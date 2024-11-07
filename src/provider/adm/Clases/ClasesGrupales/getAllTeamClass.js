export async function getAllTeamClasses() {
    const url = 'https://profesoresbackend.onrender.com/admin/clase/equipo/clases';
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
        const teamClassesList = data.map((teamClass) => ({
            ID: teamClass.id,
            teacherID: teamClass.teacherID,
            classType: teamClass.classType,
            dateTime: teamClass.dateTime,
            duration: teamClass.duration,
            teamID: teamClass.teamID,
            comment: teamClass.comment,
            topic: teamClass.topic,
            classHelded: teamClass.classHelded,
            cancellationReason: teamClass.cancellationReason,
            cancellationTiming: teamClass.cancellationTiming,
            canceledBy: teamClass.canceledBy
        }));

        if (!response.ok) {
            throw new Error('Failed to get team classes');
        }
        return teamClassesList; // Return the processed list of team classes
    } catch (error) {
        console.error('Error getting team classes:', error);
        throw error;
    }
}