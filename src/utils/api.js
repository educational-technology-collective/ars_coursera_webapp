import axios from 'axios';

const headers = {
    'Content-Type': 'application/json', // or another content type if needed
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

export const submitStudentData = async (data) => {
    try {
        const response = await axios.post('https://gsbtynpaeg.execute-api.us-east-1.amazonaws.com/week2_student_data', {
            data
        }, {headers});
        return response.data;
    } catch (error) {
        console.error("There was an error submitting the data", error);
        return null;
    }
};

export const fetchCodeHint = async () => {
    try {
        const response = await axios.get('https://gsbtynpaeg.execute-api.us-east-1.amazonaws.com/week2_incorrect_code');
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the data", error);
        return null;
    }
}

