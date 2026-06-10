import { useSearchParams } from "react-router-dom";
import { getListById, getGamesFromList, getgamesById, searchGameById, updateList, removeGameFromList } from "../../service/axios";
import { useEffect, useState, Fragment } from "react";
import styles from './listDetails.module.css'
import GameCard from "../../components/card/GameCard";
import { useAuth } from "../../service/AuthContext";

export default function ListDetails() {
    const { user } = useAuth()

    const [searchParams]  = useSearchParams()
    const listId = searchParams.get('id')

    const [list, setList] = useState({name: "", imageUrl: "", _id:""})
    const [gamesIds, setGamesIds] = useState([])
    const [gamesDatas, setGamesDatas] = useState([])

    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(true); 

    const getList = async () => {
        try {
            const payload = {listId: listId}
            const listRes = await getListById(payload)
            setList(listRes.data)
        } catch (error) {
            const status = error.response?.status
            if (status === 409) {
                setAuthorized(false)
                console.log('Unauthorized operation')
            }
            else {
                console.log("error:", error)
            }
        }
    }

    const updateGamesIds = async() => {
        try {
            await getList()
            const payload = {listId: listId}
            const gameRes = await getGamesFromList(payload)
            setGamesIds(gameRes.data)
        } catch (error) {
            const status = error.response?.status
            if (status === 409) {
                setAuthorized(false)
                console.log('Unauthorized operation')
            }
            else {
                console.log("error:", error)
            }
        }
    }
    
    useEffect(() => {
        updateGamesIds()
    },[])

    useEffect(() => {
        console.log("user: ", user)
        console.log("list: ", list)
        setAuthorized(String(list?.userId) === user?._id)
    }, [list])


    const getGamesInformations = async () => {
        let games = []
        for (const gameId of gamesIds){
            const gameData = await searchGameById({gameId: gameId})

            games.push(gameData.data)
        }
        setGamesDatas(games)
    }

    useEffect(() => {
        getGamesInformations()
    }, [gamesIds])

    
    const updateListVisibility = async () => {
        const payload = {
            private: !list.private,
            listId: list._id
        }
        await updateList(payload)
        await getList()
    }

    const removeFromPlaylist = async (gameId) => {
        const payload = {
            gameId: gameId,
            listId: list._id
        }
        console.log("payload: ", payload)
        await removeGameFromList(payload)
        await updateGamesIds()
    }

    return (
        <div className={styles.content}>
            <h2 className={styles.title}>{list.name}</h2>
            {authorized && (list?.name.toLowerCase() !== "a jouer" && list?.name.toLowerCase() !== "terminé(s)" & list?.name.toLowerCase() !== "favoris") ?
                <div className={styles.visibilityContainer}>
                    <p className={styles.listVisibility}>Visibilité: {list.private? "privée" : "publique"}</p>
                    <button onClick={()=> {updateListVisibility()}} className={styles.changeVisibilityButton}>Passer la liste en {list.private? "publique" : "privée"}</button>
                </div>
            :   
                null
            }
            <div className={styles.gameList}>
                <div className={styles.cardGameContainer}>
                    {gamesDatas?.length > 0 ?(
                        gamesDatas?.map((game, index) => { return (
                            <div className={styles.gameCard} key={index}>
                                <GameCard id={game.id} name={game.name} releaseDate={game.released} rating={game.rating} tags={game.tags} developers={game.developers} publishers={game.publishers} imageURL={game.background_image}/>
                                {authorized &&
                                    <button className={styles.removeFromPlaylistButton} onClick={() => {removeFromPlaylist(game.id)}}>Supprimer de la playlist</button>
                                }
                            </div>
                        )})):
                            <p>Cette playlist est vide</p>
                    }
                </div>
            </div>
        </div>
    )
}