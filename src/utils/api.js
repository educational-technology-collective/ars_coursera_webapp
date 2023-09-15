import axios from 'axios';

const headers = {
    'Content-Type': 'application/json', // or another content type if needed
    'Accept': '*/*'
};

export const submitStudentData = async (data) => {
    try {
        const response = await axios.post('https://htxfzhw4ee.execute-api.us-east-1.amazonaws.com/reflection_data', {
            data
        }, {headers});
        return response.data;
    } catch (error) {
        console.error("There was an error submitting the data", error);
        return null;
    }
};

export const fetchCodeHint = async (studentId, assignment) => {
    try {
        const response = await axios.get('https://htxfzhw4ee.execute-api.us-east-1.amazonaws.com/incorrect_code', {
            params: {
                studentId,
                assignment
            }
        });
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the data", error);
        return null;
    }
}

// Check if the student has already submitted code response and his score is 1
export const checkIfStudentCodeIsCorrect = async (studentId, assignment) => {
    try {
        const response = await axios.get('https://htxfzhw4ee.execute-api.us-east-1.amazonaws.com/if_fetch_correct_code', {
            params: {
                studentId,
                assignment
            }
        });
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the data", error);
        return null;
    }
}

// Fetch student's correct code after we know that he has submitted code and his score is 1
export const fetchStudentCorrectCode = async (studentId, cellId, assignment) => {
    try {
        const response = await axios.get('https://htxfzhw4ee.execute-api.us-east-1.amazonaws.com/correct_code', {
            params: {
                studentId,
                cellId,
                assignment
            }
        });
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the data", error);
        return null;
    }
}
