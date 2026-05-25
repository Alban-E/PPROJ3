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
        platforms: req.body.platforms, 
        stores: req.body.stores, 
        ordering: req.body.ordering, 
        page: req.body.page, 
        publishers: req.body.publishers,
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

module.exports = { getGames, getGamesById }