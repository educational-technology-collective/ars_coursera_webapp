import axios from 'axios';

export const submitFeedback = (hint, rating) => {
    return axios.post('http://your-api-url.com/endpoint', {
        hint, rating
    });
}
