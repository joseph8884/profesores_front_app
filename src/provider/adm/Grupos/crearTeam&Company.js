import { toast } from 'sonner';
export async function creaCompany(companyData) {
    const url = `${process.env.REACT_APP_API_URL}/admin/equipo/empresa/crear`;
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(companyData) // Convert the company data to JSON
        });

        const contentType = response.headers.get('content-type');
        const responseText = await response.text(); // Read the response as text

        if (!response.ok) {
            toast.error("Error al crear compañio", responseText);    
            console.error('Server responded with:', responseText);
            throw new Error('Failed to put student');
        }

        if (contentType && contentType.includes('application/json')) {
            toast.error("Error al crear compañia", responseText);
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            console.log('Response is not JSON:', responseText);
            toast.success("Compañia creada con éxito");
            return { message: responseText }; // Return the response text as a message
        }
    } catch (error) {
        toast.error("Error al crear compañia");
        console.error('Error creating compañia:', error);
        throw error;
    }
}

export async function createTeam(teamData) {
    const url = 'https://profesoresbackend.onrender.com/admin/equipo/crear';
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teamData) // Convert the team data to JSON
        });

        const contentType = response.headers.get('content-type');
        const responseText = await response.text(); // Read the response as text

        if (!response.ok) {
            toast.error("Error al crear Team", responseText);    
            console.error('Server responded with:', responseText);
            throw new Error('Failed to put student');
        }

        if (contentType && contentType.includes('application/json')) {
            toast.error("Error al crear Team", responseText);  
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            toast.success("Team creada con éxito");
            return { message: responseText }; // Return the response text as a message
        }
    } catch (error) {
        toast.error("Error al crear Team");
        console.error('Error creating Team:', error);
        throw error;
    }
}


export async function editTeam(id,team) {
    const url = `https://profesoresbackend.onrender.com/admin/equipo/actualizar/${id}`; // URL de la API para crear un estudiante personalizado};
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(team) // Convert the company data to JSON
        });

        const contentType = response.headers.get('content-type');
        const responseText = await response.text(); // Read the response as text

        if (!response.ok) {
            toast.error("Error al editar Team", responseText);    
            console.error('Server responded with:', responseText);
            throw new Error('Failed to put student');
        }

        if (contentType && contentType.includes('application/json')) {
            toast.error("Error al editar Team", responseText);  
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            toast.success("Team editado con éxito");
            return { message: responseText }; // Return the response text as a message
        }
    } catch (error) {
        toast.error("Error al editar Team");
        console.error('Error creating Team:', error);
        throw error;
    }
}



