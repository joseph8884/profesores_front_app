import { toast } from "sonner";

export async function getBankDataTeacherbyID(id) {
    const url = `${process.env.REACT_APP_API_URL}/admin/profesorbanco/profesor/${id}`; // URL de la API para crear un estudiante personalizado};
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
        });
        return await response.json(); // Retorna la respuesta en formato JSON si es exitosa
    } catch (error) {
        toast.error("Error al obtener los datos bancarios del profesor", error.message);    
        console.error('Error creating student:', error);
        throw error;
    }
}

