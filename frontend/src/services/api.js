import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:3333/',/*'https://cristatusbackapp-production.up.railway.app/',*/
    timeout: 10000,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
});
export default api;