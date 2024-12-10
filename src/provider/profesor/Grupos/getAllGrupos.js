export async function getAllTeams(id) {
    try{
        const url = `https://profesoresbackend.onrender.com/profesor/equipo/profesor/${id}`;
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
            id: team.id,
            name: team.name,
            company: {
                id: team.companyID.id,
                name: team.companyID.name,
                nit: team.companyID.nit
            },
            photo: team.photo,
            status: team.status,
            teacherID: {
                id: team.teacherID.id,
                name: team.teacherID.fullName,
            }
        }));
        return teamsList;
    } catch (error) {  
        console.error('Error al obtener los equipos:', error);
        throw error;
    }
 // Asegúrate de que esto retorne la respuesta completa
};
