import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://max-burger-d04a8.firebaseio.com/'
});

export default instance;