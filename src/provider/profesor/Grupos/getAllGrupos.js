export async function getAllTeams(id) {
    try{
        const url = `${process.env.REACT_APP_API_URL}/profesor/equipo/profesor/${id}`;
        const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        const data = await resp.json();
        const teamsList = await Promise.all(data.map(async (team) => {
            let photoUrl = '/images/photosDefaultTeam/default.jpeg';
            try {
                const photoResp = await fetch(`${process.env.REACT_APP_API_URL}/photos/team/${team.id}`, {
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
                console.error(`Error fetching photo for team ${team.id}:`, error);
            }
            return {
            id: team.id,
            name: team.name,
            companyID: {
                id: team.companyID.id,
                name: team.companyID.name,
                nit: team.companyID.nit
            },
            hoursPlanned: team.hoursPlanned,
            photo: photoUrl,
            status: team.status,
            teacherDescription: {
                id: team.teacherDescription.id,
                fullName: team.teacherDescription.fullName,
            }
        }
        }));
        return teamsList;
    } catch (error) {  
        console.error('Error al obtener los equipos:', error);
        throw error;
    }
 // Asegúrate de que esto retorne la respuesta completa
};
