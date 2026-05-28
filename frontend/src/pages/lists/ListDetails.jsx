import { useSearchParams } from "react-router-dom";
import { getListById, getGamesFromList } from "../../service/axios";
import { useEffect, useState, Fragment } from "react";
import styles from './listDetails.module.css'

export default function ListDetails() {
    const [searchParams]  = useSearchParams()
    const id = searchParams.get('id')
    const [list, setList] = useState({name: "", imageUrl: ""})
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(true)
    const [authorized, setAuthorized] = useState(true); 
    const test = [
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"},
        {name: "Rap god", releaseDate: "01/01/1999", imageUrl: "https://cdn-images.dzcdn.net/images/cover/207567487b1e79e1c530e2f4004ef287/1900x1900-000000-80-0-0.jpg", artist: "Eminem", apiId: "1"}
    ]

    const updateGames = async() => {
        try {
            const payload = {listId: id}
            const listRes = await getListById(payload)
            setList(listRes.data)

            const tracksRes = await getGamesFromList(payload)
            setGames(tracksRes.data)
            
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