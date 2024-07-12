import axios from 'axios';

export const axiosInstance = axios.create({
    headers : {
        'Content-Type' : 'application/json', // to tell that communication will happen in json form
    }
});