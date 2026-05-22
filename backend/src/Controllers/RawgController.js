const { rawgApi } = require('../Services/rawgService')

const getGames = async (req, res) =>{
    return rawgApi.get('/games', { 
        params: {
            platforms: req.body.platformValue, 
            stores: req.body.storeValue, 
            ordering: req.body.orderingVaue, 
            page: req.body.pageValue, 
            publishers: req.body.publisherValue,
            page_size: req.body.pageSize,
        }
    });
}

const getGamesById = async (req, res) => {
    return rawgApi.get(`/games/${req.body.gameId}`);
}

module.exports = { getGames, getGamesById }