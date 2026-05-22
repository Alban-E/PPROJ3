const { rawgApi } = require('../Services/rawgService')

const getGames = async (req, res) =>{
    try{
        const games =  await rawgApi.get('/games', { 
            params: {
                platforms: req.body.platforms, 
                stores: req.body.stores, 
                ordering: req.body.ordering, 
                page: req.body.page, 
                publishers: req.body.publishers,
                page_size: req.body.page_size,
            }
        })

        return res.status(200).json(games.data)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getGamesById = async (req, res) => {
    try {
        const game = await rawgApi.get(`/games/${req.body.gameId}`)
        return res.status(200).json(game.data)
    } catch (error) {
        return rest.status(500).json({message: error.message})        
    }
}

module.exports = { getGames, getGamesById }