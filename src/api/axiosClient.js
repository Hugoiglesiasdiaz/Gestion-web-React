import axios from 'axios';

// Extraemos las variables de configuración al principio para mantener el código más limpio
const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://prueba-tecnica-api-tienda-moviles.onrender.com';
const API_KEY = import.meta.env.VITE_API_KEY || '';

// Creamos una instancia de Axios estructurada
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY,
  },
  timeout: 10000,
});

// Interceptor global de respuestas para depuración o manejo de tokens caducados (opcional)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    //Capturar errores de red globales en el futuro
    return Promise.reject(error);
  },
);

export default axiosClient;
