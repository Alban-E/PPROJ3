import { useSearchParams } from "react-router-dom";
import { getListById, getGamesFromList } from "../../service/axios";
import { useEffect, useState, Fragment } from "react";
import styles from './listDetails.module.css'

export default function ListDetails() {
    const [searchParams]  = useSearchParams()
    const id = searchParams.get('id')
    const [list, setList] = useState({name: "", imageUrl: ""})
    const [gamesids, setGamesIds] = useState([])

    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(true); 

    const updateGames = async() => {
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

        updateGames()
    },[])
    
    return (
        authorized ?
            <div className={styles.content}>
                <h2 className={styles.title}>{list.name}</h2>
                <p>Jeux :</p>
                <div className={styles.gameList}>

                {gamesids.map((gameId, index) => {
                    return (
                        <p key={index}>{gameId}</p>
                    )
                })}
                    {/* {games.map((track, index) => (
                    <GameItem key={index} track={track} ></GameItem>
                    ))}
                    
                    {test.map((game, index) => (
                    <GameItem key={index} game={game} ></GameItem>
                    ))} */}
                </div>
            </div>
        :
            <p>Vous n'êtes pas autorisé à acceder à cette playlist</p>
        
    )
}