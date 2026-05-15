import { useDebugValue } from 'react'
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

axiosInstance.interceptors.request.use((config) =>{
    console.log('Requête envoyée: ', config);
    return config;
});

axiosInstance.interceptors.response.use((response) =>{
    return response}, (error) => {
        console.error('Une erreur est survenue: ', error);
        return Promise.reject(error);
    });

export const register = async (payload) => {
    const res = await axiosInstance.post('/user/register', payload)
    return res.data
}

