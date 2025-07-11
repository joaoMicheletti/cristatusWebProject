import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:3333',//'http://ec2-54-233-243-115.sa-east-1.compute.amazonaws.com:3333/',
    timeout: 10000,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
});
export default api;