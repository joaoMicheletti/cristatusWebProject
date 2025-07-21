import axios from 'axios';

const api = axios.create({               
    baseURL: 'http://127.0.0.1:3333',//'https://www.acasaprime1.com.br/', 
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'ngrok-skip-browser-warning': 'true' // Cabeçalho que evita o alerta do ngrok
    }
});
export default api;