import { useSearchParams } from "react-router-dom";
import { getListById, getGamesFromList, getgamesById, searchGameById } from "../../service/axios";
import { useEffect, useState, Fragment } from "react";
import styles from './listDetails.module.css'
import GameCard from "../../components/card/GameCard";

export default function ListDetails() {
    const [searchParams]  = useSearchParams()
    const id = searchParams.get('id')
    const [list, setList] = useState({name: "", imageUrl: ""})
    const [gamesids, setGamesIds] = useState([])
    const [gamesDatas, setGamesDatas] = useState([])

    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(true); 

    const updateGamesIds = async() => {
        try {
            const payload = {listId: id}
            const listRes = await getListById(payload)
            setList(listRes.data)

            const gameRes = await getGamesFromList(payload)
            setGamesIds(gameRes.data)
            console.log(gameRes.data)

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


    const getGamesInformations = async () => {
        let games = []
        for (const gameId of gamesids){
            const gameData = await searchGameById({gameId: gameId})

            games.push(gameData.data)
        }
        setGamesDatas(games)
    }

    useEffect(() => {
        getGamesInformations()
    }, [gamesids])
    
    return (
        authorized ?
            <div className={styles.content}>
                <h2 className={styles.title}>{list.name}</h2>
                <p>Jeux :</p>
                <div className={styles.gameList}>
                    <div className={styles.cardGameContainer}>
                    {gamesDatas?.map((game, index) => { return (
                        <GameCard key={index} id={game.id} name={game.name} releaseDate={game.released} rating={game.rating} tags={game.tags} developers={game.developers} publishers={game.publishers} imageURL={game.background_image}/>
                    )})}
                    </div>
                </div>
            </div>
        :
            <p>Vous n'êtes pas autorisé à acceder à cette playlist</p>
        
    )
}