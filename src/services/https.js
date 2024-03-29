import axios from 'axios';

const httpService = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Accept :  "application/json",
        "Content-Type": "application/json"
    }
});

export default httpService;
