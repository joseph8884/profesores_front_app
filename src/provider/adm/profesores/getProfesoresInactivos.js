export async function getAllProfesoresInactivos() {
    try{
        const url = 'https://profesoresbackend.onrender.com/admin/profesor/inactivos';
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
            countryCode: profesor.countryCode,
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
        console.error('Error al obtener los equipos:', error);
        throw error;
    }
 // Asegúrate de que esto retorne la respuesta completa
};
