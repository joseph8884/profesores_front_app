import { toast } from "sonner";

export async function getAllProfesoresInactivos() {
    try{
        const url = `${process.env.REACT_APP_API_URL}/admin/profesor/inactivos`;
        const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        const data = await resp.json();
        const proflist = data.map((profesor) => ({
            id: profesor.id,
            fullName: profesor.fullName,
            phoneNumber: profesor.phoneNumber,
            emergencyContact: profesor.emergencyContact,
            identificationType: profesor.identificationType,
            identificationNumber: profesor.identificationNumber,
            status: profesor.status,
            registerDate: profesor.registerDate,
            idUser: profesor.idUser,
        }));
        return proflist;
    } catch (error) {
        toast.error('Error al obtener los profesores', error.message);  
        console.error('Error al obtener los equipos:', error);
        throw error;
    }
 // Asegúrate de que esto retorne la respuesta completa
};
