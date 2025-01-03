import { toast } from "sonner";

export async function getAllTeams(status) {
    try{
        const url = `${process.env.REACT_APP_API_URL}/admin/equipo/teams/${status}`; 
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
            hoursPlanned: team.hoursPlanned,
            status: team.status,
            teacherDescription: {
                id: team.teacherDescription.id,
                fullName: team.teacherDescription.fullName,            
            }
        }));
        return teamsList;
    } catch (error) {  
        toast.error("Error al obtener los equipos, intente mas tarde");
        console.error('Error al obtener los equipos:', error);
        throw error;
    }
};
