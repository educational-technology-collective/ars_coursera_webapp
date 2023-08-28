import axios from 'axios';

export const submitStudentData = (data) => {
    return axios.post('http://your-api-url.com/endpoint', {
        data
    });
}

export const fetchCodeHint = async () => {
    try {
        const response = await axios.get('https://gsbtynpaeg.execute-api.us-east-1.amazonaws.com/week2_incorrect_code');
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the data", error);
        return null;
    }
}

