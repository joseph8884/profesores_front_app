export async function getAllTeams() {
    try{
        const url = 'https://profesoresbackend.onrender.com/admin/equipo/teams';
        const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        const data = await resp.json();
        const teamsList = data.map((team) => ({
            ID: team.id,
            name: team.name,
            companyID: team.companyID.id,
            companyName: team.companyID.name,
            companyNIT: team.companyID.nit,
            hoursPurchased: team.hoursPurchased,
            hoursSpented: team.hoursSpented,
            photo: team.photo,
            status: team.status,
            studentsTeams: team.studentsTeams.map((student) => ({
                ID: student.id,
                teamID: student.teamID,
                fullName: student.fullName,
                phoneNumber: student.phoneNumber,
                email: student.email,
                attendancePercentage: student.attendancePercentage,
                attendedClassesCount: student.attendedClassesCount,
                attendances: student.attendances.map((attendance) => ({
                    ID: attendance.id,
                    classID: attendance.classID,
                    studentTeamID: attendance.studentTeamID,
                    attended: attendance.attended
                }))
            })),
            teamClasses: team.teamClasses
        }));
        return teamsList;
    } catch (error) {  
        console.error('Error al obtener los equipos:', error);
        throw error;
    }
 // Asegúrate de que esto retorne la respuesta completa
};
