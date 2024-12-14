export async function changeStatusStudent(id) {
    const url = `${process.env.REACT_APP_API_URL}/admin/estudiante/personalizado/estado/${id}`;
    const token = sessionStorage.getItem('token');

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        const contentType = response.headers.get('content-type');
        const responseText = await response.text(); // Read the response as text

        if (!response.ok) {
            console.error('Server responded with:', responseText);
            throw new Error('Failed to create individual class');
        }

        if (contentType && contentType.includes('application/json')) {
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            console.log('Response is not JSON:', responseText);
            return { message: responseText }; // Return the response text as a message
        }
    } catch (error) {
        console.error('Error updating student status:', error);
        throw error;
    }
}
