import { toast } from "sonner";

export async function getCompanys() {
    try{
        const url = `${process.env.REACT_APP_API_URL}/admin/equipo/empresa/todas`;
        const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage
        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        const data = await resp.json();
        const companyList = data.map((company) => ({ 
            id: company.id, 
            name: company.name,
            nit: company.nit,
        }));
        return companyList;
    } catch (error) {
        toast.error("Error al obtener compañias, intente mas tarde");  
        console.error('Error al obtener compañias:', error);
        throw error;
    }
};
