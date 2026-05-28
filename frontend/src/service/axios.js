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

axiosInstance.interceptors.response.use((response) => {return response}, (error) => {
    const status = error.response?.status
    const url = error.config?.url
    if ((status === 401 || status === 403) && url === "/user/me") {
        return Promise.reject(error);
    }

    console.error("Une erreur est survenue:", error)
    return Promise.reject(error);
});


// #region Auth part 
export const checkConnexion = async () => {
    return await axiosInstance.get('/user/me')
}

export const login = async (payload) => {
    return await axiosInstance.post('/auth/login', payload) 
}

export const logout = async (payload) => {
    const res = await axiosInstance.post('/auth/logout', payload)
}
//#endregion


//#region User
export const register = async (payload) => {
    console.log(payload)
    if (payload.login?.trim() && payload.username?.trim() && payload.password?.trim()) {
        const res = await axiosInstance.post('/user/register', payload)
        return res
    }
    throw new Error("login, username and password must be filled"); 
}

export const getAllUsers = async () => {
    const res = await axiosInstance.get('/user/')
    return res
}

export const getUserByid = async (id) => {
    const res = await axiosInstance.get(`/user/${id}`)
    return res
}

export const updateUserById = async (id, payload) => {
    const res = await axiosInstance.put(`/user/${id}`, payload)
    return res
}

export const deleteUserById = async (id) => {
    const res = await axiosInstance.delete(`/user/${id}`)
    return res
}

//#endregion


//#region Lists
export const createList = async (payload) => {
    const res = await axiosInstance.post('/list/', payload)
    return res
}

export const getListById = async (payload) => {
    const res = await axiosInstance.post('/list/id', payload)
    return res
}

export const getMyLists= async () => {
    const res = await axiosInstance.get('/list/me')
    return res
}

export const getUserPublicLists = async (payload) => {
    const res = await axiosInstance.get('/list/user', payload)
    return res
}

export const getAllUserLists  = async (payload) => {
    const res = await axiosInstance.get('/list/user/all', payload)
    return res
}

export const getAllLists = async () => {
    const res = await axiosInstance.get('/list/', payload)
    return res
}

export const updateList = async (payload) => {
    const res = await axiosInstance.put('/list/', payload)
    return res
}

export const deleteList = async (payload) => {
    const res = await axiosInstance.delete('/list/', payload)
    return res
}
//#endregion


//#region game list relation
export const addGameToList = async (payload) => {
    const res = await axiosInstance.post('/games/add', payload)
    return res
}

export const getGamesFromList = async (payload) => {
    const res = await axiosInstance.post('/games/list', payload)
    return res
}

export const removeGameFromList = async (payload) => {
    const res = await axiosInstance.delete('/games/list', payload)
    return res
}
//#endregion


//#region games
export const creategame = async (payload) => {
    const res = await axiosInstance.post('/games/', payload)
    return res
}

export const getgamesById = async (payload) => {
    const res = await axiosInstance.get('/games/id', payload)
    return res
}

export const getgamesByArtist = async (payload) => {
    const res = await axiosInstance.get('/games/artist', payload)
    return res
}

export const getgamesByName = async (payload) => {
    const res = await axiosInstance.get('/games/name', payload)
    return res
}

export const getAllgames = async (payload) => {
    const res = await axiosInstance.get('/games/', payload)
    return res
}

export const deletegame = async (payload) => {
    const res = await axiosInstance.delete('/games/', payload)
    return res
}
//#endregion


//#region Feedback
export const createFeedback = async (payload) => {
    const res = await axiosInstance.post('/feedback/', payload)
    return res
}

export const getMyFeedbacks = async (payload) => {
    const res = await axiosInstance.get('/feedback/me', payload)
    return res
}

export const getUserFeedbacks = async (payload) => {
    const res = await axiosInstance.get('/feedback/user', payload)
    return res
}

export const getAllFeedbacks = async (payload) => {
    const res = await axiosInstance.get('/feedback/', payload)
    return res
}

export const updateFeedback = async (payload) => {
    const res = await axiosInstance.put('/feedback/', payload)
    return res
}

export const deleteFeedback = async (payload) => {
    const res = await axiosInstance.delete('/feedback/', payload)
    return res
}

//#endregion


//#region Feedback Comment
export const createFeedbackComment = async (payload) => {
    const res = await axiosInstance.post('/feedback/comment/', payload)
    return res
}

export const getFeedbackCommentByFeedbackId = async (payload) => {
    const res = await axiosInstance.get('/feedback/comment/origin', payload)
    return res
}

export const getUserFeedbackComment = async (payload) => {
    const res = await axiosInstance.get('/feedback/comment/user', payload)
    return res
}

export const getAllFeedBackComment = async (payload) => {
    const res = await axiosInstance.get('/feedback/comment/', payload)
    return res
}

export const updateFeedbackComment = async (payload) => {
    const res = await axiosInstance.put('/feedback/comment/', payload)
    return res
}

export const deleteFeedbackComment = async (payload) => {
    const res = await axiosInstance.delete('/feedback/comment/', payload)
    return res
}
//#endregion


//#region Notification
export const createNotification = async (payload) => {
    const res = await axiosInstance.post('/notifications/', payload)
    return res
}

export const getMyNotifications = async (payload) => {
    const res = await axiosInstance.get('/notifications/me', payload)
    return res
}

export const getNotificationsByUser = async (payload) => {
    const res = await axiosInstance.get('/notifications/user', payload)
    return res
}

export const getAllNotification = async (payload) => {
    const res = await axiosInstance.get('/notifications/', payload)
    return res
}

export const deleteNotification = async (payload) => {
    const res = await axiosInstance.delete('/notifications/', payload)
    return res
}
//#endregion


//#region Subscription
export const createSubscriber = async (payload) => {
    const res = await axiosInstance.post('/subscribers/', payload)
    return res
}

export const getMySubscribers = async (payload) => {
    const res = await axiosInstance.get('/subscribers/me/subscribers', payload)
    return res
}

export const getMySubscriptions = async (payload) => {
    const res = await axiosInstance.get('/subscribers/me/supscriptions', payload)
    return res
}

export const getSubscriberByUser = async (payload) => {
    const res = await axiosInstance.get('/subscribers/user/subscribers', payload)
    return res
}

export const getSubscriptionsByUser = async (payload) => {
    const res = await axiosInstance.get('/subscribers/user/supscription', payload)
    return res
}

export const getAllSubscribers = async (payload) => {
    const res = await axiosInstance.get('/subscribers/', payload)
    return res
}

export const deleteSubscriber = async (payload) => {
    const res = await axiosInstance.delete('/subscribers/', payload)
    return res
}
//#endregion


//#region Chat
export const createChat = async (payload) => {
    const res = await axiosInstance.post('/chat/', payload)
    return res
}

export const getMyChats = async (payload) => {
    const res = await axiosInstance.get('/chat/me', payload)
    return res
}

export const getChatWithUser = async (payload) => {
    const res = await axiosInstance.get('/chat/user', payload)
    return res
}

export const getAllChats = async (payload) => {
    const res = await axiosInstance.get('/chat/', payload)
    return res
}

export const deleteChat = async (payload) => {
    const res = await axiosInstance.delete('/chat/', payload)
    return res
}

//#endregion


//#region chat message
export const createMessage = async (payload) => {
    const res = await axiosInstance.post('/chat/message/', payload)
    return res
}

export const getMessagesFromChat = async (payload) => {
    const res = await axiosInstance.get('/chat/messages', payload)
    return res
}

export const getMessagesFromUser = async (payload) => {
    const res = await axiosInstance.get('/chat/messages/user', payload)
    return res
}

export const GetAllMessages = async (payload) => {
    const res = await axiosInstance.get('/chat/messages/all', payload)
    return res
}

export const UpdateMessage = async (payload) => {
    const res = await axiosInstance.put('/chat/message', payload)
    return res
}

export const deleteMessage = async (payload) => {
    const res = await axiosInstance.delete('/chat/message', payload)
    return res
}


//#endregion


//#region Moderation
// Signal part
export const createSignal = async (payload) => {
    const res = await axiosInstance.post('/moderation/signal', payload)
    return res
}

export const getSignalByUser = async (payload) => {
    const res = await axiosInstance.get('/moderation/signaled', payload)
    return res
}

export const getAllSignals = async (payload) => {
    const res = await axiosInstance.get('/moderation/signal', payload)
    return res
}

export const deleteSignal = async (payload) => {
    const res = await axiosInstance.delete('/moderation/signal', payload)
    return res
}

// Ban part
export const createBan = async (payload) => {
    const res = await axiosInstance.post('/moderation/ban', payload)
    return res
}

export const getBanByBanned = async (payload) => {
    const res = await axiosInstance.get('/moderation/banned', payload)
    return res
}

export const getBanByBanner = async (payload) => {
    const res = await axiosInstance.get('/moderation/banner', payload)
    return res
}

export const getAllBans = async (payload) => {
    const res = await axiosInstance.get('/moderation/bans', payload)
    return res
}

export const deleteBan = async (payload) => {
    const res = await axiosInstance.delete('/moderation/ban', payload)
    return res
}

export const revokeBan = async (payload) => {
    const res = await axiosInstance.put('/moderation/ban/revoke', payload)
    return res
}

//#endregion


//#region API
export const searchGames = async (payload) => {
    return await axiosInstance.post('/search/games', payload)
}

export const searchGameById = async (payload) => {
    return await axiosInstance.post('/search/game/id', payload)
}

export const searchGameAchievements = async (payload) => {
    return axiosInstance.get(`/search/game/achievements`, payload);
}

export const searchGameTrailer = async (payload) => {
    return axiosInstance.get(`/search/game/trailers`, payload)
}


//#endregion
