const ListGames = require('../Models/ListGames')
const List = require('../Models/List')

const getGamesFromList = async (req, res) => {
    try {
        const list = await List.findById(req.query.listId)
        if (!list) {
            return res.status(404).json({message: "No list found"})
        } else if (list.private === false || String(req.user.userRole) === "admin" || (String(list.userId) === String(req.user.userId))) {
            const gamesInList = await ListGames.find({listId: req.query.listId})
            const gameIds = gamesInList.map(t => t.gameId)

            return res.status(200).json(gameIds)
        }
        return res.status(409).json({message: "Unauthorized operation"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addGameToList = async (req, res)=> {
    try {    
        if (!req.user) {
             return res.status(401).json({ message: "Not authenticated" });
        } 
        
        const list = await List.findById(req.body.listId)
        if (!list) {
            return res.status(404).json({message: "There is no existing list with this id"})
        }          

        if (String(list.userId) !== String(req.user.userId) && String(req.user.userRole) !== "admin") {
            return res.status(403).json({message: "Unauthorized operation, the user is not the owner of the list"})
        }

        const AlreadyInList = await ListGames.findOne({listId: req.body.listId, gameId: req.body.gameId})

        if (AlreadyInList) {
            return res.status(409).json({message: "The list already contains this game"})
        }

        const listGame = await ListGames.create({
            listId: req.body.listId,
            gameId: req.body.gameId
        })

        res.status(201).json({message: 'Game added to list', list: list })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const removeGameFromList = async (req, res) => {
    try {     
        const list = await List.findById(req.body.listId)
        if (!list) {
            return res.status(404).json({message: "There is no existing list with this id"})
        }          

        if (String(list.userId) !== String(req.user.userId) && String(req.user.userRole) !== "admin") {
            return res.status(401).json({message: "Unauthorized operation, the user is not the owner of the list"})
        }

        const gameIsInList = await ListGames.findOne({listId: req.body.listId, gameId: req.body.gameId})
        if (gameIsInList) {
            await gameIsInList.deleteOne()
            return res.status(200).json({message: "Game deleted from list"})
        }

        res.status(404).json({message: "The game is not in the lsit" })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = { getGamesFromList,  addGameToList, removeGameFromList }