import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.35:3333',//'https://urchin-upright-hardly.ngrok-free.app/',//'http://ec2-54-233-243-115.sa-east-1.compute.amazonaws.com:3333/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'ngrok-skip-browser-warning': 'true' // Cabeçalho que evita o alerta do ngrok
    }
});
export default api;