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


// #region Authentication part 

export const register = async (payload) => {
    const res = await axiosInstance.post('/user/register', payload)
    return res.data
}

export const login = async (payload) => {
    const res = await axiosInstance.post('/user/login', payload) 
    return res.data
}
//#endregion


//#region User
//#endregion


//#region Lists
//#endregion





//#region Tracks
//#endregion





//#region Feedback
//#endregion





//#region Feedback Comment
//#endregion





//#region Notification
//#endregion





//#region Subscription
//#endregion





//#region Chat
//#endregion





//#region Moderation
//#endregion





//#region API
//#endregion
