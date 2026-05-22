// Format d'un track dans l'api supify
//    "name":"Rap god",
//     "releaseDate":"10/11/2012",
//     "apiId":"1",
//     "imageUrl":"",
//     "artist":"Eminem"

import styles from './trackItem.module.css'

export default function TrackItem({ track }) {
    return (
        <button className={styles.item} onClick={()=>console.log("Get track info")}>
            <img className={styles.trackCover} src={track.imageUrl} alt="Description de l'image"/>
            <div>
                <h4>{track.name}</h4>
                <p>{track.artist}</p>
            </div>
            <p className={styles.date}>{track.releaseDate}</p>
        </button>
    )
}