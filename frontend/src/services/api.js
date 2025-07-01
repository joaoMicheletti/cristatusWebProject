import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cristatusbackapp-production.up.railway.app/',
    timeout: 10000,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
});
export default api;