const { rawgApi } = require('../Services/rawgService')
const cache = require('../Services/cacheService')

// Use the filters to create a stabe cache key
const generateRawgSearchCacheKey = (filters = {}) => {
    const sortedFilters = Object.keys(filters)
    .sort()
    .reduce((newSortedFilters, key) => {
        newSortedFilters[key] = filters[key];
        return newSortedFilters;
    }, {});
    
    return `rawg_search_${JSON.stringify(sortedFilters)}`;
};

const getGames = async (req, res) =>{
    const filters = {
        search: req.body.search,
        search_exact: req.body.search_exact,
        platforms: req.body.platforms, 
        stores: req.body.stores, 
        ordering: req.body.ordering, 
        page: req.body.page, 
        publishers: req.body.publisher,
        page_size: req.body.page_size,
    }
    const cacheKey = generateRawgSearchCacheKey(filters)
    
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }
    
    try{
        const games =  await rawgApi.get('/games', { 
            params: filters
        })
        cache.set(cacheKey, games.data)
        return res.status(200).json(games.data)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getGamesById = async (req, res) => {
    const cacheKey = `rawg_GameId_${req.body.gameId}`
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }
        
    try {
        const game = await rawgApi.get(`/games/${req.body.gameId}`)
        cache.set(cacheKey, game.data)
        return res.status(200).json(game.data)
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

const getGameAchievements = async (req, res) => {
    const cacheKey = `rawg_Achievement_${JSON.stringify(req.body)}`
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }

    try {
        const achievements = await rawgApi.get(`/games/${req.body.gameId}/achievements`, {params: {page: req.body.page}});
        cache.set(cacheKey, achievements.data)
        return res.status(200).json(achievements.data)
    } catch (error) {
    }
}

const getGameTrailer = async (req, res) => {
    const cacheKey = `rawg_Trailer_${JSON.stringify(req.body)}`
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }

    try {
        const trailers = await rawgApi.get(`/games/${req.body.gameId}/movies`)
        cache.set(cacheKey, trailers.data)
        return res.status(200).json(trailers.data)
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

const getPublisherById = async (req, res) => {
    const cacheKey = `rawg_Publisher${JSON.stringify(req.body)}`
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }

    try {
        const publishers = await rawgApi.get(`/publishers/${req.body.publisherId}`)
        cache.set(cacheKey, publishers.data)
        return res.status(200).json(publishers.data)
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

const getGamesByPublishers= async (req, res) => {
    const cacheKey = `rawg_Publisher_Games${JSON.stringify(req.body)}`
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }

    try {
        const games =  await rawgApi.get('/games', {params: {
            publishers: req.body.publisherId,
            page: req.body.page,
            page_size: 20
        }}) 
        cache.set(cacheKey, games.data)
        return res.status(200).json(games.data)
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

module.exports = { getGames, getGamesById, getGameAchievements, getGameTrailer, getPublisherById, getGamesByPublishers }