export async function postorputTeacher(teacherData, id) {
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from session storage
    const headers = {
        'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
        'Content-Type': 'application/json'
    };
    const putUrl = `${process.env.REACT_APP_API_URL}/admin/profesor/actualizar/${id}`;
    const postUrl = `${process.env.REACT_APP_API_URL}/admin/profesor/crear`;

    try {
        const putResponse = await fetch(putUrl, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(teacherData) // Convert the team data to JSON
        });

        const contentType = putResponse.headers.get('content-type');
        const responseText = await putResponse.text(); // Read the response as text

        if (!putResponse.ok) {
            console.error('Server responded with:', responseText);
            throw new Error('Failed to create individual class');
        }

        if (contentType && contentType.includes('application/json')) {
            return JSON.parse(responseText); // Attempt to parse the response as JSON
        } else {
            console.log('Response is not JSON:', responseText);
            return { message: responseText }; // Return the response text as a message
        }


    } catch (putError) {
        try {
            const postResponse = await fetch(postUrl, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(teacherData) // Convert the team data to JSON
            });

            const contentType = postResponse.headers.get('content-type');
            const responseText = await postResponse.text(); // Read the response as text

            if (!postResponse.ok) {
                console.error('Server responded with:', responseText);
                throw new Error('Failed to create individual class');
            }

            if (contentType && contentType.includes('application/json')) {
                return JSON.parse(responseText); // Attempt to parse the response as JSON
            } else {
                console.log('Response is not JSON:', responseText);
                return { message: responseText }; // Return the response text as a message
            }
        } catch (postError) {
            throw new Error(`Both PUT and POST requests failed: ${putError.message}, ${postError.message}`);
        }
    }
}