// Format d'un game dans l'api supify
//     "name":"",
//     "releaseDate":"",
//     "apiId":"",
//     "imageUrl":"",

import { useEffect, useState } from 'react'
import styles from './gameItem.module.css'

export default function GameItem({ game }) {
    const [gameData, setGame] = useState(game)

    return (
        <button className={styles.item} onClick={()=>console.log("Get game info")}>
            <img className={styles.gameCover} src={gameData?.imageUrl} alt={`${gameData?.name} cover image`}/>
            <div>
                <h4>{gameData?.name}</h4>
            </div>
            <p className={styles.date}>{gameData?.releaseDate}</p>
        </button>
    )
}