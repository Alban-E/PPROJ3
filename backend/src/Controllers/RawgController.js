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
        search: req.query.search,
        search_exact: req.query.search_exact,
        platforms: req.query.platforms, 
        stores: req.query.stores, 
        ordering: req.query.ordering, 
        page: req.query.page, 
        publishers: req.query.publisher,
        page_size: req.query.page_size,
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
    const cacheKey = `rawg_GameId_${req.query.gameId}`
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }
        
    try {
        const game = await rawgApi.get(`/games/${req.query.gameId}`)
        cache.set(cacheKey, game.data)
        return res.status(200).json(game.data)
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

const getGameAchievements = async (req, res) => {
    const cacheKey = `rawg_Achievement_${JSON.stringify(req.query)}`
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }

    try {
        const achievements = await rawgApi.get(`/games/${req.query.gameId}/achievements`, {params: {page: req.query.page}});
        cache.set(cacheKey, achievements.data)
        return res.status(200).json(achievements.data)
    } catch (error) {
    }
}

const getGameTrailer = async (req, res) => {
    const cacheKey = `rawg_Trailer_${JSON.stringify(req.query)}`
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }

    try {
        const trailers = await rawgApi.get(`/games/${req.query.gameId}/movies`)
        cache.set(cacheKey, trailers.data)
        return res.status(200).json(trailers.data)
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

const getPublisherById = async (req, res) => {
    const cacheKey = `rawg_Publisher${JSON.stringify(req.query)}`
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }

    try {
        const publishers = await rawgApi.get(`/publishers/${req.query.publisherId}`)
        cache.set(cacheKey, publishers.data)
        return res.status(200).json(publishers.data)
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

const getGamesByPublishers= async (req, res) => {
    const cacheKey = `rawg_Publisher_Games${JSON.stringify(req.query)}`
    const cachedData = cache.get(cacheKey)
    if (cachedData) {
        return res.status(200).json(cachedData)
    }

    try {
        const games =  await rawgApi.get('/games', {params: {
            publishers: req.query.publisherId,
            page: req.query.page,
            page_size: 20
        }}) 
        cache.set(cacheKey, games.data)
        return res.status(200).json(games.data)
    } catch (error) {
        return res.status(500).json({message: error.message})        
    }
}

module.exports = { getGames, getGamesById, getGameAchievements, getGameTrailer, getPublisherById, getGamesByPublishers }